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
    title: "ART Móveis Interiores | Móveis planejados e projetos",
    description:
      "Veja ideias de cozinhas, quartos e outros ambientes. Guarde as fotos de que gostar e conte à ART o que imagina para seus móveis planejados.",
    image: "cozinha-integrada",
  },
  {
    path: "/ambientes",
    title: "Ambientes e projetos de móveis planejados | ART Móveis",
    description:
      "Veja projetos de cozinhas, quartos, salas, escritórios e banheiros. Guarde as ideias que você quer levar para o orçamento dos seus móveis.",
    image: "cozinha-integrada",
  },
  {
    path: "/sobre",
    title: "Conheça a ART Móveis Interiores | Marcenaria e planejados",
    description:
      "ART Móveis Interiores: móveis planejados para cozinhas, quartos, salas, escritórios e banheiros. Consulte os projetos e os canais de atendimento.",
    image: "cozinha-aberta",
  },
  {
    path: "/blog",
    title: "Guias de planejamento | ART Móveis Interiores",
    description:
      "O que conferir nas medidas, nos armários e no orçamento antes de escolher seus móveis planejados. Guias de cozinha, quarto e home office.",
    image: "cozinha-linear",
  },
  {
    path: "/orcamento",
    title: "Orçamento de móveis planejados | ART Móveis Interiores",
    description:
      "Organize seu projeto de móveis planejados em três etapas. Escolha os ambientes, reúna detalhes e revise o resumo antes de conversar no WhatsApp.",
    image: "cozinha-integrada",
    noindex: true,
  },
  {
    path: "/favoritos",
    title: "Minhas referências de móveis planejados | ART Móveis",
    description:
      "As fotos que você guardou para olhar de novo e conversar com a ART sobre os móveis que imagina para o seu espaço.",
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
      "Encontre os projetos e os canais oficiais da ART Móveis: orçamento, WhatsApp, Instagram e localização.",
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
    title: `${a.title} | Guias ART`,
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
                name: "Guias",
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
