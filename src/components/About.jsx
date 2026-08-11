import React from 'react';
import { GraduationCap, Building2, Lightbulb, Activity, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { playHoverSound } from './SoundEngine';

export default function About() {
  const infoCards = [
    {
      icon: GraduationCap,
      color: 'from-cyan-500 to-blue-500',
      title: '🎓 Education',
      subtitle: 'B.Tech – Artificial Intelligence & Data Science',
      desc: 'Focusing on AI algorithms, data analytics, programming fundamentals, and software development.',
    },
    {
      icon: Building2,
      color: 'from-purple-500 to-indigo-500',
      title: '🏫 Institution',
      subtitle: 'PSNA College of Engineering and Technology',
      desc: 'Joined in 2025. Engaging actively in technology sessions, department activities, and peer learning.',
    },
    {
      icon: Lightbulb,
      color: 'from-amber-500 to-orange-500',
      title: '💡 Passion',
      subtitle: 'Exploring Technology & Innovation',
      desc: 'Driven by curiosity to solve complex problems, build useful applications, and master modern technology stacks.',
    },
    {
      icon: Activity,
      color: 'from-emerald-500 to-teal-500',
      title: '🏀 Beyond Code',
      subtitle: 'Basketball & Discipline',
      desc: 'Playing basketball sharpens tactical thinking, teamwork, physical resilience, and staying focused under pressure.',
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-[#030712]">
      {/* Glow background accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Award className="w-3.5 h-3.5" />
            <span>BACKGROUND & IDENTITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            "I’m Mohamed Hamdhan, a first-year B.Tech Artificial Intelligence & Data Science student at PSNA College of Engineering and Technology. I enjoy exploring technology, learning programming concepts, experimenting with projects, and continuously improving my technical skills."
          </p>
        </div>

        {/* 4 Animated Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {infoCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="group glass-card glass-card-hover p-7 rounded-2xl relative overflow-hidden flex flex-col justify-between"
              >
                {/* Top Glowing bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} opacity-70 group-hover:opacity-100 transition-opacity`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-display font-semibold text-white tracking-wide">
                      {card.title}
                    </span>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/50 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-cyan-300 mb-2 font-display">
                    {card.subtitle}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400/90">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Core Profile Detail
                  </span>
                  <span className="font-mono text-slate-400">2025</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Highlight Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/20 flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl font-display font-bold text-cyan-400">1st Year</div>
            <div className="text-xs text-slate-400 font-mono">Current Academic Level</div>
          </div>
          <div className="w-px h-8 bg-slate-800 hidden sm:block" />
          <div>
            <div className="text-2xl font-display font-bold text-purple-400">PSNA CET</div>
            <div className="text-xs text-slate-400 font-mono">College Campus</div>
          </div>
          <div className="w-px h-8 bg-slate-800 hidden sm:block" />
          <div>
            <div className="text-2xl font-display font-bold text-emerald-400">AI & DS</div>
            <div className="text-xs text-slate-400 font-mono">B.Tech Engineering Branch</div>
          </div>
          <div className="w-px h-8 bg-slate-800 hidden sm:block" />
          <div>
            <div className="text-2xl font-display font-bold text-blue-400">2025</div>
            <div className="text-xs text-slate-400 font-mono">Admitted Year</div>
          </div>
        </div>

      </div>
    </section>
  );
}
