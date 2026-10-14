import { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, Check } from "lucide-react";
import { environments, projects } from "../data/catalog";
import { Photo } from "./Photo";

export default function AtlasIndex({ open, close, active, select }) {
  const ref = useRef(null);
  const [filter, setFilter] = useState("todos");
  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    const trigger = document.activeElement;
    const overflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (el.open) el.close();
      document.body.style.overflow = overflow;
      trigger?.focus?.();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="atlas-index"
      aria-labelledby="atlas-index-title"
      onCancel={close}
      onClose={close}
    >
      <div className="atlas-index-heading">
        <h2 id="atlas-index-title">Acervo</h2>
        <button
          onClick={close}
          aria-label="Fechar índice"
          className="atlas-icon"
        >
          <X />
        </button>
      </div>
      <div className="atlas-filters" role="group" aria-label="Filtrar acervo">
        {[{ slug: "todos", name: "Todos" }, ...environments].map((env) => (
          <button
            key={env.slug}
            aria-pressed={filter === env.slug}
            onClick={() => setFilter(env.slug)}
          >
            {env.name}
          </button>
        ))}
      </div>
      <div className="atlas-index-list">
        {projects
          .filter((p) => filter === "todos" || p.category === filter)
          .map((p) => (
            <button
              key={p.id}
              className={p.id === active ? "active" : ""}
              onClick={() => {
                select(p.id);
                close();
              }}
              aria-label={`Abrir ${p.title} ${environments.find(e => e.slug === p.category)?.name}`}
            >
              <Photo name={p.image} alt="" sizes="110px" />
              <span>
                {p.title}{" "}
                <small>
                  {environments.find((e) => e.slug === p.category)?.name}
                </small>
              </span>
              {p.id === active ? (
                <Check size={17} />
              ) : (
                <ArrowUpRight size={17} />
              )}
            </button>
          ))}
      </div>
      <div className="atlas-index-links">
        <a href="/ambientes">
          Ver acervo em lista <ArrowUpRight size={16} />
        </a>
        <a href="/blog">
          Guias <ArrowUpRight size={16} />
        </a>
        <a href="/sobre">
          A ART <ArrowUpRight size={16} />
        </a>
        <a href="/privacidade">
          Privacidade <ArrowUpRight size={16} />
        </a>
      </div>
    </dialog>
  );
}
