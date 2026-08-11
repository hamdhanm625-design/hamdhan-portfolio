import React from 'react';
import { Brain, Code, Terminal, BarChart3, Globe, Cpu, Sparkles } from 'lucide-react';
import { playHoverSound } from './SoundEngine';

export default function CurrentFocus() {
  const cards = [
    {
      title: 'Artificial Intelligence',
      category: 'Specialization',
      icon: Brain,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400',
      desc: 'Exploring search strategies, intelligent agents, and foundational neural models.',
    },
    {
      title: 'Java Development',
      category: 'Programming',
      icon: Code,
      color: 'from-orange-500 to-amber-600',
      textColor: 'text-orange-400',
      desc: 'Building object-oriented applications, exception handling frameworks, and file I/O tools.',
    },
    {
      title: 'Python & Analytics',
      category: 'Data Science',
      icon: Terminal,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-400',
      desc: 'Manipulating array datasets using NumPy and performing exploratory data analysis.',
    },
    {
      title: 'Data Science',
      category: 'Analytics',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-400',
      desc: 'Understanding data pipelines, quantitative metrics, visualization concepts, and statistical foundations.',
    },
    {
      title: 'Web Development',
      category: 'Frontend & UI',
      icon: Globe,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      desc: 'Crafting responsive user interfaces, glassmorphic themes, interactive components, and modern layouts.',
    },
    {
      title: 'Data Structures & Algorithms',
      category: 'CS Logic',
      icon: Cpu,
      color: 'from-indigo-500 to-purple-600',
      textColor: 'text-indigo-400',
      desc: 'Analyzing time & space complexity, recursion, array logic, searching algorithms, and problem solving.',
    },
  ];

  return (
    <section id="focus" className="py-24 relative bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACTIVE LEARNING RADAR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Currently <span className="text-gradient">Exploring</span>
          </h2>
          <p className="text-slate-400 text-base">
            Dashboard view of key domains, active coursework, and ongoing technical explorations.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="group glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between"
              >
                {/* Accent top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} opacity-80 group-hover:opacity-100 transition-opacity`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-400">
                      // {card.category}
                    </span>
                    <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 ${card.textColor} group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {card.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Active Focus
                  </span>
                  <span>Mohamed Hamdhan</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
