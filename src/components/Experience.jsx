import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Demo portfolio timeline content.
// Replace these entries with verified real experience when available.
const experience = [
  {
    year: "2026",
    role: "Creative Developer",
    company: "Independent / Portfolio Studio",
    description:
      "Building polished digital experiences that combine front-end engineering, interaction design, motion and strong visual systems.",
    tags: ["React", "JavaScript", "UI/UX", "Motion", "Creative Coding"],
  },
  {
    year: "2025",
    role: "Full Stack Developer",
    company: "Web Product Lab",
    description:
      "Designed and developed responsive web products, connecting clean interfaces with practical application logic and reusable components.",
    tags: ["React", "Node.js", "APIs", "MongoDB", "Git"],
  },
  {
    year: "2025",
    role: "Frontend Developer",
    company: "Digital Interface Team",
    description:
      "Focused on translating ideas and visual concepts into responsive interfaces with attention to performance, accessibility and interaction.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive", "Accessibility"],
  },
  {
    year: "2024",
    role: "UI / UX Developer",
    company: "Creative Digital Projects",
    description:
      "Explored interface systems, prototypes and interaction patterns while turning design concepts into functional web experiences.",
    tags: ["Figma", "UI Design", "UX", "Prototyping", "Design Systems"],
  },
  {
    year: "2024",
    role: "Web Developer",
    company: "Freelance Projects",
    description:
      "Built landing pages, interactive websites and small web applications with a focus on clean structure, responsive behavior and visual polish.",
    tags: ["JavaScript", "CSS", "React", "GitHub", "Web Design"],
  },
  {
    year: "2023",
    role: "Developer in Progress",
    company: "Learning & Personal Lab",
    description:
      "Developed the foundations of a modern development workflow through experiments, coding challenges and personal projects.",
    tags: ["Programming", "Web", "Problem Solving", "Projects", "Learning"],
  },
];

/* =========================================================
   EXPERIENCE ITEM
========================================================= */

function ExperienceCard({
  item,
  index,
  active,
  onClick,
  total,
}) {
  const cardRef = useRef(null);

  const handleMove = (event) => {
    const card =
      cardRef.current;

    if (!card) return;

    const rect =
      card.getBoundingClientRect();

    const x =
      (event.clientX -
        rect.left) /
      rect.width -
      0.5;

    const y =
      (event.clientY -
        rect.top) /
      rect.height -
      0.5;

    card.style.setProperty("--card-x", `${x * 8}deg`);
    card.style.setProperty("--card-y", `${y * -8}deg`);
  };

  const handleLeave = () => {
    const card = cardRef.current;
    card?.style.setProperty("--card-x", "0deg");
    card?.style.setProperty("--card-y", "0deg");
  };

  const number =
    String(index + 1).padStart(
      2,
      "0"
    );

  return (
    <article
      ref={cardRef}
      className={`
        expx-card
        ${index % 2 === 0
          ? "expx-card-left"
          : "expx-card-right"}
        ${active ? "expx-card-active" : ""}
      `}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {/* ===============================================
          CONNECTOR
      =============================================== */}

      <div className="expx-connector">
        <span />
        <i />
      </div>

      {/* ===============================================
          CARD HEADER
      =============================================== */}

      <div className="expx-card-head">

        <div className="expx-card-index">
          <span>
            {number}
          </span>

          <small>
            / {String(total).padStart(2, "0")}
          </small>
        </div>

        {item.year && (
          <span className="expx-year">
            {item.year}
          </span>
        )}

      </div>

      {/* ===============================================
          MAIN
      =============================================== */}

      <div className="expx-card-main">

        {/* CATEGORY / ROLE */}

        <div className="expx-role-line">
          <span className="expx-status-dot" />

          <span>
            {active
              ? "SELECTED EXPERIENCE"
              : "EXPERIENCE"}
          </span>
        </div>

        {item.role && (
          <h3>
            {item.role}
          </h3>
        )}

        {item.company && (
          <strong className="expx-company">
            {item.company}
          </strong>
        )}

        {item.description && (
          <p className="expx-description">
            {item.description}
          </p>
        )}

        {/* ==========================================
            TAGS
        ========================================== */}

        {item.tags?.length > 0 && (
          <div className="expx-tags">
            {item.tags.map(
              (tag, tagIndex) => (
                <span
                  key={`${tag}-${tagIndex}`}
                >
                  <i />
                  {tag}
                </span>
              )
            )}
          </div>
        )}

      </div>

      {/* ===============================================
          BOTTOM
      =============================================== */}

      <div className="expx-card-bottom">

        <span>
          {active
            ? "ACTIVE"
            : "VIEW"}
        </span>

        <b>
          ↗
        </b>

      </div>

      {/* ===============================================
          CORNERS
      =============================================== */}

      <div className="expx-corners">
        <i />
        <i />
        <i />
        <i />
      </div>

      {/* ===============================================
          ACTIVE GLOW
      =============================================== */}

      <div className="expx-card-glow" />

    </article>
  );
}

/* =========================================================
   MAIN EXPERIENCE
========================================================= */

