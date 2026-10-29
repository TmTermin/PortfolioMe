import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

const projects = [
  {
    number: "01",
    title: "PortfolioMe",
    type: "PERSONAL SYSTEM",
    description:
      "A motion-led portfolio interface built to document my first steps into cybersecurity and frontend engineering.",
    tags: ["React", "Vite", "UI motion"],
    link: "https://github.com/TmTermin/PortfolioMe",
    accent: "cyan",
    terminal: ["inspect portfolio-me", "status: online", "stack: react / vite"],
  },
  {
    number: "02",
    title: "Security Notes",
    type: "LEARNING LOG",
    description:
      "A growing knowledge base for security concepts, threat awareness, and the fundamentals behind safer systems.",
    tags: ["Cybersecurity", "Research", "Documentation"],
    link: "https://github.com/TmTermin/security-notes",
    accent: "violet",
    terminal: ["scan security-notes", "topic: threat awareness", "access: public"],
  },
  {
    number: "03",
    title: "Linux Notes",
    type: "LAB JOURNAL",
    description:
      "Command-line practice and Linux fundamentals — the everyday toolkit for understanding infrastructure.",
    tags: ["Linux", "CLI", "Systems"],
    link: "https://github.com/TmTermin/linux-notes",
    accent: "green",
    terminal: ["open linux-notes", "mode: command line", "signal: stable"],
  },
];

const skills = [
  { label: "Linux & CLI", value: 76 },
  { label: "Web fundamentals", value: 82 },
  { label: "Security concepts", value: 64 },
  { label: "Problem solving", value: 88 },
];

const navItems = [
  ["01", "About", "about"],
  ["02", "Focus", "focus"],
  ["03", "Projects", "projects"],
  ["04", "Contact", "contact"],
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function BootSequence({ onComplete }) {
  const [lineCount, setLineCount] = useState(0);
  const bootLines = [
    "[ OK ] Loading security modules",
    "[ OK ] Checking network integrity",
    "[ OK ] Firewall protocol active",
    "[ OK ] Portfolio system ready",
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLineCount((current) => {
        if (current >= bootLines.length) {
          window.clearInterval(timer);
          window.setTimeout(onComplete, 380);
          return current;
        }
        return current + 1;
      });
    }, 330);
    return () => window.clearInterval(timer);
  }, [bootLines.length, onComplete]);

  return (
    <div className="boot-screen" role="status" aria-live="polite">
      <div className="boot-inner">
        <div className="boot-brand"><span>&lt;/&gt;</span><b>TMTERMIN_OS</b><small>v.01.26</small></div>
        <div className="boot-terminal">
          <p><span className="prompt">$</span> ./initialize-portfolio.sh</p>
          {bootLines.slice(0, lineCount).map((line) => <p className={line.includes("active") || line.includes("ready") ? "boot-success" : ""} key={line}>{line}</p>)}
          <span className="boot-cursor" />
        </div>
        <div className="boot-progress"><i style={{ "--boot-progress": `${Math.min(100, lineCount * 25)}%` }} /></div>
        <small className="boot-hint">SECURE CONNECTION / HANDSHAKE IN PROGRESS</small>
      </div>
    </div>
  );
}

function HudCursor({ label }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    let frame = 0;
    const handleMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPosition({ x: event.clientX, y: event.clientY }));
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return <div className={`hud-cursor ${label ? "is-active" : ""}`} style={{ left: position.x, top: position.y }} aria-hidden="true"><span className="hud-crosshair" /><small>{label || "SCANNING"}</small><b>X {String(Math.max(0, Math.round(position.x))).padStart(3, "0")} / Y {String(Math.max(0, Math.round(position.y))).padStart(3, "0")}</b></div>;
}

