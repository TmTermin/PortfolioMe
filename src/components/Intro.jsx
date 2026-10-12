import { useEffect, useMemo, useState } from "react";

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("name");

  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: `${(i * 37.7) % 100}%`,
        top: `${(i * 61.3) % 100}%`,
        delay: `${(i % 10) * 0.08}s`,
        duration: `${2.8 + (i % 7) * 0.45}s`,
        size: `${1 + (i % 3)}px`,
      })),
    []
  );

  useEffect(() => {
    document.body.classList.add("intro-lock");

    const nameTimer = setTimeout(() => {
      setPhase("welcome");
    }, 1500);

    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 3300);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      document.body.classList.remove("intro-lock");
    }, 4000);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.body.classList.remove("intro-lock");
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        /* =========================================================
           INTRO
        ========================================================= */

        .intro-am {
          --intro-bg: #050505;
          --intro-white: #f5f5f2;
          --intro-muted: rgba(245,245,242,.48);
          --intro-line: rgba(255,255,255,.075);
          --intro-accent: #8da8ff;

          position: fixed;
          inset: 0;
          z-index: 999999;

          width: 100%;
          height: 100dvh;

          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            radial-gradient(
              circle at 50% 48%,
              rgba(105,130,255,.11),
              transparent 28%
            ),
            radial-gradient(
              circle at 15% 80%,
              rgba(110,90,255,.07),
              transparent 25%
            ),
            var(--intro-bg);

          color: var(--intro-white);

          isolation: isolate;

          animation: intro-am-enter .7s ease both;
        }

        .intro-am.intro-am-exit {
          animation: intro-am-out .7s cubic-bezier(.76,0,.24,1) both;
        }

        body.intro-lock {
          overflow: hidden !important;
        }

        /* =========================================================
           GRID
        ========================================================= */

        .intro-am-grid {
          position: absolute;
          inset: 0;

          opacity: .55;

          background-image:
            linear-gradient(
              to right,
              var(--intro-line) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              var(--intro-line) 1px,
              transparent 1px
            );

          background-size: 80px 80px;

          mask-image:
            radial-gradient(
              ellipse at center,
              black 20%,
              transparent 78%
            );

          animation: intro-am-grid-move 8s linear infinite;
        }

        /* =========================================================
           SCANLINES
        ========================================================= */

        .intro-am-scan {
          position: absolute;
          inset: 0;

          pointer-events: none;

          background:
            repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 3px,
              rgba(255,255,255,.018) 4px
            );

          mix-blend-mode: screen;

          opacity: .45;
        }

        .intro-am-scan-line {
          position: absolute;
          left: 0;
          top: -20%;

          width: 100%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.35),
              transparent
            );

          box-shadow:
            0 0 20px rgba(255,255,255,.12);

          animation: intro-am-scanline 3.5s linear infinite;
        }

        /* =========================================================
           GLOW
        ========================================================= */

        .intro-am-glow {
          position: absolute;

          width: min(55vw, 700px);
          height: min(55vw, 700px);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(120,145,255,.13),
              rgba(100,80,255,.05) 38%,
              transparent 70%
            );

          filter: blur(20px);

          animation:
            intro-am-glow-pulse 2.8s ease-in-out infinite;
        }

        .intro-am-glow::after {
          content: "";

          position: absolute;
          inset: 25%;

          border-radius: 50%;

          border: 1px solid rgba(255,255,255,.08);

          box-shadow:
            0 0 80px rgba(125,145,255,.1);
        }

        /* =========================================================
           PARTICLES
        ========================================================= */

        .intro-am-particles {
          position: absolute;
          inset: 0;

          pointer-events: none;
        }

        .intro-am-particle {
          position: absolute;

          width: var(--size);
          height: var(--size);

          border-radius: 50%;

          background: rgba(255,255,255,.65);

          box-shadow:
            0 0 8px rgba(160,180,255,.5);

          animation:
            intro-am-particle-float
            var(--duration)
            ease-in-out
            var(--delay)
            infinite alternate;
        }

        /* =========================================================
           CORNERS
        ========================================================= */

        .intro-am-corner {
          position: absolute;

          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;

          font-size: 9px;
          letter-spacing: .22em;

          color: var(--intro-muted);

          text-transform: uppercase;

          opacity: 0;

          animation:
            intro-am-corner-in
            .8s
            .25s
            ease
            forwards;
        }

        .intro-am-corner.top-left {
          top: 28px;
          left: 32px;
        }

        .intro-am-corner.top-right {
          top: 28px;
          right: 32px;
          text-align: right;
        }

        .intro-am-corner.bottom-left {
          bottom: 28px;
          left: 32px;
        }

        .intro-am-corner.bottom-right {
          bottom: 28px;
          right: 32px;
          text-align: right;
        }

        /* =========================================================
           MAIN
        ========================================================= */

        .intro-am-content {
          position: relative;
          z-index: 20;

          width: min(1100px, 92vw);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;
        }

        /* =========================================================
           NUMBER
        ========================================================= */

        .intro-am-number {
          position: absolute;

          top: 50%;
          left: 50%;

          transform:
            translate(-50%, -50%)
            scale(1);

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(180px, 28vw, 430px);

          line-height: .75;

          font-weight: 900;

          color: transparent;

          -webkit-text-stroke:
            1px rgba(255,255,255,.035);

          user-select: none;
          pointer-events: none;

          animation:
            intro-am-number 4s ease both;
        }

        /* =========================================================
           LOGO MARK
        ========================================================= */

        .intro-am-mark {
          position: relative;

          width: 82px;
          height: 82px;

          margin-bottom: 28px;

          display: flex;
          align-items: center;
          justify-content: center;

          opacity: 0;

          animation:
            intro-am-mark-in
            .8s
            .15s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .intro-am-mark-ring {
          position: absolute;
          inset: 0;

          border: 1px solid rgba(255,255,255,.22);

          border-radius: 50%;
        }

        .intro-am-mark-ring::before,
        .intro-am-mark-ring::after {
          content: "";

          position: absolute;

          inset: 7px;

          border-radius: 50%;

          border: 1px solid rgba(255,255,255,.08);
        }

        .intro-am-mark-ring::after {
          inset: -7px;

          border-color:
            rgba(130,150,255,.16);

          animation:
            intro-am-ring
            4s
            linear
            infinite;
        }

        .intro-am-mark span {
          position: relative;
          z-index: 2;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 25px;
          font-weight: 900;

          letter-spacing: -.08em;
        }

        /* =========================================================
           AMINE
        ========================================================= */

        .intro-am-name {
          position: relative;

          margin: 0;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size:
            clamp(80px, 15vw, 190px);

          line-height: .78;

          font-weight: 950;

          letter-spacing: -.075em;

          text-transform: uppercase;

          white-space: nowrap;

          background:
            linear-gradient(
              110deg,
              #ffffff 0%,
              #ffffff 35%,
              #9dafff 52%,
              #ffffff 70%,
              #ffffff 100%
            );

          background-size: 220% auto;

          -webkit-background-clip: text;
          background-clip: text;

          color: transparent;

          animation:
            intro-am-name-in
            1.15s
            cubic-bezier(.16,1,.3,1)
            both,
            intro-am-gradient
            2.6s
            1s
            linear
            infinite;

          transition:
            letter-spacing .4s ease;
        }

        .intro-am-name:hover {
          letter-spacing: -.045em;
        }

        .intro-am-name::after {
          content: "";

          position: absolute;

          left: -8%;
          bottom: -14px;

          width: 116%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.65),
              transparent
            );

          transform: scaleX(0);

          transform-origin: center;

          animation:
            intro-am-line
            .9s
            .7s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        /* =========================================================
           WELCOME
        ========================================================= */

        .intro-am-welcome {
          margin-top: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 12px;

          min-height: 26px;

          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;

          font-size:
            clamp(10px, 1.25vw, 14px);

          font-weight: 500;

          letter-spacing: .35em;

          text-transform: uppercase;

          color: rgba(255,255,255,.7);

          opacity: 0;

          transform: translateY(15px);

          pointer-events: none;
        }

        .intro-am-welcome.active {
          animation:
            intro-am-welcome-in
            .8s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .intro-am-welcome-line {
          width: 38px;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.65)
            );
        }

        .intro-am-welcome-line.right {
          transform: rotate(180deg);
        }

        .intro-am-welcome strong {
          color: #fff;
          font-weight: 600;
        }

        /* =========================================================
           SUBTEXT
        ========================================================= */

        .intro-am-sub {
          position: absolute;

          margin-top: 170px;

          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;

          font-size: 9px;

          letter-spacing: .4em;

          color: rgba(255,255,255,.28);

          opacity: 0;

          animation:
            intro-am-sub-in
            .7s
            1.05s
            ease
            forwards;
        }

        /* =========================================================
           LOADING
        ========================================================= */

        .intro-am-loading {
          position: absolute;

          bottom: 54px;
          left: 50%;

          transform: translateX(-50%);

          width: min(280px, 55vw);

          display: flex;
          flex-direction: column;
          gap: 9px;

          opacity: 0;

          animation:
            intro-am-loading-in
            .6s
            .7s
            ease
            forwards;
        }

        .intro-am-loading-top {
          display: flex;
          justify-content: space-between;

          font-family:
            ui-monospace,
            monospace;

          font-size: 8px;

          letter-spacing: .2em;

          color: rgba(255,255,255,.3);
        }

        .intro-am-loading-track {
          position: relative;

          width: 100%;
          height: 1px;

          background: rgba(255,255,255,.1);

          overflow: hidden;
        }

        .intro-am-loading-bar {
          position: absolute;
          inset: 0 auto 0 0;

          width: 0%;

          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.25),
              #fff,
              #91a8ff
            );

          box-shadow:
            0 0 14px rgba(140,165,255,.4);

          animation:
            intro-am-progress
            3.7s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        /* =========================================================
           EXIT CURTAINS
        ========================================================= */

        .intro-am-curtain {
          position: absolute;

          top: 0;
          bottom: 0;

          width: 51%;

          z-index: 100;

          background: #050505;

          transform: scaleX(0);

          pointer-events: none;
        }

        .intro-am-curtain.left {
          left: 0;
          transform-origin: left;
        }

        .intro-am-curtain.right {
          right: 0;
          transform-origin: right;
        }

        .intro-am-exit .intro-am-curtain.left,
        .intro-am-exit .intro-am-curtain.right {
          animation:
            intro-am-curtain-out
            .68s
            cubic-bezier(.76,0,.24,1)
            forwards;
        }

        /* =========================================================
           KEYFRAMES
        ========================================================= */

        @keyframes intro-am-enter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes intro-am-out {
          0% {
            opacity: 1;
          }

          65% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        @keyframes intro-am-grid-move {
          from {
            transform: translate3d(0,0,0);
          }

          to {
            transform: translate3d(80px,80px,0);
          }
        }

        @keyframes intro-am-scanline {
          0% {
            transform: translateY(-20vh);
          }

          100% {
            transform: translateY(120vh);
          }
        }

        @keyframes intro-am-glow-pulse {
          0%,
          100% {
            transform: scale(.92);
            opacity: .65;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes intro-am-particle-float {
          0% {
            transform:
              translate3d(0,0,0)
              scale(.7);

            opacity: .15;
          }

          100% {
            transform:
              translate3d(
                0,
                -25px,
                0
              )
              scale(1.35);

            opacity: .85;
          }
        }

        @keyframes intro-am-corner-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes intro-am-number {
          0% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              scale(.85);
          }

          25% {
            opacity: 1;
          }

          100% {
            opacity: .4;
            transform:
              translate(-50%, -50%)
              scale(1.08);
          }
        }

        @keyframes intro-am-mark-in {
          0% {
            opacity: 0;
            transform:
              scale(.55)
              rotate(-30deg);
          }

          70% {
            opacity: 1;
            transform:
              scale(1.08)
              rotate(4deg);
          }

          100% {
            opacity: 1;
            transform:
              scale(1)
              rotate(0);
          }
        }

        @keyframes intro-am-ring {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes intro-am-name-in {
          0% {
            opacity: 0;

            transform:
              translateY(80px)
              scale(.86);

            filter:
              blur(16px);
          }

          55% {
            opacity: 1;
          }

          100% {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);

            filter:
              blur(0);
          }
        }

        @keyframes intro-am-gradient {
          from {
            background-position: 0% 50%;
          }

          to {
            background-position: 220% 50%;
          }
        }

        @keyframes intro-am-line {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes intro-am-welcome-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes intro-am-sub-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes intro-am-loading-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes intro-am-progress {
          0% {
            width: 0%;
          }

          25% {
            width: 28%;
          }

          55% {
            width: 57%;
          }

          80% {
            width: 81%;
          }

          100% {
            width: 100%;
          }
        }

        @keyframes intro-am-curtain-out {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 700px) {
          .intro-am-grid {
            background-size: 55px 55px;
          }

          .intro-am-corner {
            font-size: 7px;
          }

          .intro-am-corner.top-left {
            top: 20px;
            left: 18px;
          }

          .intro-am-corner.top-right {
            top: 20px;
            right: 18px;
          }

          .intro-am-corner.bottom-left {
            bottom: 20px;
            left: 18px;
          }

          .intro-am-corner.bottom-right {
            bottom: 20px;
            right: 18px;
          }

          .intro-am-mark {
            width: 64px;
            height: 64px;
            margin-bottom: 23px;
          }

          .intro-am-mark span {
            font-size: 20px;
          }

          .intro-am-name {
            font-size: clamp(62px, 18vw, 120px);
          }

          .intro-am-welcome {
            margin-top: 25px;

            font-size: 8px;

            letter-spacing: .25em;
          }

          .intro-am-welcome-line {
            width: 22px;
          }

          .intro-am-sub {
            margin-top: 140px;
            font-size: 7px;
            letter-spacing: .28em;
          }

          .intro-am-loading {
            bottom: 38px;
          }

          .intro-am-number {
            font-size: 45vw;
          }
        }

        /* =========================================================
           REDUCED MOTION
        ========================================================= */

        @media (prefers-reduced-motion: reduce) {
          .intro-am *,
          .intro-am {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div
        className={`intro-am ${
          phase === "exit" ? "intro-am-exit" : ""
        }`}
        aria-label="Welcome to my portfolio"
      >
        {/* Background */}
        <div className="intro-am-grid" />
        <div className="intro-am-scan" />
        <div className="intro-am-scan-line" />
        <div className="intro-am-glow" />

        {/* Particles */}
        <div className="intro-am-particles">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="intro-am-particle"
              style={{
                left: particle.left,
                top: particle.top,
                "--delay": particle.delay,
                "--duration": particle.duration,
                "--size": particle.size,
              }}
            />
          ))}
        </div>

        {/* Corners */}
        <div className="intro-am-corner top-left">
          AM / 001
        </div>

        <div className="intro-am-corner top-right">
          DIGITAL / CREATIVE
        </div>

        <div className="intro-am-corner bottom-left">
          PORTFOLIO / 2026
        </div>

        <div className="intro-am-corner bottom-right">
          INITIALIZING...
        </div>

        {/* Giant background number */}
        <div className="intro-am-number">
          01
        </div>

        {/* Main content */}
        <main className="intro-am-content">

          {/* AM logo */}
          <div className="intro-am-mark">
            <div className="intro-am-mark-ring" />
            <span>AM</span>
          </div>

          {/* NAME */}
          <h1 className="intro-am-name">
            AMINE
          </h1>

          {/* WELCOME */}
          <div
            className={`intro-am-welcome ${
              phase === "welcome" || phase === "exit"
                ? "active"
                : ""
            }`}
          >
            <span className="intro-am-welcome-line" />

            <span>
              WELCOME TO <strong>MY PORTFOLIO</strong>
            </span>

            <span className="intro-am-welcome-line right" />
          </div>

          {/* Small subtitle */}
          <div className="intro-am-sub">
            DESIGN / CODE / MOTION / DIGITAL
          </div>
        </main>

        {/* Loading */}
        <div className="intro-am-loading">
          <div className="intro-am-loading-top">
            <span>ENTERING EXPERIENCE</span>
            <span>100%</span>
          </div>

          <div className="intro-am-loading-track">
            <div className="intro-am-loading-bar" />
          </div>
        </div>

        {/* Exit curtains */}
        <div className="intro-am-curtain left" />
        <div className="intro-am-curtain right" />
      </div>
    </>
  );
}