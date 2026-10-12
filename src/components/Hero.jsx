import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "../data/portfolio";

export default function Hero() {
  const heroRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState("");
  const [activeWord, setActiveWord] = useState(0);

  /* =====================================================
     ROTATING WORDS
  ===================================================== */

  const words = useMemo(
    () => [
      "CREATIVE DEVELOPER",
      "FULL STACK DEVELOPER",
      "DIGITAL BUILDER",
      "INTERFACE MAKER",
      "CODE & DESIGN",
    ],
    []
  );

  /* =====================================================
     PARTICLES
  ===================================================== */

  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: `${(i * 37.7) % 100}%`,
        top: `${(i * 61.3) % 100}%`,
        delay: `${(i % 9) * 0.45}s`,
        duration: `${4 + (i % 6)}s`,
        size: `${i % 3 === 0 ? 3 : 2}px`,
      })),
    []
  );

  /* =====================================================
     INTRO
  ===================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  /* =====================================================
     MOUSE PARALLAX
  ===================================================== */

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    let raf = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();

      pointerX = (e.clientX - rect.left) / rect.width;
      pointerY = (e.clientY - rect.top) / rect.height;

      if (raf) return;

      raf = requestAnimationFrame(() => {
        hero.style.setProperty("--mx", `${pointerX * 100}%`);
        hero.style.setProperty("--my", `${pointerY * 100}%`);
        hero.style.setProperty("--mouse-x", `${(pointerX - 0.5) * 2}`);
        hero.style.setProperty("--mouse-y", `${(pointerY - 0.5) * 2}`);
        raf = 0;
      });
    };

    hero.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* =====================================================
     SCROLL PROGRESS
  ===================================================== */

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let raf = 0;
    const handleScroll = () => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();

        const progress = Math.min(
          1,
          Math.max(0, -rect.top / Math.max(rect.height, 1))
        );

        hero.style.setProperty("--scroll-progress", progress);
        raf = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* =====================================================
     WORD ROTATION
  ===================================================== */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [words.length]);

  /* =====================================================
     LIVE CLOCK
  ===================================================== */

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =====================================================
     GO TO WORK
  ===================================================== */

  const goToWork = () => {
    const work = document.getElementById("work");

    if (work) {
      work.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* =====================================================
     IMAGE TRANSFORM
  ===================================================== */

  const imageTransform = `
    translate3d(
      calc(-50% + var(--mouse-x, 0) * 10px),
      calc(var(--mouse-y, 0) * 7px),
      0
    )
    rotateX(calc(var(--mouse-y, 0) * -2.5deg))
    rotateY(calc(var(--mouse-x, 0) * 3.5deg))
  `;

  /* =====================================================
     ORBIT TRANSFORMS
  ===================================================== */

  const orbitOneTransform = `
    translate(-50%, -50%)
    rotate(calc(var(--mouse-x, 0) * 7deg - 12deg))
    scale(calc(1 + abs(var(--mouse-x, 0)) * 0.025))
  `;

  const orbitTwoTransform = `
    translate(-50%, -50%)
    rotate(calc(var(--mouse-x, 0) * -10deg + 18deg))
    scale(calc(1 + abs(var(--mouse-y, 0)) * 0.035))
  `;

  return (
    <section
      ref={heroRef}
      className={`ac2-hero ${
        visible ? "is-visible" : ""
      }`}
      id="home"
      style={{
        "--scroll-progress": 0,
      }}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="ac2-bg" />
      <div className="ac2-grid" />
      <div className="ac2-grid-moving" />
      <div className="ac2-glow" />
      <div className="ac2-vignette" />
      <div className="ac2-noise" />

      {/* =====================================================
          CURSOR SPOTLIGHT
      ===================================================== */}

      <div className="ac2-cursor-light" />

      {/* =====================================================
          TOP SYSTEM BAR
      ===================================================== */}

      <div className="ac2-topbar">
        <div className="ac2-top-left">
          <span className="ac2-status-dot" />
          <span>SYSTEM ONLINE</span>
        </div>

        <div className="ac2-top-center">
          PORTFOLIO / 2026
        </div>

        <div className="ac2-top-right">
          <span>{time}</span>
          <span>ALG / 01</span>
        </div>
      </div>

      {/* =====================================================
          MAIN FRAME
      ===================================================== */}

      <div className="ac2-frame">
        <span className="ac2-frame-corner tl" />
        <span className="ac2-frame-corner tr" />
        <span className="ac2-frame-corner bl" />
        <span className="ac2-frame-corner br" />

        <span className="ac2-frame-label top">
          SELECTED WORKS
        </span>

        <span className="ac2-frame-label bottom">
          CREATIVE TECHNOLOGY
        </span>
      </div>

      {/* =====================================================
          PARTICLES
      ===================================================== */}

      <div className="ac2-particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="ac2-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* =====================================================
          ORBITS
      ===================================================== */}

      <div
        className="ac2-orbit ac2-orbit-one"
        style={{
          transform: orbitOneTransform,
        }}
      >
        <span />
      </div>

      <div
        className="ac2-orbit ac2-orbit-two"
        style={{
          transform: orbitTwoTransform,
        }}
      >
        <span />
      </div>

      <div className="ac2-orbit ac2-orbit-three">
        <span />
      </div>

      {/* =====================================================
          CROSSHAIR
      ===================================================== */}

      <div className="ac2-crosshair">
        <span className="horizontal" />
        <span className="vertical" />
        <i />
      </div>

      {/* =====================================================
          SCAN LINE
      ===================================================== */}

      <div className="ac2-scan-line" />

      {/* =====================================================
          LEFT INFORMATION
      ===================================================== */}

      <div
        className="ac2-side ac2-side-left"
        style={{
          transform: `
            translate3d(
              calc(var(--mouse-x, 0) * -6px),
              calc(var(--mouse-y, 0) * -4px),
              0
            )
          `,
        }}
      >
        <span className="ac2-side-index">
          01
        </span>

        <div className="ac2-side-line" />

        <div className="ac2-side-title">
          BUILDING
          <br />
          IDEAS
          <br />
          INTO
          <br />
          REALITY
        </div>

        <div className="ac2-side-meta">
          CODE
          <br />
          DESIGN
          <br />
          MOTION
        </div>
      </div>

      {/* =====================================================
          RIGHT INFORMATION
      ===================================================== */}

      <div
        className="ac2-side ac2-side-right"
        style={{
          transform: `
            translate3d(
              calc(var(--mouse-x, 0) * 6px),
              calc(var(--mouse-y, 0) * -4px),
              0
            )
          `,
        }}
      >
        <span className="ac2-side-index">
          02
        </span>

        <div className="ac2-side-line" />

        <div className="ac2-side-title right">
          DIGITAL
          <br />
          EXPERIENCES
          <br />
          THAT
          <br />
          MOVE
        </div>

        <div className="ac2-side-meta right">
          AVAILABLE
          <br />
          FOR SELECTED
          <br />
          PROJECTS
        </div>
      </div>

      {/* =====================================================
          CENTER LABEL
      ===================================================== */}

      <div className="ac2-center-label">
        <span>SCROLL / EXPLORE</span>
        <i />
      </div>

      {/* =====================================================
          BACK MARQUEE
          RIGHT → LEFT
      ===================================================== */}

      <div className="ac2-marquee ac2-marquee-back">
        <div className="ac2-marquee-track">
          <div className="ac2-marquee-group">
            <span>AMINE CODES</span>
            <b>✦</b>
            <span>CREATIVE DEVELOPER</span>
            <b>✦</b>
            <span>DIGITAL BUILDER</span>
            <b>✦</b>
            <span>FULL STACK</span>
            <b>✦</b>
          </div>

          <div className="ac2-marquee-group">
            <span>AMINE CODES</span>
            <b>✦</b>
            <span>CREATIVE DEVELOPER</span>
            <b>✦</b>
            <span>DIGITAL BUILDER</span>
            <b>✦</b>
            <span>FULL STACK</span>
            <b>✦</b>
          </div>
        </div>
      </div>

      {/* =====================================================
          FRONT MARQUEE
          LEFT → RIGHT
      ===================================================== */}

      <div className="ac2-marquee ac2-marquee-front">
        <div className="ac2-marquee-track reverse">
          <div className="ac2-marquee-group">
            <span>CREATE</span>
            <b>+</b>
            <span>BUILD</span>
            <b>+</b>
            <span>SHIP</span>
            <b>+</b>
            <span>REPEAT</span>
            <b>+</b>
          </div>

          <div className="ac2-marquee-group">
            <span>CREATE</span>
            <b>+</b>
            <span>BUILD</span>
            <b>+</b>
            <span>SHIP</span>
            <b>+</b>
            <span>REPEAT</span>
            <b>+</b>
          </div>
        </div>
      </div>

      {/* =====================================================
          CHARACTER / IMAGE
      ===================================================== */}

      <div
        className="ac2-character"
        style={{
          transform: imageTransform,
        }}
      >
        <div className="ac2-image-aura" />

        <div className="ac2-character-shadow" />

        <img
          src={profile?.portrait}
          alt={
            profile?.portraitAlt ||
            profile?.name ||
            "Developer"
          }
          draggable="false"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />

        <div className="ac2-image-border" />
      </div>

      {/* =====================================================
          IMAGE HUD
      ===================================================== */}

      <div className="ac2-image-hud">
        <span className="hud-line" />
        <span>SUBJECT / 001</span>
        <span className="hud-line" />
      </div>

      <div className="ac2-image-number">
        01
      </div>

      {/* =====================================================
          ROTATING WORD
      ===================================================== */}

      <div className="ac2-word-system">
        <span className="ac2-word-prefix">
          CURRENT MODE /
        </span>

        <div className="ac2-word-window">
          {words.map((word, index) => (
            <span
              key={word}
              className={
                index === activeWord
                  ? "active"
                  : ""
              }
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* =====================================================
          IMAGE LOADING
      ===================================================== */}

      <div
        className={`ac2-loading ${
          loaded ? "done" : ""
        }`}
      >
        <span>LOADING VISUAL</span>
        <i />
      </div>

      {/* =====================================================
          EXPLORE BUTTON
      ===================================================== */}

      <button
        type="button"
        className="ac2-explore"
        onClick={goToWork}
        aria-label="Explore work"
      >
        <span className="ac2-explore-ring" />

        <span className="ac2-explore-small">
          EXPLORE
        </span>

        <strong>WORK</strong>

        <span className="ac2-arrow">
          ↘
        </span>

        <span className="ac2-explore-line" />
      </button>

      {/* =====================================================
          SCROLL
      ===================================================== */}

      <button
        type="button"
        className="ac2-scroll"
        onClick={goToWork}
        aria-label="Scroll to work"
      >
        <span className="ac2-scroll-number">
          01
        </span>

        <span className="ac2-scroll-line">
          <i
            style={{
              transform: "scaleY(calc(1 - var(--scroll-progress, 0)))",
            }}
          />
        </span>

        <span className="ac2-scroll-text">
          SCROLL TO EXPLORE
        </span>
      </button>

      {/* =====================================================
          BOTTOM CENTER
      ===================================================== */}

      <div className="ac2-bottom-center">
        <span>AMINE / CREATIVE DEVELOPER</span>
        <i />
        <span>EST. 2026</span>
      </div>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div className="ac2-progress">
        <span>00</span>

        <div>
          <i
            style={{
              transform: "scaleX(calc(1 - var(--scroll-progress, 0)))",
            }}
          />
        </div>

        <span>01</span>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');

        /* =====================================================
           RESET / ISOLATION
        ===================================================== */

        .ac2-hero,
        .ac2-hero * {
          box-sizing: border-box;
        }

        .ac2-hero {
          --mx: 50%;
          --my: 50%;

          position: relative !important;

          width: 100% !important;
          height: 100svh !important;

          min-height: 700px;

          margin: 0;
          padding: 0;

          overflow: hidden !important;

          isolation: isolate !important;

          display: block;

          background: #050505;
          color: #fff;

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          contain: layout paint style;

          z-index: 1;
        }

        .ac2-hero button {
          font-family: inherit;
        }

        /* =====================================================
           BACKGROUND
        ===================================================== */

        .ac2-bg {
          position: absolute;
          inset: 0;
          z-index: 0;

          background:
            radial-gradient(
              circle at var(--mx) var(--my),
              rgba(255,255,255,.075),
              transparent 18%
            ),
            radial-gradient(
              ellipse at 50% 45%,
              rgba(255,255,255,.055),
              transparent 35%
            ),
            #050505;
        }

        .ac2-grid {
          position: absolute;
          inset: -20%;
          z-index: 1;

          background-image:
            linear-gradient(
              rgba(255,255,255,.038) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.038) 1px,
              transparent 1px
            );

          background-size: 90px 90px;

          opacity: .6;

          transform:
            perspective(700px)
            rotateX(60deg)
            translateY(15%);

          transform-origin: center bottom;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 35%,
              black 70%,
              transparent
            );

          pointer-events: none;
        }

        .ac2-grid-moving {
          position: absolute;
          inset: 0;
          z-index: 2;

          background-image:
            linear-gradient(
              90deg,
              transparent 49.8%,
              rgba(255,255,255,.08) 50%,
              transparent 50.2%
            );

          background-size: 25vw 100%;

          animation:
            ac2-grid-pulse
            5s
            ease-in-out
            infinite;

          opacity: .35;

          pointer-events: none;
        }

        @keyframes ac2-grid-pulse {
          0%,
          100% {
            transform: translateX(-5%);
            opacity: .2;
          }

          50% {
            transform: translateX(5%);
            opacity: .5;
          }
        }

        /* =====================================================
           CENTER GLOW
        ===================================================== */

        .ac2-glow {
          position: absolute;

          left: 50%;
          top: 47%;

          width: min(900px, 90vw);
          height: 650px;

          z-index: 3;

          transform:
            translate(-50%, -50%);

          background:
            radial-gradient(
              ellipse,
              rgba(255,255,255,.08),
              transparent 66%
            );

          filter: blur(45px);

          animation:
            ac2-glow-breathe
            6s
            ease-in-out
            infinite;

          pointer-events: none;
        }

        @keyframes ac2-glow-breathe {
          0%,
          100% {
            opacity: .45;

            transform:
              translate(-50%, -50%)
              scale(.94);
          }

          50% {
            opacity: .9;

            transform:
              translate(-50%, -50%)
              scale(1.06);
          }
        }

        /* =====================================================
           VIGNETTE
        ===================================================== */

        .ac2-vignette {
          position: absolute;
          inset: 0;

          z-index: 50;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at center,
              transparent 25%,
              rgba(0,0,0,.2) 55%,
              rgba(0,0,0,.88) 100%
            );
        }

        /* =====================================================
           NOISE
        ===================================================== */

        .ac2-noise {
          position: absolute;

          inset: -50%;

          z-index: 51;

          pointer-events: none;

          opacity: .045;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");

          animation:
            ac2-noise
            .3s
            steps(2)
            infinite;
        }

        @keyframes ac2-noise {
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

        /* =====================================================
           CURSOR LIGHT
        ===================================================== */

        .ac2-cursor-light {
          position: absolute;

          left: var(--mx);
          top: var(--my);

          width: 360px;
          height: 360px;

          z-index: 4;

          transform:
            translate(-50%, -50%);

          pointer-events: none;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.065),
              transparent 68%
            );

          filter: blur(15px);

          transition:
            left .08s linear,
            top .08s linear;
        }

        /* =====================================================
           TOP BAR
        ===================================================== */

        .ac2-topbar {
          position: absolute;

          left: 5%;
          right: 5%;
          top: 28px;

          z-index: 60;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: center;

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          letter-spacing: .18em;

          color:
            rgba(255,255,255,.35);

          opacity: 0;

          transform:
            translateY(-15px);

          transition:
            opacity .9s ease .5s,
            transform 1s
            cubic-bezier(.16,1,.3,1)
            .5s;
        }

        .is-visible .ac2-topbar {
          opacity: 1;

          transform:
            translateY(0);
        }

        .ac2-top-left,
        .ac2-top-right {
          display: flex;

          align-items: center;

          gap: 9px;
        }

        .ac2-top-right {
          justify-content: flex-end;

          gap: 20px;
        }

        .ac2-status-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #fff;

          box-shadow:
            0 0 12px
            rgba(255,255,255,.9);

          animation:
            ac2-status
            2s
            ease-in-out
            infinite;
        }

        @keyframes ac2-status {
          0%,
          100% {
            opacity: .3;
          }

          50% {
            opacity: 1;
          }
        }

        /* =====================================================
           MAIN FRAME
        ===================================================== */

        .ac2-frame {
          position: absolute;

          left: 27%;
          right: 27%;

          top: 12%;
          bottom: 16%;

          z-index: 8;

          border:
            1px solid
            rgba(255,255,255,.07);

          pointer-events: none;

          opacity: 0;

          transform:
            scale(.96);

          transition:
            opacity 1.2s ease .2s,
            transform 1.5s
            cubic-bezier(.16,1,.3,1)
            .2s;
        }

        .is-visible .ac2-frame {
          opacity: 1;

          transform:
            scale(1);
        }

        .ac2-frame::before,
        .ac2-frame::after {
          content: "";

          position: absolute;

          left: 50%;
          top: 0;
          bottom: 0;

          width: 1px;

          background:
            rgba(255,255,255,.025);
        }

        .ac2-frame::after {
          top: 50%;
          left: 0;
          right: 0;

          width: auto;
          height: 1px;
        }

        .ac2-frame-corner {
          position: absolute;

          width: 30px;
          height: 30px;

          border-color:
            rgba(255,255,255,.55);

          border-style: solid;
        }

        .ac2-frame-corner.tl {
          left: -1px;
          top: -1px;

          border-width:
            1px 0 0 1px;
        }

        .ac2-frame-corner.tr {
          right: -1px;
          top: -1px;

          border-width:
            1px 1px 0 0;
        }

        .ac2-frame-corner.bl {
          left: -1px;
          bottom: -1px;

          border-width:
            0 0 1px 1px;
        }

        .ac2-frame-corner.br {
          right: -1px;
          bottom: -1px;

          border-width:
            0 1px 1px 0;
        }

        .ac2-frame-label {
          position: absolute;

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          letter-spacing: .22em;

          color:
            rgba(255,255,255,.22);

          background:
            #050505;

          padding:
            0 8px;
        }

        .ac2-frame-label.top {
          left: 50%;
          top: -5px;

          transform:
            translateX(-50%);
        }

        .ac2-frame-label.bottom {
          left: 50%;
          bottom: -5px;

          transform:
            translateX(-50%);
        }

        /* =====================================================
           PARTICLES
        ===================================================== */

        .ac2-particles {
          position: absolute;
          inset: 0;

          z-index: 5;

          pointer-events: none;
        }

        .ac2-particle {
          position: absolute;

          border-radius: 50%;

          background: #fff;

          opacity: 0;

          animation:
            ac2-particle-float
            6s
            ease-in-out
            infinite;
        }

        .is-visible .ac2-particle {
          opacity: .4;
        }

        @keyframes ac2-particle-float {
          0%,
          100% {
            transform:
              translate3d(0,0,0)
              scale(.6);
          }

          50% {
            transform:
              translate3d(
                0,
                -25px,
                0
              )
              scale(1);
          }
        }

        /* =====================================================
           ORBITS
        ===================================================== */

        .ac2-orbit {
          position: absolute;

          left: 50%;
          top: 48%;

          z-index: 7;

          border:
            1px solid
            rgba(255,255,255,.055);

          border-radius: 50%;

          pointer-events: none;

          transition:
            transform .18s linear;
        }

        .ac2-orbit-one {
          width:
            min(76vw,1120px);

          height:
            min(35vw,500px);

          animation:
            ac2-orbit-one
            18s
            linear
            infinite;
        }

        .ac2-orbit-two {
          width:
            min(64vw,980px);

          height:
            min(42vw,590px);

          border-color:
            rgba(255,255,255,.035);

          animation:
            ac2-orbit-two
            25s
            linear
            infinite reverse;
        }

        .ac2-orbit-three {
          width:
            min(52vw,780px);

          height:
            min(28vw,420px);

          border-style: dashed;

          border-color:
            rgba(255,255,255,.025);

          animation:
            ac2-orbit-three
            30s
            linear
            infinite;
        }

        @keyframes ac2-orbit-one {
          to {
            rotate: 360deg;
          }
        }

        @keyframes ac2-orbit-two {
          to {
            rotate: 360deg;
          }
        }

        @keyframes ac2-orbit-three {
          to {
            rotate: -360deg;
          }
        }

        .ac2-orbit span {
          position: absolute;

          width: 6px;
          height: 6px;

          right: 13%;
          top: 9%;

          border-radius: 50%;

          background: #fff;

          box-shadow:
            0 0 18px
            rgba(255,255,255,.8);
        }

        .ac2-orbit-two span {
          left: 8%;
          top: 70%;

          right: auto;

          width: 4px;
          height: 4px;
        }

        .ac2-orbit-three span {
          left: 50%;
          top: -3px;

          right: auto;

          width: 3px;
          height: 3px;
        }

        /* =====================================================
           CROSSHAIR
        ===================================================== */

        .ac2-crosshair {
          position: absolute;

          left: 50%;
          top: 48%;

          width: 35px;
          height: 35px;

          z-index: 9;

          transform:
            translate(-50%,-50%);

          pointer-events: none;

          opacity: .25;

          animation:
            ac2-crosshair-pulse
            4s
            ease-in-out
            infinite;
        }

        .ac2-crosshair .horizontal,
        .ac2-crosshair .vertical {
          position: absolute;

          background: #fff;
        }

        .ac2-crosshair .horizontal {
          left: 0;
          right: 0;
          top: 50%;

          height: 1px;
        }

        .ac2-crosshair .vertical {
          top: 0;
          bottom: 0;
          left: 50%;

          width: 1px;
        }

        .ac2-crosshair i {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 5px;
          height: 5px;

          transform:
            translate(-50%,-50%);

          border:
            1px solid #fff;

          border-radius: 50%;
        }

        @keyframes ac2-crosshair-pulse {
          0%,
          100% {
            opacity: .15;
            scale: .85;
          }

          50% {
            opacity: .4;
            scale: 1.15;
          }
        }

        /* =====================================================
           SCAN LINE
        ===================================================== */

        .ac2-scan-line {
          position: absolute;

          left: 0;
          right: 0;

          top: -5%;

          z-index: 12;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.4),
              transparent
            );

          box-shadow:
            0 0 25px
            rgba(255,255,255,.25);

          animation:
            ac2-scan
            8s
            linear
            infinite;

          pointer-events: none;
        }

        @keyframes ac2-scan {
          0% {
            transform:
              translateY(0);

            opacity: 0;
          }

          8% {
            opacity: 1;
          }

          50% {
            opacity: .7;
          }

          100% {
            transform:
              translateY(110vh);

            opacity: 0;
          }
        }

        /* =====================================================
           SIDE INFORMATION
        ===================================================== */

        .ac2-side {
          position: absolute;

          top: 36%;

          z-index: 25;

          display: flex;

          flex-direction: column;

          gap: 15px;

          transition:
            transform .2s linear;

          pointer-events: none;
        }

        .ac2-side-left {
          left: 5.5%;
        }

        .ac2-side-right {
          right: 5.5%;

          align-items: flex-end;
        }

        .ac2-side-index {
          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;

          letter-spacing: .15em;

          color:
            rgba(255,255,255,.5);
        }

        .ac2-side-line {
          width: 70px;
          height: 1px;

          background:
            rgba(255,255,255,.35);
        }

        .ac2-side-title {
          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;

          line-height: 1.7;

          letter-spacing: .16em;

          color:
            rgba(255,255,255,.4);

          animation:
            ac2-side-float
            6s
            ease-in-out
            infinite;
        }

        .ac2-side-title.right {
          text-align: right;

          animation-delay:
            -2s;
        }

        @keyframes ac2-side-float {
          0%,
          100% {
            opacity: .35;
            translate: 0 0;
          }

          50% {
            opacity: .65;
            translate: 0 -5px;
          }
        }

        .ac2-side-meta {
          margin-top: 20px;

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          line-height: 1.8;

          letter-spacing: .15em;

          color:
            rgba(255,255,255,.2);
        }

        .ac2-side-meta.right {
          text-align: right;
        }

        /* =====================================================
           MARQUEE
        ===================================================== */

        .ac2-marquee {
          position: absolute;

          left: -15%;
          right: -15%;

          height: 145px;

          overflow: hidden;

          pointer-events: none;

          white-space: nowrap;
        }

        .ac2-marquee-back {
          top: 52%;

          z-index: 16;

          /* Keep the large type behind the portrait while it travels right to left. */
          will-change: transform;

          transform:
            rotate(-4deg);

          border-top:
            1px solid
            rgba(255,255,255,.08);

          border-bottom:
            1px solid
            rgba(255,255,255,.08);

          background:
            rgba(0,0,0,.58);
        }

        .ac2-marquee-front {
          top: 65%;

          z-index: 15;

          height: 105px;

          transform:
            rotate(4deg);

          border-top:
            1px solid
            rgba(255,255,255,.055);

          border-bottom:
            1px solid
            rgba(255,255,255,.055);

          background:
            rgba(255,255,255,.025);

          backdrop-filter:
            blur(2px);
        }

        .ac2-marquee-track {
          display: flex;

          width: max-content;
          height: 100%;

          animation:
            ac2-marquee-right-to-left
            22s
            linear
            infinite;

          will-change:
            transform;
        }

        .ac2-marquee-track.reverse {
          animation:
            ac2-marquee-reverse
            19s
            linear
            infinite;
        }

        @keyframes ac2-marquee-right-to-left {
          from {
            transform:
              translate3d(0,0,0);
          }

          to {
            transform:
              translate3d(-50%,0,0);
          }
        }

        @keyframes ac2-marquee-reverse {
          from {
            transform:
              translate3d(-50%,0,0);
          }

          to {
            transform:
              translate3d(0,0,0);
          }
        }

        .ac2-marquee-group {
          display: flex;

          align-items: center;

          flex-shrink: 0;

          gap: 55px;

          padding-right: 55px;

          height: 100%;
        }

        .ac2-marquee-group span {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(78px,9vw,175px);

          line-height: .8;

          font-weight: 900;

          font-style: italic;

          letter-spacing: -.08em;

          color:
            #f4f4f0;

          user-select: none;

          transition:
            letter-spacing .4s ease;
        }

        .ac2-marquee-back
        .ac2-marquee-group
        span {
          animation:
            ac2-text-breathe
            5s
            ease-in-out
            infinite;
        }

        @keyframes ac2-text-breathe {
          0%,
          100% {
            opacity: .92;
          }

          50% {
            opacity: 1;
          }
        }

        .ac2-marquee-front
        .ac2-marquee-group
        span {
          font-size:
            clamp(50px,6vw,105px);

          color:
            rgba(255,255,255,.08);
        }

        .ac2-marquee-group b {
          font-size: 30px;

          font-weight: 400;

          color: #fff;

          opacity: .7;

          animation:
            ac2-star
            4s
            ease-in-out
            infinite;
        }

        @keyframes ac2-star {
          0%,
          100% {
            rotate: 0deg;
            scale: .8;
          }

          50% {
            rotate: 180deg;
            scale: 1.15;
          }
        }

        /* =====================================================
           CHARACTER
        ===================================================== */

        .ac2-character {
          position: absolute;

          left: 50%;
          bottom: -4%;

          width:
            min(610px,47vw);

          height: 83vh;

          z-index: 20;

          display: flex;

          align-items: flex-end;

          justify-content: center;

          pointer-events: none;

          will-change:
            transform;

          opacity: 0;

          transform-origin:
            center bottom;

          transition:
            opacity 1.2s ease .4s,
            transform .12s linear;
        }

        .is-visible .ac2-character {
          opacity: 1;
        }

        .ac2-character img {
          position: relative;

          z-index: 5;

          width: 100%;
          height: 100%;

          object-fit: contain;

          object-position:
            center bottom;

          user-select: none;

          -webkit-user-drag: none;
          filter:
  grayscale(0)
  saturate(1.08)
  contrast(1.1)
  brightness(.98)
  drop-shadow(
    0 35px 60px
    rgba(0,0,0,.95)
  );
         
        }

        /* =====================================================
           IMAGE AURA
        ===================================================== */

        .ac2-image-aura {
          position: absolute;

          left: 50%;
          top: 12%;

          width: 80%;
          height: 75%;

          transform:
            translateX(-50%);

          background:
            radial-gradient(
              ellipse,
              rgba(255,255,255,.09),
              transparent 65%
            );

          filter:
            blur(35px);

          animation:
            ac2-aura
            5s
            ease-in-out
            infinite;
        }

        @keyframes ac2-aura {
          0%,
          100% {
            opacity: .35;

            scale: .95;
          }

          50% {
            opacity: .75;

            scale: 1.05;
          }
        }

        /* =====================================================
           IMAGE SHADOW
        ===================================================== */

        .ac2-character-shadow {
          position: absolute;

          left: 50%;
          bottom: 0;

          width: 90%;
          height: 22%;

          transform:
            translateX(-50%);

          background:
            radial-gradient(
              ellipse,
              rgba(0,0,0,.98),
              transparent 70%
            );

          filter:
            blur(30px);
        }

        /* =====================================================
           IMAGE BORDER
        ===================================================== */

        .ac2-image-border {
          position: absolute;

          left: 50%;
          top: 17%;

          width: 74%;
          height: 65%;

          transform:
            translateX(-50%);

          z-index: 6;

          border:
            1px solid
            rgba(255,255,255,.035);

          pointer-events: none;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 20%,
              black 80%,
              transparent
            );

          animation:
            ac2-border-pulse
            4s
            ease-in-out
            infinite;
        }

        @keyframes ac2-border-pulse {
          0%,
          100% {
            opacity: .35;
          }

          50% {
            opacity: .9;
          }
        }

        /* =====================================================
           IMAGE HUD
        ===================================================== */

        .ac2-image-hud {
          position: absolute;

          left: 50%;
          top: 20%;

          z-index: 24;

          transform:
            translateX(-50%);

          display: flex;

          align-items: center;

          gap: 10px;

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          letter-spacing: .2em;

          color:
            rgba(255,255,255,.28);

          pointer-events: none;

          animation:
            ac2-hud-float
            5s
            ease-in-out
            infinite;
        }

        @keyframes ac2-hud-float {
          0%,
          100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -5px;
          }
        }

        .hud-line {
          width: 35px;
          height: 1px;

          background:
            rgba(255,255,255,.2);
        }

        .ac2-image-number {
          position: absolute;

          left:
            calc(50% + 250px);

          top: 31%;

          z-index: 25;

          font-family:
            Arial,
            sans-serif;

          font-size: 85px;

          font-weight: 900;

          font-style: italic;

          line-height: 1;

          color:
            rgba(255,255,255,.035);

          pointer-events: none;

          animation:
            ac2-number-float
            8s
            ease-in-out
            infinite;
        }

        @keyframes ac2-number-float {
          0%,
          100% {
            transform:
              translateY(0)
              rotate(-2deg);
          }

          50% {
            transform:
              translateY(-12px)
              rotate(2deg);
          }
        }

        /* =====================================================
           WORD SYSTEM
        ===================================================== */

        .ac2-word-system {
          position: absolute;

          left: 50%;
          top: 10%;

          z-index: 30;

          transform:
            translateX(-50%);

          display: flex;

          align-items: center;

          gap: 12px;

          font-family:
            "DM Mono",
            monospace;

          white-space: nowrap;

          pointer-events: none;
        }

        .ac2-word-prefix {
          font-size: 7px;

          letter-spacing: .2em;

          color:
            rgba(255,255,255,.2);
        }

        .ac2-word-window {
          position: relative;

          width: 190px;
          height: 18px;

          overflow: hidden;
        }

        .ac2-word-window span {
          position: absolute;

          inset: 0;

          display: flex;

          align-items: center;

          font-size: 8px;

          letter-spacing: .17em;

          color: #fff;

          opacity: 0;

          transform:
            translateY(18px)
            skewX(-10deg);

          transition:
            opacity .5s ease,
            transform .7s
            cubic-bezier(.16,1,.3,1);
        }

        .ac2-word-window span.active {
          opacity: .8;

          transform:
            translateY(0)
            skewX(-10deg);
        }

        /* =====================================================
           LOADING
        ===================================================== */

        .ac2-loading {
          position: absolute;

          left: 50%;
          top: 27%;

          z-index: 35;

          transform:
            translateX(-50%);

          display: flex;

          align-items: center;

          gap: 9px;

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          letter-spacing: .18em;

          color:
            rgba(255,255,255,.35);

          transition:
            opacity .7s ease;
        }

        .ac2-loading.done {
          opacity: 0;

          pointer-events: none;
        }

        .ac2-loading i {
          width: 25px;
          height: 1px;

          background: #fff;

          animation:
            ac2-loading
            1s
            ease-in-out
            infinite alternate;
        }

        @keyframes ac2-loading {
          from {
            transform:
              scaleX(.2);

            transform-origin:
              left;
          }

          to {
            transform:
              scaleX(1);

            transform-origin:
              left;
          }
        }

        /* =====================================================
           CENTER LABEL
        ===================================================== */

        .ac2-center-label {
          position: absolute;

          left: 50%;
          bottom: 13%;

          z-index: 35;

          transform:
            translateX(-50%);

          display: flex;

          align-items: center;

          gap: 9px;

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          letter-spacing: .2em;

          color:
            rgba(255,255,255,.22);
        }

        .ac2-center-label i {
          width: 5px;
          height: 5px;

          border:
            1px solid #fff;

          border-radius: 50%;

          animation:
            ac2-ping
            1.8s
            ease-in-out
            infinite;
        }

        @keyframes ac2-ping {
          0%,
          100% {
            opacity: .25;
            scale: .7;
          }

          50% {
            opacity: 1;
            scale: 1.3;
          }
        }

        /* =====================================================
           EXPLORE BUTTON
        ===================================================== */

        .ac2-explore {
          position: absolute;

          right: 5%;
          bottom: 5%;

          z-index: 70;

          width: 115px;
          height: 115px;

          border:
            1px solid
            rgba(255,255,255,.3);

          border-radius: 50%;

          background:
            rgba(0,0,0,.3);

          color: #fff;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          cursor: pointer;

          backdrop-filter:
            blur(8px);

          font-family:
            "DM Mono",
            monospace;

          transition:
            transform .6s
            cubic-bezier(.16,1,.3,1),
            background .4s ease,
            color .4s ease,
            border-color .4s ease;
        }

        .ac2-explore:hover {
          transform:
            scale(1.12)
            rotate(5deg);

          background: #fff;

          color: #000;

          border-color: #fff;
        }

        .ac2-explore-ring {
          position: absolute;

          inset: 7px;

          border:
            1px dashed
            rgba(255,255,255,.2);

          border-radius: 50%;

          animation:
            ac2-ring
            10s
            linear
            infinite;
        }

        @keyframes ac2-ring {
          to {
            rotate: 360deg;
          }
        }

        .ac2-explore-small {
          font-size: 7px;

          letter-spacing: .12em;
        }

        .ac2-explore strong {
          margin-top: 3px;

          font-size: 10px;

          letter-spacing: .1em;
        }

        .ac2-arrow {
          margin-top: 8px;

          font-size: 20px;

          transition:
            transform .35s ease;
        }

        .ac2-explore:hover .ac2-arrow {
          transform:
            translate(5px,5px);
        }

        .ac2-explore-line {
          width: 25px;
          height: 1px;

          margin-top: 3px;

          background:
            currentColor;
        }

        /* =====================================================
           SCROLL
        ===================================================== */

        .ac2-scroll {
          position: absolute;

          left: 5%;
          bottom: 5%;

          z-index: 70;

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 0;

          border: 0;

          background: transparent;

          color:
            rgba(255,255,255,.3);

          cursor: pointer;

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          letter-spacing: .18em;

          transition:
            color .3s ease;
        }

        .ac2-scroll:hover {
          color: #fff;
        }

        .ac2-scroll-number {
          color: #fff;
        }

        .ac2-scroll-line {
          position: relative;

          width: 1px;
          height: 35px;

          background:
            rgba(255,255,255,.15);
        }

        .ac2-scroll-line i {
          position: absolute;

          left: 0;
          top: 0;

          width: 1px;
          height: 100%;

          background: #fff;

          transform-origin:
            top;
        }

        /* =====================================================
           BOTTOM CENTER
        ===================================================== */

        .ac2-bottom-center {
          position: absolute;

          left: 50%;
          bottom: 5.5%;

          z-index: 60;

          transform:
            translateX(-50%);

          display: flex;

          align-items: center;

          gap: 14px;

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          letter-spacing: .18em;

          color:
            rgba(255,255,255,.18);

          white-space: nowrap;

          pointer-events: none;
        }

        .ac2-bottom-center i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.4);

          animation:
            ac2-bottom-dot
            2s
            ease-in-out
            infinite;
        }

        @keyframes ac2-bottom-dot {
          0%,
          100% {
            opacity: .25;
          }

          50% {
            opacity: 1;
          }
        }

        /* =====================================================
           PROGRESS
        ===================================================== */

        .ac2-progress {
          position: absolute;

          right: 5%;
          top: 50%;

          z-index: 60;

          display: flex;

          align-items: center;

          gap: 8px;

          transform:
            rotate(90deg)
            translateX(50%);

          transform-origin:
            right center;

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          letter-spacing: .15em;

          color:
            rgba(255,255,255,.25);
        }

        .ac2-progress div {
          width: 65px;
          height: 1px;

          overflow: hidden;

          background:
            rgba(255,255,255,.12);
        }

        .ac2-progress i {
          display: block;

          width: 100%;
          height: 100%;

          background: #fff;

          transform-origin:
            left;
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1000px) {
          .ac2-frame {
            left: 20%;
            right: 20%;
          }

          .ac2-character {
            width:
              min(570px,62vw);
          }

          .ac2-side {
            top: 34%;
          }

          .ac2-marquee {
            left: -25%;
            right: -25%;
          }

          .ac2-image-number {
            left:
              calc(50% + 210px);
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 700px) {
          .ac2-hero {
            min-height: 650px;
          }

          .ac2-topbar {
            left: 5%;
            right: 5%;
            top: 20px;

            grid-template-columns:
              1fr auto;
          }

          .ac2-top-center {
            display: none;
          }

          .ac2-top-right {
            gap: 10px;
          }

          .ac2-grid {
            background-size:
              55px 55px;
          }

          .ac2-frame {
            left: 8%;
            right: 8%;

            top: 15%;
            bottom: 19%;
          }

          .ac2-frame-label {
            display: none;
          }

          .ac2-side {
            top: 31%;
          }

          .ac2-side-left {
            left: 3%;
          }

          .ac2-side-right {
            right: 3%;
          }

          .ac2-side-title {
            font-size: 7px;
          }

          .ac2-side-meta {
            font-size: 6px;
          }

          .ac2-side-line {
            width: 42px;
          }

          .ac2-character {
            width:
              min(470px,96vw);

            height: 69vh;

            bottom: 3%;
          }

          .ac2-image-hud {
            top: 22%;
          }

          .ac2-image-number {
            display: none;
          }

          .ac2-word-system {
            top: 11%;
          }

          .ac2-word-window {
            width: 150px;
          }

          .ac2-marquee {
            left: -40%;
            right: -40%;
          }

          .ac2-marquee-back {
            top: 55%;

            height: 105px;
          }

          .ac2-marquee-front {
            top: 65%;

            height: 82px;
          }

          .ac2-marquee-group {
            gap: 30px;

            padding-right: 30px;
          }

          .ac2-marquee-group span {
            font-size:
              clamp(58px,17vw,105px);
          }

          .ac2-marquee-front
          .ac2-marquee-group
          span {
            font-size:
              clamp(42px,12vw,75px);
          }

          .ac2-marquee-group b {
            font-size: 22px;
          }

          .ac2-center-label {
            bottom: 14%;
          }

          .ac2-explore {
            right: 4%;
            bottom: 4%;

            width: 82px;
            height: 82px;
          }

          .ac2-explore-small {
            font-size: 6px;
          }

          .ac2-explore strong {
            font-size: 8px;
          }

          .ac2-arrow {
            font-size: 16px;

            margin-top: 5px;
          }

          .ac2-explore-line {
            width: 18px;
          }

          .ac2-scroll {
            left: 4%;
            bottom: 4%;

            gap: 8px;

            font-size: 7px;
          }

          .ac2-scroll-line {
            height: 27px;
          }

          .ac2-scroll-text {
            display: none;
          }

          .ac2-bottom-center {
            display: none;
          }

          .ac2-progress {
            display: none;
          }

          .ac2-cursor-light {
            width: 250px;
            height: 250px;
          }
        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 430px) {
          .ac2-hero {
            min-height: 600px;
          }

          .ac2-topbar {
            font-size: 6px;
          }

          .ac2-side {
            display: none;
          }

          .ac2-frame {
            left: 6%;
            right: 6%;

            top: 17%;
            bottom: 20%;
          }

          .ac2-character {
            width: 108vw;

            height: 66vh;

            bottom: 5%;
          }

          .ac2-marquee-back {
            top: 57%;

            height: 92px;
          }

          .ac2-marquee-front {
            top: 66%;

            height: 70px;
          }

          .ac2-marquee-group span {
            font-size: 62px;
          }

          .ac2-marquee-front
          .ac2-marquee-group
          span {
            font-size: 43px;
          }

          .ac2-word-system {
            gap: 7px;
          }

          .ac2-word-prefix {
            font-size: 6px;
          }

          .ac2-word-window {
            width: 125px;
          }

          .ac2-word-window span {
            font-size: 6px;
          }

          .ac2-explore {
            width: 70px;
            height: 70px;
          }

          .ac2-explore-small {
            font-size: 5px;
          }

          .ac2-explore strong {
            font-size: 7px;
          }

          .ac2-arrow {
            font-size: 14px;
          }

          .ac2-scroll-number {
            font-size: 7px;
          }

          .ac2-image-hud {
            font-size: 6px;
          }

          .hud-line {
            width: 20px;
          }
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .ac2-hero *,
          .ac2-hero *::before,
          .ac2-hero *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .001ms !important;
          }
        }

        /* =====================================================
           HARD SECTION BOUNDARY
           PREVENT ABOUT FROM ENTERING HERO
        ===================================================== */

        .ac2-hero + section {
          position: relative;
          z-index: 2;
          clear: both;
        }

        .ac2-hero ~ #about {
          position: relative;
          z-index: 2;
          clear: both;
        }
      `}</style>
    </section>
  );
}