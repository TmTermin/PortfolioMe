import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { profile } from "../data/portfolio";

export default function Contact() {
  /* =========================================================
     STATE
  ========================================================= */

  const sectionRef = useRef(null);
  const coordinateRef = useRef(null);
  const copiedTimerRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const [activeCard, setActiveCard] = useState(null);

  /* =========================================================
     CONTACT DATA
  ========================================================= */

  const contacts = [
    {
      label: "EMAIL",
      value: profile?.email,
      type: "email",
      number: "01",
      description: "Direct communication",
      icon: "✉",
    },
    {
      label: "GITHUB",
      value: profile?.github,
      type: "github",
      number: "02",
      description: "Code & repositories",
      icon: "⌘",
    },
    {
      label: "LINKEDIN",
      value: profile?.linkedin,
      type: "linkedin",
      number: "03",
      description: "Professional network",
      icon: "in",
    },
  ].filter((item) => item.value);

  /* =========================================================
     HREF
  ========================================================= */

  const getHref = useCallback(
    (type, value) => {
      if (!value) return undefined;

      if (type === "email") {
        return `mailto:${value}`;
      }

      if (/^https?:\/\//i.test(value)) {
        return value;
      }

      return undefined;
    },
    []
  );

  /* =========================================================
     REVEAL
  ========================================================= */

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
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
     MOUSE
  ========================================================= */

  const handleMouseMove = (event) => {
    const element = sectionRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;

    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;

    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;

    element.style.setProperty("--mouse-x", `${x}%`);
    element.style.setProperty("--mouse-y", `${y}%`);
    element.style.setProperty("--cursor-x", `${cursorX}px`);
    element.style.setProperty("--cursor-y", `${cursorY}px`);

    if (coordinateRef.current) {
      coordinateRef.current.textContent = `X ${String(
        Math.round(x)
      ).padStart(3, "0")} / Y ${String(
        Math.round(y)
      ).padStart(3, "0")}`;
    }
  };

  /* =========================================================
     COPY EMAIL
  ========================================================= */

  const copyEmail = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!profile?.email) return;

    try {
      await navigator.clipboard.writeText(
        profile.email
      );

      setCopied(true);

      window.clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      window.location.href =
        `mailto:${profile.email}`;
    }
  };

  useEffect(() => () => window.clearTimeout(copiedTimerRef.current), []);

  /* =========================================================
     CARD TILT
  ========================================================= */

  const handleCardMove = (event) => {
    const card = event.currentTarget;

    const rect = card.getBoundingClientRect();

    const px =
      (event.clientX - rect.left) /
      rect.width;

    const py =
      (event.clientY - rect.top) /
      rect.height;

    const rotateY =
      (px - 0.5) * 8;

    const rotateX =
      (py - 0.5) * -8;

    card.style.setProperty(
      "--card-x",
      `${px * 100}%`
    );

    card.style.setProperty(
      "--card-y",
      `${py * 100}%`
    );

    card.style.setProperty(
      "--rotate-x",
      `${rotateX}deg`
    );

    card.style.setProperty(
      "--rotate-y",
      `${rotateY}deg`
    );
  };

  const resetCard = (event) => {
    const card = event.currentTarget;

    card.style.setProperty(
      "--card-x",
      "50%"
    );

    card.style.setProperty(
      "--card-y",
      "50%"
    );

    card.style.setProperty(
      "--rotate-x",
      "0deg"
    );

    card.style.setProperty(
      "--rotate-y",
      "0deg"
    );
  };

  /* =========================================================
     KEYBOARD
  ========================================================= */

  const handleCardKeyDown = (
    event,
    href
  ) => {
    if (
      event.key === "Enter" &&
      href
    ) {
      window.open(
        href,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      className={`
        ct7-section
        ${visible ? "ct7-visible" : ""}
      `}
      onMouseMove={handleMouseMove}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="ct7-background" />

      <div className="ct7-grid" />

      <div className="ct7-noise" />

      <div className="ct7-glow" />

      <div
        className="ct7-cursor-glow"
        style={{
          left: "var(--cursor-x, 0px)",
          top: "var(--cursor-y, 0px)",
        }}
      />

      {/* =====================================================
          TOP LINE
      ===================================================== */}

      <div className="ct7-topline">
        <div className="ct7-section-number">
          <span>06</span>

          <i />

          <small>CONTACT / CONNECT</small>
        </div>

        <div className="ct7-status">
          <span className="ct7-status-dot" />

          <small>
            OPEN FOR DIGITAL WORK
          </small>
        </div>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="ct7-container">
        {/* ===================================================
            LEFT
        =================================================== */}

        <div className="ct7-heading">
          <div className="ct7-eyebrow">
            <span>LET'S BUILD</span>

            <i />

            <span>TOGETHER</span>
          </div>

          <h2>
            Let's
            <br />

            <span>work</span>
            <br />

            <em>together.</em>
          </h2>

          <p className="ct7-intro">
            Have a project, idea or digital
            experience in mind? Let's turn
            it into something clear,
            useful and memorable.
          </p>

          {/* MAIN CTA */}

          {profile?.email && (
            <a
              className="ct7-main-cta"
              href={`mailto:${profile.email}`}
            >
              <span className="ct7-cta-index">
                01
              </span>

              <span className="ct7-cta-text">
                START A CONVERSATION
              </span>

              <span className="ct7-cta-arrow">
                ↗
              </span>

              <span className="ct7-cta-line" />
            </a>
          )}
        </div>

        {/* ===================================================
            RIGHT
        =================================================== */}

        <div className="ct7-right">
          {/* ORBIT */}

          <div className="ct7-orbit-area">
            <div className="ct7-orbit orbit-1" />
            <div className="ct7-orbit orbit-2" />
            <div className="ct7-orbit orbit-3" />

            <div className="ct7-orbit-core">
              <span>AC</span>
            </div>

            <div className="ct7-orbit-dot dot-1" />
            <div className="ct7-orbit-dot dot-2" />
            <div className="ct7-orbit-dot dot-3" />

            <div ref={coordinateRef} className="ct7-coordinate">
              X 050 / Y 050
            </div>
          </div>

          {/* CONTACT CARDS */}

          <div className="ct7-links">
            {contacts.map(
              (
                contact,
                index
              ) => {
                const href =
                  getHref(
                    contact.type,
                    contact.value
                  );

                const isEmail =
                  contact.type ===
                  "email";

                const content = (
                  <>
                    <div className="ct7-card-top">
                      <div className="ct7-card-number">
                        {contact.number}
                      </div>

                      <div className="ct7-card-icon">
                        {contact.icon}
                      </div>

                      <div className="ct7-card-arrow">
                        ↗
                      </div>
                    </div>

                    <div className="ct7-card-middle">
                      <small>
                        {contact.description}
                      </small>

                      <strong>
                        {contact.label}
                      </strong>

                      <span>
                        {contact.value}
                      </span>
                    </div>

                    <div className="ct7-card-bottom">
                      <i />

                      <small>
                        {isEmail
                          ? "SEND MESSAGE"
                          : "OPEN PROFILE"}
                      </small>

                      <b>
                        {isEmail
                          ? "MAIL"
                          : "EXTERNAL"}
                      </b>
                    </div>

                    <div className="ct7-card-scan" />

                    <div className="ct7-card-corners">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                  </>
                );

                if (href) {
                  return (
                    <a
                      key={contact.type}
                      className={`
                        ct7-card
                        ${
                          activeCard ===
                          index
                            ? "ct7-card-active"
                            : ""
                        }
                      `}
                      href={href}
                      target={
                        isEmail
                          ? undefined
                          : "_blank"
                      }
                      rel={
                        isEmail
                          ? undefined
                          : "noreferrer"
                      }
                      onMouseEnter={() =>
                        setActiveCard(
                          index
                        )
                      }
                      onMouseLeave={() =>
                        setActiveCard(
                          null
                        )
                      }
                      onMouseMove={
                        (event) =>
                          handleCardMove(
                            event,
                            index
                          )
                      }
                      onMouseOut={
                        resetCard
                      }
                      onKeyDown={(event) =>
                        handleCardKeyDown(
                          event,
                          href
                        )
                      }
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div
                    key={contact.type}
                    className="ct7-card"
                    onMouseEnter={() =>
                      setActiveCard(
                        index
                      )
                    }
                    onMouseLeave={() =>
                      setActiveCard(
                        null
                      )
                    }
                    onMouseMove={
                      (event) =>
                        handleCardMove(
                          event,
                          index
                        )
                    }
                    onMouseOut={
                      resetCard
                    }
                  >
                    {content}
                  </div>
                );
              }
            )}

            {/* COPY EMAIL */}

            {profile?.email && (
              <button
                type="button"
                className={`
                  ct7-copy
                  ${
                    copied
                      ? "ct7-copy-done"
                      : ""
                  }
                `}
                onClick={copyEmail}
              >
                <span>
                  {copied
                    ? "EMAIL COPIED"
                    : "COPY EMAIL"}
                </span>

                <b>
                  {copied
                    ? "✓"
                    : "⌘ C"}
                </b>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div className="ct7-bottom">
        <div className="ct7-bottom-left">
          <span>AVAILABLE</span>

          <i />

          <strong>
            FOR SELECTED PROJECTS
          </strong>
        </div>

        <div className="ct7-bottom-center">
          <span>06</span>

          <div>
            <i />
          </div>

          <span>END</span>
        </div>

        <div className="ct7-bottom-right">
          <span>
            SCROLL TO EXPLORE
          </span>

          <b>↓</b>
        </div>
      </div>

      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <div className="ct7-marquee">
        <div className="ct7-marquee-track">
          {[0, 1, 2].map((item) => (
            <div
              className="ct7-marquee-group"
              key={item}
            >
              <span>
                LET'S CREATE
              </span>

              <b>✦</b>

              <span>
                LET'S BUILD
              </span>

              <b>✦</b>

              <span>
                LET'S SHIP
              </span>

              <b>✦</b>

              <span>
                LET'S CONNECT
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

        .ct7-section,
        .ct7-section * {
          box-sizing: border-box;
        }

        .ct7-section {
          --ct7-white: #f4f4ef;
          --ct7-muted: rgba(255,255,255,.4);
          --ct7-line: rgba(255,255,255,.09);
          --ct7-accent: #61e8ff;

          position: relative;

          width: 100%;
          min-height: 100vh;

          padding:
            42px
            55px
            85px;

          overflow: hidden;

          background:
            #050505;

          color:
            var(--ct7-white);

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

        .ct7-background {
          position: absolute;
          inset: 0;

          z-index: -20;

          background:
            radial-gradient(
              circle at
              var(--mouse-x)
              var(--mouse-y),
              rgba(97,232,255,.075),
              transparent 27%
            ),
            radial-gradient(
              circle at 70% 35%,
              rgba(125,92,255,.055),
              transparent 30%
            ),
            #050505;
        }

        .ct7-grid {
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
            72px 72px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 12%,
              black 88%,
              transparent
            );
        }

        .ct7-glow {
          position: absolute;

          left: 72%;
          top: 48%;

          width: 550px;
          height: 550px;

          transform:
            translate(-50%,-50%);

          z-index: -17;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(97,232,255,.07),
              transparent 68%
            );

          filter:
            blur(55px);

          animation:
            ct7-glow-pulse
            7s
            ease-in-out
            infinite;
        }

        @keyframes ct7-glow-pulse {
          0%,
          100% {
            opacity: .35;

            transform:
              translate(-50%,-50%)
              scale(.9);
          }

          50% {
            opacity: .85;

            transform:
              translate(-50%,-50%)
              scale(1.12);
          }
        }

        .ct7-noise {
          position: absolute;

          inset: -50%;

          z-index: 1000;

          pointer-events: none;

          opacity: .025;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");

          animation:
            ct7-noise
            .35s
            steps(2)
            infinite;
        }

        @keyframes ct7-noise {
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

        .ct7-cursor-glow {
          position: absolute;

          z-index: -15;

          width: 220px;
          height: 220px;

          pointer-events: none;

          transform:
            translate(-50%,-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(97,232,255,.09),
              transparent 70%
            );

          filter:
            blur(25px);

          transition:
            left .08s linear,
            top .08s linear;
        }

        /* =====================================================
           TOP
        ===================================================== */

        .ct7-topline {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding-bottom: 18px;

          border-bottom:
            1px solid
            var(--ct7-line);
        }

        .ct7-section-number,
        .ct7-status {
          display: flex;
          align-items: center;

          gap: 12px;
        }

        .ct7-section-number span {
          font-family: monospace;

          font-size: 11px;

          color:
            var(--ct7-accent);
        }

        .ct7-section-number i {
          width: 55px;
          height: 1px;

          background:
            rgba(255,255,255,.18);
        }

        .ct7-section-number small,
        .ct7-status small {
          font-family: monospace;

          font-size: 7px;

          letter-spacing: .18em;

          color:
            rgba(255,255,255,.3);
        }

        .ct7-status-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            var(--ct7-accent);

          box-shadow:
            0 0 12px
            var(--ct7-accent);

          animation:
            ct7-blink
            1.5s
            ease-in-out
            infinite;
        }

        @keyframes ct7-blink {
          0%,
          100% {
            opacity: .3;
          }

          50% {
            opacity: 1;
          }
        }

        /* =====================================================
           CONTAINER
        ===================================================== */

        .ct7-container {
          position: relative;
          z-index: 20;

          display: grid;

          grid-template-columns:
            minmax(0,1fr)
            minmax(400px, .85fr);

          gap: 8vw;

          min-height:
            calc(100vh - 200px);

          align-items: center;

          padding:
            70px 0 45px;
        }

        /* =====================================================
           HEADING
        ===================================================== */

        .ct7-heading {
          max-width: 700px;
        }

        .ct7-eyebrow {
          display: flex;
          align-items: center;

          gap: 10px;

          margin-bottom: 28px;

          font-family: monospace;

          font-size: 7px;

          letter-spacing: .2em;

          color:
            rgba(255,255,255,.35);
        }

        .ct7-eyebrow span:first-child {
          color:
            var(--ct7-accent);
        }

        .ct7-eyebrow i {
          width: 35px;
          height: 1px;

          background:
            rgba(255,255,255,.15);
        }

        .ct7-heading h2 {
          margin: 0;

          font-size:
            clamp(
              80px,
              10.5vw,
              175px
            );

          line-height: .76;

          letter-spacing:
            -.085em;

          font-weight: 850;

          text-transform:
            uppercase;
        }

        .ct7-heading h2 span {
          color:
            transparent;

          -webkit-text-stroke:
            1px
            rgba(255,255,255,.42);

          transition:
            color .5s ease,
            -webkit-text-stroke .5s ease;
        }

        .ct7-heading h2 span:hover {
          color:
            rgba(97,232,255,.15);

          -webkit-text-stroke:
            1px
            var(--ct7-accent);
        }

        .ct7-heading h2 em {
          display: inline-block;

          color:
            rgba(255,255,255,.2);

          font-weight: 300;

          font-style: italic;

          transform:
            translateX(4vw);

          transition:
            color .5s ease,
            transform .5s
              cubic-bezier(.16,1,.3,1);
        }

        .ct7-heading h2 em:hover {
          color:
            var(--ct7-accent);

          transform:
            translateX(6vw)
            skewX(-8deg);
        }

        .ct7-intro {
          max-width: 410px;

          margin:
            40px 0 30px;

          font-size: 11px;

          line-height: 1.8;

          color:
            rgba(255,255,255,.38);
        }

        /* =====================================================
           MAIN CTA
        ===================================================== */

        .ct7-main-cta {
          position: relative;

          display: flex;
          align-items: center;

          width:
            min(450px,100%);

          min-height: 62px;

          padding:
            0 17px;

          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.15);

          background:
            rgba(255,255,255,.025);

          color:
            #fff;

          text-decoration: none;

          transition:
            border-color .4s ease,
            background .4s ease,
            transform .4s
              cubic-bezier(.16,1,.3,1);
        }

        .ct7-main-cta:hover {
          border-color:
            var(--ct7-accent);

          background:
            rgba(97,232,255,.045);

          transform:
            translateX(7px);
        }

        .ct7-cta-index {
          font-family: monospace;

          font-size: 7px;

          color:
            var(--ct7-accent);
        }

        .ct7-cta-text {
          margin-left: 25px;

          font-family: monospace;

          font-size: 7px;

          letter-spacing: .18em;
        }

        .ct7-cta-arrow {
          margin-left: auto;

          font-size: 22px;

          color:
            var(--ct7-accent);

          transition:
            transform .35s
              cubic-bezier(.16,1,.3,1);
        }

        .ct7-main-cta:hover
        .ct7-cta-arrow {
          transform:
            translate(5px,-5px);
        }

        .ct7-cta-line {
          position: absolute;

          left: 0;
          bottom: 0;

          width: 0;
          height: 1px;

          background:
            var(--ct7-accent);

          box-shadow:
            0 0 15px
            var(--ct7-accent);

          transition:
            width .7s
              cubic-bezier(.16,1,.3,1);
        }

        .ct7-main-cta:hover
        .ct7-cta-line {
          width: 100%;
        }

        /* =====================================================
           RIGHT
        ===================================================== */

        .ct7-right {
          position: relative;
        }

        /* =====================================================
           ORBIT
        ===================================================== */

        .ct7-orbit-area {
          position: relative;

          display: grid;
          place-items: center;

          width: 100%;
          height: 280px;

          margin-bottom: 20px;
        }

        .ct7-orbit {
          position: absolute;

          border:
            1px solid
            rgba(97,232,255,.13);

          border-radius: 50%;
        }

        .orbit-1 {
          width: 230px;
          height: 230px;

          animation:
            ct7-orbit
            14s
            linear
            infinite;
        }

        .orbit-2 {
          width: 175px;
          height: 245px;

          transform:
            rotate(60deg);

          animation:
            ct7-orbit
            10s
            linear
            infinite
            reverse;
        }

        .orbit-3 {
          width: 275px;
          height: 130px;

          transform:
            rotate(-30deg);

          animation:
            ct7-orbit
            18s
            linear
            infinite;
        }

        @keyframes ct7-orbit {
          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }
        }

        .ct7-orbit-core {
          position: relative;

          width: 74px;
          height: 74px;

          display: grid;
          place-items: center;

          border:
            1px solid
            var(--ct7-accent);

          border-radius: 50%;

          background:
            rgba(97,232,255,.025);

          box-shadow:
            0 0 45px
            rgba(97,232,255,.12);

          animation:
            ct7-core
            4s
            ease-in-out
            infinite;
        }

        .ct7-orbit-core::before {
          content: "";

          position: absolute;
          inset: -9px;

          border:
            1px solid
            rgba(97,232,255,.12);

          border-radius: 50%;
        }

        .ct7-orbit-core span {
          font-family: monospace;

          font-size: 13px;

          letter-spacing: .1em;

          color:
            var(--ct7-accent);
        }

        @keyframes ct7-core {
          0%,
          100% {
            transform:
              scale(.96);
          }

          50% {
            transform:
              scale(1.06);
          }
        }

        .ct7-orbit-dot {
          position: absolute;

          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            var(--ct7-accent);

          box-shadow:
            0 0 14px
            var(--ct7-accent);
        }

        .dot-1 {
          top: 32px;
          left: 28%;
        }

        .dot-2 {
          right: 24%;
          bottom: 48px;
        }

        .dot-3 {
          left: 19%;
          bottom: 70px;
        }

        .ct7-coordinate {
          position: absolute;

          right: 0;
          top: 25px;

          font-family: monospace;

          font-size: 6px;

          letter-spacing: .12em;

          color:
            rgba(255,255,255,.25);
        }

        /* =====================================================
           CARDS
        ===================================================== */

        .ct7-links {
          display: flex;
          flex-direction: column;

          gap: 8px;
        }

        .ct7-card {
          position: relative;

          min-height: 105px;

          display: block;

          padding:
            15px 17px;

          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.1);

          background:
            rgba(255,255,255,.025);

          color: #fff;

          text-decoration: none;

          transform:
            perspective(1000px)
            rotateX(var(--rotate-x,0deg))
            rotateY(var(--rotate-y,0deg));

          transform-style:
            preserve-3d;

          cursor: pointer;

          transition:
            border-color .35s ease,
            background .35s ease,
            transform .35s
              cubic-bezier(.16,1,.3,1),
            box-shadow .35s ease;
        }

        .ct7-card:hover,
        .ct7-card-active {
          border-color:
            rgba(97,232,255,.42);

          background:
            rgba(97,232,255,.035);

          box-shadow:
            0 20px 55px
            rgba(0,0,0,.35);
        }

        .ct7-card::before {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            radial-gradient(
              circle at
              var(--card-x,50%)
              var(--card-y,50%),
              rgba(97,232,255,.1),
              transparent 30%
            );

          opacity: 0;

          transition:
            opacity .35s ease;
        }

        .ct7-card:hover::before {
          opacity: 1;
        }

        .ct7-card-top {
          position: relative;

          display: flex;
          align-items: center;

          gap: 10px;

          z-index: 3;
        }

        .ct7-card-number {
          font-family: monospace;

          font-size: 7px;

          color:
            var(--ct7-accent);
        }

        .ct7-card-icon {
          width: 23px;
          height: 23px;

          display: grid;
          place-items: center;

          border:
            1px solid
            rgba(255,255,255,.1);

          font-family: monospace;

          font-size: 9px;

          color:
            rgba(255,255,255,.5);

          transition:
            color .3s ease,
            border-color .3s ease,
            transform .3s ease;
        }

        .ct7-card:hover
        .ct7-card-icon {
          color:
            var(--ct7-accent);

          border-color:
            var(--ct7-accent);

          transform:
            rotate(-8deg);
        }

        .ct7-card-arrow {
          margin-left: auto;

          font-size: 16px;

          color:
            rgba(255,255,255,.35);

          transition:
            color .3s ease,
            transform .35s
              cubic-bezier(.16,1,.3,1);
        }

        .ct7-card:hover
        .ct7-card-arrow {
          color:
            var(--ct7-accent);

          transform:
            translate(4px,-4px);
        }

        .ct7-card-middle {
          position: relative;

          display: grid;

          grid-template-columns:
            90px
            1fr;

          align-items: center;

          gap: 12px;

          margin-top: 12px;

          z-index: 3;
        }

        .ct7-card-middle small {
          font-family: monospace;

          font-size: 6px;

          color:
            rgba(255,255,255,.27);
        }

        .ct7-card-middle strong {
          font-size: 13px;

          letter-spacing: -.01em;
        }

        .ct7-card-middle span {
          grid-column:
            2 / -1;

          max-width: 100%;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;

          font-family: monospace;

          font-size: 7px;

          color:
            rgba(255,255,255,.38);
        }

        .ct7-card-bottom {
          position: relative;

          display: flex;
          align-items: center;

          gap: 8px;

          margin-top: 10px;

          z-index: 3;
        }

        .ct7-card-bottom i {
          width: 25px;
          height: 1px;

          background:
            rgba(255,255,255,.15);

          transition:
            width .4s ease,
            background .4s ease;
        }

        .ct7-card:hover
        .ct7-card-bottom i {
          width: 42px;

          background:
            var(--ct7-accent);
        }

        .ct7-card-bottom small,
        .ct7-card-bottom b {
          font-family: monospace;

          font-size: 5px;

          letter-spacing: .12em;
        }

        .ct7-card-bottom small {
          color:
            rgba(255,255,255,.3);
        }

        .ct7-card-bottom b {
          margin-left: auto;

          font-weight: 400;

          color:
            var(--ct7-accent);
        }

        /* =====================================================
           CARD SCAN
        ===================================================== */

        .ct7-card-scan {
          position: absolute;

          left: 0;
          right: 0;
          top: -1px;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--ct7-accent),
              transparent
            );

          opacity: 0;

          animation:
            ct7-card-scan
            4s
            linear
            infinite;
        }

        .ct7-card:hover
        .ct7-card-scan {
          opacity: 1;
        }

        @keyframes ct7-card-scan {
          from {
            transform:
              translateY(0);
          }

          to {
            transform:
              translateY(105px);
          }
        }

        /* =====================================================
           CORNERS
        ===================================================== */

        .ct7-card-corners {
          position: absolute;
          inset: 0;

          pointer-events: none;
        }

        .ct7-card-corners i {
          position: absolute;

          width: 14px;
          height: 14px;

          border-color:
            var(--ct7-accent);

          border-style: solid;

          opacity: 0;

          transition:
            opacity .35s ease,
            width .35s ease,
            height .35s ease;
        }

        .ct7-card-corners i:nth-child(1) {
          left: 5px;
          top: 5px;

          border-width:
            1px 0 0 1px;
        }

        .ct7-card-corners i:nth-child(2) {
          right: 5px;
          top: 5px;

          border-width:
            1px 1px 0 0;
        }

        .ct7-card-corners i:nth-child(3) {
          left: 5px;
          bottom: 5px;

          border-width:
            0 0 1px 1px;
        }

        .ct7-card-corners i:nth-child(4) {
          right: 5px;
          bottom: 5px;

          border-width:
            0 1px 1px 0;
        }

        .ct7-card:hover
        .ct7-card-corners i {
          width: 20px;
          height: 20px;

          opacity: .7;
        }

        /* =====================================================
           COPY
        ===================================================== */

        .ct7-copy {
          display: flex;
          align-items: center;
          justify-content: space-between;

          min-height: 40px;

          padding:
            0 14px;

          border:
            1px dashed
            rgba(255,255,255,.12);

          background:
            transparent;

          color:
            rgba(255,255,255,.35);

          cursor: pointer;

          font-family: monospace;

          font-size: 6px;

          letter-spacing: .14em;

          transition:
            color .3s ease,
            border-color .3s ease,
            background .3s ease;
        }

        .ct7-copy:hover {
          color: #fff;

          border-color:
            var(--ct7-accent);

          background:
            rgba(97,232,255,.025);
        }

        .ct7-copy b {
          font-size: 8px;

          color:
            var(--ct7-accent);
        }

        .ct7-copy-done {
          color:
            var(--ct7-accent);
        }

        /* =====================================================
           BOTTOM
        ===================================================== */

        .ct7-bottom {
          position: absolute;

          left: 55px;
          right: 55px;
          bottom: 55px;

          z-index: 50;

          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          align-items: center;
        }

        .ct7-bottom-left,
        .ct7-bottom-right {
          display: flex;
          align-items: center;

          gap: 10px;

          font-family: monospace;

          font-size: 6px;

          letter-spacing: .14em;

          color:
            rgba(255,255,255,.25);
        }

        .ct7-bottom-left strong {
          color:
            rgba(255,255,255,.38);

          font-weight: 400;
        }

        .ct7-bottom-left i {
          width: 30px;
          height: 1px;

          background:
            rgba(255,255,255,.15);
        }

        .ct7-bottom-center {
          display: flex;
          align-items: center;

          gap: 9px;

          font-family: monospace;

          font-size: 6px;

          color:
            rgba(255,255,255,.2);
        }

        .ct7-bottom-center span:first-child {
          color:
            var(--ct7-accent);
        }

        .ct7-bottom-center div {
          width: 45px;
          height: 1px;

          background:
            rgba(255,255,255,.1);
        }

        .ct7-bottom-center i {
          display: block;

          width: 50%;

          height: 100%;

          background:
            var(--ct7-accent);
        }

        .ct7-bottom-right {
          justify-self: end;
        }

        .ct7-bottom-right b {
          color:
            var(--ct7-accent);

          font-size: 13px;

          animation:
            ct7-arrow-down
            1.7s
            ease-in-out
            infinite;
        }

        @keyframes ct7-arrow-down {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(5px);
          }
        }

        /* =====================================================
           MARQUEE
        ===================================================== */

        .ct7-marquee {
          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          height: 34px;

          overflow: hidden;

          border-top:
            1px solid
            rgba(255,255,255,.06);

          z-index: 40;
        }

        .ct7-marquee-track {
          display: flex;

          width: max-content;

          animation:
            ct7-marquee
            25s
            linear
            infinite;
        }

        .ct7-marquee-group {
          display: flex;
          align-items: center;

          gap: 25px;

          padding-right: 25px;

          white-space: nowrap;
        }

        .ct7-marquee-group span {
          font-size: 9px;

          font-weight: 700;

          letter-spacing: .16em;

          color:
            rgba(255,255,255,.13);
        }

        .ct7-marquee-group b {
          color:
            var(--ct7-accent);

          font-size: 7px;
        }

        @keyframes ct7-marquee {
          from {
            transform:
              translateX(0);
          }

          to {
            transform:
              translateX(-33.333%);
          }
        }

        /* =====================================================
           REVEAL
        ===================================================== */

        .ct7-topline,
        .ct7-heading,
        .ct7-right,
        .ct7-bottom {
          opacity: 0;

          transform:
            translateY(30px);
        }

        .ct7-visible
        .ct7-topline {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .7s ease,
            transform .8s
              cubic-bezier(.16,1,.3,1);
        }

        .ct7-visible
        .ct7-heading {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .9s .1s ease,
            transform 1s .1s
              cubic-bezier(.16,1,.3,1);
        }

        .ct7-visible
        .ct7-right {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .9s .22s ease,
            transform 1s .22s
              cubic-bezier(.16,1,.3,1);
        }

        .ct7-visible
        .ct7-bottom {
          opacity: 1;

          transform:
            translateY(0);

          transition:
            opacity .7s .4s ease,
            transform .8s .4s
              cubic-bezier(.16,1,.3,1);
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1050px) {
          .ct7-section {
            padding:
              30px
              30px
              75px;
          }

          .ct7-container {
            grid-template-columns:
              1fr;

            gap: 40px;

            padding-top: 55px;
          }

          .ct7-heading {
            max-width: 850px;
          }

          .ct7-heading h2 {
            font-size:
              clamp(
                75px,
                13vw,
                140px
              );
          }

          .ct7-right {
            display: grid;

            grid-template-columns:
              .65fr
              1fr;

            align-items: center;

            gap: 30px;
          }

          .ct7-orbit-area {
            margin-bottom: 0;
          }

          .ct7-bottom {
            left: 30px;
            right: 30px;
            bottom: 45px;
          }
        }

        @media (max-width: 720px) {
          .ct7-section {
            min-height: auto;

            padding:
              25px
              16px
              65px;
          }

          .ct7-section-number small {
            display: none;
          }

          .ct7-status small {
            font-size: 6px;
          }

          .ct7-section-number i {
            width: 25px;
          }

          .ct7-container {
            min-height: auto;

            padding:
              65px 0 45px;
          }

          .ct7-heading h2 {
            font-size:
              clamp(
                65px,
                18vw,
                105px
              );
          }

          .ct7-heading h2 em {
            transform:
              translateX(3vw);
          }

          .ct7-intro {
            margin-top: 30px;

            font-size: 10px;
          }

          .ct7-right {
            display: block;
          }

          .ct7-orbit-area {
            height: 230px;

            margin-bottom: 15px;
          }

          .orbit-1 {
            width: 190px;
            height: 190px;
          }

          .orbit-2 {
            width: 145px;
            height: 200px;
          }

          .orbit-3 {
            width: 225px;
            height: 105px;
          }

          .ct7-card-middle {
            grid-template-columns:
              75px
              1fr;
          }

          .ct7-bottom {
            position: relative;

            left: auto;
            right: auto;
            bottom: auto;

            margin-top: 10px;

            grid-template-columns:
              1fr
              auto;
          }

          .ct7-bottom-center {
            display: none;
          }

          .ct7-bottom-right {
            display: none;
          }

          .ct7-marquee {
            position: relative;

            margin:
              0 -16px
              -65px;

            width:
              calc(100% + 32px);
          }
        }

        @media (max-width: 430px) {
          .ct7-heading h2 {
            font-size:
              20vw;
          }

          .ct7-main-cta {
            min-height: 58px;
          }

          .ct7-cta-text {
            margin-left: 15px;

            font-size: 6px;
          }

          .ct7-card {
            min-height: 110px;
          }

          .ct7-card-middle {
            grid-template-columns:
              65px
              1fr;
          }

          .ct7-card-middle strong {
            font-size: 12px;
          }

          .ct7-card-middle span {
            font-size: 6px;
          }
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .ct7-section *,
          .ct7-section *::before,
          .ct7-section *::after {
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