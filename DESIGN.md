# ART Móveis — direção e produto

## Objetivo

Uma casa não começa pelo catálogo: começa pelas pessoas, pelo espaço e pelo uso. Apresentar a marcenaria, permitir explorar o acervo e transformar referências em um briefing legível enviado pelo próprio visitante no WhatsApp oficial.

## Identidade

Direção de catálogo de interiores brasileiro, com fotografia real, grandes composições, tipografia serifada com formas abertas e marca vermelha preservada. Fundo mineral claro, texto carvão e vermelho apenas nas ações. Sem provas comerciais inventadas. A composição de abertura usa foto ampla com uma faixa de legenda, seguida de um índice de ambientes que funciona como um catálogo. Projetos possuem filtros e favoritos; os favoritos acompanham o briefing.

## Sistema

Cores: fundo #f6f5f2, texto #262825, superfície #eeede8, elevado #fff, borda #d8d8d1, secundário #62665f, marca #b6202a, destrutivo #a51f28, sucesso #386347, atenção #8a631c. Serifada Literata para títulos; Manrope para interface. Escala 4/8/12/16/24/32/48/64/80/96/128. Raios 0/4/8. Sombras apenas no menu e diálogo. Movimento 160/240/400ms, usado em controles e troca do ambiente; reduced-motion respeitado.

## Fluxo

Início → explorar ambientes/projetos → salvar referências → briefing em três etapas → revisar → abrir conversa no WhatsApp. Blog → artigo → ambiente relacionado/briefing. Links de prospecção registram parâmetros UTM na sessão e os incluem no briefing. Nenhum envio automático de mensagens e nenhuma confirmação falsa de recebimento. CSV usa nomes compatíveis com o modelo Lead do repositório SAAS---LEADS; integração direta depende de backend autorizado e configurado.

## Engenharia

Manter Vite/React da base. Pré-renderizar todas as rotas em HTML usando React DOM Server; hidratar apenas interações. Conteúdo editorial e projetos separados da interface. Sem nova biblioteca de UI/animação; remover Lenis e Framer Motion do bundle. Imagens WebP locais em tamanhos adequados, dimensões declaradas, lazy loading abaixo da abertura. Metadados únicos, canonical, sitemap, robots e schema Organization/Article/BreadcrumbList. Nenhum endereço, horário, avaliação ou cidade não confirmados.

## Responsividade e acessibilidade

Desktop com grade assimétrica; mobile com índice horizontal de ambientes, texto legível e foto dedicada. Sem scroll artificial. Formulário com labels, validação, feedback e resumo revisável. Navegação por teclado, skip link, foco visível, diálogo nativo com retorno de foco. Rascunho local recuperável; dados pessoais removíveis. QA 320/390/768/1440, favoritos, formulário, filtros, rotas, 404 e HTML sem JS.
