import React, { useState } from 'react';
import { Code2, Cpu, Brain, CheckCircle, Sparkles } from 'lucide-react';
import { playHoverSound, playClickSound } from './SoundEngine';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Stack', icon: Sparkles },
    { id: 'programming', label: 'Programming', icon: Code2 },
    { id: 'cs', label: 'Computer Science', icon: Cpu },
    { id: 'aids', label: 'AI & Data Science', icon: Brain },
  ];

  const skillData = [
    // Programming
    {
      name: 'Java',
      category: 'programming',
      tag: 'Core Language',
      desc: 'Object-Oriented Programming, Classes, Inheritance, Collections, and Exception Handling.',
      icon: '☕',
      badge: 'Advanced Learning',
    },
    {
      name: 'Python',
      category: 'programming',
      tag: 'Core Language',
      desc: 'Scripting, Data Manipulation, File Handling, and Algorithmic Logic.',
      icon: '🐍',
      badge: 'Data Science Core',
    },

    // Computer Science
    {
      name: 'Data Structures',
      category: 'cs',
      tag: 'CS Fundamentals',
      desc: 'Arrays, Linked Lists, Stacks, Queues, Trees, Hash Tables, and Memory Layouts.',
      icon: '🌳',
      badge: 'Algorithmic Basis',
    },
    {
      name: 'Object-Oriented Programming (OOP)',
      category: 'cs',
      tag: 'CS Fundamentals',
      desc: 'Encapsulation, Polymorphism, Abstraction, and Modular Software Architecture.',
      icon: '📦',
      badge: 'Software Design',
    },
    {
      name: 'Exception Handling',
      category: 'cs',
      tag: 'CS Fundamentals',
      desc: 'Try-catch blocks, custom exceptions, robust error recovery, and clean execution flow.',
      icon: '🛡️',
      badge: 'Code Reliability',
    },
    {
      name: 'File Handling',
      category: 'cs',
      tag: 'CS Fundamentals',
      desc: 'Reading & writing data files, input/output streams, and data persistence logic.',
      icon: '📁',
      badge: 'Data Streams',
    },

    // AI & Data Science
    {
      name: 'Data Analysis',
      category: 'aids',
      tag: 'Data Stack',
      desc: 'Data cleaning, feature exploration, quantitative analysis, and statistical summary.',
      icon: '📊',
      badge: 'Insights & Trends',
    },
    {
      name: 'Artificial Intelligence Fundamentals',
      category: 'aids',
      tag: 'AI Focus',
      desc: 'Knowledge representation, search algorithms, intelligent agents, and neural network basics.',
      icon: '🧠',
      badge: 'Core Specialization',
    },
    {
      name: 'Machine Learning Fundamentals',
      category: 'aids',
      tag: 'AI Focus',
      desc: 'Supervised vs unsupervised learning concepts, model training flow, and data preprocessing.',
      icon: '🤖',
      badge: 'Core Specialization',
    },
  ];

  const filteredSkills =
    activeCategory === 'all'
      ? skillData
      : skillData.filter((item) => item.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative bg-[#030712]">
      {/* Background glowing sphere */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-purple-500/30 text-xs font-mono text-purple-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE TECH MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Skills & <span className="text-gradient-purple">Expertise</span>
          </h2>
          <p className="text-slate-400 text-base">
            Curated list of technical competencies, programming languages, core computer science concepts, and AI/Data Science fundamentals.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium font-mono transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.4)] scale-105'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              onMouseEnter={playHoverSound}
              className="group glass-card glass-card-hover p-6 rounded-2xl relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-cyan-400/50 transition-all shadow-inner">
                    {skill.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
                    {skill.badge}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-1">
                  {skill.name}
                </h3>

                <span className="text-xs font-mono text-slate-400 block mb-3">
                  // {skill.tag}
                </span>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-400">
                  <CheckCircle className="w-3 h-3 text-cyan-400" /> Active Competency
                </span>
                <span className="font-mono text-cyan-400/80">Mohamed Hamdhan</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
