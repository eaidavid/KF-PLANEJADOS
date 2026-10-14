import { useState, useEffect } from "react";
import { Check, MessageCircle } from "lucide-react";
import { environments, projects } from "./data/catalog";
import { articles } from "./data/articles";
import { readStorage, writeStorage, captureAttribution } from "./lib/briefing";
import { Header, Footer } from "./components/SiteLayout";
import QuoteForm from "./components/QuoteForm";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Project from "./pages/Project";
import About from "./pages/About";
import { Journal, Article } from "./pages/Journal";
import { Privacy, LinkBio, NotFound } from "./pages/InfoPages";

export default function App({ path = "/" }) {
  const [saved, setSaved] = useState([]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const initial = readStorage("art-saved", []);
    setSaved(
      Array.isArray(initial)
        ? initial.filter((id) => projects.some((p) => p.id === id))
        : [],
    );
    captureAttribution();
    const onClear = () => setSaved([]);
    window.addEventListener("art-storage-clear", onClear);
    return () => window.removeEventListener("art-storage-clear", onClear);
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(timer);
  }, [notice]);
  const toggle = (id) => {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(next);
    const stored = writeStorage("art-saved", next);
    setNotice(
      stored
        ? next.includes(id)
          ? "Referência salva para o seu projeto."
          : "Referência removida."
        : "Seleção atualizada. Este navegador não permitiu salvar para depois.",
    );
  };
  const cleanPath = path.replace(/\/$/, "") || "/";
  const environment = environments.find(
    (e) => cleanPath === `/ambientes/${e.slug}`,
  );
  const project = projects.find((p) => cleanPath === `/projetos/${p.id}`);
  const article = articles.find((a) => cleanPath === `/blog/${a.slug}`);
  let page;
  if (cleanPath === "/") page = <Home saved={saved} toggle={toggle} />;
  else if (cleanPath === "/ambientes" || environment)
    page = (
      <Collection environment={environment} saved={saved} toggle={toggle} />
    );
  else if (cleanPath === "/favoritos")
    page = <Collection favorites saved={saved} toggle={toggle} />;
  else if (project)
    page = <Project project={project} saved={saved} toggle={toggle} />;
  else if (cleanPath === "/blog") page = <Journal />;
  else if (article) page = <Article article={article} />;
  else if (cleanPath === "/sobre") page = <About />;
  else if (cleanPath === "/orcamento") page = <QuoteForm saved={saved} />;
  else if (cleanPath === "/privacidade") page = <Privacy />;
  else if (cleanPath === "/link-bio") page = <LinkBio />;
  else page = <NotFound />;
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header path={cleanPath} count={saved.length} />
      <main id="conteudo">{page}</main>
      <Footer />
      {notice && (
        <div className="toast" role="status">
          <Check size={17} />
          {notice}
        </div>
      )}
      {cleanPath !== "/orcamento" && (
        <a
          className="floating-contact"
          href="/orcamento"
          aria-label="Planejar meu ambiente"
        >
          <MessageCircle size={21} />
          <span>Seu projeto começa aqui</span>
        </a>
      )}
    </>
  );
}
