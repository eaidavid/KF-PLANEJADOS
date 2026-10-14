import { useState } from "react";
import { ArrowUpRight, Heart, Check } from "lucide-react";
import { environments, projects } from "../data/catalog";
import ProjectTile from "../components/ProjectTile";
import { Breadcrumb, ContactBand } from "../components/SiteLayout";

export default function Collection({
  environment,
  saved,
  toggle,
  favorites = false,
}) {
  const [filter, setFilter] = useState(environment?.slug ?? "todos");
  const [onlySaved, setOnlySaved] = useState(favorites);
  const list = projects.filter(
    (p) =>
      (filter === "todos" || p.category === filter) &&
      (!onlySaved || saved.includes(p.id)),
  );
  return (
    <>
      <div className="page-intro section-space">
        <Breadcrumb
          items={
            environment
              ? [["Ambientes", "/ambientes"], [environment.name]]
              : [[favorites ? "Referências salvas" : "Ambientes"]]
          }
        />
        <span className="section-kicker">
          {favorites ? "Sua seleção" : "Móveis planejados"}
        </span>
        <h1>
          {favorites ? (
            <>
              Ideias para levar
              <br />
              ao seu projeto.
            </>
          ) : environment ? (
            environment.title
          ) : (
            <>
              Sua casa, ambiente
              <br />
              por ambiente.
            </>
          )}
        </h1>
        <p>
          {favorites
            ? "Reúna o que combina com você. Suas referências acompanham o briefing para a primeira conversa."
            : (environment?.description ??
              "Explore nosso acervo e descubra soluções para cozinhas, quartos, salas e espaços de trabalho.")}
        </p>
      </div>
      <section className="collection-section">
        <div className="collection-toolbar">
          <div className="filters" role="group" aria-label="Filtrar projetos">
            {[{ slug: "todos", name: "Todos" }, ...environments].map((e) => (
              <button
                key={e.slug}
                onClick={() => setFilter(e.slug)}
                aria-pressed={filter === e.slug}
              >
                {e.name}
              </button>
            ))}
          </div>
          {!favorites && (
            <button
              className="favorites-filter"
              onClick={() => setOnlySaved(!onlySaved)}
              aria-pressed={onlySaved}
            >
              <Heart size={17} /> Salvos
            </button>
          )}
        </div>
        <p className="result-count" role="status">
          {list.length} {list.length === 1 ? "referência" : "referências"} no
          acervo
        </p>
        {list.length ? (
          <div className="project-grid">
            {list.map((p) => (
              <ProjectTile
                key={p.id}
                project={p}
                saved={saved}
                toggle={toggle}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Heart size={30} />
            <h2>Seu projeto começa com uma ideia.</h2>
            <p>
              {favorites
                ? "Salve as fotos que chamarem sua atenção usando o coração ao lado de cada projeto."
                : "Ainda não há referências salvas neste ambiente. Explore os projetos e marque suas ideias favoritas."}
            </p>
            <a href="/ambientes" className="button">
              Explorar ambientes <ArrowUpRight size={18} />
            </a>
          </div>
        )}
      </section>
      {environment && (
        <section className="considerations section-space">
          <h2>
            O que vale pensar
            <br />
            antes de começar.
          </h2>
          <ul>
            {environment.considerations.map((t) => (
              <li key={t}>
                <Check size={18} />
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}
      <ContactBand />
    </>
  );
}
