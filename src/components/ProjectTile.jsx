import { ArrowUpRight, Heart } from "lucide-react";
import { environments } from "../data/catalog";
import { Photo } from "./Photo";

export default function ProjectTile({ project, saved, toggle, large = false }) {
  return (
    <article className={`project-tile ${large ? "tile-large" : ""}`}>
      <div className="project-image">
        <a href={`/projetos/${project.id}`}>
          <Photo
            name={project.image}
            alt={project.title}
            sizes={
              large
                ? "(max-width: 640px) 100vw, 65vw"
                : "(max-width: 640px) 100vw, 40vw"
            }
          />
        </a>
        <button
          type="button"
          className={`save-button ${saved.includes(project.id) ? "is-saved" : ""}`}
          onClick={() => toggle(project.id)}
          aria-pressed={saved.includes(project.id)}
          aria-label={`${saved.includes(project.id) ? "Remover" : "Salvar"} foto: ${project.title}`}
        >
          <Heart
            size={19}
            fill={saved.includes(project.id) ? "currentColor" : "none"}
          />
        </button>
        <span className="photo-category">
          {environments.find((e) => e.slug === project.category)?.singular}
        </span>
      </div>
      <a className="project-caption" href={`/projetos/${project.id}`}>
        <div>
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
        </div>
        <ArrowUpRight size={22} />
      </a>
    </article>
  );
}
