import { useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { environments, projects } from "../data/catalog";
import { Photo } from "./Photo";

export default function ReferenceExplorer({ saved, toggle }) {
  const [active, setActive] = useState("cozinhas");
  const [index, setIndex] = useState(0);
  const list = projects.filter((p) => p.category === active);
  const project = list[index % list.length];
  const following = list[(index + 1) % list.length];
  const choose = (slug) => {
    setActive(slug);
    setIndex(0);
  };
  const onKey = (e, i) => {
    const delta = ["ArrowRight", "ArrowDown"].includes(e.key)
      ? 1
      : ["ArrowLeft", "ArrowUp"].includes(e.key)
        ? -1
        : 0;
    if (delta || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const next =
        e.key === "Home"
          ? 0
          : e.key === "End"
            ? environments.length - 1
            : (i + delta + environments.length) % environments.length;
      choose(environments[next].slug);
      document.getElementById(`tab-${environments[next].slug}`)?.focus();
    }
  };
  return (
    <section className="reference-explorer" id="ambientes">
      <div className="reference-heading">
        <p>Do acervo para o seu caderno.</p>
        <h2>
          Olhe. Imagine.
          <br />
          Faça do seu jeito.
        </h2>
        <span>
          O acervo é um ponto de partida.
          <br />
          As suas medidas e escolhas vêm depois.
        </span>
      </div>
      <div
        className="reference-tabs"
        role="tablist"
        aria-label="Explorar por ambiente"
      >
        {environments.map((env, i) => (
          <button
            role="tab"
            key={env.slug}
            id={`tab-${env.slug}`}
            aria-controls="environment-panel"
            aria-selected={active === env.slug}
            tabIndex={active === env.slug ? 0 : -1}
            onClick={() => choose(env.slug)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {env.name}
          </button>
        ))}
      </div>
      <div className="reference-stage">
        <div
          className="reference-main"
          role="tabpanel"
          id="environment-panel"
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
        >
          <div className="reference-photo">
            <Photo
              name={project.image}
              alt={project.title}
              sizes="(max-width: 760px) 100vw, 70vw"
            />
            <button
              className={`save-button ${saved.includes(project.id) ? "is-saved" : ""}`}
              onClick={() => toggle(project.id)}
              aria-pressed={saved.includes(project.id)}
              aria-label={`${saved.includes(project.id) ? "Remover" : "Salvar"} referência: ${project.title}`}
            >
              <Heart
                size={21}
                fill={saved.includes(project.id) ? "currentColor" : "none"}
              />
            </button>
            <span className="reference-counter">
              {String((index % list.length) + 1).padStart(2, "0")} /{" "}
              {String(list.length).padStart(2, "0")}
            </span>
          </div>
          <div className="reference-caption">
            <div>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
            </div>
            <a className="text-link" href={`/ambientes/${active}`}>
              Explore este ambiente <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
        <div className="reference-next">
          <div className="reference-next-photo">
            <Photo
              name={following.image}
              alt={`Outra referência: ${following.title}`}
              sizes="(max-width: 760px) 35vw, 25vw"
            />
          </div>
          <p>
            Uma mesma necessidade.
            <br />
            Outras possibilidades.
          </p>
          <div className="reference-arrows">
            <button
              className="icon-button"
              onClick={() => setIndex((index - 1 + list.length) % list.length)}
              aria-label="Referência anterior"
            >
              <ArrowLeft />
            </button>
            <button
              className="icon-button"
              onClick={() => setIndex((index + 1) % list.length)}
              aria-label="Próxima referência"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <a className="reference-all text-link" href="/ambientes">
        Abrir todo o acervo <ArrowUpRight size={19} />
      </a>
    </section>
  );
}
