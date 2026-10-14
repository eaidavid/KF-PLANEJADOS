import { useState } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { environments } from "../data/catalog";
import { articles } from "../data/articles";
import { Photo } from "../components/Photo";
import { Breadcrumb, ContactBand } from "../components/SiteLayout";

export function ArticleTile({ article, featured = false, compact = false }) {
  return (
    <article
      className={`article-tile ${featured ? "article-featured" : ""} ${compact ? "article-compact" : ""}`}
    >
      <a href={`/blog/${article.slug}`} className="article-image">
        <Photo name={article.image} alt={article.title} />
      </a>
      <div className="article-content">
        <span className="article-meta">
          {article.category}
          <span>{article.minutes} min de leitura</span>
        </span>
        <h3>
          <a href={`/blog/${article.slug}`}>{article.title}</a>
        </h3>
        {!compact && <p>{article.description}</p>}
        <a href={`/blog/${article.slug}`} className="text-link">
          Ler artigo <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}
export function Journal() {
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const list = articles.filter(
    (a) =>
      (filter === "Todos" || a.category === filter) &&
      `${a.title} ${a.description}`
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")),
  );
  return (
    <>
      <section className="journal-intro section-space">
        <Breadcrumb items={[["Guias"]]} />
        <h1>Guias de planejamento</h1>
        <p>
          Veja o que conferir nas medidas, nos armários e no orçamento antes de
          escolher seus móveis.
        </p>
      </section>
      <section className="blog-list section-space">
        <div className="blog-toolbar">
          <div
            className="filters"
            role="group"
            aria-label="Categorias de artigos"
          >
            {["Todos", ...new Set(articles.map((a) => a.category))].map((c) => (
              <button
                aria-pressed={filter === c}
                key={c}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="search-label">
            <span className="sr-only">Buscar nos guias</span>
            <input
              type="search"
              placeholder="Buscar um assunto"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={100}
            />
          </label>
        </div>
        <p className="result-count" role="status">
          {list.length} {list.length === 1 ? "artigo" : "artigos"}
        </p>
        <div className="blog-grid">
          {list.map((a) => (
            <ArticleTile key={a.slug} article={a} />
          ))}
        </div>
        {!list.length && (
          <div className="empty-state">
            <h2>Ainda não temos um artigo sobre isso.</h2>
            <p>Tente buscar por cozinha, orçamento, quarto ou trabalho.</p>
            <button
              className="button"
              onClick={() => {
                setFilter("Todos");
                setQuery("");
              }}
            >
              Ver todos os artigos
            </button>
          </div>
        )}
      </section>
      <ContactBand />
    </>
  );
}
export function Article({ article }) {
  const env = environments.find((e) => e.slug === article.environment);
  return (
    <article>
      <header className="article-header section-space">
        <Breadcrumb items={[["Guias", "/blog"], [article.category]]} />
        <span className="article-meta">
          {article.category}
          <span>{article.minutes} min de leitura</span>
        </span>
        <h1>{article.title}</h1>
        <p>{article.intro}</p>
        <div className="article-byline">
          ART Móveis{" "}
          <span>Guia de planejamento · Publicado em 14 de outubro de 2026</span>
        </div>
      </header>
      <div className="article-cover">
        <Photo
          name={article.image}
          alt={article.title}
          priority
          sizes="100vw"
        />
      </div>
      <div className="article-layout section-space">
        <aside>
          <span>Neste artigo</span>
          <nav aria-label="Tópicos do artigo">
            {article.sections.map((s, i) => (
              <a key={s.title} href={`#topico-${i}`}>
                {s.title}
              </a>
            ))}
          </nav>
          <a className="text-link" href={`/ambientes/${env.slug}`}>
            Explore {env.name.toLowerCase()} <ArrowUpRight size={17} />
          </a>
        </aside>
        <div className="article-body">
          {article.sections.map((s, i) => (
            <section id={`topico-${i}`} key={s.title}>
              <h2>{s.title}</h2>
              {s.list && (
                <ul>
                  {s.list.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              {s.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
          <div className="article-end">
            <h2>Vamos falar do seu espaço?</h2>
            <p>
              Conte o que você quer fazer e leve as fotos de que gostou. As
              medidas podem ser aproximadas para a primeira conversa.
            </p>
            <a href={`/orcamento?ambiente=${env.slug}`} className="button">
              Pedir um orçamento <ArrowUpRight size={18} />
            </a>
          </div>
          <a href="/blog" className="text-link">
            <ArrowLeft size={18} /> Voltar aos guias
          </a>
        </div>
      </div>
    </article>
  );
}
