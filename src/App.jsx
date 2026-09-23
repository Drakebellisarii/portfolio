import React, { Suspense, lazy } from 'react';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { scrollToSection } from './lib/scroll';
import { usePath } from './lib/router';

// Case studies are their own chunk: the home page never pays for them.
const CaseStudies = lazy(() => import(/* webpackChunkName: "case-studies" */ './case-studies/CaseStudiesRoute'));

const goToContact = () => scrollToSection('contact');

function Home() {
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

// Deliberately stateless: nothing here re-renders on scroll, so each section
// owns its own interactivity and the page never re-paints as a whole.
export default function App() {
  const path = usePath();
  if (path.startsWith('/work')) {
    return (
      <Suspense fallback={<div className="cs-loading" aria-busy="true" />}>
        <CaseStudies path={path} />
      </Suspense>
    );
  }
  return <Home />;
}
