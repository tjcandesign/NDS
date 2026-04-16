"use client";
import { useEffect } from "react";

// ─── WOODLAND BRAND LANGUAGE ─────────────────────────────────────────────────
// Standalone brand language page for Woodland Estate & Title.
// Assets live under /public/woodland/.

export default function WoodlandBrandLanguage() {
  // Scroll-spy: highlight side-nav link for current section
  useEffect(() => {
    const links = document.querySelectorAll(".wl-side-nav a");
    const sections = [];
    links.forEach((link) => {
      const id = link.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) sections.push({ id, el, link });
    });

    function onScroll() {
      let current = sections[0];
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].el.getBoundingClientRect().top <= 120) {
          current = sections[i];
        }
      }
      links.forEach((l) => l.classList.remove("active"));
      if (current) current.link.classList.add("active");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyHex = (e) => {
    const el = e.currentTarget;
    const hex = el.getAttribute("data-hex");
    navigator.clipboard.writeText(hex).then(() => {
      const tip = el.querySelector(".copied-tip");
      if (!tip) {
        const orig = el.textContent;
        el.textContent = "Copied!";
        setTimeout(() => {
          el.textContent = orig;
        }, 1200);
        return;
      }
      tip.classList.add("show");
      setTimeout(() => tip.classList.remove("show"), 1200);
    });
  };

  return (
    <div className="wl-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');

        .wl-root {
          --brown: #5C4033;
          --navy: #1B365D;
          --navy-dark: #0F2240;
          --gold: #B8860B;
          --gray: #6B6B6B;
          --bg-cream: #F5F0EB;
          --bg-white: #FFFFFF;
          --bg-dark: #0F2240;
          --bg-warm: #E8E0D8;
          --accent: #C4A882;
          --accent-dark: #A68B6B;
          --text-dark: #1A1A1A;
          --text-medium: #4A4A4A;
          --text-light: #8A8A8A;
          --text-white: #FFFFFF;
          --border: #D4CCC4;
          --serif: 'EB Garamond', Georgia, serif;
          --sans: 'Inter', -apple-system, sans-serif;
          --nav-width: 260px;
          --content-max: 820px;

          font-family: var(--sans);
          color: var(--text-dark);
          background: var(--bg-cream);
          line-height: 1.6;
        }

        .wl-root * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        /* ─── TOP HEADER ─── */
        .wl-top-header {
          background: var(--bg-dark);
          padding: 20px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 56px;
        }
        .wl-top-header img {
          height: 14px;
          width: auto;
        }
        .wl-top-header-tag {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        /* ─── HERO ─── */
        .wl-hero {
          position: relative;
          color: var(--text-white);
          padding: 140px 60px 120px;
          overflow: hidden;
          min-height: 480px;
          display: flex;
          align-items: flex-end;
        }
        .wl-hero-bg {
          position: absolute;
          inset: 0;
          background: url('/woodland/eastern-market.jpeg') center center / cover no-repeat;
          z-index: 0;
        }
        .wl-hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(26, 26, 26, 0.75);
          z-index: 1;
        }
        .wl-hero-inner {
          max-width: 900px;
          position: relative;
          z-index: 2;
        }
        .wl-hero-tag {
          font-family: var(--sans);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 32px;
        }
        .wl-hero h1 {
          font-family: var(--serif);
          font-size: 64px;
          font-weight: 400;
          line-height: 1.15;
          margin-bottom: 24px;
        }
        .wl-hero-divider {
          width: 60px;
          height: 2px;
          background: var(--gold);
          margin-bottom: 24px;
        }
        .wl-hero-sub {
          font-size: 16px;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
        }

        /* ─── LAYOUT ─── */
        .wl-page-wrap {
          display: flex;
          min-height: 100vh;
        }

        /* ─── SIDE NAV ─── */
        .wl-side-nav {
          width: var(--nav-width);
          flex-shrink: 0;
          background: var(--bg-white);
          border-right: 1px solid var(--border);
          position: sticky;
          top: 56px;
          align-self: flex-start;
          height: calc(100vh - 56px);
          overflow-y: auto;
          padding: 40px 0;
        }
        .wl-side-nav-brand {
          padding: 0 28px 32px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 24px;
        }
        .wl-side-nav-brand span {
          font-family: var(--serif);
          font-size: 22px;
          color: var(--brown);
        }
        .wl-side-nav a {
          display: block;
          padding: 10px 28px;
          font-size: 13px;
          font-weight: 400;
          color: var(--text-light);
          text-decoration: none;
          transition: color 0.2s, border-left 0.2s;
          border-left: 3px solid transparent;
        }
        .wl-side-nav a:hover {
          color: var(--text-dark);
        }
        .wl-side-nav a.active {
          color: var(--brown);
          font-weight: 500;
          border-left-color: var(--gold);
        }

        /* ─── MAIN CONTENT ─── */
        .wl-main-content {
          flex: 1;
          min-width: 0;
        }

        /* ─── SECTIONS ─── */
        .wl-section {
          padding: 80px 60px;
        }
        .wl-section-inner {
          max-width: var(--content-max);
          margin: 0 auto;
        }
        .wl-section-alt {
          background: var(--bg-white);
        }
        .wl-section-dark {
          background: var(--bg-dark);
          color: var(--text-white);
        }
        .wl-section-warm {
          background: var(--bg-warm);
        }
        .wl-section-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--accent-dark);
          margin-bottom: 16px;
        }
        .wl-section-dark .wl-section-tag {
          color: var(--accent);
        }
        .wl-section h2 {
          font-family: var(--serif);
          font-size: 40px;
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 32px;
          color: var(--text-dark);
        }
        .wl-section-dark h2 {
          color: var(--text-white);
        }
        .wl-section h3 {
          font-family: var(--serif);
          font-size: 40px;
          font-weight: 400;
          margin-bottom: 16px;
          color: var(--text-dark);
        }
        .wl-section-dark h3 {
          color: var(--text-white);
        }
        .wl-section p {
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-medium);
          margin-bottom: 20px;
        }
        .wl-section-dark p {
          color: rgba(255,255,255,0.6);
        }
        .wl-section p:last-child {
          margin-bottom: 0;
        }

        .wl-divider {
          width: 50px;
          height: 2px;
          background: var(--gold);
          margin: 32px 0;
        }
        .wl-section-dark .wl-divider {
          background: var(--accent);
        }

        /* ─── SUBSECTIONS ─── */
        .wl-subsection {
          margin-top: 56px;
        }
        .wl-subsection:first-of-type {
          margin-top: 0;
        }

        /* ─── PULL QUOTE ─── */
        .wl-pull-quote {
          font-family: var(--serif);
          font-size: 34px;
          font-style: italic;
          line-height: 1.5;
          color: var(--brown);
          border-left: 3px solid var(--gold);
          padding-left: 28px;
          margin: 40px 0;
        }
        .wl-section-dark .wl-pull-quote {
          color: var(--accent);
          border-left-color: var(--accent);
        }

        /* ─── BELIEF CARDS ─── */
        .wl-belief-card {
          background: rgba(255,255,255,0.06);
          border-left: 3px solid var(--accent);
          padding: 24px 28px;
          margin-bottom: 20px;
          border-radius: 0 6px 6px 0;
        }
        .wl-belief-card p {
          font-family: var(--serif);
          font-size: 19px;
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
          margin: 0;
        }

        /* ─── CHARACTER GRID ─── */
        .wl-char-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          margin-top: 32px;
        }
        .wl-char-card h4 {
          font-family: var(--serif);
          font-size: 22px;
          font-weight: 400;
          color: var(--brown);
          margin-bottom: 10px;
        }
        .wl-char-card p {
          font-size: 15px;
          line-height: 1.75;
          color: var(--text-medium);
          margin: 0;
        }

        /* ─── VOICE PRINCIPLES ─── */
        .wl-voice-principle {
          margin-bottom: 36px;
        }
        .wl-voice-principle:last-child {
          margin-bottom: 0;
        }
        .wl-voice-principle h4 {
          font-family: var(--serif);
          font-size: 20px;
          font-weight: 500;
          color: var(--text-dark);
          margin-bottom: 8px;
        }
        .wl-voice-principle p {
          font-size: 14px;
          margin: 0;
        }

        /* ─── VIDEO CARDS ─── */
        .wl-video-cards {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 32px;
        }
        .wl-video-card {
          background: var(--bg-white);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 28px 32px;
        }
        .wl-video-card h4 {
          font-family: var(--serif);
          font-size: 20px;
          font-weight: 400;
          color: var(--brown);
          margin-bottom: 12px;
        }
        .wl-video-card p {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-medium);
          margin: 0;
        }

        /* ─── TYPOGRAPHY SPECIMENS ─── */
        .wl-type-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
        }
        .wl-type-specimen {
          background: var(--bg-white);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 32px;
        }
        .wl-type-specimen-name {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--text-light);
          margin-bottom: 12px;
        }
        .wl-type-specimen-sample {
          font-size: 48px;
          line-height: 1.2;
          color: var(--text-dark);
          margin-bottom: 8px;
        }
        .wl-type-specimen-alphabet {
          font-size: 18px;
          line-height: 1.6;
          color: var(--text-medium);
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }
        .wl-type-specimen-body {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-medium);
        }
        .wl-type-specimen-actions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }
        .wl-type-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 5px;
          transition: background 0.2s, border-color 0.2s;
        }
        .wl-type-btn-primary {
          background: var(--bg-dark);
          color: var(--text-white);
          border: 1px solid var(--bg-dark);
        }
        .wl-type-btn-primary:hover {
          background: var(--navy);
        }
        .wl-type-btn-secondary {
          background: transparent;
          color: var(--text-dark);
          border: 1px solid var(--border);
        }
        .wl-type-btn-secondary:hover {
          border-color: var(--text-medium);
        }

        /* ─── COLOR SWATCHES ─── */
        .wl-color-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 32px;
        }
        .wl-color-swatch {
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .wl-color-swatch-blocks {
          display: flex;
        }
        .wl-color-swatch-primary {
          flex: 1;
          height: 100px;
          cursor: pointer;
          position: relative;
          transition: opacity 0.15s;
        }
        .wl-color-swatch-primary:hover { opacity: 0.85; }
        .wl-color-swatch-dark {
          width: 60px;
          height: 100px;
          cursor: pointer;
          position: relative;
          transition: opacity 0.15s;
        }
        .wl-color-swatch-dark:hover { opacity: 0.85; }
        .wl-color-swatch-primary .copied-tip,
        .wl-color-swatch-dark .copied-tip {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255,255,255,0.95);
          color: var(--text-dark);
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }
        .wl-color-swatch-primary .copied-tip.show,
        .wl-color-swatch-dark .copied-tip.show {
          opacity: 1;
        }
        .wl-color-swatch-info {
          background: var(--bg-white);
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .wl-color-swatch-name {
          font-weight: 600;
          font-size: 14px;
          color: var(--text-dark);
        }
        .wl-color-swatch-use {
          font-size: 12px;
          color: var(--text-light);
        }
        .wl-color-swatch-hexes {
          text-align: right;
          display: flex;
          gap: 12px;
        }
        .wl-color-swatch-hex {
          font-size: 12px;
          color: var(--text-light);
          font-family: 'SF Mono', 'Fira Code', monospace;
          cursor: pointer;
        }
        .wl-color-swatch-hex:hover {
          color: var(--text-dark);
        }

        /* ─── LOGO DOWNLOADS ─── */
        .wl-download-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-top: 32px;
        }
        .wl-download-card {
          background: var(--bg-white);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .wl-download-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .wl-download-preview {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--serif);
          font-size: 14px;
          color: var(--text-light);
        }
        .wl-download-preview.dark-bg {
          background: var(--bg-dark);
          color: rgba(255,255,255,0.4);
        }
        .wl-download-preview.light-bg {
          background: var(--bg-cream);
        }
        .wl-download-info {
          padding: 16px 20px;
          border-top: 1px solid var(--border);
        }
        .wl-download-info h4 {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 4px;
        }
        .wl-download-info p {
          font-size: 12px;
          color: var(--text-light);
          margin: 0;
          line-height: 1.4;
        }
        .wl-download-btn {
          display: inline-block;
          margin-top: 10px;
          font-size: 12px;
          font-weight: 500;
          color: var(--brown);
          text-decoration: none;
          border: 1px solid var(--border);
          padding: 6px 14px;
          border-radius: 4px;
          transition: background 0.2s, border-color 0.2s;
        }
        .wl-download-btn:hover {
          background: var(--bg-cream);
          border-color: var(--brown);
        }

        /* ─── FOOTER ─── */
        .wl-footer {
          background: var(--bg-dark);
          color: rgba(255,255,255,0.4);
          text-align: center;
          padding: 48px 60px;
          font-size: 13px;
          letter-spacing: 1px;
        }
        .wl-footer-mark {
          font-family: var(--serif);
          font-size: 28px;
          color: rgba(255,255,255,0.15);
          margin-bottom: 16px;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .wl-top-header { padding: 16px 24px; }
          .wl-side-nav { display: none; }
          .wl-section { padding: 60px 32px; }
          .wl-hero { padding: 80px 32px 72px; }
          .wl-hero h1 { font-size: 44px; }
          .wl-char-grid { grid-template-columns: 1fr; }
          .wl-type-grid { grid-template-columns: 1fr; }
          .wl-color-grid { grid-template-columns: 1fr; }
          .wl-download-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── TOP HEADER ── */}
      <div className="wl-top-header">
        <img src="/woodland/woodland-logo-full.svg" alt="Woodland Estate & Title" />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span className="wl-top-header-tag">Brand Guidelines</span>
          <a
            href="https://woodlandtitleproposal.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text-white)",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "6px 16px",
              borderRadius: 4,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
          >
            Project Proposal
          </a>
        </div>
      </div>

      {/* ── HERO ── */}
      <header className="wl-hero">
        <div className="wl-hero-bg"></div>
        <div className="wl-hero-overlay"></div>
        <div className="wl-hero-inner">
          <div className="wl-hero-tag">Phase 1 — Brand Foundation</div>
          <h1>
            Woodland
            <br />
            Brand Language
          </h1>
          <div className="wl-hero-divider"></div>
          <p className="wl-hero-sub">
            Prepared for Woodland Estate &amp; Title
            <br />
            Curt Zeager, March 2026
          </p>
        </div>
      </header>

      <div className="wl-page-wrap">
        {/* ── SIDE NAV ── */}
        <nav className="wl-side-nav">
          <div className="wl-side-nav-brand">
            <span>W.</span>
          </div>
          <a href="#brand-story" className="active">Brand Story</a>
          <a href="#mission">Mission Statement</a>
          <a href="#beliefs">Core Beliefs</a>
          <a href="#character">Brand Character</a>
          <a href="#voice">Voice Guidelines</a>
          <a href="#positioning">Key Messages</a>
          <a href="#video">Video Talking Points</a>
          <a href="#typography">Typography &amp; Color</a>
          <a href="#logos">Logo Downloads</a>
          <a href="#design-direction">Design Direction</a>
        </nav>

        {/* ── MAIN ── */}
        <main className="wl-main-content">
          {/* ── 1. BRAND STORY ── */}
          <section id="brand-story" className="wl-section wl-section-alt">
            <div className="wl-section-inner">
              <div className="wl-section-tag">01 — Brand Story</div>
              <h2>Where We Come From</h2>
              <p>
                Woodland Estate &amp; Title was founded in 2018 by Curtis L. Zeager, but the mindset behind the company was shaped long before that. Curt grew up on a Mennonite dairy farm in Lancaster County, Pennsylvania, where work was measured not in words but in actions: you showed up early, kept your word, and focused on doing the job right, trusting that the quality of your work would be felt by everyone over time.
              </p>
              <p>
                After working for ten years as a Montgomery County, Maryland prosecutor, Curt began his journey into real estate settlements. A personal experience in buying his own home in the DMV led him to realize there may be a better approach and mindset to the title process. The closing process he experienced was highly impersonal and overall rushed. No one from the title company bothered to call ahead of signing to explain the details of the process and at the signing table the documents were passed across for signatures with little guidance, leaving a moment that should have felt significant feeling like an afterthought.
              </p>
              <p>
                Woodland was built around the belief that buying real estate, whether your first home or a commercial investment property, deserves more than paperwork and procedure. Customers should understand what they are signing, feel confident in the process, and experience a closing that reflects the importance of the investment behind it. The name Woodland is a family name and reflects a sense of timeless strength, dignity and presence.
              </p>
              <p>
                At Woodland, the focus is simple but deliberate: handle the details with care, treat people with respect, and let the quality of the work speak for itself. Over time, that approach becomes its own kind of reputation.
              </p>

              <div className="wl-divider"></div>

              <div className="wl-subsection">
                <h3>How We Think About the Work</h3>
                <p className="wl-pull-quote">
                  Unlike many other title companies making noise while claiming innovation and excellence, Woodland operates more like those old tailoring shops: present but not pushy, building reputation through everyday hard work.
                </p>
                <p>
                  There&rsquo;s a block in London, Savile Row, where tailors have been making garments for royalty since the 1400s. No billboards, no loud messaging. Just centuries of showing up and doing excellent work, letting the reputation compound over time. That image has always stuck with our founder, and it works to inform how we work to guide the company right here in the heart of our nation&rsquo;s Capitol.
                </p>
                <p>
                  At Woodland we like to say real estate transactions already have plenty of energy—we do not want to add to the noise but rather be the underlying current in the process. Title sits in a unique position, critical to the deal, but when done right, nearly invisible. The customer or agent typically only hears from us when there is a problem or an issue that needs attention. We see that as a brand hallmark, not a problem to solve with more visibility.
                </p>
              </div>

              <div className="wl-divider"></div>

              <div className="wl-subsection">
                <h3>Where We Work</h3>
                <p>
                  Our office located on Capitol Hill, next to Capitol Hill Books and across from Eastern Market, reflects our philosophy and is grounded in a sense of place. The space where we work evokes a sense of classic law office and historical presence. Capitol Hill is the kind of neighborhood where people still know each other and through our work we want to help build that further.
                </p>
                <p>
                  There is something about being across from the market that connects the company&rsquo;s roots to its practice: the tactile, grounded rhythm of Lancaster agriculture merged with the professional practice of settlements and law in the nation&rsquo;s capital. In an age where everything is digital, physical space matters. It is why our in-person community events feel right. Woodland is a known place with an open door. We believe community is built through presence and intention, not promotion.
                </p>
                <p>
                  But our reach extends well beyond Capitol Hill. Woodland is licensed across DC, Maryland, and Virginia, handling settlements from Tidewater to Northern Maryland. And the scope of our work is just as broad as our geography. Where most title companies choose a lane—residential only, or strictly high-end commercial—we work across every sector: residential purchases on Capitol Hill, commercial transactions downtown, and agricultural deals in rural Maryland. That range is unusual for a firm our size, and it&rsquo;s deliberate. We believe that deep knowledge across disciplines makes us better practitioners in each one, and it means the professionals who work with us never have to look elsewhere when their own practice evolves.
                </p>
              </div>
            </div>
          </section>

          {/* ── 2. MISSION ── */}
          <section id="mission" className="wl-section">
            <div className="wl-section-inner">
              <div className="wl-section-tag">02 — Mission Statement</div>
              <h2>Why We&rsquo;re Here</h2>
              <p className="wl-pull-quote">
                Woodland Estate &amp; Title is built on the values of diligence, integrity, and reliability—delivering prompt, dependable service to real estate professionals and clear, trustworthy guidance to every customer we serve.
              </p>
              <div className="wl-divider"></div>
              <p>
                We&rsquo;re not trying to reinvent title insurance. We&rsquo;re just trying to do it so well that our clients never have to think about it.
              </p>
            </div>
          </section>

          {/* ── 3. CORE BELIEFS ── */}
          <section id="beliefs" className="wl-section wl-section-dark">
            <div className="wl-section-inner">
              <div className="wl-section-tag">03 — Core Beliefs</div>
              <h2>What We Stand On</h2>

              <div className="wl-belief-card">
                <p>Every real estate purchase deserves a closing as thoughtful as the investment behind it.</p>
              </div>
              <div className="wl-belief-card">
                <p>Some of our most valuable work happens while no one is watching.</p>
              </div>
              <div className="wl-belief-card">
                <p>We believe that the details matter, the process should be clear, and every customer deserves to feel confident and respected from start to finish.</p>
              </div>
              <div className="wl-belief-card">
                <p>We believe that careful consistent work and approachable accessibility builds the foundation for trust, security, and lasting relationships.</p>
              </div>
              <div className="wl-belief-card">
                <p>We believe that real expertise shows up in how you handle the moments most people never see.</p>
              </div>

              <div className="wl-divider"></div>

              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 20,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.7)",
                  fontStyle: "italic",
                }}
              >
                In an industry full of high stakes and emotional decisions, there is power in being steady. In knowing what to look for. In handling the complexity so others do not have to carry it. Trust is not something you claim. It is earned through consistency and thoroughness, over time.
              </p>
            </div>
          </section>

          {/* ── 4. BRAND CHARACTER ── */}
          <section id="character" className="wl-section wl-section-alt">
            <div className="wl-section-inner">
              <div className="wl-section-tag">04 — Brand Character</div>
              <h2>What We Are</h2>

              <div className="wl-char-grid">
                <div className="wl-char-card">
                  <h4>Steady</h4>
                  <p>
                    Not reactive. Not rattled. Same measured competence on a routine residential closing as on a complicated commercial transaction. Even if everyone else in the transaction is overwhelmed; we are the calm presence that finishes the job and provides guidance when needed.
                  </p>
                </div>
                <div className="wl-char-card">
                  <h4>Thorough</h4>
                  <p>
                    We catch what others miss because we are not rushing. We are focused on completing the transaction in a complete and accurate manner. The 60-year title search instead of a starter-policy. The base lot construction loan that never got released. The property that has been in the same family so long nobody has looked under the hood in decades. We look.
                  </p>
                </div>
                <div className="wl-char-card">
                  <h4>Quietly Confident</h4>
                  <p>
                    We don&rsquo;t need to tell you we&rsquo;re good. We&rsquo;d rather show you by making your next deal effortless. The best evidence of our competence is that you never had to worry about us.
                  </p>
                </div>
                <div className="wl-char-card">
                  <h4>Partnership-Oriented</h4>
                  <p>
                    We make agents and lenders look good. Your reputation is tied to ours, and we take that seriously. When a buyer has a great closing experience, that in turn reflects on our clients.
                  </p>
                </div>
                <div className="wl-char-card">
                  <h4>Locally Grounded</h4>
                  <p>
                    We have extensive knowledge of county records, common issues, and local quirks. It&rsquo;s where we live and work. We use extensive research to form a deep understanding of the land and its unique history.
                  </p>
                </div>
                <div className="wl-char-card">
                  <h4>Broad by Design</h4>
                  <p>
                    Most title companies pick one lane. We work across all of them. Residential, commercial, agricultural—from Capitol Hill townhouses to two-million-dollar Amish farm auctions to four-hundred-thousand-dollar houses outside Richmond. Licensed in DC, Maryland, and Virginia, covering everything from Tidewater to Northern Maryland. This is what a boutique firm looks like at its best: focused enough to know the work deeply, broad enough to handle whatever comes through the door.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 5. VOICE GUIDELINES ── */}
          <section id="voice" className="wl-section">
            <div className="wl-section-inner">
              <div className="wl-section-tag">05 — Voice Guidelines</div>
              <h2>How We Sound</h2>
              <p>
                Steady. Assured. Unhurried. Not salesy. Not trying to impress. The voice of someone who&rsquo;s handled thousands of closings and knows exactly what to watch for.
              </p>

              <div className="wl-divider"></div>

              <div className="wl-voice-principle">
                <h4>Professional but Approachable</h4>
                <p>
                  We speak with the authority of a managing attorney and the warmth of someone you&rsquo;d want to grab a drink with after work. Legal competence meets genuine connection.
                </p>
              </div>
              <div className="wl-voice-principle">
                <h4>Expert but Not Condescending</h4>
                <p>
                  We explain the buyer intro call, the 60-year search, and the escrow process. We never make anyone feel stupid for not knowing. We understand most people have no idea what title and escrow even means until they&rsquo;re approaching the closing table.
                </p>
              </div>
              <div className="wl-voice-principle">
                <h4>Show, Don&rsquo;t Tell</h4>
                <p>
                  We demonstrate reliability through our communication, early explanation, timely document delivery, and open communications with every one of our clients.
                </p>
              </div>
            </div>
          </section>

          {/* ── 6. KEY MESSAGES ── */}
          <section id="positioning" className="wl-section wl-section-dark">
            <div className="wl-section-inner">
              <div className="wl-section-tag">06 — Key Messages &amp; Positioning</div>
              <h2>How We Position Ourselves</h2>
              <p>
                Woodland Title is the title and closing partner for real estate professionals who value quiet excellence over showmanship and earned reputation over undeserved recognition. We operate with the understanding that our best work is invisible: transactions that close without drama, titles that clear without delay.
              </p>

              <div className="wl-divider"></div>

              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 36,
                  fontStyle: "italic",
                  lineHeight: 1.4,
                  color: "rgba(255,255,255,0.6)",
                  marginTop: 20,
                }}
              >
                Be the undercurrent, not the wave.
              </p>
            </div>
          </section>

          {/* ── 7. VIDEO TALKING POINTS ── */}
          <section id="video" className="wl-section">
            <div className="wl-section-inner">
              <div className="wl-section-tag">07 — Video Talking Points</div>
              <h2>Ready-to-Use Language</h2>
              <p>Language for monthly video updates, ready to adapt for each recording.</p>

              <div className="wl-video-cards">
                <div className="wl-video-card">
                  <h4>What We Actually Do</h4>
                  <p>
                    Hey, wanted to take a minute to walk you through what happens when a file lands on our desk. Three things. We handle the settlement itself, the signing, usually about 45 minutes on closing day. We perform escrow services, so all the money flowing in and out moves through our fiduciary accounts. And we produce the insurance policy that protects your buyer&rsquo;s legal right to the property, based on a 60-year search of the parcel. That search goes back through every owner, every mortgage, anything we can find in the public record. We take it seriously.
                  </p>
                </div>
                <div className="wl-video-card">
                  <h4>Why We Do the Intro Call</h4>
                  <p>
                    I remember a closing of my own, nobody called beforehand. Nobody went out of their way to explain anything. We just showed up and signed. I thought, there has to be a better customer experience in this industry. That&rsquo;s why we do the buyer intro call within a day or two of contract. Ten minutes. I walk them through what&rsquo;s happening, tell them to focus on their lender because that&rsquo;s where the bottlenecks happen, and let them know no news from us is good news. Simple, but it matters.
                  </p>
                </div>
                <div className="wl-video-card">
                  <h4>Wire Fraud</h4>
                  <p>
                    Wire fraud is a billion dollar problem, and everyone in this business worries about it. We use technology that verifies identity before any banking information gets exchanged. Credit questions, biometrics, the whole thing. And here&rsquo;s something most people don&rsquo;t know: if something goes wrong on a transaction we weren&rsquo;t even involved in, call us. We can connect you with the right people to help recover it. That&rsquo;s what partners do.
                  </p>
                </div>
                <div className="wl-video-card">
                  <h4>Long Family Ownership</h4>
                  <p>
                    Sometimes I hear, &lsquo;This property&rsquo;s been in the same family for 60 years.&rsquo; I get why that sounds reassuring, but honestly? That concerns me a little. Nobody&rsquo;s been under the hood of this thing in a long time. The previous owners might have been wonderful people, but what about the ones before them? That&rsquo;s exactly why we do the full search. We&rsquo;re looking for what nobody else has looked at.
                  </p>
                </div>
                <div className="wl-video-card">
                  <h4>Third Thursday</h4>
                  <p>
                    Hey, quick reminder we&rsquo;re doing our Third Thursday again this next week. Stop by the office, grab a beer, catch up with a good group of folks. In an industry that moves so fast, it&rsquo;s nice to slow down for an hour. We hope to see you there!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 8. TYPOGRAPHY & COLOR ── */}
          <section id="typography" className="wl-section wl-section-alt">
            <div className="wl-section-inner">
              <div className="wl-section-tag">08 — Typography &amp; Color System</div>
              <h2>Visual Language</h2>

              <div className="wl-type-grid">
                <div className="wl-type-specimen">
                  <div className="wl-type-specimen-name">Primary Typeface</div>
                  <div className="wl-type-specimen-sample" style={{ fontFamily: "var(--serif)" }}>EB Garamond</div>
                  <div className="wl-type-specimen-alphabet" style={{ fontFamily: "var(--serif)" }}>
                    Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                  </div>
                  <p className="wl-type-specimen-body">
                    Named after Claude Garamond, a 16th-century French type designer. Associated with quality publishing, readability, and understated elegance—ideal for long-form text, academic work, and legal documents.
                  </p>
                  <p className="wl-type-specimen-body" style={{ marginTop: 8, fontSize: 12, color: "var(--text-light)" }}>
                    Use: Headlines, body copy, all branded materials
                  </p>
                  <div className="wl-type-specimen-actions">
                    <a href="https://fonts.google.com/specimen/EB+Garamond" target="_blank" rel="noopener noreferrer" className="wl-type-btn wl-type-btn-primary">
                      Google Fonts →
                    </a>
                    <a href="https://fonts.google.com/download?family=EB+Garamond" className="wl-type-btn wl-type-btn-secondary">
                      Download .zip
                    </a>
                  </div>
                </div>

                <div className="wl-type-specimen">
                  <div className="wl-type-specimen-name">Secondary Typeface</div>
                  <div className="wl-type-specimen-sample" style={{ fontFamily: "var(--sans)", fontWeight: 300 }}>Inter</div>
                  <div className="wl-type-specimen-alphabet" style={{ fontFamily: "var(--sans)", fontWeight: 400 }}>
                    Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                  </div>
                  <p className="wl-type-specimen-body">
                    A sans-serif typeface designed for screen readability. Already in use on the Woodland website and within Qualia and other software platforms.
                  </p>
                  <p className="wl-type-specimen-body" style={{ marginTop: 8, fontSize: 12, color: "var(--text-light)" }}>
                    Use: Digital interfaces, email signatures, secondary headlines
                  </p>
                  <div className="wl-type-specimen-actions">
                    <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener noreferrer" className="wl-type-btn wl-type-btn-primary">
                      Google Fonts →
                    </a>
                    <a href="https://fonts.google.com/download?family=Inter" className="wl-type-btn wl-type-btn-secondary">
                      Download .zip
                    </a>
                  </div>
                </div>
              </div>

              <div className="wl-divider"></div>

              <h3>Color Palette</h3>
              <div className="wl-color-grid">
                {[
                  { name: "Woodland Brown", use: "Primary brand color, logo, headlines", primary: "#5C4033", dark: "#3A2820" },
                  { name: "Woodland Navy", use: "Secondary, professional accent", primary: "#1B365D", dark: "#0F2240" },
                  { name: "Woodland Gold", use: "Accent, highlights, dividers", primary: "#B8860B", dark: "#8A6508" },
                  { name: "Woodland Gray", use: "Body text, secondary elements", primary: "#6B6B6B", dark: "#4A4A4A" },
                ].map((c) => (
                  <div key={c.name} className="wl-color-swatch">
                    <div className="wl-color-swatch-blocks">
                      <div
                        className="wl-color-swatch-primary"
                        style={{ background: c.primary }}
                        data-hex={c.primary}
                        onClick={copyHex}
                      >
                        <span className="copied-tip">Copied!</span>
                      </div>
                      <div
                        className="wl-color-swatch-dark"
                        style={{ background: c.dark }}
                        data-hex={c.dark}
                        onClick={copyHex}
                      >
                        <span className="copied-tip">Copied!</span>
                      </div>
                    </div>
                    <div className="wl-color-swatch-info">
                      <div>
                        <div className="wl-color-swatch-name">{c.name}</div>
                        <div className="wl-color-swatch-use">{c.use}</div>
                      </div>
                      <div className="wl-color-swatch-hexes">
                        <span className="wl-color-swatch-hex" data-hex={c.primary} onClick={copyHex}>{c.primary}</span>
                        <span className="wl-color-swatch-hex" data-hex={c.dark} onClick={copyHex}>{c.dark}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── LOGO DOWNLOADS ── */}
          <section id="logos" className="wl-section">
            <div className="wl-section-inner">
              <div className="wl-section-tag">Logo Assets</div>
              <h2>Logo Downloads</h2>
              <p>
                Download approved logo files for use across print, digital, and merchandise. Always use the provided files—never recreate or modify the logo.
              </p>

              <div className="wl-divider"></div>

              <h4 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, marginBottom: 16 }}>Primary Stacked Logomark</h4>
              <div className="wl-download-grid">
                <div className="wl-download-card">
                  <div className="wl-download-preview light-bg" style={{ padding: 24 }}>
                    <img src="/woodland/woodland-stacked-dark.svg" alt="Woodland Stacked Dark" style={{ maxHeight: 80, maxWidth: "100%" }} />
                  </div>
                  <div className="wl-download-info">
                    <h4>Dark on Light</h4>
                    <p>SVG, PNG, JPG</p>
                    <a href="/woodland/woodland-stacked-dark.svg" download className="wl-download-btn">Download SVG</a>
                  </div>
                </div>
                <div className="wl-download-card">
                  <div className="wl-download-preview dark-bg" style={{ padding: 24 }}>
                    <img src="/woodland/woodland-stacked-white.svg" alt="Woodland Stacked White" style={{ maxHeight: 80, maxWidth: "100%" }} />
                  </div>
                  <div className="wl-download-info">
                    <h4>White on Dark</h4>
                    <p>SVG, PNG, JPG</p>
                    <a href="/woodland/woodland-stacked-white.svg" download className="wl-download-btn">Download SVG</a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 48 }}>
                <h4 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, marginBottom: 16 }}>Short Logomark</h4>
                <div className="wl-download-grid">
                  <div className="wl-download-card">
                    <div className="wl-download-preview light-bg" style={{ padding: 24 }}>
                      <img src="/woodland/woodland-short-dark.svg" alt="Woodland Short Dark" style={{ maxHeight: 80, maxWidth: "100%" }} />
                    </div>
                    <div className="wl-download-info">
                      <h4>Dark on Light</h4>
                      <p>SVG, PNG, JPG</p>
                      <a href="/woodland/woodland-short-dark.svg" download className="wl-download-btn">Download SVG</a>
                    </div>
                  </div>
                  <div className="wl-download-card">
                    <div className="wl-download-preview dark-bg" style={{ padding: 24 }}>
                      <img src="/woodland/woodland-short-white.svg" alt="Woodland Short White" style={{ maxHeight: 80, maxWidth: "100%" }} />
                    </div>
                    <div className="wl-download-info">
                      <h4>White on Dark</h4>
                      <p>SVG, PNG, JPG</p>
                      <a href="/woodland/woodland-short-white.svg" download className="wl-download-btn">Download SVG</a>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 48 }}>
                <h4 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, marginBottom: 16 }}>Circle Logomark</h4>
                <div className="wl-download-grid">
                  <div className="wl-download-card">
                    <div className="wl-download-preview light-bg" style={{ padding: 24 }}>
                      <img src="/woodland/circle-dark.svg" alt="Circle Logomark Dark" style={{ maxHeight: 80, maxWidth: "100%" }} />
                    </div>
                    <div className="wl-download-info">
                      <h4>Dark on Light</h4>
                      <p>SVG, PNG, JPG</p>
                      <a href="/woodland/circle-dark.svg" download className="wl-download-btn">Download SVG</a>
                    </div>
                  </div>
                  <div className="wl-download-card">
                    <div className="wl-download-preview dark-bg" style={{ padding: 24 }}>
                      <img src="/woodland/circle-white.svg" alt="Circle Logomark White" style={{ maxHeight: 80, maxWidth: "100%" }} />
                    </div>
                    <div className="wl-download-info">
                      <h4>White on Dark</h4>
                      <p>SVG, PNG, JPG</p>
                      <a href="/woodland/circle-white.svg" download className="wl-download-btn">Download SVG</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 9. DESIGN DIRECTION ── */}
          <section id="design-direction" className="wl-section wl-section-dark">
            <div className="wl-section-inner">
              <div className="wl-section-tag">09 — Design Direction</div>
              <h2>Design Notes</h2>
              <p>
                The mark should maintain the character of the existing Garamond-based wordmark: the elegant serif construction, the contrast between thick and thin strokes. The period should feel integral, not tacked on. Perhaps slightly larger or positioned to create a balanced composition.
              </p>
              <p>
                The existing wordmark is strong. Reads well at both large and small sizes. Minor refinements to consider: tightening the kerning on the &ldquo;W&rdquo; (currently turns a bit too far), ensuring consistent connections at the bottom of letters (the A-N glyph connection works well as a reference). These are small technical adjustments, not a redesign.
              </p>
            </div>
          </section>
        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer className="wl-footer">
        <div className="wl-footer-mark">W.</div>
        Woodland Estate &amp; Title &nbsp;·&nbsp; Est. 2018
      </footer>
    </div>
  );
}
