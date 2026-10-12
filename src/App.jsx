import { lazy, Suspense, useEffect, useRef, useState } from "react";

import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const WorkGallery = lazy(() => import("./components/WorkGallery"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function DeferredSection({ id, component: Component }) {
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || loaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [loaded]);

  return (
    <div
      ref={sectionRef}
      id={id}
      aria-busy={!loaded}
      style={loaded ? undefined : { minHeight: "100vh" }}
    >
      {loaded ? (
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      ) : null}
    </div>
  );
}

function App() {
  return (
    <>
      <main>
        <Intro />
        <Navbar />
        <Hero />
        <DeferredSection id="about" component={About} />
        <DeferredSection id="services" component={Services} />
        <DeferredSection id="work" component={WorkGallery} />
        <DeferredSection id="experience" component={Experience} />
        <DeferredSection id="contact" component={Contact} />
        <DeferredSection id="footer" component={Footer} />
      </main>

    </>
  );
}

export default App;