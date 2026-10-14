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
          <BookOpen size={17} /> Seleção
        </span>
        <button
          className="icon-button"
          onClick={close}
          aria-label="Fechar seleção"
        >
          <X size={22} />
        </button>
      </div>
      <h2 id="notebook-title">Referências salvas</h2>
      <p className="notebook-intro">
        As fotografias selecionadas acompanham seu pedido de orçamento.
      </p>
      {(scene || personal.priorities.length > 0) && (
        <section className="notebook-notes">
          <h3>Notas salvas</h3>
          {scene ? <p className="notebook-scene">{scene.title}.</p> : null}
          {personal.priorities.length > 0 && (
            <ul>
              {personal.priorities.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
          <a className="text-link" href="/orcamento" onClick={close}>
            Continuar no orçamento <ArrowUpRight size={16} />
          </a>
        </section>
      )}
      <section className="notebook-references">
        <h3>
          Fotografias <span>{references.length}</span>
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
          <p>
            Nenhuma referência salva. Use “Salvar” na fotografia que quiser
            incluir.
          </p>
        )}
      </section>
      <div className="notebook-bottom">
        <a href="/orcamento" className="button">
          Solicitar orçamento <ArrowUpRight size={18} />
        </a>
        <a href="/favoritos" className="text-link">
          <Heart size={16} /> Ver minhas referências
        </a>
        <p>A seleção fica salva neste navegador.</p>
        {(personal.scene || personal.priorities.length > 0) && (
          <button className="text-link notebook-clear" onClick={clear}>
            <Trash2 size={13} /> Limpar escolhas de rotina
          </button>
        )}
      </div>
    </dialog>
  );
}
