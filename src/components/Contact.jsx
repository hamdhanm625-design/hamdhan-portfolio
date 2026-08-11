import React, { useState } from 'react';
import { Mail, Send, Copy, Check, Sparkles, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { playClickSound, playSuccessSound, playHoverSound } from './SoundEngine';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = 'hamdhan.dev@example.com';

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playSuccessSound();
    
    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#4facfe', '#a855f7'],
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#030712]">
      {/* Background glow radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Let's Build <span className="text-gradient">Something Together</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            "Have an idea, project, opportunity, or simply want to connect? Feel free to reach out."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Copy Email Card */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Primary Contact Email</div>
                  <div className="text-sm font-bold text-slate-200 font-mono">{emailAddress}</div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={playHoverSound}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 flex items-center justify-center gap-2 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Email Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Connect Profiles */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider">
                Connect on Platforms
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-xs font-medium text-slate-300 hover:text-cyan-300 transition"
                >
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 text-xs font-medium text-slate-300 hover:text-purple-300 transition"
                >
                  <GithubIcon className="w-4 h-4 text-purple-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/40 text-xs font-medium text-slate-300 hover:text-pink-300 transition"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  <span>Instagram</span>
                </a>

                <a
                  href={`mailto:${emailAddress}`}
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 text-xs font-medium text-slate-300 hover:text-emerald-300 transition"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Send Direct Email</span>
                </a>
              </div>
            </div>

            {/* Quick Profile Summary */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Open for Opportunities</span>
              </div>
              <p className="leading-relaxed">
                Available for internships, technical discussions, collaborative projects, AI experiments, and networking.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl"
            >
              {submitted && (
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Message Transmitted Successfully!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md">
                    Thank you for reaching out to Mohamed Hamdhan. I will review your message and reply promptly.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-slate-300">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 text-sm transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-slate-300">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 text-sm transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Internship Inquiry / Project Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 text-sm transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your idea, opportunity, or message..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 text-sm transition resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={playHoverSound}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.7)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
