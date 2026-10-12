import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { projects } from "../data/portfolio";

import hangmanImg from "../assets/work/hangman.png";
import prtImg from "../assets/work/prt.png";
import stockdzImg from "../assets/work/stockdz.png";

/* =========================================================
   IMAGES
========================================================= */

const projectImages = {
  hangman: hangmanImg,
  prt: prtImg,
  stockdz: stockdzImg,
};

/* =========================================================
   PROJECT DATA
========================================================= */

const portfolioCards = [
  {
    key: "hangman",
    title: "Hangman",
    category: "WEB GAME",
    type: "PROJECT",
    year: "2026",
    status: "COMPLETED",
    description:
      "An interactive Hangman experience focused on clean interface design, fast interaction, responsive behavior and an enjoyable user experience.",
    tools: ["HTML5", "CSS3", "JavaScript", "UI / UX"],
    tags: ["INTERACTION", "GAME", "RESPONSIVE"],
    image: projectImages.hangman,
    accent: "#d9ff3f",
  },

  {
    key: "prt",
    title: "PRT",
    category: "DIGITAL EXPERIENCE",
    type: "PROJECT",
    year: "2026",
    status: "SELECTED WORK",
    description:
      "A digital experience built around modern interface structure, responsive layouts, visual hierarchy and smooth interactive elements.",
    tools: ["React", "JavaScript", "CSS", "UI / UX"],
    tags: ["INTERFACE", "WEB", "MOTION"],
    image: projectImages.prt,
    accent: "#a78bfa",
  },

  {
    key: "stockdz",
    title: "StockDZ",
    category: "DATA DASHBOARD",
    type: "PROJECT",
    year: "2026",
    status: "IN DEVELOPMENT",
    description:
      "A dashboard concept centered around data visualization, structured information, clear hierarchy and efficient digital interaction.",
    tools: ["React", "JavaScript", "Charts", "UI / UX"],
    tags: ["DATA", "DASHBOARD", "ANALYTICS"],
    image: projectImages.stockdz,
    accent: "#55e6ff",
  },

  {
    key: "creative-portfolio",
    title: "Creative Portfolio",
    category: "PORTFOLIO SYSTEM",
    type: "CONCEPT",
    year: "2026",
    status: "CONCEPT",
    description:
      "A premium creative developer portfolio combining editorial typography, interactive sections, motion, responsive layouts and a strong visual identity.",
    tools: ["React", "JavaScript", "CSS", "UI / UX", "Motion"],
    tags: ["CREATIVE DEV", "MOTION", "EDITORIAL"],
    accent: "#ff7ad9",
    visual: "portfolio",
  },

  {
    key: "ai-analytics",
    title: "AI Analytics Lab",
    category: "AI / DATA",
    type: "CONCEPT",
    year: "2026",
    status: "EXPERIMENTAL",
    description:
      "An experimental interface concept for presenting data and machine-learning workflows through clean dashboards, visual analytics and structured information.",
    tools: [
      "Python",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Machine Learning",
    ],
    tags: ["PYTHON", "DATA", "AI"],
    accent: "#8affc1",
    visual: "ai",
  },

  {
    key: "digital-systems",
    title: "Digital Systems",
    category: "FULL STACK",
    type: "CONCEPT",
    year: "2026",
    status: "EXPERIMENTAL",
    description:
      "A full-stack product concept focused on modern web architecture, reusable components, responsive interfaces and a scalable digital experience.",
    tools: ["React", "Node.js", "JavaScript", "Git", "MongoDB"],
    tags: ["FULL STACK", "SYSTEM", "WEB APP"],
    accent: "#ffb86b",
    visual: "system",
  },
];

/* =========================================================
   ARROW
========================================================= */

