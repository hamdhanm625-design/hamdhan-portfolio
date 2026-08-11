import React from 'react';
import { ArrowRight, Code, Terminal, Sparkles, Send, Download } from 'lucide-react';
import NeuralBrain3D from '../canvases/NeuralBrain3D';
import { playClickSound, playHoverSound } from './SoundEngine';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Background Cyber Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.15)] animate-float">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>● Currently learning & building</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">PSNA CET '25</span>
            </div>

            {/* Main Name Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                MOHAMED <br className="hidden sm:inline" />
                <span className="text-gradient drop-shadow-[0_0_25px_rgba(0,242,254,0.4)]">
                  HAMDHAN
                </span>
              </h1>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-sm sm:text-base md:text-lg font-mono text-slate-300">
                <span className="text-cyan-400 font-semibold">AI & Data Science Student</span>
                <span className="text-slate-600">•</span>
                <span className="text-purple-400 font-semibold">Developer</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-semibold">Tech Explorer</span>
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
    </section>
  );
}
