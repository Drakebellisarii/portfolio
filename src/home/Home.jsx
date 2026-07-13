import React, { useState, useEffect } from 'react';
import { homeStyles } from './styles';
import { projects } from './data';
import Nav from './Nav';
import Hero from './Hero';
import Experience from './Experience';
import Education from './Education';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import TrinNavModal from './TrinNavModal';

export default function Home() {
  const [showWebsite, setShowWebsite] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [showTrinNav, setShowTrinNav] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWebsite(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Active section tracking — uses document-absolute positions so the 220vh hero transitions cleanly
  useEffect(() => {
    const ids = ['about', 'experience', 'education', 'projects', 'contact'];
    const getActive = () => {
      // scrollMid = scroll position of the 40% viewport mark in document coords
      const scrollMid = window.scrollY + window.innerHeight * 0.4;
      let active = 'about';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const elTop = el.getBoundingClientRect().top + window.scrollY;
        if (elTop <= scrollMid) active = id;
      }
      return active;
    };
    const onScroll = () => setActiveSection(getActive());
    window.addEventListener('scroll', onScroll, { passive: true });
    // RAF ensures sections are in the DOM before the initial read
    const raf = requestAnimationFrame(() => setActiveSection(getActive()));
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [showWebsite]);

  const handleEmailClick = () => {
    scrollToSection('contact');
  };

  const handleContactSubmit = async (data) => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', data.name);
    formDataToSend.append('contactMethod', data.contactMethod);
    formDataToSend.append('message', data.message);

    const response = await fetch('https://formspree.io/f/mzzvglrd', {
      method: 'POST',
      body: formDataToSend,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }
  };

  const handleProjectClick = (project) => {
    if (project.modal) {
      setShowTrinNav(true);
    } else {
      window.open(project.link, '_blank');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!showWebsite) return null;

  return (
    <div className="text-gray-900 min-h-screen">
      <style>{homeStyles}</style>

      {activeSection === 'about' && (
        <Nav activeSection={activeSection} scrollToSection={scrollToSection} onContact={handleEmailClick} />
      )}

      <Hero onContact={handleEmailClick} />

      <Experience />

      <Education />

      <Projects projects={projects} onProjectClick={handleProjectClick} />

      <Contact onSubmit={handleContactSubmit} />

      <Footer onContact={handleEmailClick} />

      {showTrinNav && <TrinNavModal onClose={() => setShowTrinNav(false)} />}
    </div>
  );
}
