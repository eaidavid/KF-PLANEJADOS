import { brand, projects } from "../data/catalog";
import { personalSummary } from "../data/lifestyle";

export function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const source = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ]) {
    if (params.get(key)) source[key] = params.get(key).slice(0, 120);
  }
  try {
    if (Object.keys(source).length)
      sessionStorage.setItem("art-attribution", JSON.stringify(source));
    return JSON.parse(sessionStorage.getItem("art-attribution")) ?? {};
  } catch {
    return source;
  }
}
export function buildBriefing(data, saved, attribution = {}, personal = {}) {
  const references = projects.filter((p) => saved.includes(p.id));
  return [
    "Olá, ART Móveis! Gostaria de conversar sobre meu projeto.",
    "",
    `Nome: ${data.name}`,
    `Cidade/UF: ${data.city}`,
    `Ambientes: ${data.environments.join(", ")}`,
    `Imóvel: ${data.property}`,
    `Momento: ${data.timing}`,
    `Medidas: ${data.measurements || "Ainda não tenho"}`,
    ...(data.notes ? [`Observações: ${data.notes}`] : []),
    ...personalSummary(personal),
    ...(references.length
      ? [
          "",
          "Referências salvas:",
          ...references.map((p) => `${p.title}: ${brand.url}/projetos/${p.id}`),
        ]
      : []),
    ...(Object.keys(attribution).length
      ? [
          "",
          `Origem: ${Object.entries(attribution)
            .map(([k, v]) => `${k}=${v}`)
            .join(" | ")}`,
        ]
      : []),
  ].join("\n");
}
export function whatsappUrl(
  text = "Olá, ART Móveis! Gostaria de conversar sobre móveis planejados.",
) {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`;
}
export function downloadText(
  filename,
  text,
  type = "text/plain;charset=utf-8",
) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function briefingCsv(data, text, attribution = {}) {
  const cell = (value) =>
    `"${String(value ?? "")
      .replace(/^[=+@-]/, "'")
      .replaceAll('"', '""')}"`;
  // SAAS---LEADS ImportController consumes positional columns, not header names.
  const headers = [
    "id",
    "listing_url",
    "unused_2",
    "unused_3",
    "name",
    "fulladdr",
    "unused_6",
    "unused_7",
    "phone",
    "unused_9",
    "mobile",
    "unused_11",
    "unused_12",
    "unused_13",
    "category",
    "unused_15",
    "comments",
    "rating",
    "website",
  ];
  const values = Array(19).fill("");
  values[4] = data.name;
  values[5] = data.city;
  values[8] = data.phone;
  values[10] = data.phone;
  values[14] = "Móveis planejados";
  values[16] = `${text}\nOrigem: ${JSON.stringify(attribution)}`;
  return (
    "\uFEFF" + headers.join(",") + "\r\n" + values.map(cell).join(",") + "\r\n"
  );
}