function Reveal({ children, className = "", delay = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = document.querySelector(`[data-reveal-id="${delay}-${className}"]`);
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [className, delay]);

  return (
    <div
      data-reveal-id={`${delay}-${className}`}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [hudLabel, setHudLabel] = useState("");
  const finishBoot = useCallback(() => setBootComplete(true), []);
  const [typed, setTyped] = useState(0);
  const phrases = useMemo(
    () => ["learning the craft", "securing the surface", "building with intent"],
    [],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTyped((current) => (current + 1) % phrases.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [phrases.length]);

  return (
    <div className="site-shell">
      {!bootComplete && <BootSequence onComplete={finishBoot} />}
      <HudCursor label={hudLabel} />
      <div className="noise" aria-hidden="true" />
      <div className="cursor-orb" aria-hidden="true" />

      <header className="topbar">
        <button className="brand" onClick={() => scrollToSection("home")} aria-label="Back to top">
          <span className="brand-mark">&lt;/&gt;</span>
          <span>Tm<span>Termin</span></span>
        </button>
        <div className="availability"><i /> AVAILABLE TO LEARN / BUILD</div>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen}>
          {menuOpen ? "CLOSE" : "MENU"}<span className="menu-lines" />
        </button>
      </header>

      <nav className={`nav-drawer ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
        <p className="eyebrow">NAVIGATION / 00—04</p>
        {navItems.map(([number, label, id]) => (
          <button key={id} onClick={() => { scrollToSection(id); setMenuOpen(false); }}>
            <span>{number}</span>{label}<b>↗</b>
          </button>
        ))}
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" />
          <div className="hero-scanline" />
          <div className="hero-meta meta-left"><span>LOC / CENTRAL ASIA</span><span>SYS.ID / 001</span></div>
          <div className="hero-meta meta-right"><span>EST. 2026</span><span>STATUS / ONLINE</span></div>

          <div className="hero-content">
            <div className="status-pill"><i /> CYBERSECURITY STUDENT <span>·</span> YEAR 01</div>
            <p className="hero-kicker">DIGITAL DEFENSE / FRONTEND CRAFT</p>
            <h1>
              Curiosity is<br />
              my <em>firewall.</em>
            </h1>
            <p className="hero-copy">I&apos;m TmTermin — a first-year cybersecurity student learning how systems work, how they break, and how to build better ones.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollToSection("projects")}>Explore projects <span>↘</span></button>
              <button className="text-button" onClick={() => scrollToSection("contact")}>Let&apos;s connect <span>↗</span></button>
            </div>
          </div>

          <div className="hero-terminal" aria-label="Live terminal status" onMouseEnter={() => setHudLabel("LIVE TERMINAL")} onMouseLeave={() => setHudLabel("")}>
            <div className="terminal-head"><span><i /><i /><i /></span><small>student@cyberspace:~</small><b>⌁</b></div>
            <div className="terminal-body">
              <p><span className="prompt">$</span> whoami</p>
              <p className="terminal-result">curious_builder<span className="blink">_</span></p>
              <p><span className="prompt">$</span> current_focus</p>
              <p className="terminal-result accent-text">{phrases[typed]}</p>
              <p><span className="prompt">$</span> ./keep-going.sh</p>
              <p className="terminal-result success">[OK] progress detected</p>
            </div>
          </div>

          <div className="cyber-radar" aria-label="Cybersecurity radar">
            <div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-sweep" />
            <span className="radar-dot dot-a" /><span className="radar-dot dot-b" /><span className="radar-dot dot-c" />
            <div className="radar-label label-top">PORT 443 / SECURE</div><div className="radar-label label-bottom">THREAT LEVEL / LOW</div>
            <strong>NET<br />SCAN</strong>
          </div>

          <button className="scroll-cue" onClick={() => scrollToSection("about")}><span>SCROLL TO EXPLORE</span><i>↓</i></button>
        </section>

        <Reveal className="section about-section" delay={0}>
          <section id="about" className="section-inner split-section">
            <div className="section-index">01 / ABOUT</div>
            <div className="section-main">
              <p className="eyebrow">THE PERSON BEHIND THE TERMINAL</p>
              <h2>Learning the <span>language</span> of secure systems.</h2>
              <div className="about-columns">
                <p>My journey started with a simple question: what happens behind the screen? Now I&apos;m studying cybersecurity, practicing Linux, and building interfaces that make technical ideas feel clear.</p>
                <p>I&apos;m early in the journey — and that&apos;s the advantage. Every command is a lesson, every project is a lab, and every bug is an invitation to look closer.</p>
              </div>
              <div className="fact-row"><div><b>01</b><span>YEAR OF STUDY</span></div><div><b>06</b><span>PUBLIC REPOS</span></div><div><b>∞</b><span>QUESTIONS ASKED</span></div></div>
            </div>
          </section>
        </Reveal>

        <Reveal className="section focus-section" delay={100}>
          <section id="focus" className="section-inner split-section">
            <div className="section-index">02 / FOCUS</div>
            <div className="section-main focus-layout">
              <div><p className="eyebrow">CURRENT TRAINING MAP</p><h2>Small steps.<br /><span>Sharp instincts.</span></h2><p className="section-intro">A practical learning loop built around fundamentals, repetition, and making things real.</p></div>
              <div className="skill-list">{skills.map((skill, index) => <div className="skill" key={skill.label}><div className="skill-label"><span>0{index + 1} / {skill.label}</span><b>{skill.value}%</b></div><div className="skill-track"><i style={{ "--skill-value": `${skill.value}%` }} /></div></div>)}</div>
            </div>
          </section>
        </Reveal>

        <Reveal className="section projects-section" delay={150}>
          <section id="projects" className="section-inner">
            <div className="section-heading"><div className="section-index">03 / PROJECTS</div><div><p className="eyebrow">SELECTED LEARNING ARTIFACTS</p><h2>Built while <span>becoming.</span></h2></div><span className="heading-count">03 / 03</span></div>
            <div className="project-grid">{projects.map((project, index) => <a className={`project-card ${project.accent}`} href={project.link} target="_blank" rel="noreferrer" key={project.title} onMouseEnter={() => setHudLabel(`OPEN ${project.title.toUpperCase()}`)} onMouseLeave={() => setHudLabel("")}><div className="project-card-top"><span>{project.number}</span><span>{project.type}</span><b>↗</b></div><div className="project-visual"><span className="visual-bracket">[</span><strong>{index === 0 ? "{ }" : index === 1 ? "⌁" : ">_"}</strong><span className="visual-bracket">]</span><i /></div><div className="project-terminal">{project.terminal.map((line, lineIndex) => <p key={line}><span>{lineIndex === 0 ? "$" : "›"}</span> {line}</p>)}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></a>)}</div>
          </section>
        </Reveal>

        <Reveal className="section contact-section" delay={200}>
          <section id="contact" className="section-inner contact-inner"><div className="contact-signal"><span>04</span><i /><small>CONTACT / SIGNAL</small></div><div><p className="eyebrow">OPEN CHANNEL</p><h2>Let&apos;s make the<br /><span>web safer.</span></h2><p className="section-intro">Always open to learning from people who care about technology, security, and thoughtful digital work.</p><a className="button button-primary" href="mailto:contact@example.com">Start a conversation <span>↗</span></a></div><div className="contact-orbit"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span>AJ</span></div></section>
        </Reveal>
      </main>

      <footer><span>© 2026 TMTERMIN</span><span>BUILT WITH CURIOSITY + CODE</span><span>NO SYSTEM IS FINISHED</span></footer>
    </div>
  );
}

export default App;
