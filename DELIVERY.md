# ART Móveis — explorador de projetos

Produção: https://artmoveis.vercel.app

## Revisão entregue

A home agora é uma janela de exploração do acervo. Dez fotografias, troca anterior/próxima, teclado, índice por ambiente, pontos de detalhe, zoom, arraste, foto inteira e tela cheia nativa quando disponível. Os títulos descrevem o mobiliário. As anotações ficam sobre peças visíveis e não atribuem medidas físicas aos pontos. A home anterior, seus slogans, escolhas de rotina e seções promocionais foram removidos.

A seleção de fotos persiste e acompanha o orçamento em três etapas. Rascunho, revisão antes de abrir o WhatsApp oficial, exportação em texto e CSV de prospecção, atribuição UTM e remoção de dados locais continuam funcionando. Preferências guardadas na versão anterior são preservadas. O site não confirma recebimento e não envia dados automaticamente ao CRM.

Acervo em lista, cinco categorias e quatro guias completos com busca. As 28 rotas têm HTML pré-renderizado, metadados próprios, canonical e schema; sitemap com 24 URLs indexáveis e 404 real. Fontes e imagens locais, sem scripts de marketing.

## Verificação

- Build local e na Vercel; produção READY.
- 53 verificações de fluxo com Chrome/Playwright no endereço público: câmera, arraste, índice, URL, seleção e persistência, foco/Escape, tela cheia, resolução do zoom mobile, orçamento, rascunho, WhatsApp/UTM, CSV, busca, privacidade, erro de foto/nova tentativa e 404. Sem erros de navegador ou hidratação.
- Home conferida em 320/390/768/1440 px; oito rotas verificadas em 320 px; sem overflow horizontal. Capturas da publicação inspecionadas.
- axe em 24 combinações de rota/estado/viewport, incluindo índice, seleção e detalhe aberto. Escopo WCAG 2.0/2.1/2.2 A/AA: zero violações nas verificações automatizadas da revisão. Não substitui uma avaliação completa com tecnologias assistivas.
- HTML/SEO conferido em 28 visitas de rota, sem falhas de H1, canonical, descrição ou conteúdo.
- ESLint e revisão de whitespace passaram. CSS da home anterior removido; CSS de produção comprimido em aproximadamente 9 KB e JavaScript em 81 KB.
- Lighthouse mobile na publicação final: desempenho 99, acessibilidade 100, boas práticas 100, SEO 100. LCP 1,7 s, CLS 0,003 e TBT 110 ms. A verificação de correspondência entre rótulos visíveis e nomes acessíveis passou.

Relatórios e capturas ficam em `qa/`, ignorado pelo Git. Os scripts de validação ficam em `scripts/`. A medição sintética de desempenho está em `qa/atlas-lighthouse-final.json`; não representa dados de campo nem promessa de posicionamento em busca. Publicação validada: `dpl_8vCrQdKiWh4KCEHJTKsmQUPveLGo`.

## Continuidade

Conteúdo em `src/data/`; câmera em `src/lib/usePhotoCamera.js`; direção visual em `src/atlas.css`. Executar `npm run build` atualiza páginas e sitemap. O CSV segue o contrato posicional do importador SAAS---LEADS. Integração automática requer um destino autenticado de armazenamento; nenhuma chave deve ir para o cliente.
