import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Bookmark, Plus, Minus } from "lucide-react";
import { environments, projects } from "../data/catalog";
import { articles } from "../data/articles";
import { Photo } from "./Photo";
import Lettering from "./Lettering";

const prepSteps = [
  {
    name: "Seu espaço",
    title: "Mostre o cômodo inteiro",
    text: "Uma foto de frente e outra dos cantos ajudam a mostrar onde o móvel vai ficar. Inclua portas, janelas e a passagem de quem usa o ambiente.",
    items: [
      "Casa, apartamento ou espaço comercial",
      "Cômodos que você quer planejar",
      "Fotos da parede inteira e dos cantos",
    ],
  },
  {
    name: "As medidas",
    title: "Meça o espaço que você tem",
    text: "Anote a largura e a altura da parede, além da posição das tomadas e dos canos. Se houver eletrodomésticos, tenha o modelo em mãos. A equipe precisa confirmar as medidas antes da fabricação.",
    items: [
      "Largura e altura disponíveis",
      "Posição de água, gás e tomadas",
      "Eletrodomésticos que precisam caber",
    ],
  },
  {
    name: "Suas ideias",
    title: "Mostre o que você gostou",
    text: "Salve as fotos que chamarem sua atenção. Depois, conte o que você gostou nelas e o que precisa guardar no móvel.",
    items: [
      "Fotos que você salvou",
      "O que vai guardar ou apoiar no móvel",
      "Preferências de portas, gavetas e acabamentos",
    ],
  },
];

function useScene(ref, active, kind) {
  useEffect(() => {
    ref.current?.dispatchEvent(
      new CustomEvent("art:scene", { bubbles: true, detail: { kind } }),
    );
  }, [ref, active, kind]);
}

function focusTab(event, items, index, set) {
  let next = index;
  if (["ArrowRight", "ArrowDown"].includes(event.key))
    next = (index + 1) % items.length;
  else if (["ArrowLeft", "ArrowUp"].includes(event.key))
    next = (index - 1 + items.length) % items.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = items.length - 1;
  else return;
  event.preventDefault();
  set(next);
  items[next]?.focus();
}

