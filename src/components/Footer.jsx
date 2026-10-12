import {
  useEffect,
  useRef,
  useState,
} from "react";

import { profile } from "../data/portfolio";

export default function Footer() {
  const footerRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [hoverTop, setHoverTop] = useState(false);
  const [time, setTime] = useState("");

  const initials = [
    profile?.name,
    profile?.surname,
  ]
    .filter(Boolean)
    .map((value) => value[0])
    .join("")
    .toUpperCase();

  /* =========================================================
     LIVE CLOCK
  ========================================================= */

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateClock();

    const interval = setInterval(
      updateClock,
      1000
    );

    return () => clearInterval(interval);
  }, []);

  /* =========================================================
     REVEAL
  ========================================================= */

  useEffect(() => {
    const element = footerRef.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.12,
        }
      );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     MOUSE PARALLAX
  ========================================================= */

  const handleMouseMove = (event) => {
    const element = footerRef.current;

    if (!element) return;

    const rect =
      element.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;

    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;

    element.style.setProperty(
      "--fx",
      `${x}%`
    );

    element.style.setProperty(
      "--fy",
      `${y}%`
    );

    element.style.setProperty(
      "--mx",
      `${event.clientX - rect.left}px`
    );

    element.style.setProperty(
      "--my",
      `${event.clientY - rect.top}px`
    );
  };

  /* =========================================================
     BACK TO TOP
  ========================================================= */

  const goTop = (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (
      window.history &&
      window.history.replaceState
    ) {
      window.history.replaceState(
        null,
        "",
        "#home"
      );
    }
  };

  return (
    <footer
      ref={footerRef}
      className={`pf-footer ${
        visible ? "pf-visible" : ""
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pf-bg" />
      <div className="pf-grid" />
      <div className="pf-noise" />

      <div className="pf-mouse-glow" />

      {/* =====================================================
          TOP META
      ===================================================== */}

      <div className="pf-top">
        <div className="pf-brand">
          <div className="pf-brand-box">
            {initials || "AC"}
          </div>

          <div className="pf-brand-separator" />

          <div className="pf-brand-name">
            PORTFOLIO
          </div>
        </div>

        <div className="pf-center-status">
          <span className="pf-status-dot" />

          <span>
            DIGITAL / CREATIVE / DEVELOPMENT
          </span>
        </div>

        <div className="pf-time">
          <span>LOCAL TIME</span>

          <strong>
            {time || "00:00:00"}
          </strong>
        </div>
      </div>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="pf-main">
        <div className="pf-eyebrow">
          <span>07</span>

          <i />

          <span>
            END OF THE EXPERIENCE
          </span>
        </div>

        <div className="pf-title">
          <div className="pf-title-line">
            <span>SEE</span>
          </div>

          <div className="pf-title-line pf-outline">
            <span>YOU</span>
          </div>

          <div className="pf-title-line pf-italic">
            <span>SOON.</span>
          </div>
        </div>

        {/* Floating decorative mark */}

        <div className="pf-floating-mark">
          <span>↗</span>
        </div>

        <div className="pf-description">
          <p>
            Thanks for making it all the way
            here. The next idea could be the
            beginning of something interesting.
          </p>

          <div className="pf-scroll-indicator">
            <span>END</span>

            <div>
              <i />
            </div>

            <span>2026</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          BACK TO TOP
      ===================================================== */}

      <div className="pf-action-row">
        <div className="pf-action-info">
          <span>RETURN</span>

          <i />

          <span>START / HOME</span>
        </div>

        <a
          href="#home"
          className={`pf-top-button ${
            hoverTop ? "pf-top-hover" : ""
          }`}
          onClick={goTop}
          onMouseEnter={() =>
            setHoverTop(true)
          }
          onMouseLeave={() =>
            setHoverTop(false)
          }
        >
          <span className="pf-button-number">
            01
          </span>

          <span className="pf-button-label">
            BACK TO TOP
          </span>

          <span className="pf-button-arrow">
            ↑
          </span>

          <span className="pf-button-progress" />
        </a>
      </div>

      {/* =====================================================
          FOOTER INFORMATION
      ===================================================== */}

      <div className="pf-info">
        <div className="pf-info-item">
          <small>IDENTITY</small>

          <strong>
            {initials || "AC"} / PORTFOLIO
          </strong>
        </div>

        <div className="pf-info-item">
          <small>STATUS</small>

          <strong>
            AVAILABLE
          </strong>
        </div>

        <div className="pf-info-item">
          <small>BUILD</small>

          <strong>
            DESIGN + CODE
          </strong>
        </div>

        <div className="pf-info-item">
          <small>YEAR</small>

          <strong>
            {new Date().getFullYear()}
          </strong>
        </div>
      </div>

      {/* =====================================================
          CENTER SIGNATURE
      ===================================================== */}

      <div className="pf-signature">
        <div className="pf-signature-ring ring-one" />
        <div className="pf-signature-ring ring-two" />
        <div className="pf-signature-ring ring-three" />

        <div className="pf-signature-core">
          <span>
            {initials || "AC"}
          </span>
        </div>

        <div className="pf-signature-cross cross-x" />
        <div className="pf-signature-cross cross-y" />
      </div>

      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div className="pf-bottom">
        <div className="pf-bottom-left">
          <span>
            © {new Date().getFullYear()}
          </span>

          <i />

          <span>
            {initials || "AC"} / PORTFOLIO
          </span>
        </div>

        <div className="pf-bottom-center">
          <span>DESIGNED</span>
          <b>+</b>
          <span>BUILT</span>
          <b>+</b>
          <span>SHIPPED</span>
        </div>

        <div className="pf-bottom-right">
          <span>SCROLL UP</span>

          <b>↑</b>
        </div>
      </div>

      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <div className="pf-marquee">
        <div className="pf-marquee-track">
          {[0, 1, 2, 3].map((item) => (
            <div
              className="pf-marquee-group"
              key={item}
            >
              <span>
                THANK YOU
              </span>

              <b>✦</b>

              <span>
                KEEP CREATING
              </span>

              <b>✦</b>

              <span>
                KEEP BUILDING
              </span>

              <b>✦</b>

              <span>
                SEE YOU SOON
              </span>

              <b>✦</b>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`
        /* =====================================================
           RESET
        ===================================================== */

        .pf-footer,
        .pf-footer * {
          box-sizing: border-box;
        }

        /* =====================================================
           ROOT
        ===================================================== */

        .pf-footer {
          --pf-white: #f4f4ef;
          --pf-muted: rgba(255,255,255,.34);
          --pf-line: rgba(255,255,255,.09);
          --pf-accent: #62e7ff;

          --fx: 50%;
          --fy: 50%;
          --mx: 50%;
          --my: 50%;

          position: relative;

          width: 100%;
          min-height: 720px;

          padding:
            30px
            50px
            68px;

          overflow: hidden;

          background: #050505;

          color: var(--pf-white);

          isolation: isolate;

          font-family:
            Inter,
            Arial,
            Helvetica,
            sans-serif;
        }

        /* =====================================================
           BACKGROUND
        ===================================================== */

        .pf-bg {
          position: absolute;
          inset: 0;

          z-index: -20;

          background:
            radial-gradient(
              circle at var(--fx) var(--fy),
              rgba(98,231,255,.07),
              transparent 27%
            ),
            radial-gradient(
              circle at 78% 30%,
              rgba(112,82,255,.055),
              transparent 30%
            ),
            #050505;
        }

        .pf-grid {
          position: absolute;
          inset: 0;

          z-index: -19;

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

          background-size:
            70px 70px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 15%,
              black 85%,
              transparent
            );
        }

        .pf-mouse-glow {
          position: absolute;

          left: var(--mx);
          top: var(--my);

          width: 260px;
          height: 260px;

          z-index: -10;

          pointer-events: none;

          transform:
            translate(-50%,-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(98,231,255,.09),
              transparent 70%
            );

          filter: blur(30px);

          transition:
            left .12s linear,
            top .12s linear;
        }

        /* =====================================================
           NOISE
        ===================================================== */

        .pf-noise {
          position: absolute;

          inset: -50%;

          z-index: 1000;

          pointer-events: none;

          opacity: .025;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");

          animation:
            pf-noise
            .35s
            steps(2)
            infinite;
        }

        @keyframes pf-noise {
          0% {
            transform: translate(0,0);
          }

          25% {
            transform: translate(2%,-1%);
          }

          50% {
            transform: translate(-1%,2%);
          }

          75% {
            transform: translate(1%,1%);
          }

          100% {
            transform: translate(0,0);
          }
        }

        /* =====================================================
           TOP BAR
        ===================================================== */

        .pf-top {
          position: relative;
          z-index: 30;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: center;

          min-height: 48px;

          border-bottom:
            1px solid
            var(--pf-line);
        }

        .pf-brand {
          display: flex;
          align-items: center;

          gap: 11px;

          font-family: monospace;

          font-size: 7px;

          letter-spacing: .16em;

          color:
            rgba(255,255,255,.3);
        }

        .pf-brand-box {
          width: 30px;
          height: 30px;

          display: grid;
          place-items: center;

          border:
            1px solid
            rgba(255,255,255,.2);

          color: #fff;

          font-size: 7px;

          transition:
            transform .45s
              cubic-bezier(.16,1,.3,1),
            border-color .3s ease,
            color .3s ease;
        }

        .pf-brand:hover
        .pf-brand-box {
          transform:
            rotate(-8deg)
            scale(1.08);

          color:
            var(--pf-accent);

          border-color:
            var(--pf-accent);

          box-shadow:
            0 0 25px
            rgba(98,231,255,.1);
        }

        .pf-brand-separator {
          width: 28px;
          height: 1px;

          background:
            rgba(255,255,255,.13);
        }

        .pf-center-status {
          display: flex;
          align-items: center;

          gap: 8px;

          font-family: monospace;

          font-size: 6px;

          letter-spacing: .15em;

          color:
            rgba(255,255,255,.25);
        }

        .pf-status-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            var(--pf-accent);

          box-shadow:
            0 0 12px
            var(--pf-accent);

          animation:
            pf-status
            1.6s
            ease-in-out
            infinite;
        }

        @keyframes pf-status {
          0%,
          100% {
            opacity: .3;
            transform: scale(.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        .pf-time {
          justify-self: end;

          display: flex;
          align-items: center;

          gap: 9px;

          font-family: monospace;

          font-size: 6px;

          letter-spacing: .12em;

          color:
            rgba(255,255,255,.25);
        }

        .pf-time strong {
          color:
            rgba(255,255,255,.52);

          font-weight: 400;
        }

        /* =====================================================
           MAIN
        ===================================================== */

        .pf-main {
          position: relative;
          z-index: 20;

          padding:
            75px 0 55px;
        }

        .pf-eyebrow {
          display: flex;
          align-items: center;

          gap: 12px;

          font-family: monospace;

          font-size: 6px;

          letter-spacing: .2em;

          color:
            rgba(255,255,255,.25);
        }

        .pf-eyebrow span:first-child {
          color:
            var(--pf-accent);
        }

        .pf-eyebrow i {
          width: 50px;
          height: 1px;

          background:
            rgba(255,255,255,.14);
        }

        /* =====================================================
           TITLE
        ===================================================== */

        .pf-title {
          margin-top: 25px;

          overflow: visible;
        }

        .pf-title-line {
          position: relative;

          width: max-content;

          font-size:
            clamp(
              100px,
              17vw,
              270px
            );

          font-weight: 900;

          line-height: .72;

          letter-spacing: -.095em;

          text-transform: uppercase;

          cursor: default;
        }

        .pf-title-line span {
          display: inline-block;

          transition:
            transform .65s
              cubic-bezier(.16,1,.3,1),
            color .5s ease;
        }

        .pf-title-line:hover span {
          transform:
            translateX(18px);
        }

        .pf-title-line:nth-child(1) span {
          color:
            #f4f4ef;
        }

        /* OUTLINE */

        .pf-outline {
          margin-left: 10vw;
        }

        .pf-outline span {
          color:
            transparent;

          -webkit-text-stroke:
            1px
            rgba(255,255,255,.35);
        }

        .pf-outline:hover span {
          color:
            rgba(98,231,255,.06);

          -webkit-text-stroke:
            1px
            var(--pf-accent);
        }

        /* ITALIC */

        .pf-italic {
          margin-left: 20vw;

          font-style: italic;

          font-weight: 300;
        }

        .pf-italic span {
          color:
            rgba(255,255,255,.17);
        }

        .pf-italic:hover span {
          color:
            rgba(255,255,255,.55);

          transform:
            translateX(25px)
            skewX(-7deg);
        }

        /* =====================================================
           FLOATING MARK
        ===================================================== */

        .pf-floating-mark {
          position: absolute;

          right: 8%;
          top: 42%;

          width: 95px;
          height: 95px;

          display: grid;
          place-items: center;

          border:
            1px solid
            rgba(255,255,255,.1);

          border-radius: 50%;

          color:
            var(--pf-accent);

          transform:
            rotate(-15deg);

          animation:
            pf-floating
            5s
            ease-in-out
            infinite;
        }

        .pf-floating-mark::before,
        .pf-floating-mark::after {
          content: "";

          position: absolute;

          border:
            1px solid
            rgba(98,231,255,.12);

          border-radius: 50%;
        }

        .pf-floating-mark::before {
          inset: -12px;
        }

        .pf-floating-mark::after {
          inset: 12px;
        }

        .pf-floating-mark span {
          font-size: 22px;

          transition:
            transform .4s
              cubic-bezier(.16,1,.3,1);
        }

        .pf-floating-mark:hover span {
          transform:
            translate(6px,-6px);
        }

        @keyframes pf-floating {
          0%,
          100% {
            transform:
              rotate(-15deg)
              translateY(0);
          }

          50% {
            transform:
              rotate(0deg)
              translateY(-12px);
          }
        }

        /* =====================================================
           DESCRIPTION
        ===================================================== */

        .pf-description {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          margin-top: 55px;

          padding-top: 18px;

          border-top:
            1px solid
            rgba(255,255,255,.07);
        }

        .pf-description p {
          max-width: 350px;

          margin: 0;

          font-size: 9px;

          line-height: 1.8;

          color:
            rgba(255,255,255,.32);
        }

        .pf-scroll-indicator {
          display: flex;
          align-items: center;

          gap: 10px;

          font-family: monospace;

          font-size: 6px;

          letter-spacing: .14em;

          color:
            rgba(255,255,255,.23);
        }

        .pf-scroll-indicator div {
          width: 55px;
          height: 1px;

          background:
            rgba(255,255,255,.12);
        }

        .pf-scroll-indicator i {
          display: block;

          width: 45%;
          height: 100%;

          background:
            var(--pf-accent);
        }

        /* =====================================================
           ACTION
        ===================================================== */

        .pf-action-row {
          position: relative;
          z-index: 30;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding:
            18px 0;

          border-top:
            1px solid
            rgba(255,255,255,.07);

          border-bottom:
            1px solid
            rgba(255,255,255,.07);
        }

        .pf-action-info {
          display: flex;
          align-items: center;

          gap: 12px;

          font-family: monospace;

          font-size: 6px;

          letter-spacing: .15em;

          color:
            rgba(255,255,255,.25);
        }

        .pf-action-info span:first-child {
          color:
            var(--pf-accent);
        }

        .pf-action-info i {
          width: 40px;
          height: 1px;

          background:
            rgba(255,255,255,.12);
        }

        /* =====================================================
           BUTTON
        ===================================================== */

        .pf-top-button {
          position: relative;

          display: flex;
          align-items: center;

          width: 235px;
          height: 56px;

          padding: 0 15px;

          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.14);

          background:
            rgba(255,255,255,.025);

          color: #fff;

          text-decoration: none;

          font-family: monospace;

          transition:
            transform .45s
              cubic-bezier(.16,1,.3,1),
            border-color .35s ease,
            background .35s ease,
            box-shadow .35s ease;
        }

        .pf-top-button:hover {
          transform:
            translateY(-5px);

          border-color:
            var(--pf-accent);

          background:
            rgba(98,231,255,.04);

          box-shadow:
            0 22px 55px
            rgba(0,0,0,.35);
        }

        .pf-button-number {
          font-size: 6px;

          color:
            var(--pf-accent);
        }

        .pf-button-label {
          margin-left: 20px;

          font-size: 7px;

          letter-spacing: .17em;

          color:
            rgba(255,255,255,.55);
        }

        .pf-button-arrow {
          margin-left: auto;

          font-family:
            Arial,
            sans-serif;

          font-size: 20px;

          color:
            var(--pf-accent);

          transition:
            transform .45s
              cubic-bezier(.16,1,.3,1);
        }

        .pf-top-button:hover
        .pf-button-arrow {
          transform:
            translateY(-7px);
        }

        .pf-button-progress {
          position: absolute;

          left: 0;
          bottom: 0;

          width: 0;
          height: 1px;

          background:
            var(--pf-accent);

          box-shadow:
            0 0 15px
            var(--pf-accent);

          transition:
            width .8s
              cubic-bezier(.16,1,.3,1);
        }

        .pf-top-button:hover
        .pf-button-progress {
          width: 100%;
        }

        /* =====================================================
           INFO
        ===================================================== */

        .pf-info {
          position: relative;
          z-index: 30;

          display: grid;

          grid-template-columns:
            repeat(4,1fr);

          border-bottom:
            1px solid
            rgba(255,255,255,.07);
        }

        .pf-info-item {
          display: flex;
          flex-direction: column;

          gap: 8px;

          min-height: 78px;

          padding:
            18px 15px;

          border-right:
            1px solid
            rgba(255,255,255,.07);
        }

        .pf-info-item:first-child {
          padding-left: 0;
        }

        .pf-info-item:last-child {
          border-right: 0;

          padding-right: 0;
        }

        .pf-info-item small {
          font-family: monospace;

          font-size: 5px;

          letter-spacing: .16em;

          color:
            rgba(255,255,255,.22);
        }

        .pf-info-item strong {
          font-family: monospace;

          font-size: 7px;

          letter-spacing: .08em;

          color:
            rgba(255,255,255,.48);

          font-weight: 400;

          transition:
            color .3s ease;
        }

        .pf-info-item:hover strong {
          color:
            var(--pf-accent);
        }

        /* =====================================================
           SIGNATURE ORBIT
        ===================================================== */

        .pf-signature {
          position: absolute;

          right: 5%;
          bottom: 120px;

          width: 170px;
          height: 170px;

          display: grid;
          place-items: center;

          z-index: 15;

          pointer-events: none;
        }

        .pf-signature-ring {
          position: absolute;

          border:
            1px solid
            rgba(98,231,255,.12);

          border-radius: 50%;
        }

        .ring-one {
          width: 170px;
          height: 170px;

          animation:
            pf-ring-one
            14s
            linear
            infinite;
        }

        .ring-two {
          width: 125px;
          height: 165px;

          transform:
            rotate(60deg);

          animation:
            pf-ring-two
            10s
            linear
            infinite reverse;
        }

        .ring-three {
          width: 150px;
          height: 80px;

          transform:
            rotate(-35deg);

          animation:
            pf-ring-three
            18s
            linear
            infinite;
        }

        @keyframes pf-ring-one {
          to {
            transform:
              rotate(360deg);
          }
        }

        @keyframes pf-ring-two {
          to {
            transform:
              rotate(420deg);
          }
        }

        @keyframes pf-ring-three {
          to {
            transform:
              rotate(325deg);
          }
        }

        .pf-signature-core {
          width: 55px;
          height: 55px;

          display: grid;
          place-items: center;

          border:
            1px solid
            var(--pf-accent);

          border-radius: 50%;

          background:
            #050505;

          box-shadow:
            0 0 35px
            rgba(98,231,255,.1);
        }

        .pf-signature-core span {
          font-family: monospace;

          font-size: 9px;

          color:
            var(--pf-accent);
        }

        .pf-signature-cross {
          position: absolute;

          background:
            rgba(98,231,255,.22);
        }

        .cross-x {
          width: 190px;
          height: 1px;
        }

        .cross-y {
          width: 1px;
          height: 190px;
        }

        /* =====================================================
           BOTTOM
        ===================================================== */

        .pf-bottom {
          position: relative;
          z-index: 30;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: center;

          min-height: 75px;
        }

        .pf-bottom-left,
        .pf-bottom-center,
        .pf-bottom-right {
          display: flex;
          align-items: center;

          gap: 9px;

          font-family: monospace;

          font-size: 6px;

          letter-spacing: .13em;

          color:
            rgba(255,255,255,.23);
        }

        .pf-bottom-left i {
          width: 25px;
          height: 1px;

          background:
            rgba(255,255,255,.12);
        }

        .pf-bottom-center {
          justify-self: center;
        }

        .pf-bottom-center b {
          color:
            var(--pf-accent);

          font-weight: 400;
        }

        .pf-bottom-right {
          justify-self: end;
        }

        .pf-bottom-right b {
          color:
            var(--pf-accent);

          font-size: 14px;

          animation:
            pf-bottom-arrow
            1.8s
            ease-in-out
            infinite;
        }

        @keyframes pf-bottom-arrow {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-5px);
          }
        }

        /* =====================================================
           MARQUEE
        ===================================================== */

        .pf-marquee {
          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          height: 30px;

          overflow: hidden;

          z-index: 50;

          border-top:
            1px solid
            rgba(255,255,255,.05);
        }

        .pf-marquee-track {
          display: flex;

          width: max-content;

          animation:
            pf-marquee
            26s
            linear
            infinite;
        }

        .pf-marquee-group {
          display: flex;
          align-items: center;

          gap: 25px;

          padding-right: 25px;

          white-space: nowrap;
        }

        .pf-marquee-group span {
          font-size: 8px;

          font-weight: 700;

          letter-spacing: .17em;

          color:
            rgba(255,255,255,.11);
        }

        .pf-marquee-group b {
          font-size: 7px;

          color:
            var(--pf-accent);
        }

        @keyframes pf-marquee {
          from {
            transform:
              translateX(0);
          }

          to {
            transform:
              translateX(-25%);
          }
        }

        /* =====================================================
           REVEAL
        ===================================================== */

        .pf-top,
        .pf-main,
        .pf-action-row,
        .pf-info,
        .pf-bottom {
          opacity: 0;

          transform:
            translateY(30px);
        }

        .pf-visible .pf-top {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .7s ease,
            transform .8s
              cubic-bezier(.16,1,.3,1);
        }

        .pf-visible .pf-main {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity 1s .1s ease,
            transform 1.1s .1s
              cubic-bezier(.16,1,.3,1);
        }

        .pf-visible .pf-action-row {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .8s .25s ease,
            transform .9s .25s
              cubic-bezier(.16,1,.3,1);
        }

        .pf-visible .pf-info {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .8s .35s ease,
            transform .9s .35s
              cubic-bezier(.16,1,.3,1);
        }

        .pf-visible .pf-bottom {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .7s .45s ease,
            transform .8s .45s
              cubic-bezier(.16,1,.3,1);
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {
          .pf-footer {
            min-height: 650px;

            padding:
              28px
              30px
              65px;
          }

          .pf-center-status {
            display: none;
          }

          .pf-top {
            grid-template-columns:
              1fr
              auto;
          }

          .pf-main {
            padding-top: 65px;
          }

          .pf-title-line {
            font-size:
              clamp(
                85px,
                18vw,
                170px
              );
          }

          .pf-floating-mark {
            right: 4%;
            top: 43%;

            width: 75px;
            height: 75px;
          }

          .pf-signature {
            opacity: .55;

            right: 2%;
            bottom: 110px;
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 650px) {
          .pf-footer {
            min-height: 720px;

            padding:
              24px
              16px
              62px;
          }

          .pf-brand-separator,
          .pf-brand-name {
            display: none;
          }

          .pf-time span {
            display: none;
          }

          .pf-main {
            padding:
              65px 0 45px;
          }

          .pf-title-line {
            font-size:
              26vw;
          }

          .pf-outline {
            margin-left: 8vw;
          }

          .pf-italic {
            margin-left: 16vw;
          }

          .pf-floating-mark {
            width: 55px;
            height: 55px;

            right: 2%;
            top: 40%;
          }

          .pf-floating-mark span {
            font-size: 15px;
          }

          .pf-description {
            display: block;

            margin-top: 45px;
          }

          .pf-scroll-indicator {
            margin-top: 20px;
          }

          .pf-action-row {
            display: block;
          }

          .pf-action-info {
            margin-bottom: 14px;
          }

          .pf-top-button {
            width: 100%;
          }

          .pf-info {
            grid-template-columns:
              1fr 1fr;
          }

          .pf-info-item {
            min-height: 70px;

            border-bottom:
              1px solid
              rgba(255,255,255,.07);
          }

          .pf-info-item:nth-child(2) {
            border-right: 0;
          }

          .pf-info-item:nth-child(3) {
            padding-left: 0;
          }

          .pf-info-item:last-child {
            padding-right: 0;
          }

          .pf-signature {
            width: 120px;
            height: 120px;

            right: -15px;
            bottom: 125px;

            opacity: .25;
          }

          .ring-one {
            width: 120px;
            height: 120px;
          }

          .ring-two {
            width: 90px;
            height: 115px;
          }

          .ring-three {
            width: 105px;
            height: 55px;
          }

          .pf-signature-core {
            width: 42px;
            height: 42px;
          }

          .pf-signature-cross {
            opacity: .5;
          }

          .cross-x {
            width: 130px;
          }

          .cross-y {
            height: 130px;
          }

          .pf-bottom {
            grid-template-columns:
              1fr
              auto;
          }

          .pf-bottom-center {
            display: none;
          }

          .pf-bottom-right {
            justify-self: end;
          }
        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 420px) {
          .pf-title-line {
            font-size:
              27vw;
          }

          .pf-description p {
            font-size: 8px;
          }

          .pf-info-item strong {
            font-size: 6px;
          }

          .pf-bottom-left,
          .pf-bottom-right {
            font-size: 5px;
          }

          .pf-bottom-right span {
            display: none;
          }
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .pf-footer *,
          .pf-footer *::before,
          .pf-footer *::after {
            animation-duration:
              .001ms !important;

            animation-iteration-count:
              1 !important;

            transition-duration:
              .001ms !important;
          }

          .pf-mouse-glow {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}