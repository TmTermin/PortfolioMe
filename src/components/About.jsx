import { useEffect, useRef, useState } from "react";
import { profile, capabilities } from "../data/portfolio";

const rotatingWords = [
  "CREATIVE CODER",
  "DIGITAL BUILDER",
  "FULL STACK",
  "INTERFACE MAKER",
  "CODE & DESIGN",
  "DIGITAL CREATOR",
  "PROBLEM SOLVER",
];

export default function About() {
  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  /* =====================================================
     ROTATING WORDS
  ===================================================== */

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex(
        (current) =>
          (current + 1) % rotatingWords.length
      );
    }, 2300);

    return () => clearInterval(timer);
  }, []);

  /* =====================================================
     MOUSE + REVEAL
  ===================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const move = (event) => {
      const rect =
        section.getBoundingClientRect();

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

      section.style.setProperty("--mouse-x", x);
      section.style.setProperty("--mouse-y", y);

      /* Keep the image light/glow point attached to the pointer. */
      const photo =
        section.querySelector(".about-photo");

      if (photo) {
        const photoRect =
          photo.getBoundingClientRect();

        const photoX =
          ((event.clientX - photoRect.left) /
            photoRect.width) *
          100;

        const photoY =
          ((event.clientY - photoRect.top) /
            photoRect.height) *
          100;

        photo.style.setProperty(
          "--photo-x",
          `${photoX}%`
        );

        photo.style.setProperty(
          "--photo-y",
          `${photoY}%`
        );

        const moveX =
          (photoX - 50) * 0.035;

        const moveY =
          (photoY - 50) * 0.035;

        photo.style.setProperty(
          "--photo-move-x",
          `${moveX}px`
        );

        photo.style.setProperty(
          "--photo-move-y",
          `${moveY}px`
        );
      }
    };

    section.addEventListener(
      "mousemove",
      move
    );

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        },
        {
          threshold: 0.15,
        }
      );

    observer.observe(section);

    return () => {
      section.removeEventListener(
        "mousemove",
        move
      );

      const photo =
        section.querySelector(".about-photo");

      if (photo) {
        photo.style.removeProperty("--photo-x");
        photo.style.removeProperty("--photo-y");
        photo.style.removeProperty("--photo-move-x");
        photo.style.removeProperty("--photo-move-y");
      }

      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`ac-about ${
        visible ? "about-visible" : ""
      }`}
    >

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="about-grid" />
      <div className="about-glow" />
      <div className="about-noise" />


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="about-header">

        <div className="about-header-left">

          <span>02</span>

          <i />

          <strong>ABOUT</strong>

        </div>


        <div className="about-header-right">

          <span>
            SELECTED INFORMATION
          </span>

          <span>
            02 / 07
          </span>

        </div>

      </header>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="about-layout">


        {/* =================================================
            VISUAL
        ================================================= */}

        <div className="about-visual">

          {/* BIG ORBIT */}

          <div className="about-orbit orbit-one" />

          <div className="about-orbit orbit-two" />

          <div className="about-orbit orbit-three" />


          {/* CROSS LINES */}

          <div className="about-cross horizontal" />

          <div className="about-cross vertical" />


          {/* =================================================
              STRINGS / CONNECTIONS
          ================================================= */}

          <div
            className="about-string string-left"
            style={{
              transform: `
                rotate(calc(var(--mouse-y, 0) * 5deg - 12deg))
                translateX(calc(var(--mouse-x, 0) * 10px))
              `,
            }}
          >

            <span className="string-line" />

            <span className="string-node" />

          </div>


          <div
            className="about-string string-right"
            style={{
              transform: `
                rotate(calc(var(--mouse-y, 0) * -4deg + 8deg))
                translateX(calc(var(--mouse-x, 0) * -12px))
              `,
            }}
          >

            <span className="string-line" />

            <span className="string-node" />

          </div>


          <div
            className="about-string string-top"
            style={{
              transform: `
                rotate(calc(var(--mouse-x, 0) * 4deg))
                translateY(calc(var(--mouse-y, 0) * 12px))
              `,
            }}
          >

            <span className="string-line" />

            <span className="string-node" />

          </div>


          <div
            className="about-string string-bottom"
            style={{
              transform: `
                rotate(calc(var(--mouse-x, 0) * -4deg))
                translateY(calc(var(--mouse-y, 0) * -12px))
              `,
            }}
          >

            <span className="string-line" />

            <span className="string-node" />

          </div>


          {/* =================================================
              PHOTO
          ================================================= */}

          <div
            className="about-photo-wrap"
            style={{
              transform: `
                translate3d(
                  calc(var(--mouse-x, 0) * 18px),
                  calc(var(--mouse-y, 0) * 15px),
                  0
                )
                rotateX(calc(var(--mouse-y, 0) * -2deg))
                rotateY(calc(var(--mouse-x, 0) * 3deg))
              `,
            }}
          >

            {/* IMAGE SHADOW */}

            <div className="about-photo-shadow" />


            {/* IMAGE */}

            <div className="about-photo">

              {profile?.portraitAlt ||
              profile?.portrait ? (
                <img
                  src={
                    profile.portraitAlt ||
                    profile.portrait
                  }
                  alt={
                    profile.name ||
                    "Portrait"
                  }
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="about-no-image">
                  ADD IMAGE
                </div>
              )}


              <div className="about-photo-overlay" />


              <div className="about-photo-info">

                <span>
                  02 / 01
                </span>

                <span>
                  PORTRAIT
                </span>

              </div>

            </div>


            {/* CORNERS */}

            <span className="photo-corner pc-tl" />
            <span className="photo-corner pc-tr" />
            <span className="photo-corner pc-bl" />
            <span className="photo-corner pc-br" />

          </div>


          {/* =================================================
              FLOATING LABELS
          ================================================= */}

          <div className="about-floating-label label-top">

            <span>01</span>

            <strong>
              CREATE
            </strong>

          </div>


          <div className="about-floating-label label-left">

            <span>02</span>

            <strong>
              BUILD
            </strong>

          </div>


          <div className="about-floating-label label-right">

            <span>03</span>

            <strong>
              SHIP
            </strong>

          </div>


          {/* =================================================
              BIG NUMBER
          ================================================= */}

          <div className="about-big-number">
            02
          </div>

        </div>


        {/* =================================================
            TEXT CONTENT
        ================================================= */}

        <div className="about-content">

          <div className="about-eyebrow">
            02 / ABOUT ME
          </div>


          {/* =================================================
              TITLE
          ================================================= */}

          <h2 className="about-title">

            <span>
              I BUILD
            </span>

            <em>
              DIGITAL
            </em>

            <strong
              key={rotatingWords[wordIndex]}
            >
              {rotatingWords[wordIndex]}
            </strong>

          </h2>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div className="about-description">

            {profile?.intro ? (
              <p>
                {profile.intro}
              </p>
            ) : (
              <p>
                I create digital experiences
                where design, technology and
                interaction come together.
                My approach combines clean
                interfaces, thoughtful motion
                and solid development.
              </p>
            )}

          </div>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="about-divider" />


          {/* =================================================
              STATS
          ================================================= */}

          <div className="about-stats">

            <div className="about-stat">

              <span>
                01
              </span>

              <small>
                ROLE
              </small>

              <strong>
                {profile?.role ||
                  "DEVELOPER"}
              </strong>

            </div>


            <div className="about-stat">

              <span>
                02
              </span>

              <small>
                CAPABILITIES
              </small>

              <strong>
                {String(
                  capabilities?.length || 0
                ).padStart(2, "0")}
                +
              </strong>

            </div>


            <div className="about-stat">

              <span>
                03
              </span>

              <small>
                APPROACH
              </small>

              <strong>
                DESIGN
              </strong>

            </div>


            <div className="about-stat">

              <span>
                04
              </span>

              <small>
                FOCUS
              </small>

              <strong>
                DIGITAL
              </strong>

            </div>

          </div>


          {/* =================================================
              SKILL TAGS
          ================================================= */}

          <div className="about-tags">

            <span>FRONTEND</span>

            <span>BACKEND</span>

            <span>UI / UX</span>

            <span>MOTION</span>

            <span>CREATIVE CODE</span>

          </div>


          {/* =================================================
              CTA
          ================================================= */}

          <a
            href="#contact"
            className="about-cta"
          >

            <span>
              LET'S BUILD SOMETHING
            </span>

            <b>
              ↗
            </b>

          </a>

        </div>

      </div>


      {/* =================================================
          BOTTOM MARQUEE
      ================================================= */}

      <div className="about-marquee">

        <div className="about-marquee-track">

          <div className="about-marquee-group">

            <span>
              DESIGN WITH PURPOSE
            </span>

            <i>✦</i>

            <span>
              CODE WITH PRECISION
            </span>

            <i>✦</i>

            <span>
              BUILD DIGITAL EXPERIENCES
            </span>

            <i>✦</i>

          </div>


          <div className="about-marquee-group">

            <span>
              DESIGN WITH PURPOSE
            </span>

            <i>✦</i>

            <span>
              CODE WITH PRECISION
            </span>

            <i>✦</i>

            <span>
              BUILD DIGITAL EXPERIENCES
            </span>

            <i>✦</i>

          </div>

        </div>

      </div>


      {/* =================================================
          CSS
      ================================================= */}

      <style>{`

        /* ================================================
           BASE
        ================================================= */

        .ac-about,
        .ac-about * {
          box-sizing: border-box;
        }


        .ac-about {

          position: relative;

          min-height: 100vh;

          padding:
            145px
            7vw
            120px;

          overflow: hidden;

          isolation: isolate;

          background:
            #070707;

          color: #fff;
        }


        /* ================================================
           GRID
        ================================================= */

        .about-grid {

          position: absolute;

          inset: 0;

          z-index: 0;

          background-image:

            linear-gradient(
              rgba(255,255,255,.025)
              1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(255,255,255,.025)
              1px,
              transparent 1px
            );

          background-size:
            85px 85px;

          opacity: .65;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 90%
            );
        }


        /* ================================================
           GLOW
        ================================================= */

        .about-glow {

          position: absolute;

          left: 25%;
          top: 45%;

          width: 650px;
          height: 650px;

          z-index: 0;

          transform:
            translate(-50%, -50%);

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.055),
              transparent 68%
            );

          filter:
            blur(25px);

          pointer-events: none;
        }


        /* ================================================
           NOISE
        ================================================= */

        .about-noise {

          position: absolute;

          inset: -50%;

          z-index: 30;

          pointer-events: none;

          opacity: .035;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.6'/%3E%3C/svg%3E");

          animation:
            aboutNoise
            .25s
            steps(2)
            infinite;
        }


        @keyframes aboutNoise {

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
            transform: translate(-2%,-1%);
          }

        }


        /* ================================================
           HEADER
        ================================================= */

        .about-header {

          position: relative;

          z-index: 5;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          margin-bottom: 85px;
        }


        .about-header-left {

          display: flex;

          align-items: center;

          gap: 15px;

          font:
            9px
            "DM Mono",
            monospace;

          letter-spacing:
            .2em;

          color:
            rgba(255,255,255,.38);
        }


        .about-header-left > span {

          color:
            rgba(255,255,255,.2);
        }


        .about-header-left i {

          width: 60px;
          height: 1px;

          background:
            rgba(255,255,255,.28);
        }


        .about-header-left strong {

          font-weight: 400;

          color: #fff;
        }


        .about-header-right {

          display: flex;

          gap: 35px;

          font:
            8px
            "DM Mono",
            monospace;

          letter-spacing:
            .16em;

          color:
            rgba(255,255,255,.2);
        }


        /* ================================================
           LAYOUT
        ================================================= */

        .about-layout {

          position: relative;

          z-index: 5;

          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 9vw;

          align-items: center;
        }


        /* ================================================
           VISUAL
        ================================================= */

        .about-visual {

          position: relative;

          height: 650px;

          display: flex;

          align-items: center;

          justify-content: center;
        }


        /* ================================================
           ORBITS
        ================================================= */

        .about-orbit {

          position: absolute;

          left: 50%;
          top: 50%;

          border:
            1px solid
            rgba(255,255,255,.07);

          border-radius: 50%;

          pointer-events: none;
        }


        .orbit-one {

          width: 500px;
          height: 500px;

          transform:
            translate(-50%,-50%);

          animation:
            orbitRotate
            24s
            linear
            infinite;
        }


        .orbit-two {

          width: 420px;
          height: 570px;

          transform:
            translate(-50%,-50%)
            rotate(28deg);

          border-style: dashed;

          opacity: .65;

          animation:
            orbitRotateReverse
            20s
            linear
            infinite;
        }


        .orbit-three {

          width: 590px;
          height: 240px;

          transform:
            translate(-50%,-50%)
            rotate(-18deg);

          opacity: .45;
        }


        @keyframes orbitRotate {

          from {
            transform:
              translate(-50%,-50%)
              rotate(0deg);
          }

          to {
            transform:
              translate(-50%,-50%)
              rotate(360deg);
          }

        }


        @keyframes orbitRotateReverse {

          from {
            transform:
              translate(-50%,-50%)
              rotate(28deg);
          }

          to {
            transform:
              translate(-50%,-50%)
              rotate(-332deg);
          }

        }


        /* ================================================
           CROSS
        ================================================= */

        .about-cross {

          position: absolute;

          left: 50%;
          top: 50%;

          background:
            rgba(255,255,255,.045);

          pointer-events: none;
        }


        .about-cross.horizontal {

          width: 650px;
          height: 1px;

          transform:
            translate(-50%,-50%);
        }


        .about-cross.vertical {

          width: 1px;
          height: 650px;

          transform:
            translate(-50%,-50%);
        }


        /* ================================================
           STRINGS
        ================================================= */

        .about-string {

          position: absolute;

          z-index: 8;

          display: flex;

          align-items: center;

          pointer-events: none;

          transition:
            transform .15s linear;
        }


        .string-line {

          position: relative;

          display: block;

          width: 170px;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.45),
              transparent
            );
        }


        .string-node {

          width: 7px;
          height: 7px;

          margin-left: -4px;

          border-radius: 50%;

          background: #fff;

          box-shadow:
            0 0 18px
            rgba(255,255,255,.7);
        }


        .string-left {

          left: 3%;

          top: 49%;

          transform-origin:
            right center;
        }


        .string-left .string-line {

          transform:
            rotate(180deg);
        }


        .string-right {

          right: 3%;

          top: 44%;

          transform-origin:
            left center;
        }


        .string-top {

          top: 4%;

          left: 48%;

          transform:
            rotate(90deg);
        }


        .string-bottom {

          bottom: 4%;

          left: 44%;

          transform:
            rotate(90deg);
        }


        /* ================================================
           PHOTO WRAP
        ================================================= */

        .about-photo-wrap {

          position: relative;

          width: 370px;
          height: 510px;

          z-index: 12;

          transition:
            transform .18s
            cubic-bezier(.16,1,.3,1);

          will-change:
            transform;
        }


        /* ================================================
           SHADOW
        ================================================= */

        .about-photo-shadow {

          position: absolute;

          left: 50%;
          bottom: -20px;

          width: 80%;
          height: 70px;

          transform:
            translateX(-50%);

          background:
            radial-gradient(
              ellipse,
              rgba(0,0,0,.9),
              transparent 70%
            );

          filter:
            blur(25px);

          z-index: -1;
        }


        /* ================================================
           PHOTO
        ================================================= */

        .about-photo {

          position: relative;

          width: 100%;
          height: 100%;

          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.18);

          background:
            #141414;

          box-shadow:
            0 35px 80px
            rgba(0,0,0,.5);
        }


        .about-photo img {

          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;

          object-position:
            center top;

          /* FULL COLOR */
          filter:
            grayscale(0%)
            saturate(1.22)
            contrast(1.06)
            brightness(1.02);

          transform:
            scale(1.015);

          transition:
            transform 1.15s
              cubic-bezier(.16,1,.3,1),

            filter .8s
              cubic-bezier(.16,1,.3,1);
        }


        /* =================================================
           PREMIUM PHOTO HOVER
        ================================================= */

        .about-photo::before {

          content: "";

          position: absolute;

          inset: 0;

          z-index: 2;

          pointer-events: none;

          background:
            radial-gradient(
              circle at
              var(--photo-x, 50%)
              var(--photo-y, 50%),
              rgba(99,232,255,.18),
              transparent 30%
            );

          mix-blend-mode:
            screen;

          opacity: 0;

          transition:
            opacity .45s ease;
        }


        .about-photo::after {

          content: "";

          position: absolute;

          left: -120%;

          top: 0;

          width: 70%;

          height: 100%;

          z-index: 5;

          pointer-events: none;

          background:
            linear-gradient(
              100deg,
              transparent,
              rgba(255,255,255,.18),
              rgba(99,232,255,.13),
              transparent
            );

          transform:
            skewX(-18deg);

          transition:
            left 1s
              cubic-bezier(.16,1,.3,1);
        }


        .about-photo:hover img {

          transform:
            scale(1.09)
            translate3d(
              calc(
                var(--photo-move-x, 0px)
              ),
              calc(
                var(--photo-move-y, 0px)
              ),
              0
            );

          filter:
            grayscale(0%)
            saturate(1.42)
            contrast(1.1)
            brightness(1.06);
        }


        .about-photo:hover::before {
          opacity: 1;
        }


        .about-photo:hover::after {
          left: 145%;
        }


        .about-photo:hover {
          box-shadow:
            0 40px 100px
              rgba(0,0,0,.62),

            0 0 0 1px
              rgba(99,232,255,.22),

            0 0 55px
              rgba(99,232,255,.09);

          transition:
            box-shadow .5s ease;
        }


        /* IMAGE COLOR SHIFT ON HOVER */

        .about-photo:hover
        .about-photo-overlay {

          background:
            linear-gradient(
              180deg,
              rgba(0,0,0,.02) 0%,
              rgba(7,10,18,.05) 35%,
              rgba(0,0,0,.72) 100%
            );

          transition:
            background .6s ease;
        }


        /* PHOTO CORNERS REACT */

        .about-photo:hover
        ~ .photo-corner,
        .about-photo-wrap:hover
        .photo-corner {

          border-color:
            rgba(99,232,255,.9);

          filter:
            drop-shadow(
              0 0 7px
              rgba(99,232,255,.35)
            );
        }


        /* ================================================
           PHOTO OVERLAY
        ================================================= */

        .about-photo-overlay {

          position: absolute;

          inset: 0;

          background:

            linear-gradient(
              180deg,
              transparent 40%,
              rgba(0,0,0,.75)
            );

          pointer-events: none;
        }


        /* ================================================
           PHOTO INFO
        ================================================= */

        .about-photo-info {

          position: absolute;

          left: 18px;
          right: 18px;
          bottom: 17px;

          z-index: 4;

          display: flex;

          justify-content:
            space-between;

          font:
            8px
            "DM Mono",
            monospace;

          letter-spacing:
            .16em;

          color:
            rgba(255,255,255,.6);
        }


        /* ================================================
           CORNERS
        ================================================= */

        .photo-corner {

          position: absolute;

          width: 22px;
          height: 22px;

          z-index: 15;

          border:
            1px solid
            rgba(255,255,255,.65);
        }


        .pc-tl {

          left: -7px;
          top: -7px;

          border-right: 0;
          border-bottom: 0;
        }


        .pc-tr {

          right: -7px;
          top: -7px;

          border-left: 0;
          border-bottom: 0;
        }


        .pc-bl {

          left: -7px;
          bottom: -7px;

          border-right: 0;
          border-top: 0;
        }


        .pc-br {

          right: -7px;
          bottom: -7px;

          border-left: 0;
          border-top: 0;
        }


        /* ================================================
           FLOATING LABELS
        ================================================= */

        .about-floating-label {

          position: absolute;

          z-index: 16;

          display: flex;

          flex-direction: column;

          gap: 5px;

          font-family:
            "DM Mono",
            monospace;

          pointer-events: none;

          animation:
            floatingLabel
            4s
            ease-in-out
            infinite;
        }


        .about-floating-label span {

          font-size: 7px;

          color:
            rgba(255,255,255,.22);
        }


        .about-floating-label strong {

          font-size: 8px;

          font-weight: 400;

          letter-spacing:
            .18em;

          color:
            rgba(255,255,255,.5);
        }


        .label-top {

          top: 5%;

          left: 13%;
        }


        .label-left {

          left: 1%;

          bottom: 22%;

          animation-delay:
            -1s;
        }


        .label-right {

          right: 2%;

          top: 28%;

          animation-delay:
            -2s;
        }


        @keyframes floatingLabel {

          0%,100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-8px);
          }

        }


        /* ================================================
           BIG NUMBER
        ================================================= */

        .about-big-number {

          position: absolute;

          right: 2%;

          bottom: 4%;

          z-index: 3;

          font:
            800
            130px
            "Manrope",
            sans-serif;

          line-height: .7;

          letter-spacing:
            -.09em;

          color:
            rgba(255,255,255,.025);

          user-select: none;
        }


        /* ================================================
           CONTENT
        ================================================= */

        .about-content {

          opacity: 0;

          transform:
            translateY(60px);

          transition:

            opacity 1s .15s ease,

            transform 1.1s .15s
              cubic-bezier(.16,1,.3,1);
        }


        .about-visible
        .about-content {

          opacity: 1;

          transform:
            translateY(0);
        }


        /* ================================================
           EYEBROW
        ================================================= */

        .about-eyebrow {

          margin-bottom: 25px;

          font:
            9px
            "DM Mono",
            monospace;

          letter-spacing:
            .2em;

          color:
            rgba(255,255,255,.28);
        }


        /* ================================================
           TITLE
        ================================================= */

        .about-title {

          display: flex;

          flex-direction: column;

          gap: 4px;

          margin: 0 0 38px;

          font:
            800
            clamp(
              55px,
              7vw,
              105px
            )
            "Manrope",
            sans-serif;

          line-height:
            .78;

          letter-spacing:
            -.085em;

          text-transform:
            uppercase;
        }


        .about-title span {

          color:
            #f3f3ef;
        }


        .about-title em {

          margin-left:
            3.5vw;

          font:
            italic
            400
            .72em
            Georgia,
            serif;

          color:
            rgba(255,255,255,.35);
        }


        .about-title strong {

          min-height:
            1em;

          display: block;

          color:
            transparent;

          -webkit-text-stroke:
            1px
            rgba(255,255,255,.58);

          animation:
            wordReveal
            .7s
            cubic-bezier(.16,1,.3,1);
        }


        @keyframes wordReveal {

          from {

            opacity: 0;

            transform:
              translateY(35px)
              skewX(-12deg);

            filter:
              blur(8px);
          }

          to {

            opacity: 1;

            transform:
              translateY(0)
              skewX(0);

            filter:
              blur(0);
          }

        }


        /* ================================================
           DESCRIPTION
        ================================================= */

        .about-description {

          max-width: 570px;
        }


        .about-description p {

          margin: 0;

          font:
            15px/1.85
            "Manrope",
            sans-serif;

          color:
            rgba(255,255,255,.43);
        }


        /* ================================================
           DIVIDER
        ================================================= */

        .about-divider {

          width: 100%;
          height: 1px;

          margin:
            35px 0 25px;

          background:
            rgba(255,255,255,.1);

          transform-origin:
            left;

          transition:
            transform 1.2s .5s
              cubic-bezier(.16,1,.3,1);

          transform:
            scaleX(0);
        }


        .about-visible
        .about-divider {

          transform:
            scaleX(1);
        }


        /* ================================================
           STATS
        ================================================= */

        .about-stats {

          display: grid;

          grid-template-columns:
            repeat(4,1fr);

          gap: 15px;
        }


        .about-stat {

          min-height:
            85px;

          display: flex;

          flex-direction: column;

          gap: 7px;

          padding:
            13px;

          border:
            1px solid
            rgba(255,255,255,.07);

          background:
            rgba(255,255,255,.012);

          transition:
            transform .4s
              cubic-bezier(.16,1,.3,1),

            border-color .3s ease,

            background .3s ease;
        }


        .about-stat:hover {

          transform:
            translateY(-6px);

          border-color:
            rgba(255,255,255,.2);

          background:
            rgba(255,255,255,.035);
        }


        .about-stat > span {

          font:
            7px
            "DM Mono",
            monospace;

          color:
            rgba(255,255,255,.18);
        }


        .about-stat small {

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing:
            .14em;

          color:
            rgba(255,255,255,.24);
        }


        .about-stat strong {

          margin-top: auto;

          font:
            600
            10px
            "Manrope",
            sans-serif;

          letter-spacing:
            .02em;

          color:
            rgba(255,255,255,.8);
        }


        /* ================================================
           TAGS
        ================================================= */

        .about-tags {

          display: flex;

          flex-wrap: wrap;

          gap: 7px;

          margin-top:
            20px;
        }


        .about-tags span {

          padding:
            7px 10px;

          border:
            1px solid
            rgba(255,255,255,.1);

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing:
            .08em;

          color:
            rgba(255,255,255,.35);

          transition:
            color .3s ease,

            border-color .3s ease,

            transform .3s ease;
        }


        .about-tags span:hover {

          color: #fff;

          border-color:
            rgba(255,255,255,.35);

          transform:
            translateY(-3px);
        }


        /* ================================================
           CTA
        ================================================= */

        .about-cta {

          width: 310px;

          margin-top:
            38px;

          padding:
            16px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          border:
            1px solid
            rgba(255,255,255,.22);

          color: #fff;

          text-decoration:
            none !important;

          font:
            8px
            "DM Mono",
            monospace;

          letter-spacing:
            .13em;

          transition:
            background .35s ease,

            color .35s ease,

            transform .45s
              cubic-bezier(.16,1,.3,1);
        }


        .about-cta b {

          font-size:
            18px;

          font-weight:
            300;

          transition:
            transform .35s ease;
        }


        .about-cta:hover {

          background: #fff;

          color: #000;

          transform:
            translateX(8px);
        }


        .about-cta:hover b {

          transform:
            translate(4px,-4px);
        }


        /* ================================================
           BOTTOM MARQUEE
        ================================================= */

        .about-marquee {

          position: absolute;

          left: 0;
          right: 0;

          bottom: 20px;

          z-index: 4;

          overflow: hidden;

          opacity: .11;

          pointer-events: none;
        }


        .about-marquee-track {

          width: max-content;

          display: flex;

          animation:
            aboutMarquee
            28s
            linear
            infinite;
        }


        .about-marquee-group {

          display: flex;

          align-items: center;

          flex-shrink: 0;

          gap: 35px;

          padding-right: 35px;
        }


        .about-marquee-group span {

          font:
            italic
            800
            70px
            "Manrope",
            sans-serif;

          letter-spacing:
            -.07em;

          white-space:
            nowrap;
        }


        .about-marquee-group i {

          font-size:
            20px;

          font-style:
            normal;
        }


        @keyframes aboutMarquee {

          from {

            transform:
              translateX(0);
          }

          to {

            transform:
              translateX(-50%);
          }

        }


        /* ================================================
           MOBILE
        ================================================= */

        @media (max-width: 950px) {

          .ac-about {

            padding:
              110px
              22px
              100px;
          }


          .about-header {

            margin-bottom:
              55px;
          }


          .about-header-right {

            display: none;
          }


          .about-layout {

            display: block;
          }


          .about-visual {

            height:
              580px;

            margin-bottom:
              80px;
          }


          .about-photo-wrap {

            width:
              310px;

            height:
              440px;
          }


          .about-orbit.orbit-one {

            width:
              430px;

            height:
              430px;
          }


          .about-orbit.orbit-two {

            width:
              350px;

            height:
              490px;
          }


          .about-orbit.orbit-three {

            width:
              500px;

            height:
              200px;
          }


          .about-stats {

            grid-template-columns:
              repeat(2,1fr);
          }


          .about-title {

            font-size:
              clamp(
                48px,
                13vw,
                82px
              );
          }


          .about-cta {

            width: 100%;
          }

        }


        /* ================================================
           SMALL MOBILE
        ================================================= */

        @media (max-width: 520px) {

          .ac-about {

            padding:
              95px
              18px
              90px;
          }


          .about-header {

            margin-bottom:
              35px;
          }


          .about-header-left {

            font-size:
              8px;
          }


          .about-header-left i {

            width:
              38px;
          }


          .about-visual {

            height:
              500px;
          }


          .about-photo-wrap {

            width:
              250px;

            height:
              365px;
          }


          .about-orbit.orbit-one {

            width:
              350px;

            height:
              350px;
          }


          .about-orbit.orbit-two {

            width:
              290px;

            height:
              390px;
          }


          .about-orbit.orbit-three {

            width:
              400px;

            height:
              170px;
          }


          .about-string .string-line {

            width:
              100px;
          }


          .about-floating-label {

            display: none;
          }


          .about-big-number {

            font-size:
              90px;
          }


          .about-title {

            margin-bottom:
              28px;

            font-size:
              clamp(
                45px,
                15vw,
                72px
              );
          }


          .about-description p {

            font-size:
              13px;

            line-height:
              1.8;
          }


          .about-stats {

            gap:
              8px;
          }


          .about-stat {

            min-height:
              78px;

            padding:
              10px;
          }


          .about-tags span {

            font-size:
              6px;
          }


          .about-marquee-group span {

            font-size:
              45px;
          }

        }


        /* ================================================
           REDUCED MOTION
        ================================================= */

        @media (prefers-reduced-motion: reduce) {

          .about-noise,
          .about-orbit,
          .about-floating-label,
          .about-marquee-track {

            animation:
              none !important;
          }


          .about-photo-wrap,
          .about-string {

            transition:
              none !important;
          }

        }

      `}</style>

    </section>
  );
}