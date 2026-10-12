import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  /* =====================================================
     NAV LINKS
  ===================================================== */

  const links = [
    ["ABOUT", "#about", "about"],
    ["SERVICES", "#services", "services"],
    ["WORK", "#work", "work"],
    ["JOURNEY", "#experience", "experience"],
  ];

  /* =====================================================
     INITIALS
  ===================================================== */

  const initials = [
    profile?.name,
    profile?.surname,
  ]
    .filter(Boolean)
    .map((value) => value[0])
    .join("")
    .toUpperCase();

  /* =====================================================
     SCROLL DETECTION
  ===================================================== */

  useEffect(() => {
    const sections = [
      "home",
      "work",
      "services",
      "about",
      "experience",
      "contact",
    ]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let raf = 0;

    const handleScroll = () => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);

        let current = "home";

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();

          if (rect.top <= 180) {
            current = section.id;
          }
        });

        setActive(current);
        raf = 0;
      });
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
      cancelAnimationFrame(raf);
    };
  }, []);

  /* =====================================================
     LOCK BODY WHEN MENU OPEN
  ===================================================== */

  useEffect(() => {
    document.body.style.overflow =
      open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =====================================================
     ESCAPE
  ===================================================== */

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, []);

  /* =====================================================
     CLOSE MENU
  ===================================================== */

  const closeMenu = () => {
    setOpen(false);
  };

  /* =====================================================
     SCROLL TOP
  ===================================================== */

  const goHome = (event) => {
    event.preventDefault();

    setOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActive("home");
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className={`
          ac-navbar
          ${scrolled ? "is-scrolled" : ""}
          ${open ? "is-open" : ""}
        `}
      >

        {/* =================================================
            BRAND
        ================================================= */}

        <a
          href="#home"
          className="ac-brand"
          onClick={goHome}
        >

          <span className="ac-brand-box">
            {initials || "AC"}
          </span>

          <span className="ac-brand-slash">
            /
          </span>

          <span className="ac-brand-text">
            PORTFOLIO
          </span>

        </a>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="ac-desktop-nav">

          {links.map(
            ([name, href, id], index) => (
              <a
                key={name}
                href={href}
                className={
                  active === id
                    ? "is-active"
                    : ""
                }
                onClick={closeMenu}
              >

                <span className="nav-index">
                  0{index + 1}
                </span>

                <span className="nav-name">
                  {name}
                </span>

                <i />

              </a>
            )
          )}

        </nav>


        {/* =================================================
            CONTACT
        ================================================= */}

        <a
          href="#contact"
          className="ac-contact-button"
          onClick={closeMenu}
        >

          <span>
            CONTACT
          </span>

          <b>
            +
          </b>

        </a>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className="ac-menu-button"
          aria-label={
            open
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={open}
          onClick={() =>
            setOpen((value) => !value)
          }
        >

          <span className="menu-label">
            {open ? "CLOSE" : "MENU"}
          </span>

          <span className="menu-icon">

            <i />
            <i />

          </span>

        </button>

      </header>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`
          ac-mobile-menu
          ${open ? "is-visible" : ""}
        `}
      >

        {/* BACKGROUND */}

        <div className="mobile-menu-bg" />


        {/* TOP */}

        <div className="mobile-menu-top">

          <span>
            NAVIGATION
          </span>

          <span>
            2026
          </span>

        </div>


        {/* LINKS */}

        <nav className="mobile-links">

          {links.map(
            ([name, href, id], index) => (
              <a
                key={name}
                href={href}
                onClick={closeMenu}
                className={
                  active === id
                    ? "is-active"
                    : ""
                }
              >

                <small>
                  0{index + 1}
                </small>

                <span>
                  {name}
                </span>

                <b>
                  ↗
                </b>

              </a>
            )
          )}


          {/* CONTACT */}

          <a
            href="#contact"
            onClick={closeMenu}
            className={
              active === "contact"
                ? "is-active"
                : ""
            }
          >

            <small>
              05
            </small>

            <span>
              CONTACT
            </span>

            <b>
              ↗
            </b>

          </a>

        </nav>


        {/* BOTTOM */}

        <div className="mobile-menu-bottom">

          <span>
            {profile?.role ||
              "FULL STACK DEVELOPER"}
          </span>

          <span>
            AVAILABLE FOR WORK
          </span>

        </div>

      </div>


      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        /* =====================================================
           RESET
        ===================================================== */

        .ac-navbar,
        .ac-navbar *,
        .ac-mobile-menu,
        .ac-mobile-menu * {
          box-sizing: border-box;
        }


        .ac-navbar a,
        .ac-mobile-menu a {
          text-decoration: none !important;
        }


        /* =====================================================
           NAVBAR
        ===================================================== */

        .ac-navbar {

          position: fixed;

          top: 20px;

          left: 3.3%;
          right: 3.3%;

          height: 64px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding:
            0 10px 0 22px;

          z-index: 9999;

          border:
            1px solid
            rgba(255,255,255,.12);

          border-radius: 10px;

          background:
            rgba(8,8,8,.62);

          backdrop-filter:
            blur(22px)
            saturate(120%);

          -webkit-backdrop-filter:
            blur(22px)
            saturate(120%);

          box-shadow:
            0 10px 50px
            rgba(0,0,0,.25);

          transition:
            top .45s
              cubic-bezier(.16,1,.3,1),

            background .4s ease,

            border-color .4s ease,

            box-shadow .4s ease;
        }


        /* TOP LIGHT */

        .ac-navbar::before {

          content: "";

          position: absolute;

          left: 15%;
          right: 15%;

          top: -1px;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.28),
              transparent
            );

          opacity: .5;

          pointer-events: none;
        }


        /* SCROLLED */

        .ac-navbar.is-scrolled {

          top: 12px;

          background:
            rgba(6,6,6,.9);

          border-color:
            rgba(255,255,255,.17);

          box-shadow:
            0 15px 60px
            rgba(0,0,0,.48);
        }


        /* =====================================================
           BRAND
        ===================================================== */

        .ac-brand {

          position: relative;

          height: 42px;

          display: flex;

          align-items: center;

          gap: 10px;

          flex-shrink: 0;

          color: #fff;

          font:
            9px
            "DM Mono",
            "Courier New",
            monospace;

          letter-spacing:
            .17em;

          text-decoration:
            none !important;

          transition:
            transform .4s
            cubic-bezier(.16,1,.3,1);
        }


        .ac-brand:hover {

          transform:
            translateX(4px);
        }


        /* LOGO BOX */

        .ac-brand-box {

          width: 32px;
          height: 32px;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid
            rgba(255,255,255,.22);

          border-radius: 5px;

          background:
            rgba(255,255,255,.025);

          color: #fff;

          font:
            700 9px
            "DM Mono",
            monospace;

          letter-spacing:
            .05em;

          transition:
            background .35s ease,

            color .35s ease,

            transform .45s
            cubic-bezier(.16,1,.3,1);
        }


        .ac-brand:hover
        .ac-brand-box {

          background: #fff;

          color: #000;

          transform:
            rotate(-8deg);
        }


        /* SLASH */

        .ac-brand-slash {

          color:
            rgba(255,255,255,.25);

          font-size: 12px;
        }


        /* PORTFOLIO */

        .ac-brand-text {

          color:
            rgba(255,255,255,.48);

          transition:
            color .3s ease;
        }


        .ac-brand:hover
        .ac-brand-text {

          color: #fff;
        }


        /* =====================================================
           DESKTOP NAV
        ===================================================== */

        .ac-desktop-nav {

          position: absolute;

          left: 50%;

          transform:
            translateX(-50%);

          height: 100%;

          display: flex;

          align-items: center;

          gap: 7px;
        }


        .ac-desktop-nav a {

          position: relative;

          height: 42px;

          min-width: 82px;

          padding:
            0 13px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            1px solid
            transparent;

          border-radius: 6px;

          color:
            rgba(255,255,255,.42);

          font:
            8px
            "DM Mono",
            "Courier New",
            monospace;

          letter-spacing:
            .11em;

          text-decoration:
            none !important;

          transition:
            color .3s ease,

            background .3s ease,

            border-color .3s ease,

            transform .35s
            cubic-bezier(.16,1,.3,1);
        }


        .ac-desktop-nav a:hover {

          color: #fff;

          background:
            rgba(255,255,255,.035);

          border-color:
            rgba(255,255,255,.08);

          transform:
            translateY(-2px);
        }


        .ac-desktop-nav a.is-active {

          color: #fff;
        }


        /* NUMBER */

        .nav-index {

          position: absolute;

          left: 8px;
          top: 6px;

          font-size: 5px;

          color:
            rgba(255,255,255,.2);

          opacity: 0;

          transform:
            translateY(3px);

          transition:
            opacity .3s ease,

            transform .3s ease;
        }


        .ac-desktop-nav a:hover
        .nav-index,

        .ac-desktop-nav a.is-active
        .nav-index {

          opacity: 1;

          transform:
            translateY(0);
        }


        /* NAME */

        .nav-name {

          position: relative;

          z-index: 2;

          text-decoration:
            none !important;
        }


        /* CUSTOM ACTIVE LINE */

        .ac-desktop-nav a i {

          position: absolute;

          left: 50%;
          bottom: 5px;

          width: 0;
          height: 1px;

          background: #fff;

          transform:
            translateX(-50%);

          transition:
            width .4s
            cubic-bezier(.16,1,.3,1);
        }


        .ac-desktop-nav a:hover i,

        .ac-desktop-nav a.is-active i {

          width: 20px;
        }


        /* =====================================================
           CONTACT
        ===================================================== */

        .ac-contact-button {

          position: relative;

          width: 126px;
          height: 44px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            0 14px;

          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.14);

          border-radius: 7px;

          background:
            rgba(255,255,255,.015);

          color: #fff;

          font:
            8px
            "DM Mono",
            monospace;

          letter-spacing:
            .12em;

          text-decoration:
            none !important;

          transition:
            color .4s ease,

            border-color .4s ease,

            transform .4s
            cubic-bezier(.16,1,.3,1);
        }


        .ac-contact-button::before {

          content: "";

          position: absolute;

          inset: 0;

          z-index: -1;

          background: #fff;

          transform:
            translateY(105%);

          transition:
            transform .5s
            cubic-bezier(.16,1,.3,1);
        }


        .ac-contact-button span,
        .ac-contact-button b {

          position: relative;

          z-index: 2;
        }


        .ac-contact-button b {

          width: 22px;
          height: 22px;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid
            rgba(255,255,255,.18);

          border-radius: 50%;

          font-size: 12px;

          font-weight: 400;

          transition:
            transform .4s ease,

            background .4s ease,

            color .4s ease;
        }


        .ac-contact-button:hover {

          color: #000;

          border-color: #fff;

          transform:
            translateY(-2px);
        }


        .ac-contact-button:hover::before {

          transform:
            translateY(0);
        }


        .ac-contact-button:hover b {

          background: #000;

          color: #fff;

          border-color: #000;

          transform:
            rotate(90deg);
        }


        /* =====================================================
           MOBILE MENU BUTTON
        ===================================================== */

        .ac-menu-button {

          display: none;

          width: 96px;
          height: 44px;

          padding:
            0 11px;

          align-items: center;

          justify-content:
            space-between;

          border:
            1px solid
            rgba(255,255,255,.14);

          border-radius: 7px;

          background:
            rgba(255,255,255,.02);

          color: #fff;

          cursor: pointer;
        }


        .menu-label {

          font:
            8px
            "DM Mono",
            monospace;

          letter-spacing:
            .12em;
        }


        .menu-icon {

          width: 25px;
          height: 20px;

          display: flex;

          flex-direction: column;

          justify-content: center;

          gap: 5px;
        }


        .menu-icon i {

          display: block;

          width: 100%;
          height: 1px;

          background: #fff;

          transition:
            transform .45s
            cubic-bezier(.16,1,.3,1);
        }


        .ac-navbar.is-open
        .menu-icon i:first-child {

          transform:
            translateY(3px)
            rotate(45deg);
        }


        .ac-navbar.is-open
        .menu-icon i:last-child {

          transform:
            translateY(-3px)
            rotate(-45deg);
        }


        /* =====================================================
           MOBILE FULL SCREEN
        ===================================================== */

        .ac-mobile-menu {

          position: fixed;

          inset: 0;

          z-index: 9990;

          padding:
            125px 7vw 35px;

          display: flex;

          flex-direction: column;

          background:
            #050505;

          opacity: 0;

          visibility: hidden;

          pointer-events: none;

          clip-path:
            inset(0 0 100% 0);

          transition:
            opacity .4s ease,

            visibility .4s ease,

            clip-path .8s
            cubic-bezier(.77,0,.175,1);
        }


        .ac-mobile-menu.is-visible {

          opacity: 1;

          visibility: visible;

          pointer-events: auto;

          clip-path:
            inset(0 0 0 0);
        }


        /* =====================================================
           MOBILE BACKGROUND
        ===================================================== */

        .mobile-menu-bg {

          position: absolute;

          inset: 0;

          z-index: -1;

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
            70px 70px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
            );
        }


        /* =====================================================
           MOBILE TOP
        ===================================================== */

        .mobile-menu-top {

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding-bottom:
            18px;

          border-bottom:
            1px solid
            rgba(255,255,255,.1);

          font:
            8px
            "DM Mono",
            monospace;

          letter-spacing:
            .17em;

          color:
            rgba(255,255,255,.3);
        }


        /* =====================================================
           MOBILE LINKS
        ===================================================== */

        .mobile-links {

          display: flex;

          flex-direction: column;

          margin-top:
            35px;
        }


        .mobile-links a {

          position: relative;

          display: grid;

          grid-template-columns:
            45px 1fr 40px;

          align-items: center;

          min-height:
            85px;

          border-bottom:
            1px solid
            rgba(255,255,255,.08);

          color:
            rgba(255,255,255,.38);

          text-decoration:
            none !important;

          transition:
            color .35s ease,

            padding .5s
            cubic-bezier(.16,1,.3,1);
        }


        /* ACTIVE LINE */

        .mobile-links a::before {

          content: "";

          position: absolute;

          left: 0;
          bottom: -1px;

          width: 0;
          height: 1px;

          background: #fff;

          transition:
            width .5s
            cubic-bezier(.16,1,.3,1);
        }


        .mobile-links a:hover,

        .mobile-links a.is-active {

          color: #fff;

          padding-left:
            12px;
        }


        .mobile-links a:hover::before,

        .mobile-links a.is-active::before {

          width: 100%;
        }


        /* NUMBER */

        .mobile-links small {

          font:
            7px
            "DM Mono",
            monospace;

          color:
            rgba(255,255,255,.2);
        }


        /* NAME */

        .mobile-links span {

          font:
            700
            clamp(34px,9vw,70px)
            "Manrope",
            Arial,
            sans-serif;

          letter-spacing:
            -.06em;

          text-decoration:
            none !important;
        }


        /* ARROW */

        .mobile-links b {

          justify-self: end;

          width: 36px;
          height: 36px;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid
            rgba(255,255,255,.14);

          border-radius: 50%;

          font-size: 15px;

          font-weight: 300;

          transition:
            transform .45s
            cubic-bezier(.16,1,.3,1),

            background .3s ease,

            color .3s ease;
        }


        .mobile-links a:hover b,

        .mobile-links a.is-active b {

          background: #fff;

          color: #000;

          transform:
            rotate(45deg);
        }


        /* =====================================================
           MOBILE BOTTOM
        ===================================================== */

        .mobile-menu-bottom {

          margin-top: auto;

          padding-top: 20px;

          display: flex;

          justify-content:
            space-between;

          gap: 20px;

          border-top:
            1px solid
            rgba(255,255,255,.08);

          font:
            7px
            "DM Mono",
            monospace;

          letter-spacing:
            .14em;

          color:
            rgba(255,255,255,.25);
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {

          .ac-navbar {

            left: 20px;
            right: 20px;
          }


          .ac-desktop-nav {

            gap: 0;
          }


          .ac-desktop-nav a {

            min-width: 70px;

            padding:
              0 8px;
          }


          .ac-contact-button {

            width: 110px;
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 700px) {

          .ac-navbar {

            top: 10px;

            left: 14px;
            right: 14px;

            height: 58px;

            padding:
              0 8px 0 12px;
          }


          .ac-navbar.is-scrolled {

            top: 8px;
          }


          .ac-desktop-nav,

          .ac-contact-button {

            display: none;
          }


          .ac-menu-button {

            display: flex;
          }


          .ac-brand {

            gap: 8px;
          }


          .ac-brand-box {

            width: 30px;
            height: 30px;
          }


          .ac-brand-text {

            font-size: 8px;
          }


          .ac-mobile-menu {

            padding:
              100px 20px 25px;
          }

        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 400px) {

          .mobile-links a {

            min-height: 72px;
          }


          .mobile-links span {

            font-size: 34px;
          }


          .mobile-menu-bottom {

            font-size: 6px;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .ac-navbar *,
          .ac-navbar *::before,
          .ac-navbar *::after,

          .ac-mobile-menu *,
          .ac-mobile-menu *::before,
          .ac-mobile-menu *::after {

            transition-duration:
              .01ms !important;
          }

        }

      `}</style>
    </>
  );
}