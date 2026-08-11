import React from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { playClickSound } from './SoundEngine';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl glass-card rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-300">
            {project.id}
          </span>
          <span className="text-xs font-mono text-slate-400">
            Feature Showcase
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
          {project.name}
        </h3>

        {/* Image / Graphic Preview Banner */}
        <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden border border-slate-800 group">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-cyan-300">
            <span>● Status: Production Concept</span>
            <span>Created by Mohamed Hamdhan</span>
          </div>
        </div>

        {/* Full Description */}
        <div className="space-y-3">
          <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">
            Project Overview & Objectives
          </h4>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.longDesc}
          </p>
        </div>

        {/* Key Features Bullet Points */}
        <div className="space-y-3">
          <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">
            Key Engineering Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="space-y-2">
          <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={playClickSound}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 transition"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            onClick={playClickSound}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-slate-950 hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Interactive Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
}
