# ART Móveis Interiores

Site de móveis planejados com explorador fotográfico, apresentação de ambientes, roteiro de preparação, seleção de referências, guias e orçamento. Produção: https://artmoveis.vercel.app. Mantém a base Vite/React e gera HTML completo das 28 páginas.

## Executar

```bash
npm ci
npm run dev
npm run lint
npm run build
node scripts/serve.mjs
vercel deploy --prod --yes
```

O servidor estático em http://127.0.0.1:5173 corresponde à saída publicada. Projeto Vercel `kf-planejados`, URLs limpas e página 404 real. A Vercel executa o build antes de publicar.

## Experiência e edição

A home começa pelo explorador e segue por uma seleção tipográfica de ambientes, um roteiro interativo para o orçamento, desenho orientativo, guias e acesso ao pedido. A seleção de ambiente alimenta o roteiro e o formulário por `?ambiente=salas`. GSAP e ScrollTrigger fazem o lettering, as transições de clique e os hovers; o chunk de movimento é carregado só pela home, no primeiro gesto ou numa visita por âncora. Reduced-motion e falha do chunk preservam a interface estática.

O explorador mantém zoom, arraste, pontos de detalhe, foto inteira, tela cheia quando disponível e navegação anterior/próxima. O índice filtra por ambiente. A seleção acompanha o pedido de orçamento. `?projeto=sala-ripada` abre uma referência específica; as UTMs são preservadas ao mudar de foto. As páginas internas têm acervo em lista e quatro guias completos com busca.

- `src/data/catalog.js`: marca, contato, categorias e projetos.
- `src/data/atlas.js`: rótulos e posições dos detalhes nas fotografias.
- `src/data/articles.js`: guias e conteúdo editorial.
- `src/lib/usePhotoCamera.js`: enquadramento, limites, zoom e arraste.
- `src/components/ProjectExplorer.jsx`: abertura com o acervo.
- `src/components/StudioJourney.jsx`: ambientes, preparação e leitura.
- `src/lib/studioMotion.js`: contexto GSAP, ScrollTrigger, media queries e cleanup.
- `src/studio.css`: composição da home expandida e lettering.
- `src/atlas.css`: explorador e tokens da direção atual.
- `src/personal-home.css`: seleção, formulário e páginas editoriais; mantém o nome de arquivo da versão anterior.
- `scripts/prerender.mjs`: páginas, SEO, schema, sitemap e robots.

Adicionar conteúdo e executar o build atualiza as páginas e o sitemap. Use fotografias do acervo autorizado. Pontos são coordenadas normalizadas na imagem, não medidas do ambiente. Nomes descrevem o que aparece na foto; não representam clientes ou localidades. WhatsApp `(14) 99851-5849` confirmado no Linktree da marca em 14/10/2026: https://linktr.ee/artmoveisinteriores_.

## Orçamento e prospecção

O visitante escolhe ambientes, informa dados do imóvel e revisa o resumo. A última ação abre o WhatsApp com o texto pronto; cabe ao visitante enviá-lo. Seleção e rascunho persistem localmente e podem ser removidos em `/privacidade`. As preferências existentes da versão anterior continuam recuperáveis; a nova home não solicita escolhas de rotina.

UTMs persistem na sessão e entram no resumo. Exemplo:

```text
https://artmoveis.vercel.app/?utm_source=prospeccao&utm_medium=whatsapp&utm_campaign=planejados
```

O CSV utiliza as 19 colunas posicionais do importador de `eaidavid/SAAS---LEADS`: nome E, cidade/endereço F, telefone I/K, categoria O e briefing/origem Q. O arquivo é baixado pelo visitante e não é enviado automaticamente ao CRM. Não há banco de dados, mensagens automáticas ou confirmação de recebimento neste site.

## Verificação

`scripts/qa.mjs` testa navegador, câmera, zoom, arraste, URL, índice, seleção, tela cheia, orçamento, exportação, UTM, busca, privacidade, falha de foto/nova tentativa e HTTP 404. `scripts/quality.mjs` audita HTML/SEO, overflow e WCAG A/AA com axe. Ambos usam Chrome e Playwright disponíveis no computador. Axe e Lighthouse ficam no diretório ignorado `qa`; não entram no bundle. `ART_QA_URL` permite validar a publicação.

`scripts/studio-qa.mjs` verifica GSAP em execução, lettering, hover, transições de clique, âncoras, tabs, propagação do ambiente, quatro viewports, preferência de movimento e falha do chunk. Capturas e relatórios ficam em `qa/`. O relatório de entrega identifica medições da versão atual. Fontes locais sob SIL Open Font License, com fontes documentadas em `public/fonts/SOURCES.txt`. Sem pixels de publicidade nem credenciais no cliente.
