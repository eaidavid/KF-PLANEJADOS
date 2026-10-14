# ART Móveis — explorador de projetos

## Produto e percurso

Site de uma loja de móveis planejados, para quem está reunindo referências antes de pedir um orçamento. A ação principal é salvar fotografias e preparar um pedido com os ambientes e dados do imóvel. As fotografias e os contatos vêm do acervo original; não há clientes, medidas, materiais específicos, avaliações ou resultados comerciais inventados.

O início é uma área de exploração do acervo. Depois dele, a página segue por ambientes, preparação do pedido, guias e orçamento. Uma barra de âncoras torna esse percurso visível sem sair da home. O nome de cada projeto descreve o mobiliário visível. A escolha de ambiente se propaga para o roteiro e para a URL do formulário, sem novo armazenamento global.

## Direção e assinatura

Uma mesa de consulta visual: fotografia grande, moldura em carvão, identificação pequena e controles de inspeção. A interface dá espaço ao móvel e à escolha do visitante. Os pontos numerados correspondem a peças visíveis; seus rótulos explicam o detalhe. Coordenadas são posições na imagem, nunca dimensões físicas. A imagem pode ser um registro ou uma representação de projeto do acervo original; não é apresentada como prova de obra entregue.

Fundo das páginas internas #e9e7e1; superfície #dddcd5; texto #242521; borda #c8c7bf; texto secundário #55584f; moldura #181916; texto na moldura #f4f1e9; anotação #eeebe3; vermelho da marca #b6202a. Manrope local com pesos 400/500/600. Tipografia de interface compacta e títulos descritivos. Bordas retas; círculo só identifica pontos na fotografia. Espaçamento baseado em 4/8/12/16/24/32/48/64/96/128.

## Movimento e interação

A câmera mantém sua transição CSS de 650ms e seu arraste direto, sem disputar propriedades com GSAP. O GSAP e ScrollTrigger entram num chunk separado, carregado apenas pela home no primeiro gesto de navegação ou exploração. Uma visita por âncora também sinaliza essa necessidade. A página já tem texto legível e interface funcional antes desse carregamento. Linhas que já estão sendo lidas não são ocultadas quando o motor chega. Contextos, media queries e listeners pertencem à home e são revertidos na desmontagem.

Storyboard da extensão:

- Acervo, clique anterior/próximo: duas faixas recolhem-se em 500–560ms e revelam a fotografia; legenda acompanha a troca. O controle não fica bloqueado durante a animação.
- Ambientes, entrada no scroll: letras surgem como peças alinhadas em 720ms, com pequeno stagger. Hover/foco desloca texto e seta; clique muda a foto e o destino do orçamento.
- Preparação, entrada no scroll: linhas do desenho orientativo são traçadas em 1s. As etapas destacam espaço, medidas e referências; o texto permanece em contraste integral ao mudar.
- Guias e pedido, entrada no scroll: lettering reaparece com a mesma regra; hover destaca a direção do link. Sem autoplay, scroll capturado ou cursor substituído.
- Touch: sem dependência de hover, composição própria e controles nativos. Reduced-motion reverte tweens, revela o texto estático e mantém todos os cliques. Falha de download do chunk não impede conteúdo, tabs ou navegação.

Desktop prioriza a imagem larga e a legenda inferior. Mobile mantém uma janela alta, oferece “Foto inteira” para inspecionar a composição e conserva todos os pontos na lista “Detalhes”. Anotações de detalhes inferiores passam para a parte superior da foto, deixando o alvo livre. O índice ocupa um painel lateral no desktop e a largura disponível no celular. Diálogos nativos contêm o foco, fecham com Escape e devolvem o foco ao gatilho.

## Engenharia e estados

Vite/React da base; 28 rotas pré-renderizadas com React DOM Server. Hidratação adiciona interações sem depender de conteúdo carregado por API. Conteúdo separado em catalog.js, articles.js e atlas.js. Câmera no hook usePhotoCamera; índice, seleção e orçamento em componentes próprios. Home compõe ProjectExplorer, StudioJourney e rodapé. Lettering mantém texto semântico separado dos glifos visuais. Estado de projeto no parâmetro URL `projeto`; seleção e rascunho no navegador; UTM na sessão. Preferências salvas na versão anterior são preservadas e exibidas apenas quando existem.

Fotografias WebP locais responsivas, fontes locais e dimensões declaradas. GSAP Core e ScrollTrigger, sem bibliotecas adicionais de smooth scroll ou split de texto. O desenho de observação não tem escala nem dimensões inventadas. Estados de foto pendente, falha e nova tentativa; validação do formulário; busca sem resultados; seleção vazia; dados removíveis; 404 real. HTML individual com canonical, descrição, Open Graph, schema, sitemap e robots. A seleção segue no resumo do WhatsApp e no CSV do sistema de prospecção; não existe envio automático ao CRM.

Referências técnicas: [GSAP context](https://gsap.com/docs/v3/GSAP/gsap.context()/), [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/), [licença do runtime](https://gsap.com/community/standard-license/), consultadas em 14/10/2026. O uso aqui é uma interface comercial, não um construtor visual de animações.

## Revisão

Verificar fotos e coordenadas, enquadramento mobile, teclado, foco, reduced-motion, falha de imagem, persistência e pedido revisável. Auditar rotas e estados com axe, testar 320/390/768/1440 px e medir desempenho em produção. Critérios internos: identidade, hierarquia, tipografia, composição, especificidade, interação, responsividade, acessibilidade, engenharia e desempenho; mínimo 8/10 por categoria. Notas internas não substituem evidências técnicas nem a avaliação do cliente.

## Voz da ART

Falar com quem está escolhendo os móveis: o que quer guardar, onde o móvel vai ficar e o que gostou nas fotos. Usar "projetos", "suas ideias" e "orçamento" na interface. Reservar nomes técnicos de arquivos e integração para o código e a documentação. "Pra gente" cabe em convites pontuais; labels, instruções de medida e mensagens de erro continuam diretos.

Preservar descrições que identificam as peças da fotografia. Trocar abstrações como "a bancada precisa conversar com a cadeira" por uma ação que o cliente consegue executar. Cortar contrastes publicitários e conclusões que apenas repetem o guia. A copy pode acolher dúvidas sobre medidas sem prometer preço, visita, prazo ou condições comerciais que não foram confirmados.
