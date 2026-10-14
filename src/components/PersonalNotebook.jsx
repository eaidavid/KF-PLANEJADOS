import { useEffect, useRef } from "react";
import { ArrowUpRight, X, Heart, BookOpen, Trash2 } from "lucide-react";
import { projects } from "../data/catalog";
import { scenes } from "../data/lifestyle";
import { Photo } from "./Photo";

export default function PersonalNotebook({
  open,
  close,
  personal,
  saved,
  toggle,
  clear,
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const element = ref.current;
    const trigger = document.activeElement;
    const previous = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (element.open) element.close();
      document.body.style.overflow = previous;
      trigger?.focus?.();
    };
  }, [open]);
  const scene = scenes.find((s) => s.id === personal.scene);
  const references = projects.filter((p) => saved.includes(p.id));
  return (
    <dialog
      className="personal-notebook"
      ref={ref}
      aria-labelledby="notebook-title"
      onClose={close}
      onCancel={close}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        if (
          e.target === e.currentTarget &&
          (e.clientX < rect.left || e.clientX > rect.right)
        )
          close();
      }}
    >
      <div className="notebook-header">
        <span>
          <BookOpen size={17} /> Uma casa só sua
        </span>
        <button
          className="icon-button"
          onClick={close}
          aria-label="Fechar meu caderno"
        >
          <X size={22} />
        </button>
      </div>
      <h2 id="notebook-title">
        Seu caderno
        <br />
        de possibilidades.
      </h2>
      <p className="notebook-intro">
        Guarde o que faz sentido para você. Rotina, prioridades e referências
        ficam juntas para a conversa com a ART.
      </p>
      <section className="notebook-notes">
        <h3>O seu jeito</h3>
        {scene ? (
          <p className="notebook-scene">{scene.title}.</p>
        ) : (
          <p>Escolha uma cena da sua rotina na página inicial.</p>
        )}
        {personal.priorities.length > 0 && (
          <ul>
            {personal.priorities.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
        <a className="text-link" href="/#essencia" onClick={close}>
          Escolher o que importa <ArrowUpRight size={16} />
        </a>
      </section>
      <section className="notebook-references">
        <h3>
          As suas referências <span>{references.length}</span>
        </h3>
        {references.length ? (
          <div>
            {references.map((p) => (
              <article key={p.id}>
                <a href={`/projetos/${p.id}`}>
                  <Photo name={p.image} alt={p.title} sizes="150px" />
                </a>
                <div>
                  <a href={`/projetos/${p.id}`}>{p.title}</a>
                  <button
                    onClick={() => toggle(p.id)}
                    className="text-link"
                    aria-label={`Remover referência: ${p.title}`}
                  >
                    <X size={12} /> Remover
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>Toque no coração de um ambiente para guardar a ideia aqui.</p>
        )}
      </section>
      <div className="notebook-bottom">
        <a href="/orcamento" className="button">
          Continuar com meu projeto <ArrowUpRight size={18} />
        </a>
        <a href="/favoritos" className="text-link">
          <Heart size={16} /> Ver minhas referências
        </a>
        <p>
          Suas escolhas acompanham o briefing. Salvas apenas neste navegador.
        </p>
        {(personal.scene || personal.priorities.length > 0) && (
          <button className="text-link notebook-clear" onClick={clear}>
            <Trash2 size={13} /> Limpar escolhas de rotina
          </button>
        )}
      </div>
    </dialog>
  );
}
