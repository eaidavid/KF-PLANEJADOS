import { ArrowUpRight, Heart } from "lucide-react";
import { environments, projects } from "../data/catalog";
import { Photo } from "../components/Photo";
import ProjectTile from "../components/ProjectTile";
import { Breadcrumb } from "../components/SiteLayout";

export default function Project({ project, saved, toggle }) {
  const env = environments.find((e) => e.slug === project.category);
  return (
    <>
      <div className="project-page-intro">
        <Breadcrumb
          items={[[env.name, `/ambientes/${env.slug}`], [project.title]]}
        />
        <span className="section-kicker">{env.name} / acervo ART</span>
        <h1>{project.title}</h1>
        <p>{project.subtitle}</p>
      </div>
      <div className="project-full-photo">
        <Photo
          name={project.image}
          alt={project.title}
          priority
          sizes="100vw"
        />
        <button
          className={`save-button ${saved.includes(project.id) ? "is-saved" : ""}`}
          onClick={() => toggle(project.id)}
          aria-pressed={saved.includes(project.id)}
          aria-label={`${saved.includes(project.id) ? "Remover" : "Salvar"} referência: ${project.title}`}
        >
          <Heart fill={saved.includes(project.id) ? "currentColor" : "none"} />
        </button>
      </div>
      <section className="project-story section-space">
        <h2>Sobre a fotografia</h2>
        <div>
          <p>{project.description}</p>
          <p>
            Para usar esta referência no seu projeto, informe as medidas do
            imóvel no pedido de orçamento.
          </p>
          <a
            href={`/orcamento?ambiente=${project.category}`}
            className="button"
          >
            Solicitar orçamento <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section className="section-space related-section">
        <div className="section-heading">
          <h2>Outras fotografias</h2>
          <a href={`/ambientes/${project.category}`} className="text-link">
            Explore o ambiente <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="project-grid">
          {projects
            .filter(
              (p) => p.category === project.category && p.id !== project.id,
            )
            .slice(0, 2)
            .map((p) => (
              <ProjectTile
                key={p.id}
                project={p}
                saved={saved}
                toggle={toggle}
              />
            ))}
        </div>
      </section>
    </>
  );
}
