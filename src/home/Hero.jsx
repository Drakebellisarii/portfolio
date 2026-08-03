import React, { useEffect, useRef, useState } from 'react';

const HERO_STORY = "Scroll down to meet me.";
const CITIES = ['Columbus, OH', 'Hartford, CT', 'New York City, NY'];

export default function Hero({ onContact }) {
  // Typewriter story prompt — reveals one character at a time
  const [typed, setTyped] = useState('');
  const [doneTyping, setDoneTyping] = useState(false);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(HERO_STORY.slice(0, i));
      if (i >= HERO_STORY.length) {
        clearInterval(id);
        setDoneTyping(true);
      }
    }, 55);
    return () => clearInterval(id);
  }, []);

  // City typewriter — types each stop, deletes it, moves on, and stays on the last one
  const [city, setCity] = useState('');
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const TYPE_SPEED = 65;
    const DELETE_SPEED = 32;
    const HOLD_TIME = 1100;

    (async () => {
      for (let c = 0; c < CITIES.length; c++) {
        const place = CITIES[c];
        for (let i = 1; i <= place.length; i++) {
          if (cancelled) return;
          setCity(place.slice(0, i));
          await sleep(TYPE_SPEED);
        }
        if (c === CITIES.length - 1) return; // stay on the last stop
        await sleep(HOLD_TIME);
        for (let i = place.length; i >= 0; i--) {
          if (cancelled) return;
          setCity(place.slice(0, i));
          await sleep(DELETE_SPEED);
        }
        await sleep(250);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  // Hero scroll-driven animation refs
  const heroRef          = useRef(null);
  const heroNamesRef     = useRef(null);
  const heroBioRef       = useRef(null);
  const heroSocialsRef   = useRef(null);
  const heroVideoRef     = useRef(null);
  const heroPromptRef    = useRef(null);

  // Slow the hero video down slightly for a calmer feel
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    const setRate = () => { v.playbackRate = 0.7; };
    setRate();
    v.addEventListener('loadedmetadata', setRate);
    return () => v.removeEventListener('loadedmetadata', setRate);
  }, []);

  useEffect(() => {
    const norm = (p, a, b) => Math.max(0, Math.min(1, (p - a) / (b - a)));
    const lerp = (a, b, t) => a + (b - a) * t;

    const update = () => {
      const section = heroRef.current;
      if (!section) return;
      const totalScroll = section.offsetHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0;

      // Story prompt: fade out quickly the moment scrolling begins
      if (heroPromptRef.current) {
        const fade = Math.max(0, 1 - progress / 0.03);
        heroPromptRef.current.style.opacity = fade;
        heroPromptRef.current.style.transform = `translateY(${-12 * (1 - fade)}px)`;
        heroPromptRef.current.style.pointerEvents = fade === 0 ? 'none' : 'auto';
      }

      // Letters — toggle .hero-lv per-letter threshold so CSS transition bounces in/out.
      // Wide per-letter spacing reveals the name slowly, one letter at a time.
      if (heroNamesRef.current) {
        heroNamesRef.current.querySelectorAll('.hero-letter-a').forEach((s, i) => {
          const show = progress >= 0.03 + i * 0.045;
          s.classList.toggle('hero-lv', show);
        });
        heroNamesRef.current.querySelectorAll('.hero-letter-b').forEach((s, i) => {
          const show = progress >= 0.25 + i * 0.04;
          s.classList.toggle('hero-lv', show);
        });
      }

      // Bio: 0.52–0.67
      const bioP = norm(progress, 0.52, 0.67);
      if (heroBioRef.current) {
        heroBioRef.current.style.opacity   = bioP;
        heroBioRef.current.style.transform = `translateY(${lerp(20, 0, bioP)}px)`;
      }

      // Status + socials: 0.70–0.88
      const socP = norm(progress, 0.70, 0.88);
      if (heroSocialsRef.current) {
        heroSocialsRef.current.style.opacity   = socP;
        heroSocialsRef.current.style.transform = `translateY(${lerp(16, 0, socP)}px)`;
      }

    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // set initial state
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section ref={heroRef} id="about" className="relative w-full" style={{ height: '220vh' }}>

      {/* Sticky 100vh viewport */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh' }}>

        {/* Video background */}
        <div className="absolute inset-0">
          <video ref={heroVideoRef} autoPlay muted loop playsInline className="hero-kenburns w-full h-full object-cover"
            style={{ position: 'absolute', inset: 0, minWidth: '100%', minHeight: '100%' }}>
            <source src="/About-vid.mp4" type="video/mp4" />
          </video>
          {/* Uniform dark tint for legibility — even on all sides, plus a gentle bottom fade */}
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,.64)' }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(0,0,0,.45) 0%, transparent 50%)'
          }} />
        </div>

        {/* Decorative watermark */}
        <div className="hero-watermark">DEVELOPER</div>

        {/* Typewriter story prompt — top left */}
        <div ref={heroPromptRef} className="absolute z-20"
          style={{ top: 'clamp(20px, 3vw, 36px)', left: 'clamp(24px, 5vw, 64px)', maxWidth: 'min(78vw, 440px)', transition: 'opacity .15s linear, transform .15s linear', willChange: 'opacity, transform' }}>
          <p style={{
            fontFamily: "'DM Serif Text', 'Gloock', Georgia, serif",
            fontStyle: 'italic',
            color: 'rgba(255,255,255,.62)',
            fontSize: 'clamp(16px, 1.7vw, 22px)',
            lineHeight: 1.6,
            letterSpacing: '.01em',
            whiteSpace: 'pre-wrap',
            textShadow: '0 1px 12px rgba(0,0,0,.45)',
            margin: 0,
          }}>
            {typed}
            <span className="hero-caret" style={{ height: '1em', opacity: doneTyping ? undefined : 1 }} />
          </p>
        </div>

        {/* Scroll-driven content */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16"
          style={{ height: '100%', paddingTop: '72px', paddingBottom: '72px' }}>

          {/* Giant name — letters bounce in on scroll */}
          <div ref={heroNamesRef} className="mb-1">
            <div style={{ lineHeight: .92, paddingBottom: 4 }}>
              <div style={{ fontSize: 'clamp(52px,10.5vw,138px)', fontWeight: 900, color: 'white', letterSpacing: '-.03em', display: 'flex' }}>
                {'DRAKE'.split('').map((l, i) => (
                  <span key={i} className="hero-letter-a">{l}</span>
                ))}
              </div>
            </div>
            <div style={{ lineHeight: .92, paddingBottom: 4 }}>
              <div className="hero-outline"
                style={{ fontSize: 'clamp(52px,10.5vw,138px)', fontWeight: 900, letterSpacing: '-.03em', display: 'flex' }}>
                {'BELLISARI'.split('').map((l, i) => (
                  <span key={i} className="hero-letter-b">{l}</span>
                ))}
              </div>
            </div>
          </div>


          {/* Bio */}
          <p ref={heroBioRef}
            style={{ color: 'rgba(255,255,255,.58)', fontSize: 'clamp(13px,1.1vw,15px)',
              lineHeight: 1.75, maxWidth: 480, marginTop: 40, marginBottom: 18,
              opacity: 0, transform: 'translateY(20px)', willChange: 'opacity, transform' }}>
            Recent graduate of Trinity College with a B.S. in Computer
            Science and an experiential certificate in cybersecurity. I love
            living in that seam between creativity and code. But I'll be honest:
            the part of me that loves to make things is also scared of a world
            where machines do all the imagining for us. So I build software for
            people, the kind that actually helps people, and I try to keep human
            fingerprints on everything I make. Drop a message I would love to chat with whoever.
          </p>

          {/* Status + socials */}
          <div ref={heroSocialsRef} className="flex flex-col gap-4"
            style={{ opacity: 0, transform: 'translateY(16px)', willChange: 'opacity, transform' }}>
            {/* Location */}
            <div className="flex items-center gap-2">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0a66c2', flexShrink: 0 }} />
              <span style={{ color: '#0a66c2', fontSize: 11.5, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' }}>
                {city}
                <span className="hero-caret" style={{ height: '1em' }} />
              </span>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap gap-2.5">
              <a href="https://www.linkedin.com/in/drake-bellisari/" target="_blank" rel="noopener noreferrer"
                className="hero-social" style={{ background: '#0a66c2', borderColor: 'transparent', color: 'white' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
                <span className="hero-social-label">LinkedIn</span>
              </a>
              <a href="https://github.com/DrakeBellisarii" target="_blank" rel="noopener noreferrer" className="hero-social">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                <span className="hero-social-label">GitHub</span>
              </a>
              <button onClick={onContact} className="hero-social">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="hero-social-label">Contact</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
