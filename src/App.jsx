import React from 'react';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { scrollToSection } from './lib/scroll';

const goToContact = () => scrollToSection('contact');

// Deliberately stateless: nothing here re-renders on scroll, so each section
// owns its own interactivity and the page never re-paints as a whole.
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero onContact={goToContact} />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
