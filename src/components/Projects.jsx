import React, { useState } from 'react';
import { FolderGit2, ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import ProjectModal from './ProjectModal';
import { playHoverSound, playClickSound } from './SoundEngine';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: '01',
      name: 'Commercial Travel Agency Website',
      subtitle: 'Travellers Inn Tours',
      tagline: 'Modern Commercial Web Platform & Live Vercel Deployment',
      desc: 'A modern commercial website developed for a travel agency allowing customers to explore destinations, discover travel services, and connect with the business.',
      longDesc: 'Built for a real-world commercial travel agency requirement. The website features an interactive destination discovery engine, Google Maps integration, customer enquiry/contact flows, performance-focused development, and a live production deployment on Vercel.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      tech: ['React / Web Dev', 'UI/UX Design', 'Google Maps API', 'Responsive UI', 'Vercel Deployment'],
      features: [
        'Modern & responsive commercial UI/UX design',
        'Interactive Google Maps integration',
        'Customer enquiry & direct contact features',
        'Performance-focused architecture & smooth animations',
        'Live production deployment on Vercel',
      ],
      github: 'https://github.com/hamdhanm625-design',
      demo: 'https://travellersinntours.vercel.app/',
    },
  ];

  // 3D Card Tilt mouse move handler
  const handleMouseMoveCard = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleMouseLeaveCard = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="projects" className="py-24 relative bg-[#030712]">
      {/* Glow background accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>COMMERCIAL PROJECT SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Featured <span className="text-gradient">Project</span>
          </h2>
          <p className="text-slate-400 text-base">
            Real-world commercial website developed for a travel agency, built with focus on UI/UX, Google Maps integration, performance, and live Vercel deployment.
          </p>
        </div>

        {/* 3D Tilt Project Card Centered */}
        <div className="max-w-xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              onMouseMove={handleMouseMoveCard}
              onMouseLeave={handleMouseLeaveCard}
              onMouseEnter={playHoverSound}
              className="group glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Project Card Image & Header */}
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  
                  {/* Project Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300 backdrop-blur-md">
                      FEATURED PROJECT
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-300 backdrop-blur-md flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE DEPLOYED
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                      🌍 {project.subtitle}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-xs font-mono">
                    {project.tagline}
                  </p>

                  <p className="text-slate-300 text-xs leading-relaxed">
                    {project.desc}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-7 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedProject(project);
                  }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group/btn font-bold"
                >
                  <span>View Case Study & Details</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition"
                    title="GitHub Code"
                  >
                    <GithubIcon className="w-4.5 h-4.5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition flex items-center gap-1 font-bold text-xs"
                    title="Live Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">Live Site</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Expanded Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
