import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, Sparkles } from 'lucide-react';
import { setMutedState, playHoverSound, playClickSound } from './SoundEngine';

export default function Navbar({ activeSection, soundOn, setSoundOn }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setMutedState(!nextState);
    if (nextState) {
      playClickSound();
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'World', href: '#digital-world' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-xl shadow-cyan-950/20' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Futuristic MH Logo Monogram */}
        <a
          href="#hero"
          onClick={playClickSound}
          onMouseEnter={playHoverSound}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center font-display font-bold text-lg text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.5)] transition-all">
            <span>MH</span>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur transition" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-display font-bold text-slate-100 tracking-wider text-sm group-hover:text-cyan-300 transition">
              MOHAMED HAMDHAN
            </span>
            <span className="text-[10px] text-cyan-400/80 font-mono tracking-widest uppercase">
              AI & DS Student
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all relative ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,242,254,0.2)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-mono">Learning & Building</span>
          </div>

          {/* Sound & Music Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={playHoverSound}
            title={soundOn ? 'Music & Sound: ON (Justin Bieber - Flatline) • Click to Stop' : 'Music & Sound: OFF • Click to Play'}
            className={`p-2 rounded-xl transition-all flex items-center gap-1.5 ${
              soundOn
                ? 'bg-cyan-500/15 border border-cyan-400/80 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.35)]'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40'
            }`}
            aria-label={soundOn ? 'Mute Music and Sound' : 'Play Music and Sound'}
          >
            {soundOn ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 rounded-full bg-cyan-400 animate-bar-1" />
                  <span className="w-0.5 h-3 rounded-full bg-cyan-300 animate-bar-2" />
                  <span className="w-0.5 h-1.5 rounded-full bg-cyan-400 animate-bar-3" />
                </div>
              </>
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-slate-950/95 border-b border-cyan-500/20 backdrop-blur-2xl px-6 py-6 space-y-3 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              PSNA CET • AI & DS
            </span>
            <span className="text-cyan-400 font-mono">2025</span>
          </div>
        </div>
      )}
    </header>
  );
}
