// Global styles for the home page. Rendered once via <style>{homeStyles}</style>
// in Home.jsx — these class names are global and shared across all home sections.

export const homeStyles = `
        /* ── Local display fonts (public/DM_Serif_Text,Gloock) ── */
        @font-face {
          font-family: 'DM Serif Text';
          src: url('/DM_Serif_Text,Gloock/DM_Serif_Text/DMSerifText-Regular.ttf') format('truetype');
          font-weight: 400; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'DM Serif Text';
          src: url('/DM_Serif_Text,Gloock/DM_Serif_Text/DMSerifText-Italic.ttf') format('truetype');
          font-weight: 400; font-style: italic; font-display: swap;
        }
        @font-face {
          font-family: 'Gloock';
          src: url('/DM_Serif_Text,Gloock/Gloock/Gloock-Regular.ttf') format('truetype');
          font-weight: 400; font-style: normal; font-display: swap;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-gpu {
          transform-style: preserve-3d;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        /* ── Hero redesign ──────────────────────────────── */
        @keyframes heroSlideUp {
          from { transform: translateY(110%); }
          to   { transform: translateY(0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes heroPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(96,165,250,.5); }
          60%     { box-shadow: 0 0 0 7px rgba(96,165,250,0); }
        }
        @keyframes heroSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes heroKenBurns {
          from { transform: scale(1.07) translate(-1%,0); }
          to   { transform: scale(1)    translate(0,0); }
        }

        .hero-kenburns { animation: heroKenBurns 18s ease-out forwards; }

        .hero-pulse {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%;
          background: #60a5fa; animation: heroPulse 2.4s ease infinite;
        }

        /* Letters: start hidden above; .hero-lv bounces them into place.
           Removing .hero-lv reverses the transition going back up. */
        .hero-letter-a,
        .hero-letter-b {
          opacity: 0;
          transform: translateY(-40px);
          display: inline-block;
          transition: opacity 0.32s ease, transform 0.52s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hero-letter-a.hero-lv,
        .hero-letter-b.hero-lv {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,.28); }

        .hero-social {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 7px; font-size: 12.5px; font-weight: 600;
          text-decoration: none; cursor: pointer; white-space: nowrap;
          background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.14);
          color: rgba(255,255,255,.78);
          transition: background .2s, border-color .2s, color .2s, transform .2s;
        }
        .hero-social:hover {
          background: rgba(255,255,255,.13); border-color: rgba(255,255,255,.32);
          color: white; transform: translateY(-2px);
        }

        @media (max-width: 420px) {
          .hero-social-label { display: none; }
          .hero-social { padding: 8px; border-radius: 50%; }
        }

        /* ── Stacked editorial nav (top-right) ──────────────────────────────── */
        .nav-stack {
          position: fixed; z-index: 50;
          top: clamp(20px, 3vw, 36px);
          right: clamp(18px, 4vw, 56px);
          display: flex; flex-direction: column; align-items: flex-end;
          gap: 0;
          text-align: right;
        }
        .nav-stack-link {
          font-family: 'DM Serif Text', 'Gloock', Georgia, serif;
          font-size: clamp(20px, 2.4vw, 32px);
          line-height: 0.95; letter-spacing: 0.005em;
          background: none; border: none; cursor: pointer; padding: 0;
          /* Auto-contrast: white text inverts against whatever scrolls behind it,
             so the nav is never invisible over light OR dark sections. */
          color: #ffffff; mix-blend-mode: difference;
          transform-origin: right center;
          transition: transform .32s cubic-bezier(.34,1.56,.64,1), color .25s ease;
        }
        .nav-stack-link:hover { transform: scale(1.08); }
        /* Active section: opt out of blend so the true site blue shows, and magnify it. */
        .nav-stack-link.active {
          color: #3b82f6;
          mix-blend-mode: normal;
          transform: scale(1.26);
        }
        @media (max-width: 600px) {
          .nav-stack-link { font-size: clamp(16px, 5vw, 22px); }
        }

        /* ── Hero typewriter story prompt ──────────────────────────────── */
        @keyframes heroCaretBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .hero-caret {
          display: inline-block;
          width: 2px;
          margin-left: 3px;
          vertical-align: -0.08em;
          background: currentColor;
          animation: heroCaretBlink 1s step-end infinite;
        }

        /* ── Footer contact button ──────────────────────────────── */
        .footer-contact {
          display: inline-flex; align-items: center;
          font-size: 14px; font-weight: 500; letter-spacing: .04em;
          color: #60a5fa; cursor: pointer;
          padding: 10px 26px; border-radius: 999px;
          background: transparent;
          border: 1px solid rgba(96,165,250,.45);
          transition: border-color .2s ease, color .2s ease;
        }
        .footer-contact:hover { border-color: #60a5fa; color: #93c5fd; }

        /* ── Watermark ──────────────────────────────── */
        .hero-watermark {
          position: absolute; right: -2%; bottom: 3%;
          font-size: clamp(80px, 15vw, 210px); font-weight: 900;
          letter-spacing: -.04em; line-height: 1;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.055);
          pointer-events: none; user-select: none; white-space: nowrap;
        }

        /* ── Display heading ── the same huge/black-weight/tight-tracking
           treatment as the hero name (DRAKE BELLISARI), reused for section
           titles so it reads as one consistent typographic signature. ── */
        .display-heading {
          font-weight: 900;
          letter-spacing: -.03em;
          line-height: 0.95;
        }
        /* Hollow variant — same weight, but outlined instead of filled, the
           way BELLISARI reads next to the solid DRAKE in the hero. Stroke
           picks up currentColor, so it adapts to whatever text-color class
           the heading already has on light or dark sections. */
        .display-heading-outline {
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          -webkit-text-stroke: 1.25px currentColor;
          text-stroke: 1.25px currentColor;
        }
`;
