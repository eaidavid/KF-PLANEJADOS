export const scenes = [
  {
    id: "receber",
    title: "Receber à mesa",
    statement: "Uma casa para reunir.",
    image: "cozinha-integrada",
    environment: "cozinhas",
    caption: "A conversa continua na cozinha.",
    description:
      "Espaço para cozinhar, servir e ficar junto. O encontro também entra no projeto.",
  },
  {
    id: "organizar",
    title: "Ter tudo à mão",
    statement: "Uma casa que descomplica.",
    image: "quarto-madeira",
    environment: "quartos",
    caption: "Cada coisa encontra seu lugar.",
    description:
      "O que você usa todos os dias merece um lugar pensado para a sua rotina.",
  },
  {
    id: "criar",
    title: "Encontrar meu canto",
    statement: "Uma casa com espaço para criar.",
    image: "escritorio-musica",
    environment: "escritorios",
    caption: "Trabalho, música, ideias. Do seu jeito.",
    description:
      "Um lugar para o que pede concentração — e para o que só faz sentido para você.",
  },
];
export const priorities = [
  "Mais lugar para guardar",
  "Espaço para receber",
  "Um canto para trabalhar",
  "Circulação mais livre",
  "Objetos à vista",
  "Menos coisas aparentes",
];
export const emptyPersonal = { scene: null, priorities: [] };
export function normalizePersonal(value) {
  return {
    scene: scenes.some((s) => s.id === value?.scene) ? value.scene : null,
    priorities: Array.isArray(value?.priorities)
      ? [...new Set(value.priorities.filter((p) => priorities.includes(p)))]
      : [],
  };
}
export function personalSummary(personal) {
  const scene = scenes.find((s) => s.id === personal?.scene);
  return [
    ...(scene ? [`Meu jeito de viver: ${scene.title}`] : []),
    ...(personal?.priorities?.length
      ? [`O que importa no meu espaço: ${personal.priorities.join(", ")}`]
      : []),
  ];
}
