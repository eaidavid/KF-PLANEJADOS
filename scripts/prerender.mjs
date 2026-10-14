import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { render } from "../.ssr/entry-server.js";
import { brand, environments, projects } from "../src/data/catalog.js";
import { articles } from "../src/data/articles.js";

const escape = (text) =>
  String(text)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const routes = [
  {
    path: "/",
    title:
      "ART Móveis Interiores | Móveis planejados para o seu jeito de viver",
    description:
      "Explore cozinhas, quartos, salas e home offices do acervo ART Móveis. Salve referências e organize seu briefing para conversar sobre móveis planejados.",
    image: "cozinha-integrada",
  },
  {
    path: "/ambientes",
    title: "Ambientes e projetos de móveis planejados | ART Móveis",
    description:
      "Explore o acervo ART: cozinhas planejadas, quartos e closets, salas e painéis, home offices e banheiros. Salve referências para o seu projeto.",
    image: "cozinha-integrada",
  },
  {
    path: "/sobre",
    title: "Conheça a ART Móveis Interiores | Marcenaria e planejados",
    description:
      "Conheça o jeito ART de planejar móveis: entender sua rotina, aproveitar o espaço com intenção e conversar sobre cada detalhe do projeto.",
    image: "cozinha-aberta",
  },
  {
    path: "/blog",
    title: "Journal ART | Guias para planejar móveis e ambientes",
    description:
      "Leia guias sobre cozinha planejada, closet, orçamento e home office. Perguntas e escolhas para planejar sua casa com clareza.",
    image: "cozinha-linear",
  },
  {
    path: "/orcamento",
    title: "Comece seu projeto | Briefing de móveis planejados ART",
    description:
      "Organize seu projeto de móveis planejados em três etapas. Escolha os ambientes, reúna detalhes e revise o resumo antes de conversar no WhatsApp.",
    image: "cozinha-integrada",
    noindex: true,
  },
  {
    path: "/favoritos",
    title: "Minhas referências de móveis planejados | ART Móveis",
    description:
      "As referências que você salvou no acervo ART. Reúna suas ideias favoritas e leve a seleção para o briefing do seu projeto.",
    image: "sala-ripada",
    noindex: true,
  },
  {
    path: "/privacidade",
    title: "Privacidade e seus dados | ART Móveis",
    description:
      "Saiba como o site ART Móveis guarda favoritos e rascunho no seu navegador e como funciona o compartilhamento pelo WhatsApp.",
    image: "cozinha-integrada",
  },
  {
    path: "/link-bio",
    title: "ART Móveis Interiores | Site, projetos e contato",
    description:
      "Encontre os links oficiais da ART Móveis: ambientes, briefing, WhatsApp, Instagram e localização.",
    image: "cozinha-integrada",
    noindex: true,
  },
  ...environments.map((e) => ({
    path: `/ambientes/${e.slug}`,
    title: `${e.name} planejados | ART Móveis Interiores`,
    description: e.description,
    image: e.image,
  })),
  ...projects.map((p) => ({
    path: `/projetos/${p.id}`,
    title: `${p.title} | Projeto de móveis planejados ART`,
    description: p.description,
    image: p.image,
  })),
  ...articles.map((a) => ({
    path: `/blog/${a.slug}`,
    title: `${a.title} | Journal ART`,
    description: a.description,
    image: a.image,
    article: a,
  })),
  {
    path: "/404",
    title: "Página não encontrada | ART Móveis",
    description: "Explore os ambientes e os projetos de móveis planejados ART.",
    image: "cozinha-integrada",
    noindex: true,
  },
];
const template = await readFile("dist/index.html", "utf8");
for (const route of routes) {
  const canonical = brand.url + (route.path === "/" ? "" : route.path);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${brand.url}/#organization`,
    name: brand.name,
    url: brand.url,
    logo: `${brand.url}/assets/logo-art-moveis.png`,
    sameAs: [brand.instagram, brand.source],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+5514998515849",
      contactType: "sales",
      availableLanguage: "Portuguese",
    },
  };
  const schema = [organization];
  if (route.article)
    schema.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: route.article.title,
      description: route.description,
      image: `${brand.url}/images/${route.image}-1280.webp`,
      datePublished: "2026-10-14",
      dateModified: "2026-10-14",
      author: { "@type": "Organization", name: brand.name, url: brand.url },
      publisher: { "@id": `${brand.url}/#organization` },
      mainEntityOfPage: canonical,
    });
  if (route.path !== "/" && !route.noindex)
    schema.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: brand.url },
        ...(route.article
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: "Journal",
                item: `${brand.url}/blog`,
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: route.article ? 3 : 2,
          name: route.title.split(" | ")[0],
          item: canonical,
        },
      ],
    });
  const head = `<title>${escape(route.title)}</title>
<meta name="description" content="${escape(route.description)}"/>
<link rel="canonical" href="${canonical}"/>
<meta name="robots" content="${route.noindex ? "noindex,follow" : "index,follow,max-image-preview:large"}"/>
<meta property="og:type" content="${route.article ? "article" : "website"}"/>
<meta property="og:locale" content="pt_BR"/>
<meta property="og:site_name" content="${brand.name}"/>
<meta property="og:title" content="${escape(route.title)}"/>
<meta property="og:description" content="${escape(route.description)}"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:image" content="${brand.url}/images/${route.image}-1280.webp"/>
<meta name="twitter:card" content="summary_large_image"/>
<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`;
  const html = template
    .replace("<!--page-head-->", head)
    .replace("<!--app-html-->", render(route.path));
  const file =
    route.path === "/" ? "dist/index.html" : `dist${route.path}.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
  .filter((r) => !r.noindex)
  .map(
    (r) =>
      `<url><loc>${brand.url}${r.path === "/" ? "" : r.path}</loc><lastmod>2026-10-14</lastmod></url>`,
  )
  .join("")}</urlset>`;
await writeFile("dist/sitemap.xml", sitemap);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${brand.url}/sitemap.xml\n`,
);
console.log(
  `Pre-rendered ${routes.length} routes; ${routes.filter((r) => !r.noindex).length} sitemap entries`,
);
