import { ArrowUpRight, ArrowDown, Check, Plus, BookOpen } from "lucide-react";
import { scenes, priorities } from "../data/lifestyle";
import { faqs } from "../data/catalog";
import { articles } from "../data/articles";
import { Photo } from "../components/Photo";
import ReferenceExplorer from "../components/ReferenceExplorer";

export default function Home({
  saved,
  toggle,
  personal,
  changePersonal,
  openNotebook,
}) {
  const scene = scenes.find((s) => s.id === personal.scene) || scenes[0];
  const togglePriority = (p) =>
    changePersonal({
      ...personal,
      priorities: personal.priorities.includes(p)
        ? personal.priorities.filter((x) => x !== p)
        : [...personal.priorities, p],
    });
  return (
    <div className="home-personal">
      <section className="life-hero">
        <Photo
          name={scene.image}
          alt={scene.caption}
          className="life-hero-photo"
          priority
          sizes="100vw"
        />
        <div className="life-hero-shade" aria-hidden="true" />
        <div className="life-hero-copy">
          <p>Móveis planejados. O ponto de partida é você.</p>
          <h1>
            Ninguém
            <br />
            mora como
            <br />
            você.
          </h1>
          <div className="life-hero-invite">
            <span>
              O que faz um espaço ser seu?
              <br />
              Vamos descobrir juntos.
            </span>
            <a href="#essencia" className="life-start">
              Começar pelas minhas escolhas <ArrowDown size={19} />
            </a>
          </div>
        </div>
        <div className="life-scene-caption">
          <span>{scene.caption}</span>
          <a
            href={`/ambientes/${scene.environment}`}
            aria-label={`Explorar ${scene.title.toLowerCase()}`}
          >
            <ArrowUpRight size={22} />
          </a>
        </div>
        <div
          className="life-scenes"
          role="group"
          aria-label="O que casa significa para você?"
        >
          {scenes.map((s) => (
            <button
              key={s.id}
              className={personal.scene === s.id ? "selected" : ""}
              aria-pressed={personal.scene === s.id}
              onClick={() => changePersonal({ ...personal, scene: s.id })}
            >
              {s.title}
              <span>
                {personal.scene === s.id ? (
                  <Check size={16} />
                ) : (
                  <Plus size={16} />
                )}
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="personal-essence" id="essencia">
        <div className="essence-question">
          <span>Antes da madeira, a vida.</span>
          <h2>
            Sua rotina
            <br />
            também
            <br />
            tem medidas.
          </h2>
          <p>
            Como você guarda as coisas. Quem você recebe. O lugar em que as
            ideias aparecem. Um móvel sob medida precisa começar daí.
          </p>
        </div>
        <div className="essence-composition">
          <p className="essence-prompt">No meu espaço, eu quero…</p>
          <div
            className="priority-options"
            role="group"
            aria-label="O que importa no seu espaço"
          >
            {priorities.map((p) => (
              <button
                key={p}
                aria-pressed={personal.priorities.includes(p)}
                onClick={() => togglePriority(p)}
              >
                {p}
                <span>
                  {personal.priorities.includes(p) ? (
                    <Check size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="essence-note">
            <BookOpen size={19} />
            <p>
              {personal.priorities.length
                ? `${personal.priorities.length} escolha${personal.priorities.length === 1 ? "" : "s"} no seu caderno. Você pode mudar de ideia a qualquer momento.`
                : "Escolha o que combina com sua rotina. Essas ideias vão para o seu caderno."}
            </p>
          </div>
          <button className="life-outline-action" onClick={openNotebook}>
            Ver meu caderno <ArrowUpRight size={21} />
          </button>
        </div>
      </section>
      <ReferenceExplorer saved={saved} toggle={toggle} />
      <section className="personal-interlude">
        <div className="interlude-photo">
          <Photo
            name="detalhe-madeira"
            alt="Detalhe de bancada e gavetas de madeira do acervo ART"
            sizes="(max-width: 760px) 100vw, 40vw"
          />
        </div>
        <div className="interlude-copy">
          <span>Uma pergunta que muda o projeto.</span>
          <h2>
            O que só
            <br />
            faz sentido
            <br />
            na sua casa?
          </h2>
          <p>
            O armário que precisa receber uma coleção. A bancada que vira mesa
            de trabalho. O lugar da cafeteira. Conte esses hábitos à equipe.
            Eles ajudam a decidir a divisão, a posição e o uso de cada móvel.
          </p>
          <a href="/orcamento" className="life-text-action">
            Contar minha ideia <ArrowUpRight size={20} />
          </a>
        </div>
        <span className="interlude-word" aria-hidden="true">
          particular.
        </span>
      </section>
      <section className="personal-journal">
        <div className="personal-journal-intro">
          <p>Para olhar com mais intenção.</p>
          <h2>
            Uma boa escolha
            <br />
            começa com
            <br />
            uma boa pergunta.
          </h2>
          <a href="/blog" className="text-link">
            Abrir o journal <ArrowUpRight size={19} />
          </a>
        </div>
        <div className="personal-reading-list">
          {articles.slice(0, 3).map((a) => (
            <a href={`/blog/${a.slug}`} key={a.slug}>
              <span>
                {a.category} <small>{a.minutes} min</small>
              </span>
              <h3>{a.title}</h3>
              <ArrowUpRight size={23} />
            </a>
          ))}
        </div>
      </section>
      <section className="personal-questions">
        <h2>
          A conversa
          <br />
          já pode começar.
        </h2>
        <div>
          {faqs.slice(0, 3).map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="personal-final">
        <div>
          <span>Um projeto começa por quem vai viver nele.</span>
          <h2>
            Precisamos
            <br />
            entender a sua.
          </h2>
        </div>
        <div>
          <p>
            {personal.scene || personal.priorities.length
              ? "Suas escolhas já estão no caderno. Agora, conte um pouco sobre o espaço que você quer mudar."
              : "Conte um pouco sobre seu espaço e o que você quer mudar. A primeira conversa começa com um briefing simples."}
          </p>
          <a href="/orcamento" className="life-final-action">
            Vamos pensar no seu projeto <ArrowUpRight size={26} />
          </a>
          <button className="life-text-action" onClick={openNotebook}>
            Revisar meu caderno <BookOpen size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
