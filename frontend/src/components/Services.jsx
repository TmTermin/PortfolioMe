import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { capabilities } from "../data/portfolio";

/* =========================================================
   DATA
========================================================= */

const languages = [
  ["HTML5", "html5"],
  ["CSS3", "css3"],
  ["JavaScript", "javascript"],
  ["TypeScript", "typescript"],
  ["Python", "python"],
  ["Java", "openjdk"],
  ["C", "c"],
  ["C++", "cplusplus"],
  ["C#", "csharp"],
  ["PHP", "php"],
  ["SQL", "mysql"],
  ["Dart", "dart"],
  ["Kotlin", "kotlin"],
  ["Swift", "swift"],
  ["Go", "go"],
  ["Rust", "rust"],
  ["Ruby", "ruby"],
  ["R", "r"],
  ["Bash", "gnubash"],
  ["MATLAB", "mathworks"],
];

const tools = [
  ["VS Code", "visualstudiocode"],
  ["GitHub", "github"],
  ["Figma", "figma"],
  ["Photoshop", "adobephotoshop"],
  ["Illustrator", "adobeillustrator"],
  ["After Effects", "adobeaftereffects"],
  ["Premiere Pro", "adobepremierepro"],
  ["Blender", "blender"],
  ["Docker", "docker"],
  ["Postman", "postman"],
  ["React", "react"],
  ["Vite", "vite"],
  ["Next.js", "nextdotjs"],
  ["Node.js", "nodedotjs"],
  ["Git", "git"],
  ["NPM", "npm"],
  ["Firebase", "firebase"],
  ["MongoDB", "mongodb"],
  ["Framer", "framer"],
  ["Notion", "notion"],
];

/* =========================================================
   ICON
========================================================= */

