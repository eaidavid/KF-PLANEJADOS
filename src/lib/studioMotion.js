import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Loaded only by the homepage, after hydration. Every tween/listener belongs to this scope.
export function mountStudioMotion(root) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  root.dataset.motionEngine = "gsap";
  media.add(
    {
      full: "(prefers-reduced-motion: no-preference)",
      reduced: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      root.dataset.motionMode = context.conditions.reduced ? "reduced" : "full";
      if (context.conditions.reduced) return;
      const listeners = [];
      const listen = (target, event, callback) => {
        const safe = context.add(null, callback);
        target.addEventListener(event, safe);
        listeners.push(() => target.removeEventListener(event, safe));
      };
      root.querySelectorAll("[data-lettering]").forEach((line) => {
        const letters = line.querySelectorAll(".lettering-glyph");
      const bounds = line.getBoundingClientRect();
      if (bounds.top < innerHeight && bounds.bottom > 0) {
        // Late-loading motion must not hide a line the visitor is already reading.
        gsap.from(letters, { yPercent: 12, duration: 0.45, stagger: 0.008, ease: "power2.out" });
        return;
      }
        gsap.from(letters, {
          yPercent: 112,
          rotation: 3,
          duration: 0.72,
          stagger: 0.018,
          ease: "power3.out",
          scrollTrigger: { trigger: line, start: "top 92%", once: true },
        });
      });
      root.querySelectorAll(".studio-section-label").forEach((label) => {
        gsap.from(label, {
          scaleX: 0.9,
          transformOrigin: "left",
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: label, start: "top 94%", once: true },
        });
      });
      const drawing = root.querySelector(".space-diagram");
      drawing?.querySelectorAll("[data-draw-line]").forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: { trigger: drawing, start: "top 83%", once: true },
          },
        );
      });
      const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
      root.querySelectorAll("[data-motion-hover]").forEach((target) => {
        const icon = target.querySelector("svg:last-child");
        const text = target.querySelector(".env-tab-label");
        const enter = () => {
          if (icon)
            gsap.to(icon, {
              x: 4,
              y: -3,
              duration: 0.24,
              overwrite: true,
              ease: "power2.out",
            });
          if (text)
            gsap.to(text, {
              x: 12,
              duration: 0.3,
              overwrite: true,
              ease: "power2.out",
            });
        };
        const leave = () => {
          if (icon)
            gsap.to(icon, {
              x: 0,
              y: 0,
              duration: 0.28,
              overwrite: true,
              ease: "power2.out",
            });
          if (text)
            gsap.to(text, {
              x: 0,
              duration: 0.3,
              overwrite: true,
              ease: "power2.out",
            });
        };
        if (hover.matches) {
          listen(target, "pointerenter", enter);
          listen(target, "pointerleave", leave);
        }
        listen(target, "focus", enter);
        listen(target, "blur", leave);
      });
      root.querySelectorAll("[data-motion-press]").forEach((target) => {
        listen(target, "pointerdown", () =>
          gsap.to(target, { scale: 0.98, duration: 0.1, overwrite: true }),
        );
        const release = () =>
          gsap.to(target, {
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        listen(target, "pointerup", release);
        listen(target, "pointercancel", release);
        listen(target, "pointerleave", release);
      });
      listen(root, "art:project", () => {
        const panels = root.querySelectorAll("[data-project-mask]");
        gsap.fromTo(
          panels,
          { scaleX: 1 },
          {
            scaleX: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.inOut",
            overwrite: true,
          },
        );
        gsap.fromTo(
          root.querySelector(".atlas-project-title h2"),
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          },
        );
      });
      listen(root, "art:scene", (event) => {
        const scene = event.target;
        const text = scene.querySelector("[data-scene-copy]");
        if (text)
          gsap.fromTo(
            text,
            { x: 18 },
            { x: 0, duration: 0.45, ease: "power2.out", overwrite: true },
          );
        if (event.detail.kind === "environment") {
          const image = scene.querySelector(".environment-photo");
          gsap.fromTo(
            image,
            { scale: 1.04, opacity: 0.4 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.65,
              ease: "power2.out",
              overwrite: true,
            },
          );
        }
        ScrollTrigger.refresh();
      });
      listen(root, "click", (event) => {
        if (event.target.closest(".environment-question > button"))
          requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      return () => listeners.forEach((remove) => remove());
    },
    root,
  );
  return () => {
    media.revert();
    delete root.dataset.motionEngine;
    delete root.dataset.motionMode;
  };
}
