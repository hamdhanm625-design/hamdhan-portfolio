import React from 'react';
import { Trophy, BookOpen, Users, Calendar, Award, CheckCircle } from 'lucide-react';
import { playHoverSound } from './SoundEngine';

export default function Achievements() {
  const items = [
    {
      title: 'Technical Learning & Fundamentals',
      category: 'Academic Core',
      desc: 'Solid mastery of programming principles in Java, Python, C, data structures, and procedural & OOP architectures.',
      icon: BookOpen,
      date: '2025–Present',
    },
    {
      title: 'College Activities & Tech Sessions',
      category: 'Campus Engagement',
      desc: 'Active participation in department sessions, peer learning groups, and technology workshops at PSNA CET.',
      icon: Users,
      date: 'PSNA CET 2025',
    },
    {
      title: 'Practical Project Building',
      category: 'Hands-on Engineering',
      desc: 'Developed functional projects including Smart Irrigation concepts, Travel website UI, and Java algorithmic suites.',
      icon: Trophy,
      date: 'Ongoing 2025–2026',
    },
    {
      title: 'Certifications & Workshops',
      category: 'Skill Enhancement',
      desc: 'Participating in upcoming technical workshops, coding challenges, and professional certification tracks.',
      icon: Award,
      date: 'In Progress',
    },
  ];

  return (
    <section id="achievements" className="py-24 relative bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>MILESTONES & ACTIVITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Achievements & <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-400 text-base">
            Verified academic milestones, college engagement, tech sessions, and ongoing engineering progress.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="group glass-card glass-card-hover p-7 rounded-2xl relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                      {item.category}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-400/50 transition-all">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <CheckCircle className="w-3.5 h-3.5" /> Verified Profile Detail
                  </span>
                  <span>{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
