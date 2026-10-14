import { useState } from "react";
import { ArrowUpRight, Heart, Plus, MoveDown } from "lucide-react";
import { environments, projects, faqs } from "../data/catalog";
import { articles } from "../data/articles";
import { whatsappUrl } from "../lib/briefing";
import { Photo } from "../components/Photo";
import ProjectTile from "../components/ProjectTile";
import { ArticleTile } from "./Journal";
import { ContactBand } from "../components/SiteLayout";

export default function Home({ saved, toggle }) {
  const [active, setActive] = useState("cozinhas");
  const selected = environments.find((e) => e.slug === active);
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <div className="hero-intro">
            <span className="tiny-line" />
            Móveis planejados. Vida real.
          </div>
          <h1>
            Feitos para
            <br />o seu jeito
            <br />
            de viver.
          </h1>
          <div className="hero-bottom">
            <p>
              Da primeira ideia ao último detalhe.
              <br />
              Móveis que encontram seu lugar na sua casa.
            </p>
            <a className="button" href="/orcamento">
              Planejar meu ambiente <ArrowUpRight size={18} />
            </a>
            <a className="hero-explore" href="#ambientes">
              Explore as possibilidades <MoveDown size={17} />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <Photo
            name="cozinha-integrada"
            alt="Cozinha do acervo ART com armários planejados, bancada e mesa de refeições"
            className="hero-photo"
            priority
            sizes="(max-width: 760px) 100vw, 62vw"
          />
          <div className="hero-photo-caption">
            <div>
              <span>Cozinha & convivência</span>
              <p>Quando cada escolha faz sentido.</p>
            </div>
            <a
              href="/projetos/cozinha-integrada"
              className="hero-photo-link"
              aria-label="Conhecer a cozinha integrada"
            >
              <ArrowUpRight size={25} />
            </a>
          </div>
          <span className="hero-side">Um espaço. Muitas possibilidades.</span>
        </div>
      </section>
      <div className="promise-line">
        <span>O seu espaço.</span>
        <span>As suas escolhas.</span>
        <span>A nossa marcenaria.</span>
        <a href="/sobre">
          Conheça a ART <ArrowUpRight size={16} />
        </a>
      </div>
      <section className="environment-section section-space" id="ambientes">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Dentro da sua casa</span>
            <h2>
              Cada ambiente,
              <br />
              uma forma de viver.
            </h2>
          </div>
          <p>
            Um projeto começa pelo que acontece nele.
            <br />
            Encontre o espaço que você quer repensar.
          </p>
        </div>
        <div className="environment-explorer">
          <div
            className="environment-index"
            role="tablist"
            aria-label="Explorar por ambiente"
          >
            {environments.map((env, i) => (
              <button
                role="tab"
                id={`tab-${env.slug}`}
                aria-controls="environment-panel"
                aria-selected={active === env.slug}
                tabIndex={active === env.slug ? 0 : -1}
                key={env.slug}
                className={active === env.slug ? "active" : ""}
                onClick={() => setActive(env.slug)}
                onKeyDown={(e) => {
                  const delta =
                    e.key === "ArrowRight" || e.key === "ArrowDown"
                      ? 1
                      : e.key === "ArrowLeft" || e.key === "ArrowUp"
                        ? -1
                        : 0;
                  if (delta || e.key === "Home" || e.key === "End") {
                    e.preventDefault();
                    const next =
                      e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? environments.length - 1
                          : (i + delta + environments.length) %
                            environments.length;
                    setActive(environments[next].slug);
                    document
                      .getElementById(`tab-${environments[next].slug}`)
                      ?.focus();
                  }
                }}
              >
                {env.name}
                <ArrowUpRight size={20} />
              </button>
            ))}
          </div>
          <div
            className="environment-panel"
            role="tabpanel"
            id="environment-panel"
            aria-labelledby={`tab-${active}`}
            tabIndex={0}
          >
            <Photo
              name={selected.image}
              alt={`Móveis planejados: ${selected.name}`}
            />
            <div className="environment-detail">
              <p>{selected.description}</p>
              <a href={`/ambientes/${active}`} className="text-link">
                Conhecer {selected.name.toLowerCase()}{" "}
                <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="curated-projects section-space">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Do nosso acervo</span>
            <h2>
              Ideias que
              <br />
              ganharam forma.
            </h2>
          </div>
          <a href="/ambientes" className="text-link">
            Explore todos os projetos <ArrowUpRight size={20} />
          </a>
        </div>
        <div className="curated-grid">
          <ProjectTile
            project={projects[1]}
            saved={saved}
            toggle={toggle}
            large
          />
          <ProjectTile project={projects[2]} saved={saved} toggle={toggle} />
        </div>
        <p className="save-hint">
          <Heart size={15} /> Gostou de uma ideia? Salve para levar à conversa
          sobre o seu projeto.
        </p>
      </section>
      <section className="story-section">
        <div className="story-photo">
          <Photo
            name="cozinha-aberta"
            alt="Ambiente integrado do acervo ART com mobiliário de madeira"
          />
          <span>Marcenaria que faz parte da casa.</span>
        </div>
        <div className="story-copy">
          <span className="section-kicker">Muito além das medidas</span>
          <h2>
            O desenho começa
            <br />
            por você.
          </h2>
          <p>
            A posição do café. Os livros que ficam à mão. A gaveta que precisa
            caber mais. São os detalhes da sua rotina que dão direção ao
            projeto.
          </p>
          <p>
            Na ART, móveis planejados são uma conversa entre o espaço disponível
            e a vida que vai acontecer ali.
          </p>
          <a className="text-link" href="/sobre">
            Conheça nosso jeito de pensar <ArrowUpRight size={20} />
          </a>
        </div>
      </section>
      <section className="process-section section-space">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Da ideia ao ambiente</span>
            <h2>
              Vamos por partes.
              <br />E por perto.
            </h2>
          </div>
          <p>
            Escolhas claras em cada etapa.
            <br />O seu projeto começa com uma conversa.
          </p>
        </div>
        <div className="process-list">
          {[
            [
              "01",
              "Você conta.",
              "Ambientes, hábitos e referências. Primeiro, entendemos o que você precisa.",
            ],
            [
              "02",
              "A gente planeja.",
              "Medidas, materiais e organização se encontram em uma proposta para o seu espaço.",
            ],
            [
              "03",
              "A ideia ganha forma.",
              "Com o projeto aprovado e os detalhes combinados, seguimos para a execução.",
            ],
          ].map(([n, t, p]) => (
            <div key={n}>
              <span className="process-number">{n}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="journal-section section-space">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Journal ART</span>
            <h2>
              Boas ideias começam
              <br />
              com boas perguntas.
            </h2>
          </div>
          <a className="text-link" href="/blog">
            Leia o journal <ArrowUpRight size={20} />
          </a>
        </div>
        <div className="journal-preview">
          <ArticleTile article={articles[0]} featured />
          <div className="journal-side">
            {articles.slice(1, 3).map((a) => (
              <ArticleTile key={a.slug} article={a} compact />
            ))}
          </div>
        </div>
      </section>
      <section className="faq-section section-space">
        <div>
          <span className="section-kicker">Antes de começar</span>
          <h2>
            Espaço para
            <br />
            suas dúvidas.
          </h2>
          <a
            href={whatsappUrl()}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Converse com a ART <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={19} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
