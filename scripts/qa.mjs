import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
const {
  chromium,
} = require("C:/Users/David/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
await mkdir("qa", { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (msg) => {
  const expected404 =
    msg.location().url.endsWith("/pagina-inexistente") &&
    /status of 404/.test(msg.text());
  if (msg.type() === "error" && !expected404) errors.push(msg.text());
});
const base = process.env.ART_QA_URL || "http://127.0.0.1:5173";
const checks = [];
function verify(condition, label) {
  checks.push({ label, pass: !!condition });
  if (!condition) throw new Error(label);
}
async function loadImages() {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 100));
    }
    await Promise.all(
      [...document.images].map((img) => img.decode().catch(() => {})),
    );
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}
await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await loadImages();
verify(
  await page.evaluate(() =>
    [...document.images].every((i) => i.complete && i.naturalWidth > 0),
  ),
  "All homepage images load",
);
await page.screenshot({ path: "qa/home-desktop.png", fullPage: true });
await page.screenshot({ path: "qa/home-desktop-top.png" });
for (const width of [320, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: 960 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await loadImages();
  verify(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    `Homepage no horizontal overflow: ${width}`,
  );
  verify((await page.locator("h1").count()) === 1, `One H1: ${width}`);
  await page.screenshot({ path: `qa/home-${width}.png`, fullPage: true });
  if (width === 390) await page.screenshot({ path: "qa/home-mobile-top.png" });
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.getByRole("tab", { name: "Home offices" }).click();
verify(
  (await page.getByRole("tabpanel").getByRole("link").getAttribute("href")) ===
    "/ambientes/escritorios",
  "Environment tab switches destination",
);
await page.getByRole("tab", { name: "Home offices" }).press("ArrowLeft");
verify(
  (await page
    .getByRole("tab", { name: "Salas e painéis" })
    .getAttribute("aria-selected")) === "true",
  "Environment keyboard navigation",
);
await page.goto(base + "/ambientes");
await page.getByRole("button", { name: "Cozinhas", exact: true }).click();
verify(
  (await page.locator(".project-tile").count()) === 2,
  "Project category filter",
);
await page
  .getByRole("button", {
    name: "Salvar referência: Cozinha que reúne",
    exact: true,
  })
  .click();
await page.reload();
verify(
  (await page
    .getByRole("button", {
      name: "Remover referência: Cozinha que reúne",
      exact: true,
    })
    .getAttribute("aria-pressed")) === "true",
  "Favorites survive reload",
);
await page.goto(base + "/favoritos");
verify(
  (await page.locator(".project-tile").count()) === 1,
  "Favorites page selection",
);
await page.goto(base + "/orcamento?utm_source=qa&utm_campaign=prospeccao");
await page.getByRole("button", { name: "Continuar", exact: true }).click();
verify(
  await page.getByRole("alert").isVisible(),
  "Briefing requires environment",
);
await page.getByRole("checkbox", { name: "Cozinhas", exact: true }).check();
await page.getByRole("button", { name: "Continuar", exact: true }).click();
await page
  .getByRole("textbox", { name: "Seu nome", exact: true })
  .fill("Visitante de teste");
await page
  .getByRole("textbox", { name: "Cidade e estado", exact: true })
  .fill("Bauru, SP");
await page
  .getByRole("textbox", { name: /Telefone com DDD/ })
  .fill("14999990000");
await page
  .getByRole("textbox", { name: /Medidas aproximadas/ })
  .fill("Parede de 3 m");
await page
  .getByRole("textbox", { name: "O que não pode faltar?", exact: true })
  .fill("Gavetas para organizar utensílios.");
await page.reload();
await page.getByRole("button", { name: "Continuar", exact: true }).click();
verify(
  (await page
    .getByRole("textbox", { name: "Seu nome", exact: true })
    .inputValue()) === "Visitante de teste",
  "Draft survives reload",
);
await page.getByRole("button", { name: "Continuar", exact: true }).click();
const href = await page
  .getByRole("link", { name: "Abrir conversa no WhatsApp", exact: true })
  .getAttribute("href");
const url = new URL(href);
const message = url.searchParams.get("text");
verify(url.pathname === "/5514998515849", "Verified WhatsApp destination");
verify(
  message.includes("Visitante de teste") &&
    message.includes("Cozinha que reúne") &&
    message.includes("utm_source=qa"),
  "Briefing includes details, references and attribution",
);
await page.screenshot({ path: "qa/briefing-desktop.png", fullPage: true });
const downloadPromise = page.waitForEvent("download");
await page.getByRole("button", { name: "Baixar CSV", exact: true }).click();
const download = await downloadPromise;
await download.saveAs("qa/lead.csv");
verify(download.suggestedFilename() === "art-lead.csv", "CSV export downloads");
await page.getByRole("button", { name: "Voltar", exact: true }).click();
await page
  .getByRole("textbox", { name: "Seu nome", exact: true })
  .fill(
    "Um nome de visitante bastante longo para testar a apresentação do resumo",
  );
await page.getByRole("button", { name: "Continuar", exact: true }).click();
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: "qa/briefing-mobile.png", fullPage: true });
verify(
  await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  "Briefing long content mobile",
);
await page.goto(base + "/blog");
await page
  .getByRole("searchbox", { name: "Buscar no journal" })
  .fill("cozinha");
