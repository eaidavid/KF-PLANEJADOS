# ART Móveis — Ninguém mora como você

Produção: https://artmoveis.vercel.app

## Entregue

28 páginas HTML geradas; experiência de atelier com fotografia imersiva, cenas de rotina, escolhas de prioridades e caderno pessoal. O caderno une preferências e fotografias escolhidas pelo visitante e acompanha o briefing. Acervo com dez referências, cinco categorias de ambientes, favoritos persistentes, briefing em três etapas com rascunho, resumo revisável, WhatsApp oficial, quatro artigos completos, busca no journal, link na bio, privacidade e remoção de dados locais. SEO com metadados individuais, canonical, Open Graph, schema, sitemap (24 URLs indexáveis), robots e 404 real. Imagens e fontes locais.

Prospecção: parâmetros UTM no resumo e exportação CSV no formato posicional do importador `SAAS---LEADS`. Integração direta com o CRM não foi configurada. O visitante decide enviar a mensagem no WhatsApp; o site não simula recebimento nem usa endpoint público para guardar dados pessoais.

## Evidências

- Build passou localmente e na Vercel; deployment de produção READY.
- Chrome/Playwright: 40 checks em produção. Cenas, prioridades, caderno, persistência, foco do diálogo/Escape/retorno, dados pessoais no resumo para WhatsApp, favoritos, filtros, busca, rascunho, validação, exportação, referências/UTM, remoção de dados e HTTP 404 exercitados.
- Home em 320, 390, 768 e 1440 px; rotas principais em 320 px; sem overflow horizontal. Fotografias carregadas verificadas.
- axe em 13 rotas principais e no caderno aberto: zero violações no escopo WCAG A/AA testado. Isso não substitui uma avaliação completa com tecnologias assistivas.
- HTML e metadados conferidos em 28 visitas de rota; sem falhas de conteúdo, H1 ou canonical.
- Lighthouse mobile em produção na revisão: desempenho 98, boas práticas 100, SEO 100. LCP 1,8 s; CLS 0,005; TBT 130 ms. A auditoria identificou contraste baixo em uma palavra decorativa; corrigido antes de concluir. Medição sintética em Chrome local, com perfil mobile do Lighthouse; não representa dados de campo nem promessa de posicionamento no Google.
- Auditoria npm: zero vulnerabilidades.
- Relatórios e capturas em `qa/`, ignorados pelo Git; código de auditoria em `scripts/`.

## Revisão de design

Notas internas da revisão, não indicadores comerciais ou medições automáticas: identidade 9; hierarquia 9; tipografia 9; composição 9; especificidade de conteúdo 9; interação 9; responsividade 9; acessibilidade 9; engenharia 9; performance 9. A direção de atelier usa a rotina da pessoa como primeiro passo. A escolha de fotografia, a composição assimétrica do acervo e o caderno têm função no percurso, e as preferências realmente acompanham o contato. Sem clientes, depoimentos, descontos, métricas de negócio ou prazos inventados.

## Continuidade

Editar conteúdo em `src/data/` e executar `npm run build`. Os textos e nomes de projetos são editoriais; revisar novas afirmações comerciais com a marca antes de incluí-las. Para integração automática com CRM, será necessário um endpoint autenticado de entrada e um destino de armazenamento configurado. As chaves não devem ir para o cliente.
