import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Achievements from './components/Achievements';
import DigitalWorld from './components/DigitalWorld';
import CurrentFocus from './components/CurrentFocus';
import PersonalSide from './components/PersonalSide';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'journey', 'digital-world', 'achievements', 'focus', 'beyond-code', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i]);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="custom-cursor-active min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Desktop Futuristic Custom Cursor */}
      <CustomCursor />

      {/* Glassmorphic Navbar */}
      <Navbar activeSection={activeSection} soundOn={soundOn} setSoundOn={setSoundOn} />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <DigitalWorld />
        <Achievements />
        <CurrentFocus />
        <PersonalSide />
        <Contact />
      </main>

      {/* Background Music Engine (Invisible - controlled via Navbar sound button) */}
      <MusicPlayer soundOn={soundOn} setSoundOn={setSoundOn} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