function EnvironmentStudio({ active, setActive }) {
  const root = useRef(null);
  const env = environments[active];
  useScene(root, active, "environment");
  return (
    <section className="environment-studio" id="ambientes" ref={root}>
      <div className="studio-section-label">
        <span>01 / AMBIENTES</span>
        <a href="/ambientes" data-motion-hover>
          Ver todos os projetos <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="environment-heading">
        <h2>
          <Lettering text="Qual ambiente" />
          <Lettering text="vamos planejar?" />
        </h2>
        <p>
          Escolha um cômodo para ver ideias de móveis. Depois, conte o que você
          quer guardar ou mudar nesse espaço.
        </p>
      </div>
      <div className="environment-composition">
        <div
          className="environment-tabs"
          role="tablist"
          aria-label="Ambientes de móveis planejados"
          aria-orientation="vertical"
        >
          {environments.map((e, i) => (
            <button
              key={e.slug}
              id={`studio-env-${e.slug}`}
              type="button"
              role="tab"
              aria-controls="studio-environment-panel"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              data-motion-hover
              data-motion-press
              onClick={() => setActive(i)}
              onKeyDown={(event) =>
                focusTab(
                  event,
                  [...root.current.querySelectorAll('[role="tab"]')],
                  i,
                  setActive,
                )
              }
            >
              <span className="env-ordinal" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="env-tab-label">
                {e.slug === "escritorios"
                  ? "Escritórios"
                  : e.slug === "quartos"
                    ? "Quartos"
                    : e.slug === "salas"
                      ? "Salas"
                      : e.name}
              </span>
              <ArrowUpRight size={32} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          className="environment-visual"
          id="studio-environment-panel"
          role="tabpanel"
          aria-labelledby={`studio-env-${env.slug}`}
          tabIndex={0}
        >
          <div className="environment-photo-frame">
            <Photo
              name={env.image}
              alt={env.title}
              sizes="(max-width: 760px) 100vw, 52vw"
              className="environment-photo"
            />
            <span className="environment-image-mark" aria-hidden="true">
              ART / {String(active + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="environment-description" data-scene-copy>
            <p>{env.description}</p>
            <a href={`/ambientes/${env.slug}`} data-motion-hover>
              Projetos de {env.name.toLowerCase()} <ArrowUpRight size={17} />
            </a>
            <a
              href={`/orcamento?ambiente=${env.slug}`}
              className="studio-inline-action"
              data-motion-hover
            >
              Quero um orçamento <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpaceDiagram({ step }) {
  return (
    <div className={`space-diagram step-${step}`}>
      <span className="diagram-caption">
        Olhe também para portas, janelas e tomadas
      </span>
      <svg
        viewBox="0 0 620 460"
        role="img"
        aria-labelledby="space-diagram-title"
      >
        <title id="space-diagram-title">
          Esquema de uma parede com porta, janela, tomada e indicações de
          largura e altura. Sem escala.
        </title>
        <g
          className="diagram-wall"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path data-draw-line d="M82 330V95H524V330" />
          <path d="M82 330H160M224 330H524" />
          <path d="M160 330V181H224V330M288 148H427V241H288ZM357 148V241M288 195H427" />
          <path d="M452 305v-20h18v20zM457 292v5M464 292v5" />
          <path d="M96 320H152M236 320H510" />
        </g>
        <g
          className="diagram-dimensions"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            data-draw-line
            d="M83 366H524M83 358V374M524 358V374M50 95V330M42 95H58M42 330H58"
          />
          <path
            d="M82 345V377M524 345V377M34 95H69M34 330H69"
            strokeDasharray="3 4"
          />
        </g>
        <g
          className="diagram-fixed"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            data-draw-line
            d="M461 285V264H502M289 195H257V151M225 286H250"
          />
          <circle cx="461" cy="295" r="18" />
          <circle cx="225" cy="286" r="6" />
        </g>
        <g className="diagram-text" fill="currentColor">
          <text x="278" y="394">
            largura
          </text>
          <text x="27" y="240" transform="rotate(-90 27 240)">
            altura
          </text>
          <text x="152" y="165">
            porta
          </text>
          <text x="324" y="136">
            janela
          </text>
          <text x="488" y="254">
            tomada
          </text>
        </g>
      </svg>
      <p className="diagram-footnote">Desenho orientativo · sem escala</p>
      <div className="diagram-key">
        <i aria-hidden="true" />
        <span>
          {step === 0
            ? "Mostre onde o móvel vai ficar."
            : step === 1
              ? "Confira as medidas e a posição das tomadas."
              : "Liste o que precisa caber no móvel."}
        </span>
      </div>
    </div>
  );
}

function PreparationStudio({ environment, saved, openNotebook }) {
  const root = useRef(null);
  const [step, setStep] = useState(0);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  useScene(root, step, "preparation");
  const current = prepSteps[step];
  const selected = projects.filter((p) => saved.includes(p.id));
  return (
    <section className="preparation-studio" id="preparar" ref={root}>
      <div className="studio-section-label">
        <span>02 / SEU ESPAÇO</span>
        <span>{environment.name}</span>
      </div>
      <div className="preparation-heading">
        <h2>
          <Lettering text="O que levar" />
          <Lettering text="para o orçamento." />
        </h2>
        <p>
          Traga o que você já sabe sobre o espaço. As medidas podem ser
          aproximadas nesta primeira conversa.
        </p>
      </div>
      <div className="preparation-composition">
        <SpaceDiagram step={step} />
        <div className="preparation-content">
          <div
            className="preparation-tabs"
            role="tablist"
            aria-label="Roteiro para preparar o orçamento"
          >
            {prepSteps.map((s, i) => (
              <button
                key={s.name}
                role="tab"
                id={`prep-tab-${i}`}
                aria-selected={step === i}
                aria-controls="prep-panel"
                tabIndex={step === i ? 0 : -1}
                onClick={() => setStep(i)}
                data-motion-hover
                data-motion-press
                onKeyDown={(event) =>
                  focusTab(
                    event,
                    [...root.current.querySelectorAll('[role="tab"]')],
                    i,
                    setStep,
                  )
                }
              >
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                {s.name}
              </button>
            ))}
          </div>
          <div
            className="preparation-panel"
            id="prep-panel"
            role="tabpanel"
            aria-labelledby={`prep-tab-${step}`}
            tabIndex={0}
            data-scene-copy
          >
            <h3>{current.title}</h3>
            <p>{current.text}</p>
            <ul>
              {current.items.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">/</span>
                  {item}
                </li>
              ))}
            </ul>
            {step === 2 && (
              <div className="preparation-selection">
                {selected.length > 0 ? (
                  <div className="selection-strip">
                    {selected.slice(0, 3).map((p) => (
                      <Photo
                        name={p.image}
                        alt={p.title}
                        sizes="90px"
                        key={p.id}
                      />
                    ))}
                  </div>
                ) : null}
                <button onClick={openNotebook} data-motion-hover>
                  <Bookmark size={16} />
                  {selected.length
                    ? `Ver suas ideias (${selected.length})`
                    : "Ver suas ideias salvas"}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </div>
          <a
            className="studio-order-link"
            href={`/orcamento?ambiente=${environment.slug}`}
            data-motion-hover
            data-motion-press
          >
            <span>Pedir orçamento para {environment.name.toLowerCase()}</span>
            <ArrowUpRight size={25} />
          </a>
        </div>
      </div>
      <div className="environment-question">
        <button
          onClick={() => setQuestionsOpen(!questionsOpen)}
          aria-expanded={questionsOpen}
          aria-controls="environment-questions"
          data-motion-hover
        >
          <span>O que pensar para {environment.name.toLowerCase()}</span>
          {questionsOpen ? <Minus size={20} /> : <Plus size={20} />}
        </button>
        {questionsOpen && (
          <ul id="environment-questions">
            {environment.considerations.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function GuideStudio() {
  return (
    <section className="guide-studio" id="guias">
      <div className="studio-section-label">
        <span>03 / LEITURA</span>
        <a href="/blog" data-motion-hover>
          Todos os guias <ArrowUpRight size={16} />
        </a>
      </div>
      <h2>
        <Lettering text="O que conferir" />
        <Lettering text="antes de escolher." />
      </h2>
      <div className="guide-composition">
        <a
          className="guide-feature"
          href={`/blog/${articles[0].slug}`}
          data-motion-hover
        >
          <div className="guide-feature-image">
            <Photo
              name={articles[0].image}
              alt="Cozinha com armários planejados"
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </div>
          <span className="guide-feature-meta">COZINHA</span>
          <h3>{articles[0].title}</h3>
          <span className="studio-inline-action">
            Ler o guia <ArrowUpRight size={18} />
          </span>
        </a>
        <div className="guide-index">
          {articles.slice(1).map((a, i) => (
            <a href={`/blog/${a.slug}`} key={a.slug} data-motion-hover>
              <span className="guide-index-number" aria-hidden="true">
                {String(i + 2).padStart(2, "0")}
              </span>
              <h3>{a.title}</h3>
              <ArrowUpRight size={23} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StudioJourney({ saved, openNotebook }) {
  const [active, setActive] = useState(0);
  return (
    <>
      <EnvironmentStudio active={active} setActive={setActive} />
      <PreparationStudio
        environment={environments[active]}
        saved={saved}
        openNotebook={openNotebook}
      />
      <GuideStudio />
      <section className="studio-final">
        <span>04 / VAMOS CONVERSAR</span>
        <a
          href={`/orcamento?ambiente=${environments[active].slug}`}
          data-motion-hover
          data-motion-press
        >
          <h2>
            <Lettering text="Pedir um" />
            <Lettering text="orçamento." />
          </h2>
          <ArrowUpRight size={120} />
        </a>
        <p>
          Conte pra gente qual móvel você precisa e o que imagina para ele. Suas
          ideias salvas vão junto no resumo para o WhatsApp.
        </p>
      </section>
    </>
  );
}
