# ART Móveis — home, movimento e linguagem

Produção: https://artmoveis.vercel.app

Publicação validada: `dpl_6G8qR4xH7Q7LUEaknAUXQPStM8jq` (escala no desktop). Revisão da linguagem: `dpl_FZhpgKsr3fRiBdvHnw89ySydWh8F`.

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
- Lighthouse mobile da edição de movimento (`dpl_FeNunRsm1Z3JnebyGKEUdkXCxuK8`): desempenho 99, acessibilidade 100, boas práticas 100, SEO 100. LCP 1,8 s, CLS 0,002 e TBT 100 ms. A primeira medição da extensão tinha desempenho 89 e TBT 410 ms; carregar o motor mediante intenção removeu esse trabalho da abertura, mantendo os efeitos disponíveis nas interações.

Relatórios e capturas em `qa/`, ignorado pelo Git. Código de validação em `scripts/qa.mjs`, `scripts/studio-qa.mjs` e `scripts/quality.mjs`. Medição sintética final em `qa/studio-lighthouse-final.json`; não representa métricas de campo ou promessa de posicionamento em busca.

## Revisão da linguagem

A home, os projetos, o formulário, as ideias salvas, os quatro guias e as descrições de busca receberam uma revisão voltada a quem está planejando os móveis da casa. A linguagem parte do cômodo, das fotos, do que precisa ser guardado e das informações necessárias para conversar sobre o orçamento.

Foram corrigidos três padrões observáveis: vocabulário de catálogo/sistema em chamadas para clientes; explicações da própria interface em lugar de orientação útil; e contrastes, metáforas e conclusões repetitivas nos guias. Exemplos: “seleção” passou a “suas ideias”; “briefing” passou a “resumo do orçamento”; “a bancada precisa conversar com a cadeira” passou a uma instrução para testar a bancada junto com a cadeira. Nomes e descrições factuais dos projetos foram preservados.

O diagnóstico considera esses padrões de texto e composição, sem atribuir autoria. A apresentação institucional ainda tem pouca informação exclusiva: faltam histórias documentadas dos projetos e detalhes próprios do atendimento da ART. Não foram inventados relatos, depoimentos, garantias ou uma história da empresa para preencher essa lacuna. A galeria com fotografias reais, as ideias salvas e a preparação por ambiente mantêm a experiência ligada ao produto.

Nesta revisão, build e ESLint passaram. As 86 verificações de interação, 31 estados de acessibilidade e 28 visitas de rota passaram localmente e no endereço público https://artmoveis.vercel.app, sem erros de navegador, violações axe, falhas de SEO ou overflow horizontal detectados. Capturas da home em 320 px, da seção de ambientes em desktop e do orçamento em mobile foram inspecionadas. A medição Lighthouse acima pertence à edição anterior de movimento; não foi repetida para a alteração de texto.

## Ajuste da escala no desktop

A largura útil das seções passou de até 1.700 px para 1.200 px. Títulos de até 124 px passaram a um máximo de 68 px; a chamada de orçamento passou de 180 px para até 96 px. A lista de ambientes, os títulos dos guias, os espaçamentos e as proporções das imagens foram reduzidos em conjunto. A galeria tem limite de 1.440 px de largura e 760 px de altura no desktop, mantendo zoom, detalhes e navegação. As regras dos títulos agora se aplicam apenas às seções editoriais.

Comparação renderizada em 1366, 1440, 1920 e 2560 px; tablet em 768 px e celular em 390 px, sem overflow horizontal detectado. Capturas de desktop antes/depois inspecionadas. A escala mobile dos títulos permanece igual à versão anterior.

Build, 86 verificações de interação, 31 estados axe e 28 visitas de rota passaram localmente após o ajuste, sem erros de navegador ou falhas detectadas no escopo automatizado. Lighthouse não foi repetido nesta alteração de CSS.

No endereço público, confirmados os limites de escala nas seis larguras medidas e as 33 verificações da home. A checagem da máscara GSAP foi ajustada para registrar seu estado renderizado no evento de troca, em vez de tentar capturar uma janela fixa de 70 ms; os quadros da transição e seu retorno a zero foram conferidos. Sem mudança no motor de animação.

## Manutenção

Home compõe ProjectExplorer e StudioJourney. Lettering preserva o texto semântico; studioMotion concentra GSAP e seus eventos. Conteúdo em `src/data/`, estilos da extensão em `src/studio.css`, direção e storyboard em `DESIGN.md`. Executar `npm run build` atualiza rotas, metadados e sitemap.
