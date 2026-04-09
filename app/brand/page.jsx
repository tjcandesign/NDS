"use client";
import { useState } from "react";

// ─── BRAND TOKENS ────────────────────────────────────────────────────────────
const BRAND = {
  name: "Niche Design Studio",
  tagline: "Interior architecture and design based in Washington, DC.",
  heroImage: "https://cdn.sanity.io/images/qb84mjun/production/3ca0d2fdab0d8e46a390dedf0632d5264c7c1408-2400x1601.jpg?w=1600&q=80",

  colors: [
    { name: "Foreground",     hex: "#1c1917", role: "Primary text / Headings",       dark: true  },
    { name: "Navy Blue",      hex: "#465566", role: "Brand accent / Nav active / Logo", dark: true  },
    { name: "Navy Blue Dark", hex: "#364454", role: "Footer background",              dark: true  },
    { name: "Background",     hex: "#fafaf9", role: "Page base / Nav surface",        dark: false },
    { name: "Stone 100",      hex: "#f5f5f4", role: "Alternate sections / Cards",     dark: false },
    { name: "Stone 400",      hex: "#a8a29e", role: "Eyebrow labels / Muted UI",      dark: false },
    { name: "Stone 500",      hex: "#78716c", role: "Secondary text / Nav links",     dark: false },
    { name: "Stone 600",      hex: "#57534e", role: "Body copy",                      dark: true  },
    { name: "Warm Cream",     hex: "#FFF9EE", role: "CTA section background",         dark: false },
    { name: "White",          hex: "#ffffff", role: "Section backgrounds / Cards",     dark: false },
  ],

  fonts: [
    {
      name: "Display",
      family: "'Playfair Display', serif",
      googleUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap",
      role: "Headlines, hero type, section titles, editorial moments. Also the basis for the wordmark logotype.",
      weights: ["400", "500", "600", "700"],
      specimen: "Spaces That Tell Your Story",
    },
    {
      name: "Body / UI",
      family: "'Inter', sans-serif",
      googleUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap",
      role: "Navigation, labels, body copy, buttons, all UI elements",
      weights: ["300", "400", "500", "600"],
      specimen: "Design rooted in place and purpose.",
    },
  ],

  typeStyles: [
    {
      name: "Display / Hero",
      tag: "h1",
      sample: "Spaces That\nTell Your Story",
      css: "font-family: 'Playfair Display', serif; font-size: clamp(48px, 8vw, 96px); font-weight: 400; line-height: 1.05; letter-spacing: 0;",
      usage: "Hero sections, cover slides, landing page headlines. Use Playfair Display at regular weight for maximum elegance.",
    },
    {
      name: "Page Title",
      tag: "h1",
      sample: "Design Rooted in Place and Purpose",
      css: "font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 60px); font-weight: 400; line-height: 1.1; letter-spacing: 0;",
      usage: "Interior page titles (About, Portfolio). Slightly smaller than the hero display.",
    },
    {
      name: "Section Headline",
      tag: "h2",
      sample: "Featured Projects",
      css: "font-family: 'Playfair Display', serif; font-size: clamp(30px, 4vw, 48px); font-weight: 400; line-height: 1.15; letter-spacing: 0;",
      usage: "Page section titles, proposal headers, deck slide titles.",
    },
    {
      name: "Subheading",
      tag: "h3",
      sample: "Residential Design",
      css: "font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 400; line-height: 1.3; letter-spacing: 0; color: #1c1917;",
      usage: "Service names, card titles, sidebar headers.",
    },
    {
      name: "Eyebrow / Label",
      tag: "span",
      sample: "SELECTED WORK",
      css: "font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase; line-height: 1; color: #a8a29e;",
      usage: "Section labels above headlines, step indicators, category tags. Always uppercase with wide tracking.",
    },
    {
      name: "Navigation",
      tag: "a",
      sample: "PORTFOLIO",
      css: "font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; line-height: 1;",
      usage: "Primary nav links, footer nav. Uppercase with moderate tracking.",
    },
    {
      name: "Body Copy",
      tag: "p",
      sample: "We craft interiors that balance beauty, function, and the spirit of the people who inhabit them. From gut renovations to curated room transformations, we bring the same rigor and care to every project.",
      css: "font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.7; letter-spacing: 0; color: #57534e;",
      usage: "All running text. Paragraphs, descriptions, proposal body, deck notes.",
    },
    {
      name: "Large Quote",
      tag: "blockquote",
      sample: "\u201CGood design isn\u2019t decorating space \u2014 it\u2019s revealing it.\u201D",
      css: "font-family: 'Playfair Display', serif; font-size: clamp(24px, 4vw, 48px); font-weight: 400; line-height: 1.4; letter-spacing: 0;",
      usage: "Pull quotes, philosophy statements, testimonials. Used on the navy blue background section.",
    },
    {
      name: "Caption / Meta",
      tag: "small",
      sample: "Interior Architecture \u00b7 Washington, DC",
      css: "font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 400; line-height: 1.5; color: #78716c; letter-spacing: 0.02em;",
      usage: "Image captions, metadata, footnotes, file labels.",
    },
    {
      name: "Button / CTA",
      tag: "a",
      sample: "VIEW PORTFOLIO",
      css: "font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; line-height: 1;",
      usage: "Call-to-action buttons, primary and ghost variants. Always uppercase.",
    },
  ],

  logos: [
    { name: "Wordmark \u2014 Dark BG",  bg: "#364454", format: "SVG", file: "/brand/logo-primary-dark.svg"  },
    { name: "Wordmark \u2014 Light BG", bg: "#fafaf9", format: "SVG", file: "/brand/logo-primary-light.svg" },
    { name: "NDS Mark \u2014 Dark BG",  bg: "#364454", format: "SVG", file: "/brand/mark-dark.svg"          },
    { name: "NDS Mark \u2014 Light BG", bg: "#fafaf9", format: "SVG", file: "/brand/mark-light.svg"         },
  ],
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      style={{ background: "none", border: "1px solid rgba(70,85,102,0.3)", color: copied ? "#465566" : "#78716c", padding: "3px 10px", borderRadius: 2, fontSize: 11, cursor: "pointer", letterSpacing: "0.08em", transition: "color 0.2s" }}
    >
      {copied ? "COPIED" : "COPY"}
    </button>
  );
}

