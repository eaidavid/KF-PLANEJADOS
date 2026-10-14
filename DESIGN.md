# ART Móveis — explorador de projetos

## Produto e percurso

Site de uma loja de móveis planejados, para quem está reunindo referências antes de pedir um orçamento. A ação principal é salvar fotografias e preparar um pedido com os ambientes e dados do imóvel. As fotografias e os contatos vêm do acervo original; não há clientes, medidas, materiais específicos, avaliações ou resultados comerciais inventados.

O início é uma área de exploração em tela cheia. O visitante muda de fotografia, aproxima detalhes, arrasta o enquadramento e abre o índice por ambiente. Não há sequência de slogans, cenas de vida ou seções promocionais na home. O nome de cada projeto descreve o mobiliário visível. Acervo em lista, guias, informações da empresa e orçamento continuam acessíveis pelo índice ou pelas páginas internas.

## Direção e assinatura

Uma mesa de consulta visual: fotografia grande, moldura em carvão, identificação pequena e controles de inspeção. A interface dá espaço ao móvel e à escolha do visitante. Os pontos numerados correspondem a peças visíveis; seus rótulos explicam o detalhe. Coordenadas são posições na imagem, nunca dimensões físicas. A imagem pode ser um registro ou uma representação de projeto do acervo original; não é apresentada como prova de obra entregue.

Fundo das páginas internas #e9e7e1; superfície #dddcd5; texto #242521; borda #c8c7bf; texto secundário #55584f; moldura #181916; texto na moldura #f4f1e9; anotação #eeebe3; vermelho da marca #b6202a. Manrope local com pesos 400/500/600. Tipografia de interface compacta e títulos descritivos. Bordas retas; círculo só identifica pontos na fotografia. Espaçamento baseado em 4/8/12/16/24/32/48/64/96/128.

## Movimento e interação

A câmera muda por uma ação do visitante, com transição de transform de 650ms. O arraste atualiza a transformação diretamente enquanto o ponteiro está capturado e consolida o estado ao terminar. Não há autoplay, scroll interceptado, parallax ou efeito decorativo. Reduced-motion remove a transição. O zoom mantém limites da fotografia e solicita uma imagem de resolução compatível com a área ampliada.

Desktop prioriza a imagem larga e a legenda inferior. Mobile mantém uma janela alta, oferece “Foto inteira” para inspecionar a composição e conserva todos os pontos na lista “Detalhes”. Anotações de detalhes inferiores passam para a parte superior da foto, deixando o alvo livre. O índice ocupa um painel lateral no desktop e a largura disponível no celular. Diálogos nativos contêm o foco, fecham com Escape e devolvem o foco ao gatilho.

## Engenharia e estados

Vite/React da base; 28 rotas pré-renderizadas com React DOM Server. Hidratação adiciona interações sem depender de conteúdo carregado por API. Conteúdo separado em catalog.js, articles.js e atlas.js. Câmera no hook usePhotoCamera; índice, seleção e orçamento em componentes próprios. Estado de projeto no parâmetro URL `projeto`; seleção e rascunho no navegador; UTM na sessão. Preferências salvas na versão anterior são preservadas e exibidas apenas quando existem.

Fotografias WebP locais responsivas, fontes locais e dimensões declaradas. Sem biblioteca de animação. Estados de foto pendente, falha e nova tentativa; validação do formulário; busca sem resultados; seleção vazia; dados removíveis; 404 real. HTML individual com canonical, descrição, Open Graph, schema, sitemap e robots. A seleção segue no resumo do WhatsApp e no CSV do sistema de prospecção; não existe envio automático ao CRM.

## Revisão

Verificar fotos e coordenadas, enquadramento mobile, teclado, foco, reduced-motion, falha de imagem, persistência e pedido revisável. Auditar rotas e estados com axe, testar 320/390/768/1440 px e medir desempenho em produção. Critérios internos: identidade, hierarquia, tipografia, composição, especificidade, interação, responsividade, acessibilidade, engenharia e desempenho; mínimo 8/10 por categoria. Notas internas não substituem evidências técnicas nem a avaliação do cliente.
