# ART Móveis — home expandida e movimento

Produção: https://artmoveis.vercel.app

Publicação validada: `dpl_FeNunRsm1Z3JnebyGKEUdkXCxuK8`.

## Entregue

A abertura mantém o explorador de projetos, com zoom, arraste, detalhes e seleção. A home continua por ambientes, roteiro de preparação, guias e pedido de orçamento. Uma barra de âncoras permite navegar pelo percurso. Escolher um ambiente atualiza a referência, as perguntas de preparação e a URL que preenche o formulário.

GSAP Core e ScrollTrigger fazem lettering por glifo, resposta de hover/foco, pressão de clique, revelação da fotografia e traçado do desenho orientativo. O motor é carregado num chunk próprio apenas pela home, no primeiro gesto de navegação ou exploração. Linhas já visíveis não são ocultadas quando o motor chega. A câmera mantém seu movimento CSS, sem duas bibliotecas disputando propriedades. Contextos, eventos e media queries são revertidos ao desmontar. Reduced-motion preserva a interface estática; falha do chunk não impede os controles.

O desenho explica o que observar no imóvel e não apresenta escala ou medidas inventadas. Fotografias continuam vindo do acervo original. Sem fabricação de clientes, materiais específicos ou promessas de obra entregue. Os textos descrevem ambientes e instruções de preparação.

Blog com quatro guias, acervo em lista, seleção persistente, rascunho, orçamento revisável, WhatsApp oficial, exportação em texto/CSV e atribuição UTM preservados. A integração com prospecção continua pelo CSV posicional do SAAS---LEADS; não existe envio automático ao CRM.

## Evidências da publicação

- Vercel READY, build local e remoto concluídos; ESLint e whitespace sem erros.
- Chrome/Playwright: 53 verificações do acervo/orçamento e 33 da extensão, total de 86. Lettering, hover, clique, troca de ambiente, teclado, âncoras, propagação do ambiente para o formulário, seleção, tela cheia, zoom, arraste, rascunho, WhatsApp/UTM, CSV, busca, privacidade, erro de fotografia/nova tentativa e 404 exercitados. Sem erros de navegador ou hidratação.
- Quatro larguras da home completa: 320, 390, 768 e 1440 px, com imagens carregadas e sem overflow horizontal. Capturas inspecionadas.
- axe em 31 combinações de rota/estado/viewport, incluindo as novas seções e movimento reduzido: zero violações no escopo automatizado WCAG 2.0/2.1/2.2 A/AA. A auditoria automática não substitui avaliação completa com tecnologias assistivas.
- 28 visitas de rota verificadas para HTML, H1, descrição, canonical e schema. Build gera 28 páginas e sitemap de 24 URLs indexáveis.
- Falha do chunk GSAP testada: conteúdo e seleção de ambientes continuam disponíveis. Preferência de movimento pode mudar durante a visita.
- Bundle principal comprimido em aproximadamente 85 KB, CSS em 11 KB e chunk GSAP em 45 KB. O chunk de movimento é separado do carregamento principal. Instalação npm sem vulnerabilidades reportadas.
- Lighthouse mobile final: desempenho 99, acessibilidade 100, boas práticas 100, SEO 100. LCP 1,8 s, CLS 0,002 e TBT 100 ms. A primeira medição da extensão tinha desempenho 89 e TBT 410 ms; carregar o motor mediante intenção removeu esse trabalho da abertura, mantendo os efeitos disponíveis nas interações.

Relatórios e capturas em `qa/`, ignorado pelo Git. Código de validação em `scripts/qa.mjs`, `scripts/studio-qa.mjs` e `scripts/quality.mjs`. Medição sintética final em `qa/studio-lighthouse-final.json`; não representa métricas de campo ou promessa de posicionamento em busca.

## Manutenção

Home compõe ProjectExplorer e StudioJourney. Lettering preserva o texto semântico; studioMotion concentra GSAP e seus eventos. Conteúdo em `src/data/`, estilos da extensão em `src/studio.css`, direção e storyboard em `DESIGN.md`. Executar `npm run build` atualiza rotas, metadados e sitemap.