function DownloadButton({ file, label }) {
  return (
    <a
      href={file}
      download
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", border: "1px solid rgba(70,85,102,0.3)", color: "#1c1917", fontSize: 11, letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase", transition: "border-color 0.2s, color 0.2s", cursor: "pointer" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#465566"; e.currentTarget.style.color = "#465566"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(70,85,102,0.3)"; e.currentTarget.style.color = "#1c1917"; }}
    >
      &darr; {label}
    </a>
  );
}

function DownloadButtonDark({ file, label }) {
  return (
    <a
      href={file}
      download
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", border: "1px solid rgba(255,255,255,0.25)", color: "#fafaf9", fontSize: 11, letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase", transition: "border-color 0.2s, color 0.2s", cursor: "pointer" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#fafaf9"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
    >
      &darr; {label}
    </a>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({ id, label, children }) {
  return (
    <section id={id} style={{ padding: "80px 0", borderTop: "1px solid #e7e5e4" }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a8a29e" }}>{label}</span>
      </div>
      {children}
    </section>
  );
}

function ColorCard({ color }) {
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: color.dark ? "none" : "1px solid #e7e5e4" }}>
      <div
        onClick={handleClick}
        style={{ background: color.hex, height: 120, width: "100%", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.2s" }}
      >
        {copied && (
          <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: color.dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.6)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
            Copied
          </span>
        )}
      </div>
      <div style={{ padding: "16px 16px 20px", background: "#fff", borderTop: color.dark ? "none" : "1px solid #e7e5e4" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{color.name}</span>
          <span style={{ fontSize: 12, color: "#a8a29e", fontFamily: "monospace" }}>{color.hex}</span>
        </div>
        <div style={{ fontSize: 12, color: "#78716c", marginBottom: 4 }}>rgb({hexToRgb(color.hex)})</div>
        <div style={{ fontSize: 11, color: "#a8a29e", marginTop: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>{color.role}</div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function BrandGuidelines() {
  const [activeNav, setActiveNav] = useState("logos");

  const navItems = [
    { id: "logos",      label: "Logos"      },
    { id: "colors",     label: "Colors"     },
    { id: "typography", label: "Typography" },
    { id: "typestyles", label: "Type Styles"},
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  return (
    <div style={{ background: "#fafaf9", color: "#1c1917", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* ── GOOGLE FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(70,85,102,0.15); }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "60vh", minHeight: 400, overflow: "hidden", marginTop: 56 }}>
        <img
          src={BRAND.heroImage}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.75) 60%, #1c1917 100%)" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "0 64px 56px" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 16, display: "block" }}>{BRAND.name}</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 400, lineHeight: 1.0, letterSpacing: 0, marginBottom: 16, color: "#fafaf9" }}>
              Brand Guidelines
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, color: "#a8a29e", maxWidth: 480 }}>{BRAND.tagline}</p>
          </div>
        </div>
      </div>

      {/* ── STICKY NAV ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,249,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e7e5e4" }}>
        <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "0 64px", display: "flex", gap: 40, height: 52, alignItems: "center" }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{ background: "none", border: "none", color: activeNav === item.id ? "#465566" : "#a8a29e", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", padding: "4px 0", borderBottom: activeNav === item.id ? "1px solid #465566" : "1px solid transparent", transition: "color 0.2s", fontFamily: "'Inter', sans-serif" }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 64px 120px" }}>

        {/* ── LOGOS ── */}
        <Section id="logos" label="01 \u2014 Logo System">
          {/* Wordmarks and Marks side by side, each stacked dark/light */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>

            {/* ── Wordmarks ── */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 16 }}>Wordmark</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {BRAND.logos.filter(l => l.name.includes("Wordmark")).map((logo, i) => {
                  const isDark = logo.bg === "#364454";
                  return (
                    <div key={i} style={{ background: logo.bg, padding: "48px 40px", display: "flex", flexDirection: "column", gap: 24, aspectRatio: "5/3", justifyContent: "space-between", border: isDark ? "none" : "1px solid #e7e5e4" }}>
                      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
                        <img src={logo.file} alt={logo.name} style={{ maxWidth: "100%", maxHeight: 80, objectFit: "contain" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <div>
                          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: isDark ? "#a8a29e" : "#78716c", marginBottom: 4 }}>{logo.name}</div>
                          <div style={{ fontSize: 10, color: isDark ? "#78716c" : "#a8a29e" }}>{logo.format}</div>
                        </div>
                        {isDark ? <DownloadButtonDark file={logo.file} label={logo.format} /> : <DownloadButton file={logo.file} label={logo.format} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── NDS Marks ── */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 16 }}>NDS Mark</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {BRAND.logos.filter(l => l.name.includes("Mark")).map((logo, i) => {
                  const isDark = logo.bg === "#364454";
                  return (
                    <div key={i} style={{ background: logo.bg, padding: "48px 40px", display: "flex", flexDirection: "column", gap: 24, aspectRatio: "5/3", justifyContent: "space-between", border: isDark ? "none" : "1px solid #e7e5e4" }}>
                      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
                        <img src={logo.file} alt={logo.name} style={{ maxWidth: "100%", maxHeight: 80, objectFit: "contain" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <div>
                          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: isDark ? "#a8a29e" : "#78716c", marginBottom: 4 }}>{logo.name}</div>
                          <div style={{ fontSize: 10, color: isDark ? "#78716c" : "#a8a29e" }}>{logo.format}</div>
                        </div>
                        {isDark ? <DownloadButtonDark file={logo.file} label={logo.format} /> : <DownloadButton file={logo.file} label={logo.format} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          <div style={{ marginTop: 48, padding: "32px 40px", border: "1px solid #e7e5e4", borderRadius: 12, background: "#ffffff" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#465566", marginBottom: 16 }}>Usage Rules</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[
                ["Always maintain clear space", "Minimum clear space = height of the cap-height of the wordmark on all sides."],
                ["Never stretch or distort", "Scale proportionally only. Never adjust individual letterforms."],
                ["Approved backgrounds only", "Use light wordmark on dark surfaces, dark wordmark on light. Avoid busy photography."],
                ["Minimum size", "Wordmark: 80px wide minimum on screen. NDS mark: 24px minimum."],
              ].map(([rule, desc], i) => (
                <div key={i}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, color: "#1c1917" }}>{rule}</div>
                  <div style={{ fontSize: 13, fontWeight: 400, color: "#78716c", lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── COLORS ── */}
        <Section id="colors" label="02 \u2014 Color System">
          <div style={{ background: "#ffffff", borderRadius: 12, padding: 32, border: "1px solid #e7e5e4" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {BRAND.colors.map((color, i) => (
                <ColorCard key={i} color={color} />
              ))}
            </div>
          </div>
        </Section>

        {/* ── TYPOGRAPHY ── */}
        <Section id="typography" label="03 \u2014 Typography">
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {BRAND.fonts.map((font, i) => (
              <div key={i} style={{ border: "1px solid #e7e5e4", background: "#ffffff", borderRadius: 12, overflow: "hidden" }}>

                {/* ── Specimen Header ── */}
                <div style={{ padding: "64px 48px 48px", borderBottom: "1px solid #e7e5e4" }}>
                  {/* Font name rendered large in its own typeface */}
                  <div style={{
                    fontFamily: font.family,
                    fontSize: font.isLogo ? 48 : "clamp(56px, 8vw, 96px)",
                    fontWeight: font.isLogo ? 400 : 400,
                    letterSpacing: font.isLogo ? "0.15em" : "-0.02em",
                    lineHeight: 1.0,
                    color: "#1c1917",
                    marginBottom: 24,
                  }}>
                    {font.family.match(/'([^']+)'/)?.[1] || font.family}
                  </div>
                  {/* Use case tagline */}
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    fontWeight: 400,
                    color: "#78716c",
                    lineHeight: 1.6,
                    maxWidth: 600,
                  }}>
                    {font.role}
                  </div>
                </div>

                {/* ── Specimen Details ── */}
                <div style={{ padding: "40px 48px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, alignItems: "start" }}>

                  {/* Classification & Features */}
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 12 }}>Classification</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#1c1917", marginBottom: 20 }}>{font.name}</div>
                    <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 12 }}>Features</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {(font.family.includes("Playfair")
                        ? ["Serif", "High Contrast", "Transitional", "Display", "Italic Swashes"]
                        : font.family.includes("Inter")
                        ? ["Sans-Serif", "Geometric", "Variable", "Tabular Figures", "Contextual Alternates"]
                        : ["Serif", "Display"]
                      ).map(tag => (
                        <span key={tag} style={{ fontSize: 10, letterSpacing: "0.06em", padding: "4px 10px", background: "#f5f5f4", color: "#78716c", borderRadius: 2 }}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Weights */}
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 12 }}>Weights in Use</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {font.weights.map(w => {
                        const weightName = { "300": "Light", "400": "Regular", "500": "Medium", "600": "SemiBold", "700": "Bold" }[w] || w;
                        return (
                          <div key={w} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                            <span style={{ fontFamily: font.family, fontSize: 20, fontWeight: w, color: "#1c1917", minWidth: 40 }}>Aa</span>
                            <span style={{ fontSize: 12, color: "#78716c" }}>{weightName}</span>
                            <span style={{ fontSize: 11, color: "#a8a29e" }}>{w}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Specimen sample */}
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 12 }}>Specimen</div>
                    <div style={{
                      fontFamily: font.family,
                      fontSize: font.isLogo ? 24 : 28,
                      fontWeight: 400,
                      letterSpacing: font.isLogo ? "0.15em" : "-0.01em",
                      lineHeight: 1.3,
                      color: "#1c1917",
                      marginBottom: 16,
                    }}>
                      {font.specimen}
                    </div>
                    <div style={{ fontFamily: font.family, fontSize: 14, fontWeight: 400, lineHeight: 1.8, color: "#78716c" }}>
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
                      abcdefghijklmnopqrstuvwxyz<br/>
                      0123456789 &amp; !? . , ; : &mdash;
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── TYPE STYLES ── */}
        <Section id="typestyles" label="04 \u2014 Type Styles">
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {BRAND.typeStyles.map((style, i) => (
              <div key={i} style={{ padding: "48px 40px", border: "1px solid #e7e5e4", borderRadius: 12, background: "#ffffff" }}>
                <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 48 }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#465566", marginBottom: 12 }}>{style.name}</div>
                    <div style={{ fontSize: 11, color: "#a8a29e", marginBottom: 16, letterSpacing: "0.06em", textTransform: "uppercase" }}>{"<" + style.tag + ">"}</div>
                    <div style={{ fontSize: 13, color: "#78716c", lineHeight: 1.7 }}>{style.usage}</div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: style.css.match(/font-family: ([^;]+)/)?.[1]?.replace(/'/g, '"'),
                      fontSize: style.css.match(/font-size: ([^;]+)/)?.[1],
                      fontWeight: style.css.match(/font-weight: ([^;]+)/)?.[1],
                      lineHeight: style.css.match(/line-height: ([^;]+)/)?.[1],
                      letterSpacing: style.css.match(/letter-spacing: ([^;]+)/)?.[1],
                      textTransform: style.css.match(/text-transform: ([^;]+)/)?.[1] || "none",
                      fontStyle: style.css.match(/font-style: ([^;]+)/)?.[1] || "normal",
                      color: style.css.match(/color: ([^;]+)/)?.[1] || "#1c1917",
                      whiteSpace: "pre-line",
                      ...(style.tag === "blockquote" ? { textIndent: "-0.4em" } : {}),
                    }}>
                      {style.sample}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 24, padding: "12px 16px", background: "#f5f5f4", borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <code style={{ fontSize: 11, color: "#78716c", fontFamily: "monospace", letterSpacing: "0.04em" }}>{style.css}</code>
                  <CopyButton text={style.css} />
                </div>
              </div>
            ))}
          </div>
        </Section>

      </div>

    </div>
  );
}
