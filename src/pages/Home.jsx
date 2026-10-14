import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ProjectExplorer from "../components/ProjectExplorer";
import StudioJourney from "../components/StudioJourney";
import { Footer } from "../components/SiteLayout";
import "../studio.css";

export default function Home({ saved, toggle, openNotebook }) {
  const root = useRef(null);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    let started = false;
    let idle;
    const start = () =>
      import("../lib/studioMotion.js")
        .then(({ mountStudioMotion }) => {
          if (!disposed && root.current)
            cleanup = mountStudioMotion(root.current);
        })
        .catch(() => {
          /* The fully rendered page remains usable without motion. */
        });
    const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"];
    const detach = () => events.forEach(event => window.removeEventListener(event, warm));
    const warm = () => {
      if (started) return;
      started = true;
      detach();
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(start, { timeout: 180 })
        : setTimeout(start, 0);
    };
    events.forEach(event => window.addEventListener(event, warm, { passive: true, once: true }));
    if (window.location.hash && window.location.hash !== "#acervo") warm();
    return () => {
      disposed = true;
      detach();
      if (idle !== undefined) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
        else clearTimeout(idle);
      }
      cleanup();
    };
  }, []);
  return (
    <div className="studio-home" ref={root}>
      <ProjectExplorer
        saved={saved}
        toggle={toggle}
        openNotebook={openNotebook}
      />
      <nav className="studio-wayfinder" aria-label="Nesta página">
        <a href="#ambientes" data-motion-hover>
          <ArrowDown size={14} />
          <span>Ambientes</span>
        </a>
        <a href="#preparar" data-motion-hover>
          Para orçar
        </a>
        <a href="#guias" data-motion-hover>
          Guias
        </a>
        <a href="#acervo" className="wayfinder-return" data-motion-hover>
          Acervo <ArrowUpRight size={14} />
        </a>
      </nav>
      <StudioJourney saved={saved} openNotebook={openNotebook} />
      <Footer />
    </div>
  );
}
