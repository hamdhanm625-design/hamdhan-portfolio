import React from 'react';
import { Compass, Milestone, Rocket, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { playHoverSound } from './SoundEngine';

export default function Journey() {
  const steps = [
    {
      year: '2025',
      title: 'College Admission',
      desc: 'Enrolled in B.Tech Artificial Intelligence & Data Science at PSNA College of Engineering and Technology.',
      badge: 'Completed',
      status: 'past',
    },
    {
      year: '2025–2026',
      title: 'Programming Core',
      desc: 'Mastering foundational syntax, procedural logic, and problem solving in C, Java, and Python.',
      badge: 'Active Stage',
      status: 'current',
    },
    {
      year: '2026',
      title: 'DSA & Data Science',
      desc: 'Exploring Data Structures, Algorithms, OOP concepts, NumPy, and Data Analysis.',
      badge: 'Active Stage',
      status: 'current',
    },
    {
      year: 'Next Step',
      title: 'AI / ML & Web Dev',
      desc: 'Deep diving into Machine Learning algorithms, Neural Networks, and Full-Stack web apps.',
      badge: 'Upcoming Focus',
      status: 'future',
    },
    {
      year: 'Future Vision',
      title: 'AI Engineer & Tech Leader',
      desc: 'Becoming a highly skilled technology professional building impactful AI software systems.',
      badge: 'Career Target',
      status: 'future',
    },
  ];

  return (
    <section id="journey" className="py-24 relative bg-[#030712]">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-purple-500/30 text-xs font-mono text-purple-400">
            <Compass className="w-3.5 h-3.5" />
            <span>ROADMAP & MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Learning <span className="text-gradient-purple">Journey</span>
          </h2>
          <p className="text-slate-400 text-base">
            Chronological progression from foundational engineering studies to future technology leadership in AI & Software Development.
          </p>
        </div>

        {/* Timeline Desktop & Mobile Responsive Layout */}
        <div className="relative">
          
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 -translate-y-1/2 z-0 rounded-full opacity-60" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const isCurrent = step.status === 'current';
              const isPast = step.status === 'past';

              return (
                <div
                  key={idx}
                  onMouseEnter={playHoverSound}
                  className="group glass-card glass-card-hover p-6 rounded-2xl relative flex flex-col justify-between"
                >
                  {/* Step Node Dot */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300">
                      {step.year}
                    </span>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isPast
                          ? 'bg-cyan-400 shadow-[0_0_10px_#00f2fe]'
                          : isCurrent
                          ? 'bg-purple-400 animate-ping shadow-[0_0_10px_#a855f7]'
                          : 'bg-slate-700'
                      }`}
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Footer status */}
                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Stage {idx + 1} of 5</span>
                    <span className="text-cyan-400/90">{step.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
