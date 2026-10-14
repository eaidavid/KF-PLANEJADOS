import { useEffect, useRef, useState } from "react";
const W = 2000,
  H = 1189;
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export function usePhotoCamera(points) {
  const stage = useRef(null),
    camera = useRef(null),
    drag = useRef(null),
    manual = useRef({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [zoom, setZoom] = useState(false),
    [whole, setWhole] = useState(false),
    [detail, setDetail] = useState(null),
    [pan, setPan] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = stage.current;
    const resize = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const fit = size.w
    ? (whole ? Math.min : Math.max)(size.w / W, size.h / H)
    : 1;
  const scale = fit * (zoom ? 1.85 : 1);
  const point = detail !== null ? points[detail] : null;
  const baseX = point ? -(point.x - 0.5) * W * scale : 0,
    baseY = point ? -(point.y - 0.5) * H * scale : 0;
  const maxX = Math.max(0, (W * scale - size.w) / 2),
    maxY = Math.max(0, (H * scale - size.h) / 2);
  const transform = (offset) =>
    `translate(-50%, -50%) translate(${clamp(baseX + offset.x, -maxX, maxX)}px, ${clamp(baseY + offset.y, -maxY, maxY)}px) scale(${scale})`;
  const visible = (p) => {
    const x =
      size.w / 2 + (p.x - 0.5) * W * scale + clamp(baseX + pan.x, -maxX, maxX);
    const y =
      size.h / 2 + (p.y - 0.5) * H * scale + clamp(baseY + pan.y, -maxY, maxY);
    return x >= 24 && x <= size.w - 24 && y >= 24 && y <= size.h - 24;
  };
  const reset = () => {
    setZoom(false);
    setDetail(null);
    setPan({ x: 0, y: 0 });
    manual.current = { x: 0, y: 0 };
  };
  const focus = (i) => {
    manual.current = { x: 0, y: 0 };
    setPan({ x: 0, y: 0 });
    setWhole(false);
    setZoom(true);
    setDetail(i);
  };
  const toggleZoom = () => {
    if (zoom) reset();
    else {
      setZoom(true);
      setPan({ x: 0, y: 0 });
      manual.current = { x: 0, y: 0 };
    }
  };
  const toggleWhole = () => {
    reset();
    setWhole(!whole);
  };
  const pointerDown = (e) => {
    if (!zoom || e.target.closest("button,a")) return;
    drag.current = { x: e.clientX, y: e.clientY, pan: { ...manual.current } };
    stage.current.setPointerCapture(e.pointerId);
    stage.current.classList.add("is-dragging");
  };
  const pointerMove = (e) => {
    if (!drag.current) return;
    const next = {
      x: drag.current.pan.x + e.clientX - drag.current.x,
      y: drag.current.pan.y + e.clientY - drag.current.y,
    };
    manual.current = {
      x: clamp(baseX + next.x, -maxX, maxX) - baseX,
      y: clamp(baseY + next.y, -maxY, maxY) - baseY,
    };
    camera.current.style.transform = transform(manual.current);
  };
  const pointerUp = (e) => {
    if (!drag.current) return;
    drag.current = null;
    setPan({ ...manual.current });
    stage.current.classList.remove("is-dragging");
    if (stage.current.hasPointerCapture(e.pointerId))
      stage.current.releasePointerCapture(e.pointerId);
  };
  return {
    stage,
    camera,
    zoom,
    whole,
    detail,
    scale,
    imageSize: size.w ? `${Math.ceil(W * scale)}px` : "(max-width: 760px) 1000px, 100vw",
    visible,
    ready: !!size.w,
    reset,
    resetProject: () => { reset(); setWhole(false); },
    focus,
    toggleZoom,
    toggleWhole,
    pointerDown,
    pointerMove,
    pointerUp,
    style: size.w
      ? {
          width: W,
          height: H,
          left: "50%",
          top: "50%",
          transform: transform(pan),
        }
      : {},
    inverseScale: 1 / scale,
  };
}
