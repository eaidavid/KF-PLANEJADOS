import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Maximize,
  Minimize,
  Menu,
  Plus,
  Minus,
  X,
  Scan,
  List,
  Bookmark,
} from "lucide-react";
import { environments, projects } from "../data/catalog";
import { photoDetails } from "../data/atlas";
import { usePhotoCamera } from "../lib/usePhotoCamera";
import { Photo } from "./Photo";
import { Logo } from "./SiteLayout";
import AtlasIndex from "./AtlasIndex";

export default function ProjectExplorer({ saved, toggle, openNotebook }) {
  const [current, setCurrent] = useState(0),
    [indexOpen, setIndexOpen] = useState(false),
    [detailsOpen, setDetailsOpen] = useState(false),
    [fullscreen, setFullscreen] = useState(false),
    [supportsFullscreen, setSupportsFullscreen] = useState(false),
    [loading, setLoading] = useState(false),
    [failed, setFailed] = useState(false),
    [retry, setRetry] = useState(0),
    [status, setStatus] = useState("");
  const project = projects[current],
    env = environments.find((e) => e.slug === project.category),
    points = photoDetails[project.id] || [];
  const { stage, camera, ...view } = usePhotoCamera(points);
  const selected = saved.includes(project.id);
  const previous = useRef(project.id);
  useEffect(() => {
    if (previous.current !== project.id) {
      stage.current?.dispatchEvent(
        new CustomEvent("art:project", { bubbles: true }),
      );
      previous.current = project.id;
    }
  }, [project.id, stage]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = projects.findIndex((p) => p.id === params.get("projeto"));
    // The pre-rendered page has no query string; restore it after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial >= 0) setCurrent(initial);
    setSupportsFullscreen(!!document.documentElement.requestFullscreen);
    const onFullscreen = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);
  useEffect(() => {
    if (!status) return;
    const id = setTimeout(() => setStatus(""), 4000);
    return () => clearTimeout(id);
  }, [status]);
  const select = (id) => {
    const i = projects.findIndex((p) => p.id === id);
    if (i < 0 || i === current) return;
    setLoading(true);
    setFailed(false);
    setCurrent(i);
    setDetailsOpen(false);
    view.resetProject();
    const url = new URL(window.location.href);
    url.searchParams.set("projeto", id);
    history.replaceState(null, "", url);
  };
  const next = (direction) =>
    select(
      projects[(current + direction + projects.length) % projects.length].id,
    );
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setStatus("Não foi possível ativar a tela cheia neste navegador.");
    }
  };
  const focus = (i) => {
    view.focus(i);
    setDetailsOpen(false);
  };
  const keys = (e) => {
    if (e.target.closest("dialog,input,textarea,select")) return;
    if (e.key === "Escape") {
      view.reset();
      setDetailsOpen(false);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      next(-1);
    }
  };
  return (
    <div className="atlas-home" id="acervo" onKeyDown={keys}>
      <header className="atlas-header">
        <Logo light />
        <h1>Projetos de móveis planejados</h1>
        <div>
          <button
            className="atlas-selection"
            onClick={openNotebook}
            aria-label={`Suas ideias ${saved.length}`}
          >
            <Bookmark size={16} />
            <span>Suas ideias</span> <b>{saved.length}</b>
          </button>
          <a
            href="/orcamento"
            className="atlas-quote"
            data-motion-hover
            aria-label="Solicitar orçamento"
          >
            <span>Orçamento</span>
            <ArrowUpRight size={16} />
          </a>
          <button
            className="atlas-icon"
            aria-label="Abrir índice"
            onClick={() => setIndexOpen(true)}
          >
            <Menu size={21} />
          </button>
        </div>
      </header>
      <section
        className={`atlas-stage ${view.zoom ? "is-zoomed" : ""}`}
        ref={stage}
        aria-label={`Fotografia: ${project.title}`}
        tabIndex={0}
        onPointerDown={view.pointerDown}
        onPointerMove={view.pointerMove}
        onPointerUp={view.pointerUp}
        onPointerCancel={view.pointerUp}
        onDoubleClick={(e) => {
          if (e.target.tagName === "IMG") view.toggleZoom();
        }}
      >
        <div
          className={`atlas-camera ${view.ready ? "is-ready" : ""}`}
          ref={camera}
          style={view.style}
          data-zoom={view.zoom ? "detail" : "overview"}
        >
          <Photo
            key={`${project.id}-${retry}`}
            name={project.image}
            alt={project.title}
            priority
            sizes={view.imageSize}
            className="atlas-photo"
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setFailed(true);
            }}
          />
          {view.ready &&
            !failed &&
            points.map(
              (point, i) =>
                view.visible(point) && (
                  <button
                    key={`${project.id}-${point.label}`}
                    className={`atlas-point ${view.detail === i ? "active" : ""}`}
                    style={{
                      left: `${point.x * 100}%`,
                      top: `${point.y * 100}%`,
                      transform: `translate(-50%,-50%) scale(${view.inverseScale})`,
                    }}
                    onClick={() => focus(i)}
                    aria-label={`${String(i + 1).padStart(2, "0")} — Ampliar detalhe: ${point.label}`}
                    title={point.label}
                    aria-pressed={view.detail === i}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </button>
                ),
            )}
        </div>
        <div className="atlas-scene-label">
          <span>{env.name}</span>
          <span>
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <div className="atlas-transition" aria-hidden="true">
          <span data-project-mask />
          <span data-project-mask />
        </div>
        <div className="atlas-tools">
          <button
            className="atlas-tool"
            onClick={view.toggleZoom}
            aria-pressed={view.zoom}
            aria-label={view.zoom ? "Reduzir" : "Ampliar"}
          >
            {view.zoom ? <Minus size={18} /> : <Plus size={18} />}
            <span>{view.zoom ? "Reduzir" : "Ampliar"}</span>
          </button>
          <button
            className="atlas-tool"
            onClick={view.toggleWhole}
            aria-pressed={view.whole}
            aria-label="Foto inteira"
          >
            <Scan size={18} />
            <span>Foto inteira</span>
          </button>
          {supportsFullscreen && (
            <button
              className="atlas-tool"
              onClick={toggleFullscreen}
              aria-pressed={fullscreen}
              aria-label={fullscreen ? "Sair da tela cheia" : "Tela cheia"}
            >
              {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          )}
        </div>
        {loading && (
          <p className="atlas-loading" role="status">
            Carregando fotografia…
          </p>
        )}
        {failed && (
          <div className="atlas-error" role="alert">
            <p>Não foi possível carregar a fotografia.</p>
            <button
              onClick={() => {
                setLoading(true);
                setFailed(false);
                setRetry(retry + 1);
              }}
            >
              Tentar novamente
            </button>
          </div>
        )}
        {view.detail !== null && !failed && (
          <aside
            className={`atlas-detail-note ${points[view.detail].y >= 0.65 ? "is-bottom-detail" : ""}`}
          >
            <div>
              <span>Detalhe {String(view.detail + 1).padStart(2, "0")}</span>
              <button
                className="atlas-icon"
                aria-label="Fechar detalhe"
                onClick={view.reset}
              >
                <X size={18} />
              </button>
            </div>
            <h3>{points[view.detail].label}</h3>
            <p>{points[view.detail].text}</p>
            <span className="atlas-drag-hint">
              Arraste a foto para olhar outros trechos.
            </span>
          </aside>
        )}
        {detailsOpen && (
          <aside
            className="atlas-detail-list"
            aria-label="Detalhes da fotografia"
          >
            <div>
              <span>Escolha um detalhe</span>
              <button
                className="atlas-icon"
                aria-label="Fechar lista de detalhes"
                onClick={() => setDetailsOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            {points.map((point, i) => (
              <button key={point.label} onClick={() => focus(i)}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {point.label}
                <Plus size={15} />
              </button>
            ))}
          </aside>
        )}
      </section>
      <div className="atlas-caption">
        <div className="atlas-project-title">
          <span>ART Móveis Interiores</span>
          <h2 aria-live="polite">{project.title}</h2>
          <a href={`/projetos/${project.id}`}>
            Informações do projeto <ArrowUpRight size={13} />
          </a>
        </div>
        <div className="atlas-project-actions">
          <button
            className="atlas-detail-toggle"
            data-motion-hover
            data-motion-press
            onClick={() => {
              setDetailsOpen(!detailsOpen);
              view.reset();
            }}
            aria-expanded={detailsOpen}
          >
            <List size={17} /> Detalhes
          </button>
          <button
            className={`atlas-save ${selected ? "selected" : ""}`}
            data-motion-hover
            data-motion-press
            onClick={() => toggle(project.id)}
            aria-pressed={selected}
            aria-label={`${selected ? "Remover" : "Salvar"} foto: ${project.title}`}
          >
            <Heart size={17} fill={selected ? "currentColor" : "none"} />
            <span>{selected ? "Salvo" : "Salvar"}</span>
          </button>
        </div>
        <div className="atlas-navigation">
          <button
            onClick={() => next(-1)}
            aria-label="Projeto anterior"
            className="atlas-icon"
          >
            <ArrowLeft />
          </button>
          <button
            className="atlas-next"
            data-motion-hover
            data-motion-press
            onClick={() => next(1)}
            aria-label="Próximo projeto"
          >
            <span>Próximo projeto</span>
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
      <AtlasIndex
        open={indexOpen}
        close={() => setIndexOpen(false)}
        active={project.id}
        select={select}
      />
      {status && (
        <p className="atlas-status" role="status">
          {status}
        </p>
      )}
      <noscript>
        <div className="atlas-noscript">
          Para ver outras fotos, abra <a href="/ambientes">todos os projetos</a>
          .
        </div>
      </noscript>
    </div>
  );
}
