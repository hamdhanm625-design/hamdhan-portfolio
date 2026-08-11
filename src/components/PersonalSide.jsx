import React from 'react';
import { Activity, Flame, ShieldCheck, Heart } from 'lucide-react';
import Basketball3D from '../canvases/Basketball3D';

export default function PersonalSide() {
  return (
    <section id="beyond-code" className="py-24 relative bg-[#030712]">
      {/* Background glow accent */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-orange-500/20 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-orange-500/30 text-xs font-mono text-orange-400">
                <Activity className="w-3.5 h-3.5" />
                <span>PERSONAL SIDE & HOBBY</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
                Beyond <span className="text-gradient-purple">Technology</span>
              </h2>

              <blockquote className="border-l-2 border-orange-500/80 pl-4 py-1 text-slate-200 text-lg sm:text-xl font-display italic leading-relaxed">
                "When I’m away from the screen, I enjoy playing basketball. It keeps me active, focused, and competitive."
              </blockquote>

              <p className="text-slate-300 text-sm leading-relaxed">
                Basketball provides a physical counterweight to analytical coding. It reinforces quick decision-making under pressure, spatial awareness, stamina, and team communication — values that directly translate to engineering projects.
              </p>

              {/* 3 Core Values Cards */}
              <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                  <div className="text-xs font-mono text-slate-200 font-bold">Stamina</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <div className="text-xs font-mono text-slate-200 font-bold">Focus</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <Heart className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <div className="text-xs font-mono text-slate-200 font-bold">Teamwork</div>
                </div>
              </div>
            </div>

            {/* Right Column: Subtle Kinetic 3D Basketball Canvas */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <Basketball3D />
              
              <div className="absolute bottom-2 px-3 py-1 rounded-full bg-slate-900/90 border border-orange-500/30 text-[11px] font-mono text-orange-300 backdrop-blur-md">
                Interactive Kinetic Sphere • Move Cursor
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