function Icon({ icon, name }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span className="svx-fallback-icon">
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${icon}`}
      alt=""
      draggable="false"
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
    />
  );
}

/* =========================================================
   LANGUAGE ITEM
========================================================= */

function LanguageItem({
  name,
  icon,
  index,
  onSelect,
}) {
  return (
    <div
      className="svx-language-item"
      onMouseEnter={() => onSelect(name)}
      onMouseLeave={() => onSelect(null)}
      style={{
        "--item-index": index,
      }}
    >
      <div className="svx-language-icon">
        <Icon icon={icon} name={name} />
      </div>

      <span>{name}</span>

      <i />
    </div>
  );
}

/* =========================================================
   LANGUAGE GROUP
========================================================= */

function LanguageGroup({
  duplicate = false,
  onSelect,
}) {
  return (
    <div
      className="svx-language-group"
      aria-hidden={duplicate}
    >
      {languages.map(
        ([name, icon], index) => (
          <LanguageItem
            key={`${duplicate}-${name}`}
            name={name}
            icon={icon}
            index={index}
            onSelect={onSelect}
          />
        )
      )}
    </div>
  );
}

/* =========================================================
   TOOL CARD
========================================================= */

function ToolCard({
  item,
  index,
  active,
  onEnter,
  onLeave,
}) {
  const cardRef = useRef(null);

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  });

  const [name, icon] = item;

  const handleMove = (event) => {
    const card = cardRef.current;

    if (!card) return;

    const rect =
      card.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width -
        0.5) *
      2;

    const y =
      ((event.clientY - rect.top) /
        rect.height -
        0.5) *
      2;

    setTilt({
      x: y * -8,
      y: x * 8,
    });

    card.style.setProperty(
      "--mouse-x",
      `${(x + 1) * 50}%`
    );

    card.style.setProperty(
      "--mouse-y",
      `${(y + 1) * 50}%`
    );
  };

  const handleLeave = () => {
    setTilt({
      x: 0,
      y: 0,
    });

    onLeave();
  };

  return (
    <article
      ref={cardRef}
      className={`svx-tool-card ${
        active ? "is-active" : ""
      }`}
      onMouseEnter={onEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        "--tilt-x": `${tilt.x}deg`,
        "--tilt-y": `${tilt.y}deg`,
        "--card-delay": `${index * 45}ms`,
      }}
    >
      <div className="svx-tool-cursor" />
      <div className="svx-tool-glow" />

      <div className="svx-tool-number">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="svx-tool-corner tl" />
      <div className="svx-tool-corner tr" />
      <div className="svx-tool-corner bl" />
      <div className="svx-tool-corner br" />

      <div className="svx-tool-icon">
        <Icon
          icon={icon}
          name={name}
        />
      </div>

      <span className="svx-tool-name">
        {name}
      </span>

      <span className="svx-tool-arrow">
        ↗
      </span>

      <div className="svx-tool-scan" />

      <div className="svx-tool-bottom-line" />
    </article>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function Services() {
  const sectionRef = useRef(null);

  const [visible, setVisible] =
    useState(false);

  const [activeTool, setActiveTool] =
    useState(null);

  const [activeLanguage, setActiveLanguage] =
    useState(null);

  const [activeService, setActiveService] =
    useState(0);

  /* =======================================================
     UNIQUE SKILLS
  ======================================================= */

  const skills = useMemo(() => {
    return [
      ...new Set(
        capabilities.flatMap(
          (item) => item.tags || []
        )
      ),
    ];
  }, []);

  /* =======================================================
     MOUSE
  ======================================================= */

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    let raf = null;

    const handleMove = (event) => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        const rect =
          section.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) /
            rect.width) *
          100;

        const y =
          ((event.clientY - rect.top) /
            rect.height) *
          100;

        section.style.setProperty(
          "--mouse-x",
          `${x}%`
        );

        section.style.setProperty(
          "--mouse-y",
          `${y}%`
        );

        raf = null;
      });
    };

    section.addEventListener(
      "mousemove",
      handleMove,
      { passive: true }
    );

    return () => {
      section.removeEventListener(
        "mousemove",
        handleMove
      );

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  /* =======================================================
     REVEAL
  ======================================================= */

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        },
        {
          threshold: 0.08,
        }
      );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const section =
        sectionRef.current;

      if (!section) return;
      if (raf) return;

      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();

        const viewport = window.innerHeight;

        const total = rect.height + viewport;

        const progress = (viewport - rect.top) / total;

        section.style.setProperty(
          "--scroll-progress",
          Math.max(0, Math.min(1, progress))
        );
        raf = 0;
      });
    };

    window.addEventListener(
      "scroll",
      update,
      { passive: true }
    );

    update();

    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* =======================================================
     SERVICE ROTATION
  ======================================================= */

  useEffect(() => {
    if (!capabilities.length) return;

    const interval = setInterval(() => {
      setActiveService(
        (prev) =>
          (prev + 1) %
          capabilities.length
      );
    }, 3500);

    return () =>
      clearInterval(interval);
  }, []);

  /* =======================================================
     CONTACT
  ======================================================= */

  const goToContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /* =======================================================
     WORK
  ======================================================= */

  const goToWork = () => {
    document
      .getElementById("work")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      ref={sectionRef}
      className={`svx-services ${
        visible ? "svx-visible" : ""
      }`}
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
        "--scroll-progress": 0,
      }}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="svx-background" />

      <div className="svx-grid" />

      <div className="svx-grid-moving" />

      <div className="svx-mouse-glow" />

      <div className="svx-orb svx-orb-1" />
      <div className="svx-orb svx-orb-2" />

      <div className="svx-noise" />

      <div className="svx-vignette" />

      {/* =====================================================
          TOP SYSTEM
      ===================================================== */}

      <div className="svx-top-system">
        <div>
          <span className="svx-live-dot" />
          SYSTEM / CAPABILITIES
        </div>

        <span>
          DIGITAL TECHNOLOGY
        </span>

        <span>
          03 / 04
        </span>
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="svx-header">
        <div className="svx-section-id">
          <span>03</span>

          <i />

          <b>
            CAPABILITIES
          </b>
        </div>

        <div className="svx-header-meta">
          <span>
            TOOLS / TECHNOLOGIES
          </span>

          <span>
            DIGITAL SYSTEMS
          </span>

          <span>
            2026
          </span>
        </div>
      </header>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <div className="svx-intro">
        <div className="svx-intro-title">
          <div>
            <span>WHAT</span>
          </div>

          <div className="svx-intro-second">
            <em>I CAN DO.</em>
          </div>

          <div className="svx-title-line">
            <i />

            <small>
              {languages.length}+
              TECHNOLOGIES
            </small>
          </div>
        </div>

        <div className="svx-intro-copy">
          <div className="svx-copy-index">
            00 / 03
          </div>

          <p>
            A digital toolkit built to
            design, develop and ship
            experiences with precision,
            motion and character.
          </p>

          <div className="svx-skill-pills">
            {skills.map(
              (skill, index) => (
                <span
                  key={skill}
                  style={{
                    "--pill-delay":
                      `${index * 45}ms`,
                  }}
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          LANGUAGES
      ===================================================== */}

      <div className="svx-section-label">
        <span>
          01 / LANGUAGES
        </span>

        <i />

        <b>
          {String(
            languages.length
          ).padStart(2, "0")}
        </b>
      </div>

      <div className="svx-language-window">
        <div className="svx-language-fade left" />
        <div className="svx-language-fade right" />

        <div className="svx-language-track">
          <LanguageGroup
            onSelect={setActiveLanguage}
          />

          <LanguageGroup
            duplicate
            onSelect={setActiveLanguage}
          />
        </div>
      </div>

      <div className="svx-language-window second">
        <div className="svx-language-fade left" />
        <div className="svx-language-fade right" />

        <div className="svx-language-track reverse">
          <LanguageGroup
            onSelect={setActiveLanguage}
          />

          <LanguageGroup
            duplicate
            onSelect={setActiveLanguage}
          />
        </div>
      </div>

      <div className="svx-language-status">
        <span>
          {activeLanguage
            ? "SELECTED //"
            : "MOVE / EXPLORE"}
        </span>

        <i />

        <strong>
          {activeLanguage ||
            "LANGUAGES"}
        </strong>
      </div>

      {/* =====================================================
          TOOLS
      ===================================================== */}

      <div className="svx-section-label svx-tools-label">
        <span>
          02 / TOOLS
        </span>

        <i />

        <b>
          {String(
            tools.length
          ).padStart(2, "0")}
        </b>
      </div>

      <div className="svx-tools-grid">
        {tools.map(
          (tool, index) => (
            <ToolCard
              key={tool[0]}
              item={tool}
              index={index}
              active={
                activeTool === index
              }
              onEnter={() =>
                setActiveTool(index)
              }
              onLeave={() =>
                setActiveTool(null)
              }
            />
          )
        )}
      </div>

      {/* =====================================================
          TOOL STATUS
      ===================================================== */}

      <div className="svx-tool-status">
        <span>
          TOOL STATUS
        </span>

        <i />

        <strong>
          {activeTool !== null
            ? tools[activeTool][0]
            : "READY / EXPLORE"}
        </strong>

        <b>
          {activeTool !== null
            ? `${String(
                activeTool + 1
              ).padStart(2, "0")} / ${
                tools.length
              }`
            : "—"}
        </b>
      </div>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <div className="svx-section-label svx-services-label">
        <span>
          03 / SERVICES
        </span>

        <i />

        <b>
          {String(
            capabilities.length
          ).padStart(2, "0")}
        </b>
      </div>

      <div className="svx-services-layout">
        {/* LEFT INDEX */}

        <div className="svx-services-index">
          <span>
            SELECTED
          </span>

          <strong>
            {String(
              activeService + 1
            ).padStart(2, "0")}
          </strong>

          <div className="svx-index-line">
            <i
              style={{
                height: `${
                  ((activeService + 1) /
                    Math.max(
                      capabilities.length,
                      1
                    )) *
                  100
                }%`,
              }}
            />
          </div>

          <span>
            /
            {String(
              capabilities.length
            ).padStart(2, "0")}
          </span>
        </div>

        {/* SERVICE FEATURE */}

        <div className="svx-service-feature">
          <div className="svx-service-feature-bg">
            {String(
              activeService + 1
            ).padStart(2, "0")}
          </div>

          <div className="svx-service-feature-top">
            <span>
              SERVICE / 0
              {activeService + 1}
            </span>

            <span>
              ACTIVE CAPABILITY
            </span>
          </div>

          <div className="svx-service-feature-content">
            <div>
              <span className="svx-feature-kicker">
                SELECTED SYSTEM
              </span>

              <h3>
                {capabilities[
                  activeService
                ]?.title ||
                  "DIGITAL DEVELOPMENT"}
              </h3>
            </div>

            <div className="svx-feature-side">
              <p>
                {capabilities[
                  activeService
                ]?.description ||
                  "Designing and building digital experiences with a focus on clarity, performance and interaction."}
              </p>

              {capabilities[
                activeService
              ]?.tags?.length > 0 && (
                <div className="svx-feature-tags">
                  {capabilities[
                    activeService
                  ].tags.map(
                    (tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="svx-service-feature-bottom">
            <div>
              <span>
                CAPABILITY
              </span>

              <strong>
                {capabilities[
                  activeService
                ]?.label ||
                  "CREATIVE TECHNOLOGY"}
              </strong>
            </div>

            <button
              type="button"
              onClick={goToContact}
            >
              <span>
                DISCUSS A PROJECT
              </span>

              <b>↗</b>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          SERVICE LIST
      ===================================================== */}

      <div className="svx-service-list">
        {capabilities.map(
          (item, index) => (
            <button
              key={
                item.number ||
                item.title ||
                index
              }
              type="button"
              className={
                activeService === index
                  ? "active"
                  : ""
              }
              onMouseEnter={() =>
                setActiveService(index)
              }
              onClick={() =>
                setActiveService(index)
              }
            >
              <span>
                {String(
                  index + 1
                ).padStart(2, "0")}
              </span>

              <strong>
                {item.title ||
                  "DIGITAL SERVICE"}
              </strong>

              <i>↗</i>
            </button>
          )
        )}
      </div>

      {/* =====================================================
          CTA
      ===================================================== */}

      <div className="svx-bottom-cta">
        <div className="svx-cta-copy">
          <span>
            HAVE A PROJECT?
          </span>

          <h3>
            LET'S BUILD
            <em>
              SOMETHING.
            </em>
          </h3>
        </div>

        <div className="svx-cta-actions">
          <button
            type="button"
            onClick={goToWork}
            className="svx-cta-secondary"
          >
            <span>
              VIEW WORK
            </span>

            <b>↗</b>
          </button>

          <button
            type="button"
            onClick={goToContact}
            className="svx-cta-main"
          >
            <span>
              START A PROJECT
            </span>

            <b>↗</b>

            <i />
          </button>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="svx-footer-system">
        <span>
          AMINE / DIGITAL BUILDER
        </span>

        <i />

        <span>
          SERVICES / 03
        </span>

        <i />

        <span>
          END OF CAPABILITIES
        </span>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`
        @import url(
          'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap'
        );

        /* =====================================================
           RESET
        ===================================================== */

        .svx-services,
        .svx-services * {
          box-sizing: border-box;
        }

        .svx-services {
          --mouse-x: 50%;
          --mouse-y: 50%;

          position: relative;

          width: 100%;
          min-height: 100vh;

          padding:
            155px
            7vw
            95px;

          overflow: hidden;

          background: #050505;
          color: #fff;

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          isolation: isolate;

          border-top:
            1px solid
            rgba(255,255,255,.08);
        }

        /* =====================================================
           BACKGROUND
        ===================================================== */

        .svx-background {
          position: absolute;
          inset: 0;

          z-index: -20;

          background:
            radial-gradient(
              circle at var(--mouse-x) var(--mouse-y),
              rgba(255,255,255,.075),
              transparent 20%
            ),
            radial-gradient(
              ellipse at 50% 20%,
              rgba(255,255,255,.035),
              transparent 45%
            ),
            #050505;
        }

        .svx-grid {
          position: absolute;
          inset: 0;

          z-index: -19;

          background-image:
            linear-gradient(
              rgba(255,255,255,.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.025) 1px,
              transparent 1px
            );

          background-size:
            85px 85px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 12%,
              black 85%,
              transparent
            );

          pointer-events: none;
        }

        .svx-grid-moving {
          position: absolute;
          inset: 0;

          z-index: -18;

          opacity: .35;

          background-image:
            linear-gradient(
              90deg,
              transparent 49.8%,
              rgba(255,255,255,.09) 50%,
              transparent 50.2%
            );

          background-size:
            20vw 100%;

          animation:
            svx-grid-move
            7s
            ease-in-out
            infinite;
        }

        @keyframes svx-grid-move {
          0%,
          100% {
            transform:
              translateX(-7%);
          }

          50% {
            transform:
              translateX(7%);
          }
        }

        .svx-mouse-glow {
          position: absolute;

          left: var(--mouse-x);
          top: var(--mouse-y);

          width: 520px;
          height: 520px;

          z-index: -15;

          transform:
            translate(-50%,-50%);

          pointer-events: none;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.065),
              transparent 68%
            );

          filter: blur(25px);

          transition:
            left .15s linear,
            top .15s linear;
        }

        .svx-orb {
          position: absolute;

          border:
            1px solid
            rgba(255,255,255,.06);

          border-radius: 50%;

          pointer-events: none;
        }

        .svx-orb-1 {
          width: 420px;
          height: 420px;

          right: -160px;
          top: 22%;

          animation:
            svx-orbit
            18s
            linear
            infinite;
        }

        .svx-orb-2 {
          width: 250px;
          height: 250px;

          left: -120px;
          top: 55%;

          animation:
            svx-orbit-reverse
            14s
            linear
            infinite;
        }

        @keyframes svx-orbit {
          to {
            transform:
              rotate(360deg);
          }
        }

        @keyframes svx-orbit-reverse {
          to {
            transform:
              rotate(-360deg);
          }
        }

        .svx-noise {
          position: absolute;

          inset: -50%;

          z-index: 50;

          pointer-events: none;

          opacity: .035;

          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");

          animation:
            svx-noise
            .35s
            steps(2)
            infinite;
        }

        @keyframes svx-noise {
          0% {
            transform: translate(0,0);
          }

          25% {
            transform: translate(2%,-2%);
          }

          50% {
            transform: translate(-2%,1%);
          }

          75% {
            transform: translate(1%,2%);
          }

          100% {
            transform: translate(-1%,-1%);
          }
        }

        .svx-vignette {
          position: absolute;
          inset: 0;

          z-index: 49;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at center,
              transparent 30%,
              rgba(0,0,0,.65) 100%
            );
        }

        /* =====================================================
           TOP SYSTEM
        ===================================================== */

        .svx-top-system {
          position: absolute;

          left: 7vw;
          right: 7vw;
          top: 30px;

          z-index: 70;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: center;

          font:
            8px
            "DM Mono",
            monospace;

          letter-spacing: .17em;

          color:
            rgba(255,255,255,.24);

          opacity: 0;

          transform:
            translateY(-18px);

          transition:
            opacity .8s ease .1s,
            transform 1s
            cubic-bezier(.16,1,.3,1)
            .1s;
        }

        .svx-visible .svx-top-system {
          opacity: 1;

          transform:
            translateY(0);
        }

        .svx-top-system > div {
          display: flex;

          align-items: center;

          gap: 9px;
        }

        .svx-top-system > span:last-child {
          text-align: right;
        }

        .svx-live-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #fff;

          box-shadow:
            0 0 15px
            rgba(255,255,255,.9);

          animation:
            svx-live
            2s
            ease-in-out
            infinite;
        }

        @keyframes svx-live {
          0%,
          100% {
            opacity: .25;
          }

          50% {
            opacity: 1;
          }
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .svx-header {
          position: relative;

          z-index: 5;

          display: flex;

          justify-content:
            space-between;

          align-items:
            flex-start;

          margin-bottom:
            90px;

          opacity: 0;

          transform:
            translateY(35px);

          transition:
            opacity .9s ease,
            transform 1s
            cubic-bezier(.16,1,.3,1);
        }

        .svx-visible .svx-header {
          opacity: 1;

          transform:
            translateY(0);
        }

        .svx-section-id {
          display: flex;

          align-items: center;

          gap: 15px;

          font:
            9px
            "DM Mono",
            monospace;

          letter-spacing: .18em;

          color:
            rgba(255,255,255,.32);
        }

        .svx-section-id span {
          color:
            rgba(255,255,255,.16);
        }

        .svx-section-id i {
          width: 60px;
          height: 1px;

          background:
            rgba(255,255,255,.28);
        }

        .svx-section-id b {
          font-weight: 400;
        }

        .svx-header-meta {
          display: flex;

          flex-direction:
            column;

          align-items:
            flex-end;

          gap: 5px;

          font:
            8px/1.7
            "DM Mono",
            monospace;

          letter-spacing: .15em;

          color:
            rgba(255,255,255,.2);
        }

        /* =====================================================
           INTRO
        ===================================================== */

        .svx-intro {
          position: relative;

          z-index: 5;

          display: grid;

          grid-template-columns:
            1fr
            .75fr;

          gap: 8vw;

          align-items: end;

          margin-bottom:
            90px;

          opacity: 0;

          transform:
            translateY(45px);

          transition:
            opacity 1s ease .1s,
            transform 1.1s
            cubic-bezier(.16,1,.3,1)
            .1s;
        }

        .svx-visible .svx-intro {
          opacity: 1;

          transform:
            translateY(0);
        }

        .svx-intro-title {
          font-size:
            clamp(
              75px,
              10vw,
              155px
            );

          line-height: .75;

          letter-spacing:
            -.09em;

          text-transform:
            uppercase;
        }

        .svx-intro-title > div:first-child span {
          color: transparent;

          -webkit-text-stroke:
            1px
            rgba(255,255,255,.45);
        }

        .svx-intro-second {
          margin-left:
            4vw;
        }

        .svx-intro-second em {
          font:
            italic 400
            .72em
            Georgia,
            serif;

          letter-spacing:
            -.07em;

          color:
            rgba(255,255,255,.42);
        }

        .svx-title-line {
          display: flex;

          align-items:
            center;

          gap: 15px;

          margin-top:
            35px;
        }

        .svx-title-line i {
          width: 110px;
          height: 1px;

          background:
            rgba(255,255,255,.25);

          transform-origin:
            left;

          transform:
            scaleX(0);

          transition:
            transform 1.2s
            cubic-bezier(.16,1,.3,1)
            .45s;
        }

        .svx-visible .svx-title-line i {
          transform:
            scaleX(1);
        }

        .svx-title-line small {
          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing: .18em;

          color:
            rgba(255,255,255,.2);
        }

        .svx-intro-copy {
          max-width:
            470px;
        }

        .svx-copy-index {
          margin-bottom:
            20px;

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing: .2em;

          color:
            rgba(255,255,255,.18);
        }

        .svx-intro-copy p {
          margin:
            0 0 28px;

          font-size:
            15px;

          line-height:
            1.8;

          color:
            rgba(255,255,255,.4);
        }

        /* =====================================================
           SKILL PILLS
        ===================================================== */

        .svx-skill-pills {
          display: flex;

          flex-wrap:
            wrap;

          gap: 6px;
        }

        .svx-skill-pills span {
          padding:
            7px 10px;

          border:
            1px solid
            rgba(255,255,255,.1);

          border-radius:
            100px;

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing: .08em;

          color:
            rgba(255,255,255,.3);

          opacity: 0;

          transform:
            translateY(12px)
            scale(.95);

          transition:
            opacity .5s
              ease
              var(--pill-delay),
            transform .6s
              cubic-bezier(.16,1,.3,1)
              var(--pill-delay),
            background .3s,
            color .3s;
        }

        .svx-visible .svx-skill-pills span {
          opacity: 1;

          transform:
            translateY(0)
            scale(1);
        }

        .svx-skill-pills span:hover {
          background: #fff;

          color: #000;

          transform:
            translateY(-4px)
            scale(1.05);
        }

        /* =====================================================
           LABEL
        ===================================================== */

        .svx-section-label {
          position: relative;

          z-index: 5;

          display: flex;

          align-items:
            center;

          gap: 18px;

          margin-top:
            35px;

          font:
            8px
            "DM Mono",
            monospace;

          letter-spacing: .18em;

          color:
            rgba(255,255,255,.28);

          opacity: 0;

          transform:
            translateY(20px);

          transition:
            opacity .8s ease,
            transform .9s
            cubic-bezier(.16,1,.3,1);
        }

        .svx-visible .svx-section-label {
          opacity: 1;

          transform:
            translateY(0);
        }

        .svx-section-label i {
          flex: 1;

          height: 1px;

          background:
            rgba(255,255,255,.1);
        }

        .svx-section-label b {
          font-weight: 400;

          color:
            rgba(255,255,255,.18);
        }

        /* =====================================================
           LANGUAGES
        ===================================================== */

        .svx-language-window {
          position: relative;

          width:
            calc(100% + 14vw);

          margin-left:
            -7vw;

          margin-top:
            20px;

          overflow: hidden;

          border-top:
            1px solid
            rgba(255,255,255,.1);

          border-bottom:
            1px solid
            rgba(255,255,255,.1);

          z-index: 5;

          opacity: 0;

          transform:
            translateY(25px);

          transition:
            opacity .9s ease .2s,
            transform 1s
            cubic-bezier(.16,1,.3,1)
            .2s;
        }

        .svx-visible .svx-language-window {
          opacity: 1;

          transform:
            translateY(0);
        }

        .svx-language-window.second {
          margin-top: 0;

          border-top: 0;
        }

        .svx-language-fade {
          position: absolute;

          top: 0;
          bottom: 0;

          width: 15%;

          z-index: 10;

          pointer-events: none;
        }

        .svx-language-fade.left {
          left: 0;

          background:
            linear-gradient(
              90deg,
              #050505,
              transparent
            );
        }

        .svx-language-fade.right {
          right: 0;

          background:
            linear-gradient(
              -90deg,
              #050505,
              transparent
            );
        }

        .svx-language-track {
          display: flex;

          width: max-content;

          will-change:
            transform;

          animation:
            svx-language-right-left
            30s
            linear
            infinite;
        }

        .svx-language-track.reverse {
          animation:
            svx-language-left-right
            34s
            linear
            infinite;
        }

        @keyframes svx-language-right-left {
          from {
            transform:
              translate3d(0,0,0);
          }

          to {
            transform:
              translate3d(-50%,0,0);
          }
        }

        @keyframes svx-language-left-right {
          from {
            transform:
              translate3d(-50%,0,0);
          }

          to {
            transform:
              translate3d(0,0,0);
          }
        }

        .svx-language-group {
          display: flex;

          align-items:
            center;

          gap: 32px;

          flex-shrink: 0;

          padding:
            20px 32px
            20px 0;
        }

        .svx-language-item {
          display: flex;

          align-items:
            center;

          gap: 10px;

          flex-shrink: 0;

          white-space:
            nowrap;

          font:
            9px
            "DM Mono",
            monospace;

          letter-spacing:
            .12em;

          color:
            rgba(255,255,255,.38);

          transition:
            transform .45s
              cubic-bezier(.16,1,.3,1),
            color .3s;
        }

        .svx-language-item:hover {
          color: #fff;

          transform:
            translateY(-7px)
            skewX(-5deg);
        }

        .svx-language-icon {
          width: 35px;
          height: 35px;

          display: flex;

          align-items:
            center;

          justify-content:
            center;

          border:
            1px solid
            rgba(255,255,255,.13);

          background:
            rgba(255,255,255,.015);

          transition:
            transform .45s
              cubic-bezier(.16,1,.3,1),
            background .3s,
            border-color .3s;
        }

        .svx-language-icon img {
          width: 17px;
          height: 17px;

          object-fit:
            contain;

          filter:
            grayscale(1)
            brightness(1.8);

          opacity: .7;

          transition:
            .35s;
        }

        .svx-language-item:hover
        .svx-language-icon {
          background: #fff;

          border-color: #fff;

          transform:
            rotate(-12deg)
            scale(1.14);
        }

        .svx-language-item:hover
        .svx-language-icon img {
          filter:
            grayscale(0)
            brightness(1);

          opacity: 1;

          transform:
            scale(1.1);
        }

        .svx-language-item > i {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.25);
        }

        .svx-language-window.second
        .svx-language-item {
          opacity: .52;
        }

        .svx-language-window.second
        .svx-language-icon {
          width: 28px;
          height: 28px;
        }

        .svx-language-window.second
        .svx-language-icon img {
          width: 13px;
          height: 13px;
        }

        .svx-language-status {
          position: relative;

          z-index: 5;

          display: flex;

          justify-content:
            flex-end;

          align-items:
            center;

          gap: 10px;

          margin-top:
            13px;

          min-height: 20px;

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing: .15em;

          color:
            rgba(255,255,255,.18);
        }

        .svx-language-status i {
          width: 35px;
          height: 1px;

          background:
            rgba(255,255,255,.15);
        }

        .svx-language-status strong {
          font-weight: 400;

          color:
            rgba(255,255,255,.6);
        }

        /* =====================================================
           TOOLS GRID
        ===================================================== */

        .svx-tools-label {
          margin-top:
            70px;
        }

        .svx-tools-grid {
          position: relative;

          z-index: 5;

          display: grid;

          grid-template-columns:
            repeat(10, 1fr);

          gap: 7px;

          margin-top:
            20px;

          perspective:
            1400px;

          opacity: 0;

          transform:
            translateY(35px);

          transition:
            opacity .9s ease .3s,
            transform 1s
            cubic-bezier(.16,1,.3,1)
            .3s;
        }

        .svx-visible .svx-tools-grid {
          opacity: 1;

          transform:
            translateY(0);
        }

        /* =====================================================
           TOOL CARD
        ===================================================== */

        .svx-tool-card {
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --mouse-x: 50%;
          --mouse-y: 50%;

          position: relative;

          min-height:
            150px;

          display: flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          gap: 13px;

          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.1);

          background:
            rgba(255,255,255,.012);

          cursor: pointer;

          transform:
            rotateX(var(--tilt-x))
            rotateY(var(--tilt-y));

          transform-style:
            preserve-3d;

          transition:
            transform .2s ease,
            border-color .35s,
            background .35s,
            box-shadow .45s;
        }

        .svx-tool-card:hover,
        .svx-tool-card.is-active {
          border-color:
            rgba(255,255,255,.4);

          background:
            rgba(255,255,255,.035);

          box-shadow:
            0 25px 70px
            rgba(0,0,0,.4);
        }

        .svx-tool-cursor {
          position: absolute;

          left: var(--mouse-x);
          top: var(--mouse-y);

          width: 130px;
          height: 130px;

          transform:
            translate(-50%,-50%);

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.12),
              transparent 70%
            );

          opacity: 0;

          pointer-events: none;

          transition:
            opacity .3s;
        }

        .svx-tool-card:hover
        .svx-tool-cursor {
          opacity: 1;
        }

        .svx-tool-glow {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 140px;
          height: 140px;

          transform:
            translate(-50%,-50%)
            scale(.2);

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.15),
              transparent 70%
            );

          opacity: 0;

          transition:
            opacity .5s,
            transform .7s
              cubic-bezier(.16,1,.3,1);
        }

        .svx-tool-card:hover
        .svx-tool-glow,
        .svx-tool-card.is-active
        .svx-tool-glow {
          opacity: 1;

          transform:
            translate(-50%,-50%)
            scale(1.4);
        }

        .svx-tool-number {
          position: absolute;

          left: 9px;
          top: 8px;

          font:
            6px
            "DM Mono",
            monospace;

          color:
            rgba(255,255,255,.2);
        }

        .svx-tool-corner {
          position: absolute;

          width: 10px;
          height: 10px;

          border:
            1px solid
            transparent;

          transition:
            border-color .3s;
        }

        .svx-tool-corner.tl {
          top: -1px;
          left: -1px;

          border-left-color:
            transparent;

          border-top-color:
            transparent;
        }

        .svx-tool-corner.tr {
          top: -1px;
          right: -1px;

          border-right-color:
            transparent;

          border-top-color:
            transparent;
        }

        .svx-tool-corner.bl {
          bottom: -1px;
          left: -1px;

          border-left-color:
            transparent;

          border-bottom-color:
            transparent;
        }

        .svx-tool-corner.br {
          bottom: -1px;
          right: -1px;

          border-right-color:
            transparent;

          border-bottom-color:
            transparent;
        }

        .svx-tool-card:hover
        .svx-tool-corner,
        .svx-tool-card.is-active
        .svx-tool-corner {
          border-color:
            rgba(255,255,255,.55);
        }

        .svx-tool-icon {
          position: relative;

          z-index: 3;

          width: 52px;
          height: 52px;

          display: flex;

          align-items:
            center;

          justify-content:
            center;

          border:
            1px solid
            rgba(255,255,255,.14);

          background:
            rgba(0,0,0,.18);

          transition:
            transform .55s
              cubic-bezier(.16,1,.3,1),
            background .3s,
            border-color .3s;
        }

        .svx-tool-icon img {
          width: 25px;
          height: 25px;

          object-fit:
            contain;

          filter:
            grayscale(1)
            brightness(1.8);

          opacity: .7;

          transition:
            .4s;
        }

        .svx-tool-card:hover
        .svx-tool-icon,
        .svx-tool-card.is-active
        .svx-tool-icon {
          background: #fff;

          border-color: #fff;

          transform:
            translateZ(30px)
            rotate(-10deg)
            scale(1.15);
        }

        .svx-tool-card:hover
        .svx-tool-icon img,
        .svx-tool-card.is-active
        .svx-tool-icon img {
          filter:
            grayscale(0)
            brightness(1);

          opacity: 1;
        }

        .svx-tool-name {
          position: relative;

          z-index: 3;

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing: .07em;

          text-transform:
            uppercase;

          color:
            rgba(255,255,255,.38);

          transition:
            color .3s,
            transform .3s;
        }

        .svx-tool-card:hover
        .svx-tool-name,
        .svx-tool-card.is-active
        .svx-tool-name {
          color: #fff;

          transform:
            translateZ(18px);
        }

        .svx-tool-arrow {
          position: absolute;

          right: 9px;
          bottom: 8px;

          font-size:
            10px;

          color:
            rgba(255,255,255,.18);

          transition:
            .4s;
        }

        .svx-tool-card:hover
        .svx-tool-arrow {
          color: #fff;

          transform:
            rotate(45deg)
            scale(1.2);
        }

        .svx-tool-scan {
          position: absolute;

          left: 0;
          right: 0;

          top: -100%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #fff,
              transparent
            );

          opacity: 0;
        }

        .svx-tool-card:hover
        .svx-tool-scan {
          opacity: .55;

          animation:
            svx-tool-scan
            1.4s
            linear
            infinite;
        }

        @keyframes svx-tool-scan {
          to {
            transform:
              translateY(150px);
          }
        }

        .svx-tool-bottom-line {
          position: absolute;

          left: 0;
          bottom: 0;

          width: 0;
          height: 1px;

          background: #fff;

          transition:
            width .7s
              cubic-bezier(.16,1,.3,1);
        }

        .svx-tool-card:hover
        .svx-tool-bottom-line {
          width: 100%;
        }

        .svx-fallback-icon {
          font:
            800 8px
            "Manrope",
            sans-serif;

          color:
            rgba(255,255,255,.6);
        }

        /* =====================================================
           TOOL STATUS
        ===================================================== */

        .svx-tool-status {
          position: relative;

          z-index: 5;

          display: flex;

          justify-content:
            flex-end;

          align-items:
            center;

          gap: 12px;

          min-height: 25px;

          margin:
            20px 0 80px;

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing: .16em;

          color:
            rgba(255,255,255,.2);
        }

        .svx-tool-status i {
          width: 30px;
          height: 1px;

          background:
            rgba(255,255,255,.15);
        }

        .svx-tool-status strong {
          min-width: 105px;

          font-weight: 400;

          text-align: right;

          color:
            rgba(255,255,255,.7);
        }

        .svx-tool-status b {
          color:
            rgba(255,255,255,.15);

          font-weight: 400;
        }

        /* =====================================================
           SERVICES LAYOUT
        ===================================================== */

        .svx-services-layout {
          position: relative;

          z-index: 5;

          display: grid;

          grid-template-columns:
            100px 1fr;

          gap: 30px;

          margin-top:
            20px;

          opacity: 0;

          transform:
            translateY(35px);

          transition:
            opacity 1s ease .35s,
            transform 1s
              cubic-bezier(.16,1,.3,1)
              .35s;
        }

        .svx-visible
        .svx-services-layout {
          opacity: 1;

          transform:
            translateY(0);
        }

        .svx-services-index {
          display: flex;

          flex-direction:
            column;

          align-items:
            center;

          padding-top:
            35px;

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing: .15em;

          color:
            rgba(255,255,255,.22);
        }

        .svx-services-index strong {
          margin:
            15px 0;

          font:
            800 52px
            "Manrope",
            sans-serif;

          letter-spacing:
            -.08em;

          color:
            rgba(255,255,255,.8);
        }

        .svx-index-line {
          position: relative;

          width: 1px;
          height: 150px;

          background:
            rgba(255,255,255,.1);

          overflow: hidden;
        }

        .svx-index-line i {
          position: absolute;

          left: 0;
          top: 0;

          width: 100%;

          background: #fff;

          transition:
            height .6s
              cubic-bezier(.16,1,.3,1);
        }

        /* =====================================================
           FEATURE
        ===================================================== */

        .svx-service-feature {
          position: relative;

          min-height:
            500px;

          padding:
            32px;

          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.1);

          background:
            rgba(255,255,255,.012);
        }

        .svx-service-feature::before {
          content: "";

          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              circle at var(--mouse-x) var(--mouse-y),
              rgba(255,255,255,.06),
              transparent 30%
            );

          pointer-events:
            none;
        }

        .svx-service-feature-bg {
          position: absolute;

          right: -30px;
          bottom: -80px;

          font:
            800 340px
            "Manrope",
            sans-serif;

          line-height: 1;

          letter-spacing:
            -.12em;

          color:
            rgba(255,255,255,.018);

          pointer-events:
            none;

          transition:
            transform .8s
              cubic-bezier(.16,1,.3,1);
        }

        .svx-service-feature:hover
        .svx-service-feature-bg {
          transform:
            translateX(-25px)
            rotate(-4deg);
        }

        .svx-service-feature-top {
          position: relative;

          display: flex;

          justify-content:
            space-between;

          padding-bottom:
            20px;

          border-bottom:
            1px solid
            rgba(255,255,255,.08);

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing:
            .17em;

          color:
            rgba(255,255,255,.22);
        }

        .svx-service-feature-content {
          position: relative;

          display: grid;

          grid-template-columns:
            1.2fr .8fr;

          gap: 7vw;

          align-items:
            end;

          min-height:
            300px;
        }

        .svx-feature-kicker {
          display: block;

          margin-bottom:
            20px;

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing:
            .18em;

          color:
            rgba(255,255,255,.25);
        }

        .svx-service-feature h3 {
          max-width:
            800px;

          margin: 0;

          font-size:
            clamp(
              45px,
              6.5vw,
              100px
            );

          line-height:
            .82;

          letter-spacing:
            -.085em;

          text-transform:
            uppercase;

          transition:
            transform .7s
              cubic-bezier(.16,1,.3,1);
        }

        .svx-service-feature:hover h3 {
          transform:
            translateX(10px);
        }

        .svx-feature-side {
          align-self:
            end;
        }

        .svx-feature-side p {
          max-width:
            390px;

          margin:
            0 0 25px;

          font-size:
            12px;

          line-height:
            1.8;

          color:
            rgba(255,255,255,.38);
        }

        .svx-feature-tags {
          display: flex;

          flex-wrap:
            wrap;

          gap: 6px;
        }

        .svx-feature-tags span {
          padding:
            6px 9px;

          border:
            1px solid
            rgba(255,255,255,.1);

          border-radius:
            100px;

          font:
            7px
            "DM Mono",
            monospace;

          color:
            rgba(255,255,255,.3);

          transition:
            .3s;
        }

        .svx-feature-tags span:hover {
          background: #fff;

          color: #000;

          border-color:
            #fff;
        }

        .svx-service-feature-bottom {
          position: relative;

          display: flex;

          align-items:
            flex-end;

          justify-content:
            space-between;

          gap: 20px;

          padding-top:
            20px;

          border-top:
            1px solid
            rgba(255,255,255,.08);
        }

        .svx-service-feature-bottom
        > div {
          display: flex;

          flex-direction:
            column;

          gap: 7px;
        }

        .svx-service-feature-bottom
        span {
          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing:
            .15em;

          color:
            rgba(255,255,255,.2);
        }

        .svx-service-feature-bottom
        strong {
          font:
            400 9px
            "DM Mono",
            monospace;

          letter-spacing:
            .1em;

          color:
            rgba(255,255,255,.6);
        }

        .svx-service-feature-bottom
        button {
          position: relative;

          display: flex;

          align-items:
            center;

          gap: 20px;

          padding:
            13px 17px;

          border:
            1px solid
            rgba(255,255,255,.2);

          background:
            transparent;

          color: #fff;

          cursor: pointer;

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing:
            .12em;

          transition:
            .4s
              cubic-bezier(.16,1,.3,1);
        }

        .svx-service-feature-bottom
        button:hover {
          background: #fff;

          color: #000;

          transform:
            translateY(-4px);
        }

        .svx-service-feature-bottom
        button b {
          font-size:
            15px;

          font-weight:
            300;
        }

        /* =====================================================
           SERVICE LIST
        ===================================================== */

        .svx-service-list {
          position: relative;

          z-index: 5;

          display: grid;

          grid-template-columns:
            repeat(2,1fr);

          margin-left:
            130px;

          border-left:
            1px solid
            rgba(255,255,255,.1);

          border-right:
            1px solid
            rgba(255,255,255,.1);
        }

        .svx-service-list button {
          position: relative;

          display: grid;

          grid-template-columns:
            55px 1fr 30px;

          align-items:
            center;

          gap: 15px;

          min-height:
            72px;

          padding:
            0 20px;

          border: 0;

          border-bottom:
            1px solid
            rgba(255,255,255,.08);

          background:
            transparent;

          color:
            rgba(255,255,255,.28);

          cursor: pointer;

          text-align:
            left;

          transition:
            background .35s,
            color .35s,
            padding .45s
              cubic-bezier(.16,1,.3,1);
        }

        .svx-service-list button:nth-child(odd) {
          border-right:
            1px solid
            rgba(255,255,255,.08);
        }

        .svx-service-list button:hover,
        .svx-service-list button.active {
          background:
            rgba(255,255,255,.035);

          color: #fff;

          padding-left:
            30px;
        }

        .svx-service-list button span {
          font:
            7px
            "DM Mono",
            monospace;

          color:
            rgba(255,255,255,.18);
        }

        .svx-service-list button strong {
          font:
            500 9px
            "DM Mono",
            monospace;

          letter-spacing:
            .1em;
        }

        .svx-service-list button i {
          font-style:
            normal;

          font-size:
            14px;

          text-align:
            right;

          transition:
            transform .4s;
        }

        .svx-service-list button:hover i,
        .svx-service-list button.active i {
          transform:
            rotate(45deg);
        }

        /* =====================================================
           CTA
        ===================================================== */

        .svx-bottom-cta {
          position: relative;

          z-index: 5;

          display: flex;

          align-items:
            flex-end;

          justify-content:
            space-between;

          gap: 50px;

          margin-top:
            130px;

          padding:
            75px 0;

          border-top:
            1px solid
            rgba(255,255,255,.1);

          border-bottom:
            1px solid
            rgba(255,255,255,.1);
        }

        .svx-cta-copy > span {
          font:
            8px
            "DM Mono",
            monospace;

          letter-spacing:
            .18em;

          color:
            rgba(255,255,255,.22);
        }

        .svx-bottom-cta h3 {
          margin:
            25px 0 0;

          font-size:
            clamp(
              55px,
              8vw,
              125px
            );

          line-height:
            .78;

          letter-spacing:
            -.08em;

          text-transform:
            uppercase;
        }

        .svx-bottom-cta h3 em {
          display: block;

          margin-left:
            4vw;

          font:
            italic 400
            .75em
            Georgia,
            serif;

          color:
            rgba(255,255,255,.38);
        }

        .svx-cta-actions {
          display: flex;

          align-items:
            center;

          gap: 12px;
        }

        .svx-cta-actions button {
          display: flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 18px;

          height:
            58px;

          padding:
            0 20px;

          border:
            1px solid
            rgba(255,255,255,.2);

          background:
            transparent;

          color: #fff;

          cursor: pointer;

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing:
            .12em;

          transition:
            .4s
              cubic-bezier(.16,1,.3,1);
        }

        .svx-cta-secondary:hover {
          background:
            rgba(255,255,255,.06);

          transform:
            translateY(-4px);
        }

        .svx-cta-main {
          position: relative;

          width:
            175px;

          height:
            175px !important;

          flex-direction:
            column;

          border-radius:
            50% !important;

          padding:
            0 !important;

          overflow:
            hidden;
        }

        .svx-cta-main::before {
          content: "";

          position: absolute;

          inset: 8px;

          border:
            1px dashed
            rgba(255,255,255,.18);

          border-radius:
            50%;

          transition:
            transform .8s
              linear;
        }

        .svx-cta-main:hover {
          background: #fff;

          color: #000;

          transform:
            rotate(7deg)
            scale(1.06);
        }

        .svx-cta-main:hover::before {
          transform:
            rotate(180deg);
        }

        .svx-cta-main b {
          font-size:
            28px;

          font-weight:
            300;
        }

        .svx-cta-main i {
          position: absolute;

          width:
            30px;

          height:
            1px;

          background:
            currentColor;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .svx-footer-system {
          position: relative;

          z-index: 5;

          display: flex;

          align-items:
            center;

          gap: 15px;

          margin-top:
            30px;

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing:
            .16em;

          color:
            rgba(255,255,255,.18);
        }

        .svx-footer-system i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.35);

          animation:
            svx-footer-dot
            2s
            ease-in-out
            infinite;
        }

        @keyframes svx-footer-dot {
          0%,
          100% {
            opacity: .2;
          }

          50% {
            opacity: 1;
          }
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1100px) {
          .svx-tools-grid {
            grid-template-columns:
              repeat(5,1fr);
          }

          .svx-intro {
            grid-template-columns:
              1fr .9fr;
          }

          .svx-service-list {
            margin-left:
              110px;
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 800px) {
          .svx-services {
            padding:
              110px 20px 80px;
          }

          .svx-top-system {
            left: 20px;
            right: 20px;
          }

          .svx-top-system
          > span:nth-child(2) {
            display: none;
          }

          .svx-header {
            margin-bottom:
              65px;
          }

          .svx-header-meta {
            display: none;
          }

          .svx-intro {
            display: block;

            margin-bottom:
              65px;
          }

          .svx-intro-copy {
            margin-top:
              45px;
          }

          .svx-intro-title {
            font-size:
              clamp(
                60px,
                18vw,
                105px
              );
          }

          .svx-language-window {
            width:
              calc(100% + 40px);

            margin-left:
              -20px;
          }

          .svx-language-group {
            gap: 25px;
          }

          .svx-tools-grid {
            grid-template-columns:
              repeat(2,1fr);
          }

          .svx-tool-card {
            min-height:
              135px;
          }

          .svx-services-layout {
            grid-template-columns:
              1fr;
          }

          .svx-services-index {
            display: none;
          }

          .svx-service-feature {
            min-height:
              560px;

            padding:
              25px 20px;
          }

          .svx-service-feature-content {
            grid-template-columns:
              1fr;

            gap: 45px;

            min-height:
              390px;
          }

          .svx-service-feature h3 {
            font-size:
              clamp(
                42px,
                11vw,
                75px
              );
          }

          .svx-service-list {
            margin-left:
              0;

            grid-template-columns:
              1fr;
          }

          .svx-service-list button:nth-child(odd) {
            border-right: 0;
          }

          .svx-bottom-cta {
            flex-direction:
              column;

            align-items:
              flex-start;

            margin-top:
              85px;

            padding:
              55px 0;
          }

          .svx-cta-actions {
            width: 100%;

            justify-content:
              space-between;
          }

          .svx-cta-main {
            width:
              130px;

            height:
              130px !important;
          }

          .svx-cta-secondary {
            height:
              50px !important;
          }
        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 430px) {
          .svx-services {
            padding:
              100px 15px 70px;
          }

          .svx-section-id {
            font-size:
              7px;

            gap:
              9px;
          }

          .svx-section-id i {
            width:
              30px;
          }

          .svx-intro-title {
            font-size:
              19vw;
          }

          .svx-intro-copy p {
            font-size:
              13px;
          }

          .svx-language-group {
            gap:
              20px;
          }

          .svx-language-item {
            gap:
              7px;

            font-size:
              7px;
          }

          .svx-language-icon {
            width:
              26px;

            height:
              26px;
          }

          .svx-language-icon img {
            width:
              12px;

            height:
              12px;
          }

          .svx-tools-grid {
            gap:
              5px;
          }

          .svx-tool-card {
            min-height:
              115px;
          }

          .svx-tool-icon {
            width:
              42px;

            height:
              42px;
          }

          .svx-tool-icon img {
            width:
              21px;

            height:
              21px;
          }

          .svx-tool-name {
            font-size:
              6px;
          }

          .svx-service-feature {
            min-height:
              520px;
          }

          .svx-service-feature h3 {
            font-size:
              31px;
          }

          .svx-service-feature-bg {
            font-size:
              220px;
          }

          .svx-service-feature-bottom {
            align-items:
              flex-start;

            flex-direction:
              column;
          }

          .svx-service-feature-bottom
          button {
            width:
              100%;

            justify-content:
              space-between;
          }

          .svx-bottom-cta h3 {
            font-size:
              54px;
          }

          .svx-cta-actions {
            align-items:
              flex-end;
          }

          .svx-cta-main {
            width:
              115px;

            height:
              115px !important;
          }

          .svx-footer-system {
            font-size:
              6px;
          }

          .svx-footer-system span:nth-last-child(1) {
            display:
              none;
          }
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .svx-services *,
          .svx-services *::before,
          .svx-services *::after {
            animation-duration:
              .001ms !important;

            animation-iteration-count:
              1 !important;

            transition-duration:
              .001ms !important;
          }
        }
      `}</style>
    </section>
  );
}