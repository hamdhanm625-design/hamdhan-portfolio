import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { playClickSound, playHoverSound } from './SoundEngine';

export default function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs font-mono relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo & Details */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center font-display font-bold text-sm text-cyan-400">
            MH
          </div>
          <div>
            <div className="text-slate-200 font-display font-bold text-sm">
              Mohamed Hamdhan
            </div>
            <div className="text-[11px] text-slate-300">
              B.Tech AI & DS • PSNA College of Engineering & Technology
            </div>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="text-center text-slate-300 flex items-center gap-1.5">
          <span>© 2025–2026 Mohamed Hamdhan. All rights reserved.</span>
        </div>

        {/* Right: Scroll to Top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={playHoverSound}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
