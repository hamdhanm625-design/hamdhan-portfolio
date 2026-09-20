import React, { useState, useEffect } from 'react';
import { ArrowRight, Code, Terminal, Sparkles, Send, Download, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import NeuralBrain3D from '../canvases/NeuralBrain3D';
import { playClickSound, playHoverSound } from './SoundEngine';

import photo2 from '../assets/photo2.jpg';
import photo3 from '../assets/photo3.jpg';

export default function Hero() {
  const userPhotos = [
    { src: photo2, title: 'Mohamed Hamdhan - Portrait', position: 'center 25%' },
    { src: photo3, title: 'Mohamed Hamdhan - Night Out', position: 'center 20%' },
  ];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Automatic blinking photo transition effect every 3.0 seconds (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setActivePhotoIdx((prev) => (prev + 1) % userPhotos.length);
        setIsBlinking(false);
      }, 180);
    }, 3000);

    return () => clearInterval(timer);
  }, [userPhotos.length]);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Background Cyber Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio, Blinking Photos & Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.15)] animate-float">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>● Currently learning & building</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">PSNACET '29</span>
            </div>

            {/* Main Name Heading with Blinking Cyber Photo Frame */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2">
              
              {/* Blinking Cyber Avatar Frame */}
              <div className="relative group flex-shrink-0">
                {/* Glowing Blinking Pulse Ring */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 blur-sm opacity-80 group-hover:opacity-100 transition duration-300 animate-cyber-pulse" />

                <div 
                  onClick={() => {
                    playClickSound();
                    setModalOpen(true);
                  }}
                  onMouseEnter={playHoverSound}
                  className="relative w-36 h-48 sm:w-40 sm:h-52 lg:w-44 lg:h-56 rounded-2xl overflow-hidden border-2 border-cyan-400/90 bg-slate-950 shadow-2xl cursor-pointer"
                >
                  <img
                    src={userPhotos[activePhotoIdx].src}
                    alt="Mohamed Hamdhan"
                    style={{ objectPosition: userPhotos[activePhotoIdx].position }}
                    className={`w-full h-full object-cover unblur-image transition-all duration-300 ${
                      isBlinking ? 'animate-fast-blink scale-110' : 'scale-100'
                    }`}
                  />


                  {/* Click to expand overlay on hover */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-cyan-300 gap-1">
                    <Maximize2 className="w-6 h-6 drop-shadow-md" />
                    <span className="text-[11px] font-mono font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded">View HD</span>
                  </div>

                  {/* Photo counter bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 backdrop-blur-sm py-1 text-center text-[10px] font-mono text-slate-300 border-t border-cyan-500/20">
                    Photo {activePhotoIdx + 1} of {userPhotos.length}
                  </div>
                </div>

                {/* 4 Interactive Blinking Photo Selector Dots */}
                <div className="flex items-center justify-center gap-1.5 mt-2.5">
                  {userPhotos.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playClickSound();
                        setActivePhotoIdx(idx);
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activePhotoIdx === idx
                          ? 'bg-cyan-400 w-6 shadow-[0_0_10px_#00f2fe] animate-pulse'
                          : 'bg-slate-700 w-2.5 hover:bg-cyan-500/60'
                      }`}
                      title={`View Photo ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Mohamed Hamdhan Name Heading */}
              <div className="space-y-1 text-center sm:text-left">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                  MOHAMED <br className="hidden sm:inline" />
                  <span className="text-gradient drop-shadow-[0_0_25px_rgba(0,242,254,0.4)]">
                    HAMDHAN
                  </span>
                </h1>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-sm sm:text-base md:text-lg font-mono text-slate-300">
                  <span className="text-cyan-400 font-semibold">AI & Data Science Student</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-purple-400 font-semibold">Developer</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-300 font-semibold">Tech Explorer</span>
                </div>
              </div>

            </div>

            {/* Pitch Text */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
              "I’m Mohamed Hamdhan, an Artificial Intelligence & Data Science student passionate about technology, programming, problem solving, and building meaningful digital experiences."
            </p>

            {/* Quick Micro Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs text-slate-400">
              <span className="px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-cyan-400" /> Java & Python
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" /> Data Structures
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> AI Fundamentals
              </span>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold text-sm shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.7)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-cyan-300 hover:border-cyan-500/50 font-medium text-sm transition-all hover:bg-slate-800/80"
              >
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Let's Connect</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D AI Neural Brain Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10">
              <NeuralBrain3D />
            </div>

            {/* Glowing Accent Orb behind canvas */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-purple-500/20 rounded-full blur-[90px] pointer-events-none" />
          </div>

        </div>
      </div>

      {/* High-Resolution Unblurred Photos Lightbox Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative max-w-2xl w-full bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,242,254,0.3)]">
            
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-cyan-500/20 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4">
              <h3 className="text-xl font-display font-bold text-white flex items-center justify-center gap-2">
                <span>Mohamed Hamdhan</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono">
                  {activePhotoIdx + 1} / {userPhotos.length}
                </span>
              </h3>

              {/* Main Modal Image Container */}
              <div className="relative h-[400px] sm:h-[520px] w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center p-2">
                <img
                  src={userPhotos[activePhotoIdx].src}
                  alt={userPhotos[activePhotoIdx].title}
                  style={{ objectPosition: userPhotos[activePhotoIdx].position }}
                  className="w-full h-full object-cover sm:object-contain rounded-lg unblur-image-modal transition-all duration-300"
                />

                {/* Prev / Next Arrows */}
                <button
                  onClick={() => {
                    playClickSound();
                    setActivePhotoIdx((prev) => (prev - 1 + userPhotos.length) % userPhotos.length);
                  }}
                  className="absolute left-4 p-2.5 rounded-full bg-slate-950/80 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    setActivePhotoIdx((prev) => (prev + 1) % userPhotos.length);
                  }}
                  className="absolute right-4 p-2.5 rounded-full bg-slate-950/80 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Thumbnails Strip */}
              <div className="flex items-center justify-center gap-3 pt-2">
                {userPhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playClickSound();
                      setActivePhotoIdx(idx);
                    }}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activePhotoIdx === idx
                        ? 'border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.7)] scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt=""
                      style={{ objectPosition: photo.position }}
                      className="w-full h-full object-cover unblur-image"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

