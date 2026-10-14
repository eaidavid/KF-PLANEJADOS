import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, BookOpen } from "lucide-react";
import { brand } from "../data/catalog";
import { whatsappUrl } from "../lib/briefing";

export function Logo({ light = false }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="/">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M4 17 17 11v25L4 39z" fill="currentColor" opacity=".45" />
        <path d="m20 9 13-6 4 2v30l-17-5z" fill="var(--primary)" />
        <path d="M18 11v25l-5-2V13z" fill="currentColor" opacity=".75" />
      </svg>
      <span className="brand-words">
        art móveis<span>interiores</span>
      </span>
      <span className="sr-only"> — início</span>
    </a>
  );
}
export function Header({ path, count, openNotebook }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Principal">
          {[
            ["Ambientes", "/ambientes"],
            ["A ART", "/sobre"],
            ["Guias", "/blog"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={path.startsWith(href) ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="favorite-nav"
            onClick={openNotebook}
            aria-label={`Suas ideias${count > 0 ? ` (${count})` : ""}`}
          >
            <BookOpen size={19} />
            <span>Suas ideias{count > 0 ? ` (${count})` : ""}</span>
          </button>
          <a className="button button-small" href="/orcamento">
            Orçamento <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle icon-button"
            id="menu-toggle"
            aria-label={open ? "Fechar navegação" : "Abrir navegação"}
            aria-controls="mobile-nav"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="mobile-nav"
          id="mobile-nav"
          aria-label="Navegação móvel"
        >
          {[
            ["Início", "/"],
            ["Ambientes", "/ambientes"],
            ["A ART", "/sobre"],
            ["Guias", "/blog"],
            ["Suas ideias salvas", "/favoritos"],
            ["Pedir um orçamento", "/orcamento"],
          ].map(([label, href]) => (
            <a key={href} href={href}>
              {label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Logo light />
        <p>Móveis planejados</p>
        <a className="text-link light-link" href="/orcamento">
          Pedir um orçamento <ArrowUpRight size={20} />
        </a>
      </div>
      <div className="footer-links">
        <div>
          <span>Veja também</span>
          <a href="/ambientes">Ambientes e projetos</a>
          <a href="/sobre">Conheça a ART</a>
          <a href="/blog">Guias de planejamento</a>
          <a href="/favoritos">Suas ideias salvas</a>
        </div>
        <div>
          <span>Vamos conversar</span>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp {brand.phone}
            <ArrowUpRight size={14} />
          </a>
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
            Instagram <ArrowUpRight size={14} />
          </a>
          <a href={brand.maps} target="_blank" rel="noopener noreferrer">
            Como chegar <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="footer-note">
          <span>Ambientes</span>
          <p>Cozinhas, quartos, salas, banheiros e espaços de trabalho.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Art Móveis Interiores</span>
        <a href="/privacidade">Privacidade</a>
        <a href="/link-bio">Todos os nossos links</a>
        <a href="/">Ver projetos</a>
      </div>
    </footer>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <h2>Vamos falar do seu móvel?</h2>
      </div>
      <div>
        <p>
          Conte onde ele vai ficar e o que você precisa guardar. Se já tiver
          fotos e medidas, leve para a conversa.
        </p>
        <a className="button" href="/orcamento">
          Pedir um orçamento <ArrowUpRight size={18} />
        </a>
        <span className="contact-footnote">
          As fotos que você salvou vão no resumo do orçamento.
        </span>
      </div>
    </section>
  );
}
export function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Localização">
      <a href="/">Início</a>
      {items.map(([text, href], i) => (
        <span key={text}>
          <span aria-hidden="true">/</span>
          {href ? (
            <a href={href}>{text}</a>
          ) : (
            <span aria-current={i === items.length - 1 ? "page" : undefined}>
              {text}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
