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
              : [[favorites ? "Suas ideias salvas" : "Ambientes"]]
          }
        />
        <span className="section-kicker">
          {favorites ? "Para o seu projeto" : "Móveis planejados"}
        </span>
        <h1>
          {favorites
            ? "Suas ideias salvas"
            : environment
              ? environment.title
              : "Projetos e ambientes"}
        </h1>
        <p>
          {favorites
            ? "Estas são as fotos que você guardou. Você pode comparar as ideias e levá-las para a conversa sobre o seu móvel."
            : (environment?.description ??
              "Veja os projetos e guarde as ideias que você quer levar para o seu orçamento.")}
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
          {list.length} {list.length === 1 ? "projeto" : "projetos"}
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
            <h2>Suas ideias vão aparecer aqui.</h2>
            <p>
              {favorites
                ? "Use o coração nos projetos que gostar. Assim, você reúne as fotos para olhar de novo e conversar com a gente."
                : "Você ainda não guardou fotos desse ambiente. Use o coração nos projetos que gostar."}
            </p>
            <a href="/ambientes" className="button">
              Ver os projetos <ArrowUpRight size={18} />
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