function ArrowIcon({ left = false }) {
  return (
    <svg
      className={`wgx-arrow ${left ? "wgx-arrow-left" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </svg>
  );
}

/* =========================================================
   CONCEPT VISUAL
========================================================= */

function ConceptVisual({ type, accent }) {
  if (type === "portfolio") {
    return (
      <div
        className="wgx-visual wgx-visual-portfolio"
        style={{ "--visual-accent": accent }}
      >
        <div className="wgx-browser">
          <div className="wgx-browser-top">
            <span />
            <span />
            <span />
          </div>

          <div className="wgx-browser-body">
            <small>CREATIVE / DIGITAL</small>

            <strong>
              CODE
              <br />
              <em>CREATE.</em>
            </strong>

            <div className="wgx-browser-lines">
              <i />
              <i />
              <i />
            </div>

            <div className="wgx-browser-square" />
          </div>
        </div>

        <div className="wgx-floating-shape shape-one" />
        <div className="wgx-floating-shape shape-two" />
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div
        className="wgx-visual wgx-visual-ai"
        style={{ "--visual-accent": accent }}
      >
        <div className="wgx-ai-grid" />

        <div className="wgx-orbit orbit-a" />
        <div className="wgx-orbit orbit-b" />
        <div className="wgx-orbit orbit-c" />

        <div className="wgx-ai-core">
          <span>AI</span>
        </div>

        <div className="wgx-ai-number number-a">98.4</div>
        <div className="wgx-ai-number number-b">72.1</div>
        <div className="wgx-ai-number number-c">43.8</div>
      </div>
    );
  }

  return (
    <div
      className="wgx-visual wgx-visual-system"
      style={{ "--visual-accent": accent }}
    >
      <div className="wgx-system-line line-a" />
      <div className="wgx-system-line line-b" />
      <div className="wgx-system-line line-c" />

      <div className="wgx-system-node node-a">UI</div>
      <div className="wgx-system-node node-b">API</div>
      <div className="wgx-system-node node-c">DB</div>
      <div className="wgx-system-node node-d">WEB</div>

      <div className="wgx-system-center">SYSTEM</div>
    </div>
  );
}

/* =========================================================
   CARD
========================================================= */

function ProjectCard({
  project,
  position,
  active,
  onClick,
}) {
  const cardRef = useRef(null);

  const isCenter = position === "center";

  const handleMouseMove = (event) => {
    if (!isCenter) return;

    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width - 0.5) * 2;

    const y =
      ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    card.style.setProperty("--tilt-x", `${x * 3}deg`);
    card.style.setProperty("--tilt-y", `${y * -2.2}deg`);

    card.style.setProperty(
      "--spot-x",
      `${((event.clientX - rect.left) / rect.width) * 100}%`
    );

    card.style.setProperty(
      "--spot-y",
      `${((event.clientY - rect.top) / rect.height) * 100}%`
    );
  };

  const handleMouseLeave = () => {
    cardRef.current?.style.setProperty("--tilt-x", "0deg");
    cardRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article
      ref={cardRef}
      className={`
        wgx-card
        wgx-card-${position}
        ${active ? "wgx-card-active" : ""}
      `}
      style={{
        "--card-accent": project.accent,
        "--tilt-x": "0deg",
        "--tilt-y": "0deg",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* IMAGE / VISUAL */}

      <div className="wgx-media">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            draggable="false"
            loading={isCenter ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <ConceptVisual
            type={project.visual}
            accent={project.accent}
          />
        )}

        <div className="wgx-media-overlay" />
        <div className="wgx-media-vignette" />
        <div className="wgx-media-shine" />
        <div className="wgx-scan" />
      </div>

      {/* TOP */}

      <div className="wgx-top">
        <div className="wgx-index">
          <i />
          <span>
            PROJECT / {project.number}
          </span>
        </div>

        <span className="wgx-type">
          {project.type}
        </span>
      </div>

      {/* CATEGORY */}

      <div className="wgx-category">
        {project.category}
      </div>

      {/* NUMBER */}

      <div className="wgx-big-number">
        {project.number}
      </div>

      {/* SIDE STATUS */}

      <div className="wgx-side-status">
        <i />
        {project.status}
      </div>

      {/* CORNERS */}

      <div className="wgx-corners">
        <i />
        <i />
        <i />
        <i />
      </div>

      {/* CONTENT */}

      <div className="wgx-panel">
        <div className="wgx-selected">
          <span />
          {active ? "SELECTED PROJECT" : project.type}
        </div>

        <div className="wgx-title-row">
          <h3>{project.title}</h3>

          <div className="wgx-open">
            ↗
          </div>
        </div>

        <p className="wgx-description">
          {project.description}
        </p>

        <div className="wgx-tags">
          {project.tags.map((tag) => (
            <span key={tag}>
              <i />
              {tag}
            </span>
          ))}
        </div>

        <div className="wgx-tools">
          {project.tools.map((tool) => (
            <span key={tool}>
              {tool}
            </span>
          ))}
        </div>

        <div className="wgx-footer">
          <div>
            <small>YEAR</small>
            <strong>{project.year}</strong>
          </div>

          <div>
            <small>STATUS</small>
            <strong>{project.status}</strong>
          </div>

          <button
            type="button"
            className="wgx-explore"
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onPointerUp={(event) => {
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <span>EXPLORE</span>
            <b>↗</b>
          </button>
        </div>
      </div>

      <div className="wgx-spotlight" />
    </article>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function WorkGallery() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const resumeTimerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [paused, setPaused] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  /* =======================================================
     DATA
  ======================================================= */

  const cards = useMemo(() => {
    const source = Array.isArray(projects)
      ? projects
      : [];

    return portfolioCards.map((card, index) => {
      const matchingProject = source.find((item) => {
        const text = `
          ${item?.slug || ""}
          ${item?.id || ""}
          ${item?.title || ""}
          ${item?.name || ""}
        `.toLowerCase();

        return text.includes(
          card.key.replaceAll("-", " ")
        );
      });

      return {
        ...card,

        number: String(index + 1).padStart(2, "0"),

        description:
          matchingProject?.description ||
          card.description,

        link:
          matchingProject?.link ||
          matchingProject?.url ||
          "#",
      };
    });
  }, []);

  const total = cards.length;

  const normalizeIndex = useCallback(
    (index) => {
      if (!total) return 0;

      return (index + total) % total;
    },
    [total]
  );

  const active = cards[normalizeIndex(activeIndex)];

  const left = cards[
    normalizeIndex(activeIndex - 1)
  ];

  const right = cards[
    normalizeIndex(activeIndex + 1)
  ];

  /* =======================================================
     REVEAL
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
          setInViewport(entry.isIntersecting);
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.08,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const next = useCallback(() => {
    setActiveIndex((current) =>
      normalizeIndex(current + 1)
    );

  }, [normalizeIndex]);

  const previous = useCallback(() => {
    setActiveIndex((current) =>
      normalizeIndex(current - 1)
    );

  }, [normalizeIndex]);

  const goTo = useCallback(
    (index) => {
      setActiveIndex(normalizeIndex(index));
    },
    [normalizeIndex]
  );

  /* =======================================================
     AUTOPLAY
  ======================================================= */

  useEffect(() => {
    if (paused || dragging || !inViewport || total < 2) {
      return;
    }

    const timer = setTimeout(() => {
      setActiveIndex((index) => normalizeIndex(index + 1));
    }, 6500);

    return () => clearTimeout(timer);
  }, [
    paused,
    dragging,
    inViewport,
    total,
    normalizeIndex,
  ]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        setPaused(true);
      } else {
        setPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        next();
      }

      if (event.key === "ArrowLeft") {
        previous();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [next, previous]);

  /* =======================================================
     POINTER DOWN
  ======================================================= */

  const handlePointerDown = (event) => {
    /*
      IMPORTANT:
      Do not start drag when user clicks
      a button / link / interactive element.
    */

    if (
      event.target.closest(
        "button, a, input, textarea, select"
      )
    ) {
      return;
    }

    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    setDragging(true);
    setPaused(true);

    setDragStart(event.clientX);
    setDragDistance(0);

    try {
      stageRef.current?.setPointerCapture?.(
        event.pointerId
      );
    } catch {}
  };

  /* =======================================================
     POINTER MOVE
  ======================================================= */

  const handlePointerMove = (event) => {
    if (!dragging) return;

    setDragDistance(
      event.clientX - dragStart
    );
  };

  /* =======================================================
     POINTER UP
  ======================================================= */

  const handlePointerUp = (event) => {
    if (!dragging) return;

    const threshold = 70;

    if (dragDistance < -threshold) {
      next();
    }

    if (dragDistance > threshold) {
      previous();
    }

    setDragging(false);
    setDragDistance(0);

    try {
      stageRef.current?.releasePointerCapture?.(
        event.pointerId
      );
    } catch {}

    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setPaused(false);
    }, 450);
  };

  useEffect(() => () => window.clearTimeout(resumeTimerRef.current), []);

  /* =======================================================
     RETURN
  ======================================================= */

  if (!active) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={`
        wgx-section
        ${visible ? "wgx-visible" : ""}
      `}
      style={{
        "--active-accent": active.accent,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* BACKGROUND */}

      <div className="wgx-bg" />
      <div className="wgx-grid" />
      <div className="wgx-aura" />
      <div className="wgx-noise" />

      {/* HEADER */}

      <header className="wgx-header">
        <div className="wgx-header-left">
          <span>03</span>
          <i />
          <small>SELECTED WORK</small>
        </div>

        <div className="wgx-header-right">
          <span>{String(total).padStart(2, "0")} PROJECTS</span>

          <b>
            <i />
            AVAILABLE
          </b>
        </div>
      </header>

      {/* INTRO */}

      <div className="wgx-intro">
        <div>
          <span>
            WORK / PROJECTS / DIGITAL EXPERIENCES
          </span>

          <h2>
            Selected
            <br />
            <em>work.</em>
          </h2>
        </div>

        <div className="wgx-intro-copy">
          <p>
            A collection of interfaces, web
            experiences, data concepts and
            digital systems built around code,
            design and interaction.
          </p>

          <div>
            <span>DRAG</span>
            <i />
            <span>EXPLORE</span>
            <i />
            <span>DISCOVER</span>
          </div>
        </div>
      </div>

      {/* STAGE */}

      <div
        ref={stageRef}
        className={`
          wgx-stage
          ${dragging ? "wgx-stage-dragging" : ""}
        `}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          setDragging(false);
          setDragDistance(0);
          setPaused(false);
        }}
      >
        {/* LEFT CARD */}

        <ProjectCard
          project={left}
          position="left"
          active={false}
          onClick={previous}
        />

        {/* CENTER CARD */}

        <ProjectCard
          project={active}
          position="center"
          active
          onClick={() => {}}
        />

        {/* RIGHT CARD */}

        <ProjectCard
          project={right}
          position="right"
          active={false}
          onClick={next}
        />

        {/* =================================================
            PREVIOUS BUTTON
        ================================================= */}

        <button
          type="button"
          className="
            wgx-nav
            wgx-nav-left
          "
          aria-label="Previous project"
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onPointerUp={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            previous();
          }}
        >
          <ArrowIcon left />

          <span>PREV</span>
        </button>

        {/* =================================================
            NEXT BUTTON
        ================================================= */}

        <button
          type="button"
          className="
            wgx-nav
            wgx-nav-right
          "
          aria-label="Next project"
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onPointerUp={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            next();
          }}
        >
          <span>NEXT</span>

          <ArrowIcon />
        </button>
      </div>

      {/* META */}

      <div className="wgx-meta">
        <div className="wgx-counter">
          <strong>{active.number}</strong>
          <span>/</span>
          <small>{String(total).padStart(2, "0")}</small>
        </div>

        <div className="wgx-dots">
          {cards.map((project, index) => (
            <button
              key={project.key}
              type="button"
              className={
                index === activeIndex
                  ? "active"
                  : ""
              }
              style={{
                "--dot-accent":
                  project.accent,
              }}
              onClick={(event) => {
                event.stopPropagation();
                goTo(index);
              }}
              aria-label={`Open ${project.title}`}
            >
              <span />
            </button>
          ))}
        </div>

        <div className="wgx-auto">
          <span>
            {paused ? "PAUSED" : "AUTO PLAY"}
          </span>

          <div>
            <i
              key={`${activeIndex}-${paused}`}
              className={paused ? "wgx-auto-progress-paused" : ""}
            />
          </div>
        </div>
      </div>

      {/* MARQUEE */}

      <div className="wgx-marquee">
        <div className="wgx-marquee-track">
          {[0, 1].map((item) => (
            <div
              className="wgx-marquee-group"
              key={item}
            >
              <span>DESIGN</span>
              <b>✦</b>
              <span>CODE</span>
              <b>✦</b>
              <span>BUILD</span>
              <b>✦</b>
              <span>CREATE</span>
              <b>✦</b>
              <span>DIGITAL</span>
              <b>✦</b>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`
        .wgx-section,
        .wgx-section * {
          box-sizing: border-box;
        }

        .wgx-section {
          --white: #f5f5f0;
          --muted: rgba(255,255,255,.42);
          --line: rgba(255,255,255,.09);

          position: relative;
          width: 100%;
          min-height: 100vh;

          padding:
            34px
            50px
            70px;

          overflow: hidden;

          background: #050505;
          color: var(--white);

          isolation: isolate;

          font-family:
            Inter,
            Arial,
            sans-serif;
        }

        /* =====================================================
           BACKGROUND
        ===================================================== */

        .wgx-bg {
          position: absolute;
          inset: 0;
          z-index: -10;

          background:
            radial-gradient(
              circle at 50% 48%,
              color-mix(
                in srgb,
                var(--active-accent) 11%,
                transparent
              ),
              transparent 38%
            ),
            #050505;
        }

        .wgx-grid {
          position: absolute;
          inset: 0;
          z-index: -9;

          background-image:
            linear-gradient(
              rgba(255,255,255,.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.035) 1px,
              transparent 1px
            );

          background-size: 75px 75px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 15%,
              black 85%,
              transparent
            );
        }

        .wgx-aura {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 700px;
          height: 700px;

          transform:
            translate(-50%, -50%);

          z-index: -8;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              color-mix(
                in srgb,
                var(--active-accent) 14%,
                transparent
              ),
              transparent 68%
            );

          filter: blur(75px);

          animation:
            wgx-aura-animation
            8s
            ease-in-out
            infinite;
        }

        @keyframes wgx-aura-animation {
          0%,
          100% {
            opacity: .4;
            transform:
              translate(-50%, -50%)
              scale(.9);
          }

          50% {
            opacity: .8;
            transform:
              translate(-50%, -50%)
              scale(1.1);
          }
        }

        .wgx-noise {
          position: absolute;
          inset: -50%;
          z-index: 100;

          pointer-events: none;

          opacity: .025;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");

          animation:
            wgx-noise-animation
            .3s
            steps(2)
            infinite;
        }

        @keyframes wgx-noise-animation {
          0% { transform: translate(0,0); }
          25% { transform: translate(2%,-1%); }
          50% { transform: translate(-1%,2%); }
          75% { transform: translate(1%,1%); }
          100% { transform: translate(0,0); }
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .wgx-header {
          position: relative;
          z-index: 200;

          display: flex;
          justify-content: space-between;
          align-items: center;

          padding-bottom: 18px;

          border-bottom:
            1px solid
            var(--line);
        }

        .wgx-header-left,
        .wgx-header-right {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .wgx-header-left > span {
          font-family: monospace;
          font-size: 11px;
          color: var(--active-accent);
        }

        .wgx-header-left i {
          width: 60px;
          height: 1px;
          background: rgba(255,255,255,.2);
        }

        .wgx-header small,
        .wgx-header-right > span {
          font-family: monospace;
          font-size: 7px;
          letter-spacing: .18em;
          color: rgba(255,255,255,.3);
        }

        .wgx-header-right b {
          display: flex;
          align-items: center;
          gap: 7px;

          font-family: monospace;
          font-size: 7px;
          font-weight: 400;
          letter-spacing: .15em;

          color: rgba(255,255,255,.4);
        }

        .wgx-header-right b i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            var(--active-accent);

          box-shadow:
            0 0 12px
            var(--active-accent);

          animation:
            wgx-blink
            1.5s
            ease-in-out
            infinite;
        }

        @keyframes wgx-blink {
          0%,100% { opacity: .3; }
          50% { opacity: 1; }
        }

        /* =====================================================
           INTRO
        ===================================================== */

        .wgx-intro {
          position: relative;
          z-index: 20;

          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          margin-top: 48px;
        }

        .wgx-intro > div:first-child > span {
          display: block;

          margin-bottom: 17px;

          font-family: monospace;
          font-size: 7px;
          letter-spacing: .2em;

          color:
            var(--active-accent);
        }

        .wgx-intro h2 {
          margin: 0;

          font-size:
            clamp(58px, 8vw, 125px);

          line-height: .79;
          letter-spacing: -.075em;

          text-transform: uppercase;

          font-weight: 850;
        }

        .wgx-intro h2 em {
          font-style: italic;
          font-weight: 350;
          color: rgba(255,255,255,.23);
        }

        .wgx-intro-copy {
          width: 300px;
        }

        .wgx-intro-copy p {
          margin: 0;

          font-size: 10px;
          line-height: 1.8;

          color: rgba(255,255,255,.4);
        }

        .wgx-intro-copy > div {
          display: flex;
          align-items: center;

          gap: 8px;

          margin-top: 20px;

          font-family: monospace;
          font-size: 6px;
          letter-spacing: .14em;

          color: rgba(255,255,255,.25);
        }

        .wgx-intro-copy i {
          width: 20px;
          height: 1px;

          background:
            rgba(255,255,255,.12);
        }

        /* =====================================================
           STAGE
        ===================================================== */

        .wgx-stage {
          position: relative;

          width: 100%;
          height: 650px;

          margin-top: 25px;

          touch-action: pan-y;
          user-select: none;
        }

        .wgx-stage-dragging {
          cursor: grabbing;
        }

        /* =====================================================
           CARD
        ===================================================== */

        .wgx-card {
          position: absolute;

          left: 50%;
          top: 50%;

          width:
            min(620px, 47vw);

          height: 575px;

          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.14);

          background: #080808;

          cursor: pointer;

          transform-style: preserve-3d;

          transition:
            transform .75s
              cubic-bezier(.16,1,.3,1),
            opacity .6s ease,
            filter .6s ease,
            border-color .4s ease,
            box-shadow .5s ease;

          box-shadow:
            0 35px 100px
            rgba(0,0,0,.65);
        }

        .wgx-card-center {
          z-index: 300;

          transform:
            translate(-50%, -50%);
        }

        .wgx-card-center:hover {
          box-shadow:
            0 45px 130px
            rgba(0,0,0,.8),
            0 0 90px
            color-mix(
              in srgb,
              var(--card-accent) 10%,
              transparent
            );
        }

        .wgx-card-left {
          z-index: 100;

          transform:
            translate(
              calc(-50% - 34vw),
              -50%
            )
            scale(.86)
            rotateY(10deg);

          opacity: .3;

          filter:
            brightness(.6)
            saturate(.65);
        }

        .wgx-card-left:hover {
          opacity: .6;

          transform:
            translate(
              calc(-50% - 33vw),
              -50%
            )
            scale(.89)
            rotateY(7deg);
        }

        .wgx-card-right {
          z-index: 100;

          transform:
            translate(
              calc(-50% + 34vw),
              -50%
            )
            scale(.86)
            rotateY(-10deg);

          opacity: .3;

          filter:
            brightness(.6)
            saturate(.65);
        }

        .wgx-card-right:hover {
          opacity: .6;

          transform:
            translate(
              calc(-50% + 33vw),
              -50%
            )
            scale(.89)
            rotateY(-7deg);
        }

        /* =====================================================
           MEDIA
        ===================================================== */

        .wgx-media {
          position: absolute;
          inset: 0;

          overflow: hidden;

          background: #090909;
        }

        .wgx-media > img {
          position: absolute;

          width: 100%;
          height: 100%;

          object-fit: cover;

          display: block;

          transition:
            transform 1s
              cubic-bezier(.16,1,.3,1),
            filter .6s ease;
        }

        .wgx-card-center:hover
        .wgx-media > img {
          transform: scale(1.06);

          filter:
            saturate(1.08)
            contrast(1.04);
        }

        .wgx-media-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              to bottom,
              rgba(0,0,0,.02),
              transparent 35%,
              rgba(0,0,0,.15) 50%,
              rgba(0,0,0,.96) 100%
            );
        }

        .wgx-media-vignette {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 50% 40%,
              transparent 15%,
              rgba(0,0,0,.3) 100%
            );
        }

        .wgx-media-shine {
          position: absolute;
          inset: -60%;

          background:
            linear-gradient(
              115deg,
              transparent 40%,
              rgba(255,255,255,.13) 50%,
              transparent 60%
            );

          opacity: 0;

          transform:
            translateX(-35%)
            rotate(7deg);

          transition:
            opacity .3s ease,
            transform 1.1s
              cubic-bezier(.16,1,.3,1);
        }

        .wgx-card-center:hover
        .wgx-media-shine {
          opacity: 1;

          transform:
            translateX(35%)
            rotate(7deg);
        }

        /* =====================================================
           SCAN
        ===================================================== */

        .wgx-scan {
          position: absolute;

          left: 0;
          right: 0;
          top: 0;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--card-accent),
              transparent
            );

          box-shadow:
            0 0 18px
            var(--card-accent);

          opacity: .6;

          animation:
            wgx-scan
            5s
            linear
            infinite;
        }

        @keyframes wgx-scan {
          from {
            transform: translateY(0);
            opacity: 0;
          }

          10% {
            opacity: .7;
          }

          90% {
            opacity: .7;
          }

          to {
            transform:
              translateY(575px);
            opacity: 0;
          }
        }

        /* =====================================================
           TOP
        ===================================================== */

        .wgx-top {
          position: absolute;

          left: 23px;
          right: 23px;
          top: 21px;

          z-index: 200;

          display: flex;
          justify-content: space-between;
          align-items: center;

          font-family: monospace;
          font-size: 7px;
          letter-spacing: .14em;
        }

        .wgx-index {
          display: flex;
          align-items: center;

          gap: 8px;

          color:
            rgba(255,255,255,.5);
        }

        .wgx-index i {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            var(--card-accent);

          box-shadow:
            0 0 10px
            var(--card-accent);
        }

        .wgx-type {
          color:
            rgba(255,255,255,.38);
        }

        .wgx-category {
          position: absolute;

          top: 65px;
          left: 23px;

          z-index: 150;

          font-family: monospace;

          font-size: 7px;

          letter-spacing: .2em;

          color:
            rgba(255,255,255,.32);
        }

        .wgx-big-number {
          position: absolute;

          top: 55px;
          right: -5px;

          z-index: 3;

          font-size:
            clamp(
              100px,
              11vw,
              170px
            );

          line-height: .8;
          font-weight: 900;

          letter-spacing: -.12em;

          color:
            rgba(255,255,255,.045);
        }

        .wgx-side-status {
          position: absolute;

          left: 21px;
          top: 50%;

          z-index: 200;

          display: flex;
          align-items: center;

          gap: 8px;

          transform:
            rotate(-90deg)
            translateX(-50%);

          transform-origin:
            left center;

          font-family: monospace;
          font-size: 6px;
          letter-spacing: .18em;

          color:
            rgba(255,255,255,.3);
        }

        .wgx-side-status i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            var(--card-accent);

          box-shadow:
            0 0 10px
            var(--card-accent);
        }

        /* =====================================================
           CORNERS
        ===================================================== */

        .wgx-corners {
          position: absolute;
          inset: 0;

          z-index: 250;

          pointer-events: none;
        }

        .wgx-corners i {
          position: absolute;

          width: 25px;
          height: 25px;

          border-color:
            var(--card-accent);

          border-style: solid;

          opacity: .65;

          transition:
            width .5s ease,
            height .5s ease,
            opacity .5s ease;
        }

        .wgx-corners i:nth-child(1) {
          left: 10px;
          top: 10px;
          border-width: 1px 0 0 1px;
        }

        .wgx-corners i:nth-child(2) {
          right: 10px;
          top: 10px;
          border-width: 1px 1px 0 0;
        }

        .wgx-corners i:nth-child(3) {
          left: 10px;
          bottom: 10px;
          border-width: 0 0 1px 1px;
        }

        .wgx-corners i:nth-child(4) {
          right: 10px;
          bottom: 10px;
          border-width: 0 1px 1px 0;
        }

        .wgx-card:hover
        .wgx-corners i {
          width: 34px;
          height: 34px;
          opacity: 1;
        }

        /* =====================================================
           PANEL
        ===================================================== */

        .wgx-panel {
          position: absolute;

          left: 22px;
          right: 22px;
          bottom: 20px;

          z-index: 240;

          padding:
            20px
            20px
            16px;

          border:
            1px solid
            rgba(255,255,255,.12);

          background:
            linear-gradient(
              145deg,
              rgba(10,10,10,.82),
              rgba(2,2,2,.96)
            );

          backdrop-filter:
            blur(20px);

          -webkit-backdrop-filter:
            blur(20px);

          box-shadow:
            0 25px 60px
            rgba(0,0,0,.45);

          transform:
            translateZ(45px);
        }

        .wgx-panel::before {
          content: "";

          position: absolute;

          left: 0;
          top: 0;

          width: 48%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              var(--card-accent),
              transparent
            );

          box-shadow:
            0 0 15px
            var(--card-accent);
        }

        .wgx-selected {
          display: flex;
          align-items: center;

          gap: 8px;

          font-family: monospace;

          font-size: 6px;
          letter-spacing: .17em;

          color:
            rgba(255,255,255,.38);
        }

        .wgx-selected span {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            var(--card-accent);

          box-shadow:
            0 0 9px
            var(--card-accent);
        }

        .wgx-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 15px;

          margin-top: 8px;
        }

        .wgx-title-row h3 {
          margin: 0;

          font-size:
            clamp(
              38px,
              4.5vw,
              65px
            );

          line-height: .88;

          font-weight: 850;

          letter-spacing: -.07em;

          text-transform: uppercase;
        }

        .wgx-open {
          flex: 0 0 37px;

          width: 37px;
          height: 37px;

          display: grid;
          place-items: center;

          border:
            1px solid
            rgba(255,255,255,.14);

          color:
            var(--card-accent);

          font-size: 18px;

          transition:
            transform .35s ease,
            background .35s ease;
        }

        .wgx-card-center:hover
        .wgx-open {
          transform:
            translate(3px,-3px);

          background:
            color-mix(
              in srgb,
              var(--card-accent) 8%,
              transparent
            );
        }

        .wgx-description {
          margin:
            12px 0 0;

          max-width: 480px;

          font-size: 9px;
          line-height: 1.7;

          color:
            rgba(255,255,255,.43);
        }

        .wgx-tags,
        .wgx-tools {
          display: flex;
          flex-wrap: wrap;

          gap: 5px;
        }

        .wgx-tags {
          margin-top: 11px;
        }

        .wgx-tags span {
          display: inline-flex;
          align-items: center;

          gap: 5px;

          padding: 5px 7px;

          border:
            1px solid
            rgba(255,255,255,.1);

          background:
            rgba(255,255,255,.025);

          font-family: monospace;
          font-size: 5px;

          letter-spacing: .1em;

          color:
            rgba(255,255,255,.38);
        }

        .wgx-tags i {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            var(--card-accent);
        }

        .wgx-tools {
          margin-top: 10px;
        }

        .wgx-tools span {
          padding: 5px 7px;

          background:
            rgba(255,255,255,.055);

          border:
            1px solid
            rgba(255,255,255,.08);

          font-family: monospace;
          font-size: 5px;

          color:
            rgba(255,255,255,.5);

          transition:
            border-color .25s ease,
            color .25s ease;
        }

        .wgx-tools span:hover {
          color: #fff;

          border-color:
            var(--card-accent);
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .wgx-footer {
          display: grid;

          grid-template-columns:
            auto
            auto
            1fr;

          align-items: end;

          gap: 20px;

          margin-top: 13px;
          padding-top: 11px;

          border-top:
            1px solid
            rgba(255,255,255,.08);
        }

        .wgx-footer > div {
          display: flex;
          flex-direction: column;

          gap: 4px;
        }

        .wgx-footer small {
          font-family: monospace;

          font-size: 5px;
          letter-spacing: .14em;

          color:
            rgba(255,255,255,.25);
        }

        .wgx-footer strong {
          font-family: monospace;

          font-size: 6px;
          letter-spacing: .1em;

          color:
            var(--card-accent);
        }

        .wgx-explore {
          justify-self: end;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          min-width: 105px;

          padding: 9px 10px;

          border:
            1px solid
            rgba(255,255,255,.14);

          background:
            rgba(255,255,255,.03);

          color: #fff;

          cursor: pointer;

          font-family: monospace;
          font-size: 6px;

          letter-spacing: .1em;

          transition:
            transform .3s ease,
            border-color .3s ease,
            background .3s ease;
        }

        .wgx-explore:hover {
          transform:
            translateY(-2px);

          border-color:
            var(--card-accent);

          background:
            color-mix(
              in srgb,
              var(--card-accent) 8%,
              transparent
            );
        }

        .wgx-explore b {
          color:
            var(--card-accent);

          font-size: 13px;
        }

        /* =====================================================
           SPOTLIGHT
        ===================================================== */

        .wgx-spotlight {
          position: absolute;
          inset: 0;

          z-index: 235;

          pointer-events: none;

          background:
            radial-gradient(
              circle at
              var(--spot-x, 50%)
              var(--spot-y, 50%),
              color-mix(
                in srgb,
                var(--card-accent) 12%,
                transparent
              ),
              transparent 28%
            );

          opacity: 0;

          transition:
            opacity .4s ease;
        }

        .wgx-card-center:hover
        .wgx-spotlight {
          opacity: 1;
        }

        /* =====================================================
           NAVIGATION — FIXED
        ===================================================== */

        .wgx-nav {
          position: absolute;

          top: 50%;

          z-index: 9999;

          width: 100px;
          height: 55px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 12px;

          transform:
            translateY(-50%);

          border:
            1px solid
            rgba(255,255,255,.16);

          background:
            rgba(5,5,5,.86);

          backdrop-filter:
            blur(16px);

          -webkit-backdrop-filter:
            blur(16px);

          color: white;

          cursor: pointer;

          pointer-events: auto;

          user-select: none;

          touch-action: manipulation;

          font: inherit;

          transition:
            transform .3s ease,
            border-color .3s ease,
            background .3s ease;
        }

        .wgx-nav:hover {
          transform:
            translateY(-50%)
            scale(1.05);

          border-color:
            var(--active-accent);

          background:
            color-mix(
              in srgb,
              var(--active-accent) 8%,
              rgba(5,5,5,.9)
            );
        }

        .wgx-nav:active {
          transform:
            translateY(-50%)
            scale(.96);
        }

        .wgx-nav-left {
          left: 3%;
        }

        .wgx-nav-right {
          right: 3%;
        }

        .wgx-nav span {
          font-family: monospace;

          font-size: 6px;

          letter-spacing: .16em;

          color:
            rgba(255,255,255,.5);
        }

        .wgx-arrow {
          width: 17px;
          height: 17px;

          stroke:
            var(--active-accent);

          stroke-width: 1.4;

          stroke-linecap: round;
          stroke-linejoin: round;

          transition:
            transform .3s ease;
        }

        .wgx-arrow-left {
          transform:
            rotate(180deg);
        }

        .wgx-nav-left:hover
        .wgx-arrow-left {
          transform:
            rotate(180deg)
            translateX(3px);
        }

        .wgx-nav-right:hover
        .wgx-arrow {
          transform:
            translateX(3px);
        }

        /* =====================================================
           META
        ===================================================== */

        .wgx-meta {
          position: relative;

          z-index: 300;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: center;

          margin-top: -2px;
        }

        .wgx-counter {
          display: flex;
          align-items: baseline;

          gap: 7px;

          font-family: monospace;

          color:
            rgba(255,255,255,.3);
        }

        .wgx-counter strong {
          font-size: 18px;
          color: #fff;
        }

        .wgx-counter small {
          font-size: 7px;
        }

        .wgx-counter span {
          font-size: 8px;
        }

        .wgx-dots {
          display: flex;
          gap: 7px;
        }

        .wgx-dots button {
          position: relative;

          width: 25px;
          height: 20px;

          padding: 0;

          border: 0;

          background: transparent;

          cursor: pointer;
        }

        .wgx-dots button span {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          transform:
            translate(-50%,-50%);

          background:
            rgba(255,255,255,.18);

          transition:
            width .3s ease,
            height .3s ease,
            background .3s ease,
            box-shadow .3s ease;
        }

        .wgx-dots button.active span {
          width: 9px;
          height: 9px;

          background:
            var(--dot-accent);

          box-shadow:
            0 0 14px
            var(--dot-accent);
        }

        .wgx-auto {
          justify-self: end;

          display: flex;
          align-items: center;

          gap: 12px;

          font-family: monospace;
          font-size: 6px;

          letter-spacing: .14em;

          color:
            rgba(255,255,255,.28);
        }

        .wgx-auto > div {
          width: 80px;
          height: 1px;

          background:
            rgba(255,255,255,.1);
        }

        .wgx-auto i {
          display: block;

          width: 100%;

          height: 100%;

          background:
            var(--active-accent);

          box-shadow:
            0 0 10px
            var(--active-accent);

          transform-origin: left;
          animation: wgx-autoplay-progress 6.5s linear both;
        }

        .wgx-auto-progress-paused {
          animation-play-state: paused !important;
        }

        @keyframes wgx-autoplay-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        /* =====================================================
           MARQUEE
        ===================================================== */

        .wgx-marquee {
          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          height: 42px;

          overflow: hidden;

          border-top:
            1px solid
            rgba(255,255,255,.06);

          border-bottom:
            1px solid
            rgba(255,255,255,.06);

          z-index: 30;
        }

        .wgx-marquee-track {
          display: flex;

          width: max-content;

          animation:
            wgx-marquee
            22s
            linear
            infinite;
        }

        .wgx-marquee-group {
          display: flex;
          align-items: center;

          gap: 25px;

          padding-right: 25px;

          white-space: nowrap;
        }

        .wgx-marquee-group span {
          font-size: 10px;

          font-weight: 700;

          letter-spacing: .12em;

          color:
            rgba(255,255,255,.15);
        }

        .wgx-marquee-group b {
          font-size: 8px;

          color:
            var(--active-accent);
        }

        @keyframes wgx-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        /* =====================================================
           CONCEPT VISUALS
        ===================================================== */

        .wgx-visual {
          position: absolute;
          inset: 0;

          overflow: hidden;

          background: #080808;
        }

        .wgx-visual-portfolio {
          background:
            radial-gradient(
              circle at 70% 30%,
              color-mix(
                in srgb,
                var(--visual-accent) 16%,
                transparent
              ),
              transparent 35%
            ),
            #080808;
        }

        .wgx-browser {
          position: absolute;

          left: 12%;
          right: 12%;
          top: 15%;
          bottom: 13%;

          border:
            1px solid
            rgba(255,255,255,.16);

          background:
            rgba(255,255,255,.025);

          transform:
            perspective(900px)
            rotateX(7deg)
            rotateY(-7deg);

          box-shadow:
            30px 35px 80px
            rgba(0,0,0,.6);
        }

        .wgx-browser-top {
          height: 30px;

          display: flex;
          align-items: center;

          gap: 6px;

          padding: 0 12px;

          border-bottom:
            1px solid
            rgba(255,255,255,.08);
        }

        .wgx-browser-top span {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.25);
        }

        .wgx-browser-body {
          position: relative;

          height:
            calc(100% - 30px);

          padding: 35px;
        }

        .wgx-browser-body small {
          font-family: monospace;
          font-size: 6px;

          letter-spacing: .2em;

          color:
            var(--visual-accent);
        }

        .wgx-browser-body strong {
          display: block;

          margin-top: 25px;

          font-size:
            clamp(40px,6vw,80px);

          line-height: .8;

          font-weight: 900;

          letter-spacing: -.08em;
        }

        .wgx-browser-body em {
          color: transparent;

          -webkit-text-stroke:
            1px
            rgba(255,255,255,.5);

          font-style: italic;
        }

        .wgx-browser-lines {
          display: flex;
          flex-direction: column;

          gap: 7px;

          margin-top: 35px;
        }

        .wgx-browser-lines i {
          display: block;

          width: 55%;
          height: 2px;

          background:
            rgba(255,255,255,.15);
        }

        .wgx-browser-lines i:nth-child(2) {
          width: 35%;
        }

        .wgx-browser-lines i:nth-child(3) {
          width: 45%;
        }

        .wgx-browser-square {
          position: absolute;

          right: 35px;
          bottom: 30px;

          width: 100px;
          height: 100px;

          border:
            1px solid
            var(--visual-accent);

          opacity: .5;

          transform: rotate(12deg);

          animation:
            wgx-square
            5s
            ease-in-out
            infinite;
        }

        @keyframes wgx-square {
          0%,100% {
            transform:
              rotate(12deg)
              scale(1);
          }

          50% {
            transform:
              rotate(25deg)
              scale(1.12);
          }
        }

        .wgx-floating-shape {
          position: absolute;

          border:
            1px solid
            var(--visual-accent);

          opacity: .35;

          animation:
            wgx-float
            6s
            ease-in-out
            infinite;
        }

        .shape-one {
          width: 80px;
          height: 80px;

          right: 8%;
          top: 12%;

          transform: rotate(45deg);
        }

        .shape-two {
          width: 40px;
          height: 40px;

          left: 7%;
          bottom: 18%;

          border-radius: 50%;
        }

        @keyframes wgx-float {
          0%,100% {
            transform:
              translateY(0)
              rotate(45deg);
          }

          50% {
            transform:
              translateY(-20px)
              rotate(70deg);
          }
        }

        /* AI */

        .wgx-visual-ai {
          display: grid;
          place-items: center;

          background:
            radial-gradient(
              circle,
              color-mix(
                in srgb,
                var(--visual-accent) 13%,
                transparent
              ),
              transparent 55%
            ),
            #050908;
        }

        .wgx-ai-grid {
          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(138,255,193,.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(138,255,193,.08) 1px,
              transparent 1px
            );

          background-size: 45px 45px;

          mask-image:
            radial-gradient(
              circle,
              black,
              transparent 75%
            );
        }

        .wgx-ai-core {
          position: relative;

          width: 115px;
          height: 115px;

          display: grid;
          place-items: center;

          border:
            1px solid
            var(--visual-accent);

          border-radius: 50%;

          box-shadow:
            0 0 50px
            color-mix(
              in srgb,
              var(--visual-accent) 25%,
              transparent
            );

          animation:
            wgx-core
            4s
            ease-in-out
            infinite;
        }

        .wgx-ai-core::before,
        .wgx-ai-core::after {
          content: "";

          position: absolute;

          border:
            1px solid
            var(--visual-accent);

          border-radius: 50%;
        }

        .wgx-ai-core::before {
          inset: -22px;

          opacity: .35;

          animation:
            wgx-orbit
            5s
            linear
            infinite;
        }

        .wgx-ai-core::after {
          inset: -48px;

          opacity: .15;

          animation:
            wgx-orbit
            8s
            linear
            infinite
            reverse;
        }

        .wgx-ai-core span {
          font-family: monospace;

          font-size: 23px;

          letter-spacing: .08em;

          color:
            var(--visual-accent);
        }

        @keyframes wgx-core {
          0%,100% {
            transform: scale(.95);
          }

          50% {
            transform: scale(1.06);
          }
        }

        @keyframes wgx-orbit {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .wgx-orbit {
          position: absolute;

          border-radius: 50%;

          border:
            1px solid
            rgba(138,255,193,.2);
        }

        .orbit-a {
          width: 300px;
          height: 140px;

          transform: rotate(30deg);
        }

        .orbit-b {
          width: 250px;
          height: 100px;

          transform: rotate(-40deg);
        }

        .orbit-c {
          width: 180px;
          height: 280px;

          transform: rotate(65deg);
        }

        .wgx-ai-number {
          position: absolute;

          font-family: monospace;

          font-size: 8px;

          color:
            var(--visual-accent);

          opacity: .65;
        }

        .number-a {
          left: 18%;
          top: 27%;
        }

        .number-b {
          right: 17%;
          top: 38%;
        }

        .number-c {
          left: 25%;
          bottom: 25%;
        }

        /* SYSTEM */

        .wgx-visual-system {
          display: grid;
          place-items: center;

          background:
            radial-gradient(
              circle,
              color-mix(
                in srgb,
                var(--visual-accent) 13%,
                transparent
              ),
              transparent 55%
            ),
            #090807;
        }

        .wgx-system-center {
          position: relative;

          width: 110px;
          height: 110px;

          display: grid;
          place-items: center;

          border:
            1px solid
            var(--visual-accent);

          border-radius: 50%;

          font-family: monospace;
          font-size: 7px;

          letter-spacing: .18em;

          color:
            var(--visual-accent);

          box-shadow:
            0 0 45px
            color-mix(
              in srgb,
              var(--visual-accent) 20%,
              transparent
            );
        }

        .wgx-system-node {
          position: absolute;

          width: 55px;
          height: 55px;

          display: grid;
          place-items: center;

          border:
            1px solid
            color-mix(
              in srgb,
              var(--visual-accent) 45%,
              transparent
            );

          background:
            rgba(255,255,255,.025);

          font-family: monospace;
          font-size: 7px;

          color:
            var(--visual-accent);

          animation:
            wgx-node
            5s
            ease-in-out
            infinite;
        }

        .node-a {
          left: 18%;
          top: 28%;
        }

        .node-b {
          right: 17%;
          top: 24%;
        }

        .node-c {
          right: 18%;
          bottom: 22%;
        }

        .node-d {
          left: 18%;
          bottom: 20%;
        }

        @keyframes wgx-node {
          0%,100% {
            transform: translateY(0);
          }

          50% {
            transform:
              translateY(-10px);
          }
        }

        .wgx-system-line {
          position: absolute;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--visual-accent),
              transparent
            );

          transform-origin: center;

          opacity: .35;
        }

        .line-a {
          width: 210px;
          transform: rotate(28deg);
        }

        .line-b {
          width: 210px;
          transform: rotate(-28deg);
        }

        .line-c {
          width: 170px;
          transform: rotate(90deg);
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {
          .wgx-section {
            padding-left: 25px;
            padding-right: 25px;
          }

          .wgx-card {
            width: 600px;
          }

          .wgx-card-left {
            transform:
              translate(
                calc(-50% - 42vw),
                -50%
              )
              scale(.82)
              rotateY(10deg);
          }

          .wgx-card-right {
            transform:
              translate(
                calc(-50% + 42vw),
                -50%
              )
              scale(.82)
              rotateY(-10deg);
          }

          .wgx-nav-left {
            left: 1%;
          }

          .wgx-nav-right {
            right: 1%;
          }
        }

        @media (max-width: 760px) {
          .wgx-section {
            min-height: auto;

            padding:
              25px
              16px
              60px;
          }

          .wgx-header-right {
            display: none;
          }

          .wgx-intro {
            display: block;

            margin-top: 35px;
          }

          .wgx-intro h2 {
            font-size:
              clamp(
                58px,
                18vw,
                100px
              );
          }

          .wgx-intro-copy {
            width: 100%;

            margin-top: 25px;
          }

          .wgx-stage {
            height: 620px;

            margin-top: 20px;
          }

          .wgx-card {
            width:
              calc(100vw - 32px);

            max-width: 540px;

            height: 550px;
          }

          .wgx-card-left,
          .wgx-card-right {
            display: none;
          }

          .wgx-nav {
            width: 48px;
            height: 48px;
          }

          .wgx-nav span {
            display: none;
          }

          .wgx-nav-left {
            left: 4px;
          }

          .wgx-nav-right {
            right: 4px;
          }

          .wgx-panel {
            left: 14px;
            right: 14px;
            bottom: 14px;

            padding:
              16px
              15px
              13px;
          }

          .wgx-title-row h3 {
            font-size:
              clamp(
                34px,
                10vw,
                52px
              );
          }

          .wgx-description {
            font-size: 8px;
          }

          .wgx-footer {
            gap: 10px;
          }

          .wgx-meta {
            grid-template-columns:
              auto
              1fr;
          }

          .wgx-dots {
            justify-content: center;
          }

          .wgx-auto {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .wgx-stage {
            height: 570px;
          }

          .wgx-card {
            height: 520px;
          }

          .wgx-category {
            left: 18px;
          }

          .wgx-side-status {
            display: none;
          }

          .wgx-big-number {
            font-size: 105px;
          }

          .wgx-footer {
            grid-template-columns:
              auto
              1fr;
          }

          .wgx-explore {
            grid-column:
              1 / -1;

            justify-self: stretch;
          }
        }

        /* =====================================================
           REVEAL
        ===================================================== */

        .wgx-intro,
        .wgx-stage,
        .wgx-meta,
        .wgx-marquee {
          opacity: 0;
          transform: translateY(35px);
        }

        .wgx-visible .wgx-intro {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .9s ease,
            transform 1s
              cubic-bezier(.16,1,.3,1);
        }

        .wgx-visible .wgx-stage {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity 1s .12s ease,
            transform 1.1s .12s
              cubic-bezier(.16,1,.3,1);
        }

        .wgx-visible .wgx-meta {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .8s .25s ease,
            transform .9s .25s
              cubic-bezier(.16,1,.3,1);
        }

        .wgx-visible .wgx-marquee {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .8s .35s ease,
            transform .9s .35s
              cubic-bezier(.16,1,.3,1);
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .wgx-section *,
          .wgx-section *::before,
          .wgx-section *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .001ms !important;
          }
        }
      `}</style>
    </section>
  );
}