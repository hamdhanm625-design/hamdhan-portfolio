import React from 'react';
import { Globe, Sparkles, Move3d } from 'lucide-react';
import DigitalWorld3D from '../canvases/DigitalWorld3D';

export default function DigitalWorld() {
  return (
    <section id="digital-world" className="py-24 relative bg-[#030712]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Globe className="w-3.5 h-3.5" />
            <span>INTERACTIVE 3D ENVIRONMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Explore My <span className="text-gradient">Digital World</span>
          </h2>
          <p className="text-slate-400 text-base">
            Immerse yourself in a 3D futuristic space showcasing interactive code nodes, AI neural connections, programming languages, and digital data flows.
          </p>
        </div>

        {/* 3D Canvas Workspace Container */}
        <DigitalWorld3D />

        {/* Informational Cards Below 3D Canvas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="glass-card p-5 rounded-xl text-center space-y-2">
            <div className="text-cyan-400 font-display font-bold text-lg">Floating Tech Nodes</div>
            <p className="text-slate-300 text-xs">
              Java, Python, C, Data Structures & Algorithms floating in real-time 3D space.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl text-center space-y-2">
            <div className="text-purple-400 font-display font-bold text-lg">Parallax Physics</div>
            <p className="text-slate-300 text-xs">
              Camera angles and light reflections adjust dynamically based on cursor movement.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl text-center space-y-2">
            <div className="text-emerald-400 font-display font-bold text-lg">Neural Grid</div>
            <p className="text-slate-300 text-xs">
              Simulating real-time data flow between AI algorithms and software modules.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