verify(
  (await page.locator(".blog-grid .article-tile").count()) === 1,
  "Blog search",
);
await page.getByRole("searchbox", { name: "Buscar no journal" }).fill("zzzz");
verify(
  await page
    .getByRole("heading", { name: "Ainda não temos um artigo sobre isso." })
    .isVisible(),
  "Blog empty state",
);
await page.goto(base + "/blog/cozinha-planejada-por-onde-comecar");
verify(
  (await page.locator(".article-body section").count()) === 5,
  "Complete article body",
);
await page.screenshot({ path: "qa/article-mobile.png", fullPage: true });
verify(
  await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  "Article mobile overflow",
);
await page.goto(base);
await page
  .getByRole("button", { name: "Abrir navegação", exact: true })
  .click();
verify(await page.locator("#mobile-nav").isVisible(), "Mobile menu opens");
await page.keyboard.press("Escape");
verify(
  (await page.locator("#mobile-nav").count()) === 0,
  "Escape closes mobile menu",
);
await page.getByRole("button", { name: "Ter tudo à mão", exact: true }).click();
verify(
  (await page.locator(".life-hero-photo").getAttribute("src")).includes(
    "quarto-madeira",
  ),
  "Lifestyle selection changes photographic scene",
);
await page
  .getByRole("button", { name: "Mais lugar para guardar", exact: true })
  .click();
await page.getByRole("button", { name: /^Meu caderno/ }).click();
verify(await page.getByRole("dialog").isVisible(), "Personal notebook opens");
verify(
  (await page.locator(".notebook-scene").textContent()) === "Ter tudo à mão.",
  "Notebook carries selected lifestyle",
);
verify(
  (await page.locator(".notebook-notes li").textContent()) ===
    "Mais lugar para guardar",
  "Notebook carries personal priority",
);
await page.screenshot({ path: "qa/notebook-mobile.png" });
await page.keyboard.press("Tab");
verify(
  await page.evaluate(() => !!document.activeElement.closest("dialog")),
  "Notebook retains keyboard focus",
);
await page.keyboard.press("Escape");
verify(!(await page.getByRole("dialog").isVisible()), "Escape closes notebook");
verify(
  await page
    .getByRole("button", { name: /^Meu caderno/ })
    .evaluate((e) => e === document.activeElement),
  "Notebook restores trigger focus",
);
await page.reload();
verify(
  (await page
    .getByRole("button", { name: "Ter tudo à mão", exact: true })
    .getAttribute("aria-pressed")) === "true",
  "Lifestyle survives reload",
);
verify(
  (await page
    .getByRole("button", { name: "Mais lugar para guardar", exact: true })
    .getAttribute("aria-pressed")) === "true",
  "Personal priority survives reload",
);
await page.goto(base + "/orcamento");
await page.getByRole("button", { name: "Continuar", exact: true }).click();
await page.getByRole("button", { name: "Continuar", exact: true }).click();
const personalLink = await page
  .getByRole("link", { name: "Abrir conversa no WhatsApp", exact: true })
  .getAttribute("href");
verify(
  new URL(personalLink).searchParams.get("text").includes("Ter tudo à mão") &&
    new URL(personalLink).searchParams
      .get("text")
      .includes("Mais lugar para guardar"),
  "Personal choices accompany WhatsApp briefing",
);
await page.emulateMedia({ reducedMotion: "reduce" });
verify(
  (await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  )) === "auto",
  "Reduced motion",
);
await page.goto(base + "/privacidade");
await page
  .getByRole("button", { name: "Apagar dados deste navegador", exact: true })
  .click();
verify(
  await page.evaluate(
    () =>
      localStorage.getItem("art-saved") === null &&
      localStorage.getItem("art-draft") === null &&
      localStorage.getItem("art-personal") === null,
  ),
  "Privacy clears data",
);
const response = await page.goto(base + "/pagina-inexistente");
verify(response.status() === 404, "Unknown route is HTTP 404");
if (errors.length)
  console.log(JSON.stringify({ browserErrors: errors }, null, 2));
verify(errors.length === 0, "No browser errors or hydration failures");
const report = { base, checks, errors };
await writeFile("qa/report.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