export default function Experience() {
  const sectionRef =
    useRef(null);

  const timelineRef =
    useRef(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [visible, setVisible] =
    useState(false);

  const progressBarRef = useRef(null);
  const timelineProgressRef = useRef(null);

  /* =======================================================
     CLEAN DATA
  ======================================================= */

  const items = useMemo(
    () =>
      (experience || []).filter(
        (item) =>
          item &&
          (
            item.year ||
            item.role ||
            item.company ||
            item.description ||
            item.tags?.length
          )
      ),
    []
  );

  const total =
    items.length;

  /* =======================================================
     INTERSECTION
  ======================================================= */

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting
          ) {
            setVisible(true);

            observer.disconnect();
          }
        },
        {
          threshold: 0.1,
        }
      );

    observer.observe(section);

    return () =>
      observer.disconnect();
  }, []);

  /* =======================================================
     ACTIVE EXPERIENCE BY SCROLL
  ======================================================= */

  useEffect(() => {
    const handleScroll =
      () => {
        const section =
          sectionRef.current;

        if (!section) return;

        const rect =
          section.getBoundingClientRect();

        const viewport =
          window.innerHeight;

        const sectionHeight =
          section.offsetHeight;

        const raw =
          (viewport - rect.top) /
          (sectionHeight + viewport);

        const percentage =
          Math.max(
            0,
            Math.min(
              1,
              raw
            )
          );

        const percentageValue = percentage * 100;
        section.style.setProperty(
          "--scroll-progress",
          percentageValue
        );
        progressBarRef.current?.style.setProperty(
          "transform",
          `scaleX(${percentage})`
        );
        timelineProgressRef.current?.style.setProperty(
          "height",
          `${percentageValue}%`
        );

        if (
          total > 0 &&
          rect.top <
            viewport * 0.65 &&
          rect.bottom >
            viewport * 0.3
        ) {
          const timeline =
            timelineRef.current;

          if (!timeline) return;

          const cards =
            timeline.querySelectorAll(
              ".expx-card"
            );

          let closest =
            0;

          let closestDistance =
            Infinity;

          cards.forEach(
            (card, index) => {
              const cardRect =
                card.getBoundingClientRect();

              const center =
                cardRect.top +
                cardRect.height / 2;

              const distance =
                Math.abs(
                  center -
                    viewport / 2
                );

              if (
                distance <
                closestDistance
              ) {
                closestDistance =
                  distance;

                closest =
                  index;
              }
            }
          );

          setActiveIndex((current) =>
            current === closest ? current : closest
          );
        }
      };

    let raf = 0;
    const queuedHandleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        handleScroll();
        raf = 0;
      });
    };

    window.addEventListener(
      "scroll",
      queuedHandleScroll,
      {
        passive: true,
      }
    );

    handleScroll();

    return () => {
      window.removeEventListener("scroll", queuedHandleScroll);
      cancelAnimationFrame(raf);
    };
  }, [total]);

  /* =======================================================
     MOUSE PARALLAX
  ======================================================= */

  const handleMouseMove =
    (event) => {
      const section =
        sectionRef.current;

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const x =
        (event.clientX -
          rect.left) /
          rect.width -
        0.5;

      const y =
        (event.clientY -
          rect.top) /
          rect.height -
        0.5;

      section.style.setProperty("--mouse-x", x);
      section.style.setProperty("--mouse-y", y);
    };

  const resetMouse = () => {
    sectionRef.current?.style.setProperty("--mouse-x", 0);
    sectionRef.current?.style.setProperty("--mouse-y", 0);
  };

  /* =======================================================
     GO TO EXPERIENCE
  ======================================================= */

  const goToExperience =
    (index) => {
      const timeline =
        timelineRef.current;

      if (!timeline) return;

      const cards =
        timeline.querySelectorAll(
          ".expx-card"
        );

      const card =
        cards[index];

      if (!card) return;

      setActiveIndex(index);

      card.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    const keyboard =
      (event) => {
        if (!total) return;

        if (
          event.key ===
          "ArrowDown"
        ) {
          goToExperience(
            Math.min(
              activeIndex + 1,
              total - 1
            )
          );
        }

        if (
          event.key ===
          "ArrowUp"
        ) {
          goToExperience(
            Math.max(
              activeIndex - 1,
              0
            )
          );
        }
      };

    window.addEventListener(
      "keydown",
      keyboard
    );

    return () =>
      window.removeEventListener(
        "keydown",
        keyboard
      );
  }, [
    activeIndex,
    total,
  ]);

  /* =======================================================
     EMPTY
  ======================================================= */

  if (!items.length) {
    return (
      <section
        className="expx-empty"
      >
        <div>
          <span>
            05
          </span>

          <strong>
            EXPERIENCE
          </strong>

          <p>
            No experience entries
            available yet.
          </p>
        </div>

        <style>{`

          .expx-empty {
            position: relative;

            min-height:
              60vh;

            display:
              grid;

            place-items:
              center;

            background:
              #050505;

            color:
              #fff;

            overflow:
              hidden;
          }

          .expx-empty div {
            text-align:
              center;
          }

          .expx-empty span {
            display:
              block;

            margin-bottom:
              15px;

            font-family:
              monospace;

            font-size:
              10px;

            letter-spacing:
              .25em;

            color:
              rgba(255,255,255,.3);
          }

          .expx-empty strong {
            font-size:
              clamp(
                40px,
                8vw,
                100px
              );

            letter-spacing:
              -.07em;
          }

          .expx-empty p {
            margin-top:
              20px;

            font-size:
              11px;

            color:
              rgba(255,255,255,.3);
          }

        `}</style>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`
        expx-section
        ${visible
          ? "expx-visible"
          : ""}
      `}
      onMouseMove={
        handleMouseMove
      }
      onMouseLeave={
        resetMouse
      }
      style={{
        "--mx": "0px",
        "--my": "0px",
        "--scroll-progress": 0,
      }}
    >

      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="expx-background" />

      <div className="expx-grid" />

      <div className="expx-aura" />

      <div className="expx-noise" />

      {/* ===================================================
          HUGE NUMBER
      =================================================== */}

      <div className="expx-bg-number">
        05
      </div>

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="expx-heading">

        <div className="expx-heading-top">

          <div className="expx-section-label">

            <span>
              05
            </span>

            <i />

            <small>
              EXPERIENCE
            </small>

          </div>

          <div className="expx-heading-status">

            <span>
              JOURNEY
            </span>

            <i />

            <span>
              {String(total).padStart(
                2,
                "0"
              )}{" "}
              ENTRIES
            </span>

          </div>

        </div>

        <div className="expx-title-wrap">

          <div>

            <span className="expx-eyebrow">
              WORK / JOURNEY /
              EXPERIENCE
            </span>

            <h2>
              Work
              <br />
              <em>history.</em>
            </h2>

          </div>

          <div className="expx-heading-copy">

            <p>
              A timeline of work,
              roles and experiences
              captured through the
              projects and data
              defined in this portfolio.
            </p>

            <div className="expx-scroll-hint">

              <span>
                SCROLL TO EXPLORE
              </span>

              <div>
                <i />
              </div>

            </div>

          </div>

        </div>

      </header>

      {/* ===================================================
          TOP PROGRESS
      =================================================== */}

      <div className="expx-progress">

        <span />

        <div ref={progressBarRef} />

      </div>

      {/* ===================================================
          YEAR NAVIGATION
      =================================================== */}

      <nav className="expx-year-nav">

        {items.map(
          (item, index) => (
            <button
              key={`nav-${index}`}
              type="button"
              className={
                index ===
                activeIndex
                  ? "active"
                  : ""
              }
              onClick={() =>
                goToExperience(
                  index
                )
              }
            >

              <span>
                {item.year ||
                  String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )}
              </span>

              <i />

            </button>
          )
        )}

      </nav>

      {/* ===================================================
          TIMELINE
      =================================================== */}

      <div
        ref={timelineRef}
        className="expx-timeline"
      >

        {/* CENTER LINE */}

        <div className="expx-line">

          <div ref={timelineProgressRef} />

        </div>

        {/* TIMELINE ITEMS */}

        {items.map(
          (item, index) => (
            <div
              className={`
                expx-timeline-item
                ${
                  index % 2 === 0
                    ? "left"
                    : "right"
                }
                ${
                  index ===
                  activeIndex
                    ? "active"
                    : ""
                }
              `}
              key={`${item.year || index}-${item.role || index}-${item.company || index}`}
            >

              {/* DOT */}

              <button
                type="button"
                className="expx-dot"
                onClick={() =>
                  goToExperience(
                    index
                  )
                }
                aria-label={`Open experience ${index + 1}`}
              >
                <span />
                <i />
              </button>

              {/* YEAR */}

              <div className="expx-timeline-year">

                {item.year && (
                  <span>
                    {item.year}
                  </span>
                )}

                <i />

              </div>

              {/* CARD */}

              <ExperienceCard
                item={item}
                index={index}
                total={total}
                active={
                  index ===
                  activeIndex
                }
                onClick={() =>
                  setActiveIndex(
                    index
                  )
                }
              />

            </div>
          )
        )}

      </div>

      {/* ===================================================
          BOTTOM NAV
      =================================================== */}

      <div className="expx-bottom">

        <div className="expx-counter">

          <strong>
            {String(
              activeIndex + 1
            ).padStart(
              2,
              "0"
            )}
          </strong>

          <span>
            /
          </span>

          <small>
            {String(total).padStart(
              2,
              "0"
            )}
          </small>

        </div>

        <div className="expx-bottom-line" />

        <div className="expx-bottom-label">
          <span>
            CURRENT POSITION
          </span>

          <i />
        </div>

      </div>

      {/* ===================================================
          MARQUEE
      =================================================== */}

      <div className="expx-marquee">

        <div className="expx-marquee-track">

          <span>
            WORK / BUILD / LEARN /
          </span>

          <b>
            ✦
          </b>

          <span>
            CREATE / DEVELOP /
          </span>

          <b>
            ✦
          </b>

          <span>
            WORK / BUILD / LEARN /
          </span>

          <b>
            ✦
          </b>

          <span>
            CREATE / DEVELOP /
          </span>

          <b>
            ✦
          </b>

          <span>
            WORK / BUILD / LEARN /
          </span>

          <b>
            ✦
          </b>

        </div>

      </div>

      {/* ===================================================
          CSS
      =================================================== */}

      <style>{`

        /* =====================================================
           RESET
        ===================================================== */

        .expx-section,
        .expx-section * {
          box-sizing:
            border-box;
        }

        .expx-section {
          position:
            relative;

          width:
            100%;

          min-height:
            100vh;

          padding:
            120px
            clamp(
              18px,
              5vw,
              90px
            )
            70px;

          overflow:
            hidden;

          background:
            #050505;

          color:
            #fff;

          isolation:
            isolate;

          font-family:
            "Manrope",
            Arial,
            sans-serif;
        }

        /* =====================================================
           BACKGROUND
        ===================================================== */

        .expx-background {
          position:
            absolute;

          inset:
            0;

          z-index:
            -10;

          background:
            radial-gradient(
              circle at
              calc(50% + var(--mx))
              calc(48% + var(--my)),
              rgba(167,139,250,.08),
              transparent 30%
            ),
            radial-gradient(
              circle at 20% 20%,
              rgba(255,255,255,.035),
              transparent 25%
            ),
            #050505;

          transition:
            background
            .8s
            ease;
        }

        .expx-grid {
          position:
            absolute;

          inset:
            0;

          z-index:
            -9;

          background-image:
            linear-gradient(
              rgba(255,255,255,.035)
              1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.035)
              1px,
              transparent 1px
            );

          background-size:
            80px 80px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 8%,
              black 92%,
              transparent
            );

          pointer-events:
            none;
        }

        .expx-aura {
          position:
            absolute;

          left:
            50%;

          top:
            48%;

          width:
            700px;

          height:
            700px;

          transform:
            translate(
              -50%,
              -50%
            );

          z-index:
            -8;

          background:
            radial-gradient(
              circle,
              rgba(167,139,250,.09),
              transparent 65%
            );

          filter:
            blur(60px);

          animation:
            expx-aura
            7s
            ease-in-out
            infinite;
        }

        @keyframes expx-aura {

          0%,
          100% {
            opacity:
              .3;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(.9);
          }

          50% {
            opacity:
              .75;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.1);
          }

        }

        .expx-noise {
          position:
            absolute;

          inset:
            -50%;

          z-index:
            50;

          pointer-events:
            none;

          opacity:
            .025;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");

          animation:
            expx-noise
            .35s
            steps(2)
            infinite;
        }

        @keyframes expx-noise {

          0% {
            transform:
              translate(0,0);
          }

          25% {
            transform:
              translate(
                2%,
                -1%
              );
          }

          50% {
            transform:
              translate(
                -1%,
                2%
              );
          }

          75% {
            transform:
              translate(
                1%,
                1%
              );
          }

          100% {
            transform:
              translate(
                -1%,
                -1%
              );
          }

        }

        /* =====================================================
           BACKGROUND NUMBER
        ===================================================== */

        .expx-bg-number {
          position:
            absolute;

          right:
            -3vw;

          top:
            13%;

          z-index:
            -7;

          font-size:
            clamp(
              220px,
              38vw,
              650px
            );

          line-height:
            .7;

          font-weight:
            900;

          letter-spacing:
            -.12em;

          color:
            rgba(255,255,255,.018);

          transform:
            translateX(
              var(--mx)
            );

          transition:
            transform
            1s
            ease;

          pointer-events:
            none;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .expx-heading {
          position:
            relative;

          z-index:
            5;

          opacity:
            0;

          transform:
            translateY(35px);

          transition:
            opacity
            1s
            ease,

            transform
            1.1s
            cubic-bezier(
              .16,
              1,
              .3,
              1
            );
        }

        .expx-visible
        .expx-heading {
          opacity:
            1;

          transform:
            translateY(0);
        }

        .expx-heading-top {
          display:
            flex;

          justify-content:
            space-between;

          align-items:
            center;

          padding-bottom:
            18px;

          border-bottom:
            1px solid
            rgba(255,255,255,.1);
        }

        .expx-section-label,
        .expx-heading-status {
          display:
            flex;

          align-items:
            center;

          gap:
            14px;

          font-family:
            "DM Mono",
            monospace;

          font-size:
            7px;

          letter-spacing:
            .18em;

          color:
            rgba(255,255,255,.3);
        }

        .expx-section-label > span {
          font-size:
            11px;

          color:
            rgba(255,255,255,.8);
        }

        .expx-section-label i {
          width:
            55px;

          height:
            1px;

          background:
            rgba(255,255,255,.25);
        }

        .expx-heading-status {
          gap:
            18px;
        }

        .expx-heading-status i {
          width:
            5px;

          height:
            5px;

          border-radius:
            50%;

          background:
            #d9ff3f;

          box-shadow:
            0 0 12px
            rgba(217,255,63,.8);

          animation:
            expx-live
            2s
            ease-in-out
            infinite;
        }

        @keyframes expx-live {

          0%,
          100% {
            opacity:
              .3;
          }

          50% {
            opacity:
              1;
          }

        }

        .expx-title-wrap {
          display:
            flex;

          justify-content:
            space-between;

          align-items:
            flex-end;

          gap:
            50px;

          padding:
            65px
            0
            40px;
        }

        .expx-eyebrow {
          display:
            block;

          margin-bottom:
            20px;

          font-family:
            "DM Mono",
            monospace;

          font-size:
            7px;

          letter-spacing:
            .24em;

          color:
            rgba(255,255,255,.28);
        }

        .expx-title-wrap h2 {
          margin:
            0;

          font-size:
            clamp(
              70px,
              10vw,
              155px
            );

          line-height:
            .76;

          letter-spacing:
            -.085em;

          font-weight:
            800;
        }

        .expx-title-wrap h2 em {
          font-style:
            italic;

          font-weight:
            400;

          color:
            rgba(255,255,255,.22);
        }

        .expx-heading-copy {
          width:
            min(
              360px,
              100%
            );
        }

        .expx-heading-copy p {
          margin:
            0 0 25px;

          font-size:
            11px;

          line-height:
            1.8;

          color:
            rgba(255,255,255,.38);
        }

        .expx-scroll-hint {
          display:
            flex;

          align-items:
            center;

          gap:
            12px;

          font-family:
            "DM Mono",
            monospace;

          font-size:
            6px;

          letter-spacing:
            .17em;

          color:
            rgba(255,255,255,.25);
        }

        .expx-scroll-hint div {
          width:
            50px;

          height:
            1px;

          overflow:
            hidden;

          background:
            rgba(255,255,255,.15);
        }

        .expx-scroll-hint i {
          display:
            block;

          width:
            100%;

          height:
            100%;

          background:
            #fff;

          animation:
            expx-hint
            2s
            linear
            infinite;
        }

        @keyframes expx-hint {

          from {
            transform:
              translateX(
                -100%
              );
          }

          to {
            transform:
              translateX(
                100%
              );
          }

        }

        /* =====================================================
           PROGRESS
        ===================================================== */

        .expx-progress {
          position:
            absolute;

          top:
            0;

          left:
            0;

          width:
            100%;

          height:
            2px;

          z-index:
            60;

          background:
            rgba(255,255,255,.05);
        }

        .expx-progress div {
          position:
            absolute;

          left:
            0;

          top:
            0;

          width:
            100%;

          height:
            100%;

          transform-origin:
            left;

          background:
            linear-gradient(
              90deg,
              #fff,
              #a78bfa
            );

          box-shadow:
            0 0 20px
            rgba(167,139,250,.5);
        }

        /* =====================================================
           YEAR NAV
        ===================================================== */

        .expx-year-nav {
          position:
            sticky;

          top:
            100px;

          z-index:
            45;

          width:
            max-content;

          margin:
            0 0
            25px
            auto;

          display:
            flex;

          flex-direction:
            column;

          gap:
            8px;
        }

        .expx-year-nav button {
          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          padding:
            3px 0;

          border:
            0;

          background:
            transparent;

          color:
            rgba(255,255,255,.2);

          cursor:
            pointer;

          font-family:
            "DM Mono",
            monospace;

          font-size:
            6px;

          letter-spacing:
            .12em;
        }

        .expx-year-nav button i {
          width:
            18px;

          height:
            1px;

          background:
            rgba(255,255,255,.15);

          transition:
            width .35s ease,
            background .35s ease;
        }

        .expx-year-nav button.active {
          color:
            #fff;
        }

        .expx-year-nav button.active i {
          width:
            35px;

          background:
            #a78bfa;

          box-shadow:
            0 0 10px
            rgba(167,139,250,.8);
        }

        /* =====================================================
           TIMELINE
        ===================================================== */

        .expx-timeline {
          position:
            relative;

          width:
            100%;

          padding:
            20px 0
            100px;
        }

        .expx-line {
          position:
            absolute;

          left:
            50%;

          top:
            0;

          bottom:
            0;

          width:
            1px;

          transform:
            translateX(-50%);

          background:
            rgba(255,255,255,.1);

          overflow:
            hidden;
        }

        .expx-line > div {
          position:
            absolute;

          left:
            0;

          top:
            0;

          width:
            100%;

          background:
            linear-gradient(
              to bottom,
              #fff,
              #a78bfa,
              #55e6ff
            );

          box-shadow:
            0 0 15px
            rgba(167,139,250,.6);

          transition:
            height
            .25s
            linear;
        }

        /* =====================================================
           TIMELINE ITEM
        ===================================================== */

        .expx-timeline-item {
          position:
            relative;

          display:
            grid;

          grid-template-columns:
            1fr
            1fr;

          min-height:
            540px;

          margin-bottom:
            45px;
        }

        .expx-timeline-item:last-child {
          margin-bottom:
            0;
        }

        /* =====================================================
           YEAR
        ===================================================== */

        .expx-timeline-year {
          position:
            absolute;

          top:
            55px;

          z-index:
            10;

          display:
            flex;

          align-items:
            center;

          gap:
            12px;

          font-family:
            "DM Mono",
            monospace;

          font-size:
            7px;

          letter-spacing:
            .18em;

          color:
            rgba(255,255,255,.28);

          transition:
            color .4s ease;
        }

        .expx-timeline-item.left
        .expx-timeline-year {
          right:
            calc(50% + 45px);
        }

        .expx-timeline-item.right
        .expx-timeline-year {
          left:
            calc(50% + 45px);
        }

        .expx-timeline-item.active
        .expx-timeline-year {
          color:
            #fff;
        }

        .expx-timeline-year i {
          display:
            block;

          width:
            35px;

          height:
            1px;

          background:
            rgba(255,255,255,.15);

          transition:
            width .4s ease,
            background .4s ease;
        }

        .expx-timeline-item.active
        .expx-timeline-year i {
          width:
            60px;

          background:
            #a78bfa;
        }

        /* =====================================================
           DOT
        ===================================================== */

        .expx-dot {
          position:
            absolute;

          left:
            50%;

          top:
            55px;

          width:
            25px;

          height:
            25px;

          padding:
            0;

          transform:
            translateX(-50%);

          z-index:
            35;

          border:
            1px solid
            rgba(255,255,255,.18);

          border-radius:
            50%;

          background:
            #050505;

          cursor:
            pointer;

          transition:
            transform .4s
            cubic-bezier(.16,1,.3,1),
            border-color .4s ease;
        }

        .expx-dot span {
          position:
            absolute;

          left:
            50%;

          top:
            50%;

          width:
            5px;

          height:
            5px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

          background:
            rgba(255,255,255,.3);

          transition:
            background .3s ease,
            box-shadow .3s ease,
            transform .3s ease;
        }

        .expx-dot i {
          position:
            absolute;

          inset:
            -7px;

          border:
            1px solid
            transparent;

          border-radius:
            50%;

          transition:
            border-color .4s ease,
            transform .4s ease;
        }

        .expx-timeline-item.active
        .expx-dot {
          border-color:
            #a78bfa;

          transform:
            translateX(-50%)
            scale(1.12);
        }

        .expx-timeline-item.active
        .expx-dot span {
          background:
            #a78bfa;

          box-shadow:
            0 0 15px
            rgba(167,139,250,.9);

          transform:
            translate(
              -50%,
              -50%
            )
            scale(1.4);
        }

        .expx-timeline-item.active
        .expx-dot i {
          border-color:
            rgba(167,139,250,.25);

          transform:
            scale(1.25);

          animation:
            expx-ring
            2s
            ease-out
            infinite;
        }

        @keyframes expx-ring {

          0% {
            opacity:
              1;

            transform:
              scale(.8);
          }

          100% {
            opacity:
              0;

            transform:
              scale(1.5);
          }

        }

        /* =====================================================
           CARD PLACEMENT
        ===================================================== */

        .expx-card {
          position:
            relative;

          width:
            min(
              520px,
              90%
            );

          min-height:
            380px;

          padding:
            27px;

          overflow:
            hidden;

          border:
            1px solid
            rgba(255,255,255,.11);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.065),
              rgba(255,255,255,.018)
            );

          backdrop-filter:
            blur(18px);

          transform-style:
            preserve-3d;

          cursor:
            pointer;

          opacity:
            .45;

          filter:
            brightness(.65)
            saturate(.7);

          transition:
            transform
            1s
            cubic-bezier(
              .16,
              1,
              .3,
              1
            ),
            opacity
            .7s
            ease,
            filter
            .7s
            ease,
            border-color
            .5s ease,
            box-shadow
            .7s ease;
        }

        .expx-card::before {
          content:
            "";

          position:
            absolute;

          inset:
            0;

          background:
            radial-gradient(
              circle at
              calc(50% + var(--mx))
              calc(50% + var(--my)),
              rgba(167,139,250,.13),
              transparent 40%
            );

          opacity:
            0;

          transition:
            opacity
            .5s ease;

          pointer-events:
            none;
        }

        .expx-card-left {
          grid-column:
            1;

          grid-row:
            1;

          justify-self:
            end;

          margin-right:
            85px;

          transform:
            perspective(1000px)
            rotateY(
              calc(
                5deg + var(--card-x)
              )
            )
            rotateX(
              var(--card-y)
            )
            translateX(
              40px
            );
        }

        .expx-card-right {
          grid-column:
            2;

          grid-row:
            1;

          justify-self:
            start;

          margin-left:
            85px;

          transform:
            perspective(1000px)
            rotateY(
              calc(
                -5deg - var(--card-x)
              )
            )
            rotateX(
              var(--card-y)
            )
            translateX(
              -40px
            );
        }

        /* =====================================================
           ACTIVE CARD
        ===================================================== */

        .expx-card-active {
          opacity:
            1;

          filter:
            none;

          border-color:
            rgba(167,139,250,.35);

          box-shadow:
            0 40px 100px
            rgba(0,0,0,.55),
            0 0 55px
            rgba(167,139,250,.07);
        }

        .expx-card-left.expx-card-active {
          transform:
            perspective(1000px)
            rotateY(
              calc(
                2deg + var(--card-x)
              )
            )
            rotateX(
              var(--card-y)
            )
            translateX(
              0
            );
        }

        .expx-card-right.expx-card-active {
          transform:
            perspective(1000px)
            rotateY(
              calc(
                -2deg - var(--card-x)
              )
            )
            rotateX(
              var(--card-y)
            )
            translateX(
              0
            );
        }

        .expx-card:hover {
          opacity:
            1;

          filter:
            none;

          border-color:
            rgba(255,255,255,.25);
        }

        .expx-card:hover::before {
          opacity:
            1;
        }

        /* =====================================================
           CONNECTOR
        ===================================================== */

        .expx-connector {
          position:
            absolute;

          top:
            65px;

          width:
            85px;

          height:
            1px;

          pointer-events:
            none;
        }

        .expx-card-left
        .expx-connector {
          right:
            -85px;
        }

        .expx-card-right
        .expx-connector {
          left:
            -85px;
        }

        .expx-connector span {
          position:
            absolute;

          inset:
            0;

          background:
            rgba(255,255,255,.12);
        }

        .expx-connector i {
          position:
            absolute;

          top:
            0;

          width:
            35px;

          height:
            100%;

          background:
            linear-gradient(
              90deg,
              transparent,
              #a78bfa,
              transparent
            );

          animation:
            expx-connector
            2.5s
            linear
            infinite;
        }

        .expx-card-left
        .expx-connector i {
          left:
            -35px;
        }

        .expx-card-right
        .expx-connector i {
          right:
            -35px;
        }

        @keyframes expx-connector {

          from {
            transform:
              translateX(0);
          }

          to {
            transform:
              translateX(120px);
          }

        }

        /* =====================================================
           CARD HEADER
        ===================================================== */

        .expx-card-head {
          position:
            relative;

          z-index:
            5;

          display:
            flex;

          justify-content:
            space-between;

          align-items:
            center;

          padding-bottom:
            20px;

          border-bottom:
            1px solid
            rgba(255,255,255,.09);
        }

        .expx-card-index {
          display:
            flex;

          align-items:
            baseline;

          gap:
            6px;

          font-family:
            "DM Mono",
            monospace;
        }

        .expx-card-index span {
          font-size:
            12px;

          color:
            rgba(255,255,255,.75);
        }

        .expx-card-index small {
          font-size:
            6px;

          color:
            rgba(255,255,255,.2);
        }

        .expx-year {
          font-family:
            "DM Mono",
            monospace;

          font-size:
            7px;

          letter-spacing:
            .17em;

          color:
            rgba(255,255,255,.35);
        }

        /* =====================================================
           CARD MAIN
        ===================================================== */

        .expx-card-main {
          position:
            relative;

          z-index:
            5;

          padding:
            30px
            0
            25px;
        }

        .expx-role-line {
          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          margin-bottom:
            14px;

          font-family:
            "DM Mono",
            monospace;

          font-size:
            6px;

          letter-spacing:
            .18em;

          color:
            rgba(255,255,255,.3);
        }

        .expx-status-dot {
          width:
            5px;

          height:
            5px;

          border-radius:
            50%;

          background:
            rgba(255,255,255,.3);
        }

        .expx-card-active
        .expx-status-dot {
          background:
            #a78bfa;

          box-shadow:
            0 0 12px
            rgba(167,139,250,.9);

          animation:
            expx-status
            1.5s
            ease-in-out
            infinite;
        }

        @keyframes expx-status {

          0%,
          100% {
            opacity:
              .35;
          }

          50% {
            opacity:
              1;
          }

        }

        .expx-card-main h3 {
          margin:
            0;

          max-width:
            430px;

          font-size:
            clamp(
              30px,
              3.5vw,
              53px
            );

          line-height:
            .9;

          letter-spacing:
            -.065em;

          font-weight:
            800;

          transition:
            transform
            .5s
            cubic-bezier(
              .16,
              1,
              .3,
              1
            );
        }

        .expx-card:hover
        .expx-card-main h3 {
          transform:
            translateX(5px);
        }

        .expx-company {
          display:
            block;

          margin-top:
            12px;

          font-size:
            12px;

          font-weight:
            500;

          color:
            rgba(255,255,255,.55);
        }

        .expx-description {
          margin:
            20px
            0
            0;

          max-width:
            440px;

          font-size:
            10px;

          line-height:
            1.8;

          color:
            rgba(255,255,255,.4);
        }

        /* =====================================================
           TAGS
        ===================================================== */

        .expx-tags {
          display:
            flex;

          flex-wrap:
            wrap;

          gap:
            6px;

          margin-top:
            20px;
        }

        .expx-tags span {
          display:
            inline-flex;

          align-items:
            center;

          gap:
            6px;

          padding:
            7px
            9px;

          border:
            1px solid
            rgba(255,255,255,.11);

          background:
            rgba(255,255,255,.025);

          font-family:
            "DM Mono",
            monospace;

          font-size:
            6px;

          letter-spacing:
            .1em;

          color:
            rgba(255,255,255,.42);

          transition:
            border-color
            .3s ease,
            color
            .3s ease,
            transform
            .3s ease;
        }

        .expx-tags span i {
          width:
            3px;

          height:
            3px;

          border-radius:
            50%;

          background:
            #a78bfa;
        }

        .expx-tags span:hover {
          transform:
            translateY(-2px);

          border-color:
            rgba(167,139,250,.5);

          color:
            #fff;
        }

        /* =====================================================
           CARD BOTTOM
        ===================================================== */

        .expx-card-bottom {
          position:
            relative;

          z-index:
            5;

          display:
            flex;

          justify-content:
            space-between;

          align-items:
            center;

          padding-top:
            15px;

          border-top:
            1px solid
            rgba(255,255,255,.09);

          font-family:
            "DM Mono",
            monospace;

          font-size:
            6px;

          letter-spacing:
            .17em;

          color:
            rgba(255,255,255,.2);
        }

        .expx-card-bottom b {
          font-size:
            16px;

          font-weight:
            400;

          color:
            rgba(255,255,255,.3);

          transition:
            transform
            .4s ease,
            color
            .4s ease;
        }

        .expx-card:hover
        .expx-card-bottom b {
          transform:
            translate(
              4px,
              -4px
            );

          color:
            #a78bfa;
        }

        /* =====================================================
           CORNERS
        ===================================================== */

        .expx-corners {
          position:
            absolute;

          inset:
            0;

          pointer-events:
            none;

          z-index:
            10;
        }

        .expx-corners i {
          position:
            absolute;

          width:
            20px;

          height:
            20px;

          border:
            1px solid
            rgba(167,139,250,.45);

          opacity:
            .45;

          transition:
            width
            .5s ease,
            height
            .5s ease,
            opacity
            .5s ease;
        }

        .expx-corners i:nth-child(1) {
          left:
            10px;

          top:
            10px;

          border-right:
            0;

          border-bottom:
            0;
        }

        .expx-corners i:nth-child(2) {
          right:
            10px;

          top:
            10px;

          border-left:
            0;

          border-bottom:
            0;
        }

        .expx-corners i:nth-child(3) {
          left:
            10px;

          bottom:
            10px;

          border-right:
            0;

          border-top:
            0;
        }

        .expx-corners i:nth-child(4) {
          right:
            10px;

          bottom:
            10px;

          border-left:
            0;

          border-top:
            0;
        }

        .expx-card:hover
        .expx-corners i,
        .expx-card-active
        .expx-corners i {
          width:
            32px;

          height:
            32px;

          opacity:
            1;
        }

        /* =====================================================
           CARD GLOW
        ===================================================== */

        .expx-card-glow {
          position:
            absolute;

          width:
            180px;

          height:
            180px;

          left:
            50%;

          top:
            50%;

          transform:
            translate(
              -50%,
              -50%
            );

          background:
            radial-gradient(
              circle,
              rgba(167,139,250,.12),
              transparent 70%
            );

          filter:
            blur(20px);

          opacity:
            0;

          pointer-events:
            none;

          transition:
            opacity
            .6s ease;
        }

        .expx-card:hover
        .expx-card-glow,
        .expx-card-active
        .expx-card-glow {
          opacity:
            1;
        }

        /* =====================================================
           BOTTOM
        ===================================================== */

        .expx-bottom {
          position:
            relative;

          display:
            grid;

          grid-template-columns:
            auto
            1fr
            auto;

          align-items:
            center;

          gap:
            20px;

          margin-top:
            5px;

          padding-top:
            20px;

          border-top:
            1px solid
            rgba(255,255,255,.08);
        }

        .expx-counter {
          display:
            flex;

          align-items:
            baseline;

          gap:
            7px;

          font-family:
            "DM Mono",
            monospace;
        }

        .expx-counter strong {
          font-size:
            17px;
        }

        .expx-counter span,
        .expx-counter small {
          font-size:
            7px;

          color:
            rgba(255,255,255,.25);
        }

        .expx-bottom-line {
          height:
            1px;

          background:
            rgba(255,255,255,.08);
        }

        .expx-bottom-label {
          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          font-family:
            "DM Mono",
            monospace;

          font-size:
            6px;

          letter-spacing:
            .15em;

          color:
            rgba(255,255,255,.22);
        }

        .expx-bottom-label i {
          width:
            5px;

          height:
            5px;

          border-radius:
            50%;

          background:
            #a78bfa;

          box-shadow:
            0 0 10px
            rgba(167,139,250,.8);
        }

        /* =====================================================
           MARQUEE
        ===================================================== */

        .expx-marquee {
          position:
            absolute;

          left:
            -5%;

          right:
            -5%;

          bottom:
            0;

          height:
            32px;

          overflow:
            hidden;

          border-top:
            1px solid
            rgba(255,255,255,.05);

          border-bottom:
            1px solid
            rgba(255,255,255,.05);

          pointer-events:
            none;

          opacity:
            .55;
        }

        .expx-marquee-track {
          display:
            flex;

          align-items:
            center;

          gap:
            25px;

          width:
            max-content;

          height:
            100%;

          animation:
            expx-marquee
            25s
            linear
            infinite;
        }

        .expx-marquee span {
          white-space:
            nowrap;

          font-size:
            9px;

          font-weight:
            800;

          letter-spacing:
            .15em;

          color:
            rgba(255,255,255,.14);
        }

        .expx-marquee b {
          font-size:
            8px;

          color:
            #a78bfa;
        }

        @keyframes expx-marquee {

          from {
            transform:
              translateX(0);
          }

          to {
            transform:
              translateX(-50%);
          }

        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 950px) {

          .expx-section {
            padding:
              90px
              24px
              55px;
          }

          .expx-title-wrap {
            padding-top:
              55px;
          }

          .expx-card {
            width:
              min(
                430px,
                88%
              );
          }

          .expx-card-left {
            margin-right:
              45px;
          }

          .expx-card-right {
            margin-left:
              45px;
          }

          .expx-card-left
          .expx-connector {
            right:
              -45px;

            width:
              45px;
          }

          .expx-card-right
          .expx-connector {
            left:
              -45px;

            width:
              45px;
          }

        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 700px) {

          .expx-section {
            padding:
              75px
              16px
              48px;
          }

          .expx-heading-status {
            display:
              none;
          }

          .expx-section-label small {
            display:
              none;
          }

          .expx-section-label i {
            width:
              35px;
          }

          .expx-title-wrap {
            display:
              block;

            padding:
              55px
              0
              30px;
          }

          .expx-title-wrap h2 {
            font-size:
              clamp(
                64px,
                18vw,
                105px
              );
          }

          .expx-heading-copy {
            margin-top:
              30px;
          }

          .expx-year-nav {
            display:
              none;
          }

          .expx-timeline {
            padding:
              15px
              0
              55px;
          }

          /* MOBILE LINE */

          .expx-line {
            left:
              10px;

            transform:
              none;
          }

          .expx-timeline-item {
            display:
              block;

            min-height:
              auto;

            margin-bottom:
              65px;

            padding-left:
              35px;
          }

          .expx-dot {
            left:
              10px;

            top:
              25px;

            width:
              21px;

            height:
              21px;

            transform:
              translateX(-50%);
          }

          .expx-timeline-item.active
          .expx-dot {
            transform:
              translateX(-50%)
              scale(1.08);
          }

          .expx-timeline-year {
            position:
              relative;

            top:
              auto !important;

            left:
              auto !important;

            right:
              auto !important;

            margin-bottom:
              12px;

            padding-left:
              5px;
          }

          .expx-timeline-year i {
            display:
              none;
          }

          .expx-card,
          .expx-card-left,
          .expx-card-right,
          .expx-card-left.expx-card-active,
          .expx-card-right.expx-card-active {
            width:
              100%;

            min-height:
              360px;

            margin:
              0;

            transform:
              perspective(1000px)
              rotateX(
                var(--card-y)
              )
              rotateY(
                var(--card-x)
              )
              translateX(0);
          }

          .expx-card {
            opacity:
              .5;
          }

          .expx-card-active {
            opacity:
              1;
          }

          .expx-connector {
            display:
              none;
          }

          .expx-card-main {
            padding:
              25px
              0
              20px;
          }

          .expx-card-main h3 {
            font-size:
              34px;
          }

          .expx-description {
            font-size:
              9px;
          }

          .expx-bg-number {
            right:
              -12vw;

            top:
              18%;
          }

          .expx-bottom {
            grid-template-columns:
              auto
              1fr;

          }

          .expx-bottom-label {
            display:
              none;
          }

          .expx-bottom-line {
            width:
              100%;
          }

        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 430px) {

          .expx-card {
            min-height:
              340px;

            padding:
              20px;
          }

          .expx-card-head {
            padding-bottom:
              15px;
          }

          .expx-card-main {
            padding-top:
              22px;
          }

          .expx-card-main h3 {
            font-size:
              30px;
          }

          .expx-company {
            font-size:
              10px;
          }

          .expx-description {
            font-size:
              8px;

            line-height:
              1.65;
          }

          .expx-tags span {
            font-size:
              5px;

            padding:
              6px 7px;
          }

        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .expx-section *,
          .expx-section *::before,
          .expx-section *::after {

            animation-duration:
              .01ms !important;

            animation-iteration-count:
              1 !important;

            transition-duration:
              .01ms !important;

          }

        }

      `}</style>
    </section>
  );
}