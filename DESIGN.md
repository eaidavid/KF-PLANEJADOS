# ART Móveis — direção e produto

## Objetivo

Uma casa não começa pelo catálogo: começa pelas pessoas, pelo espaço e pelo uso. Apresentar a marcenaria, permitir explorar o acervo e transformar referências em um briefing legível enviado pelo próprio visitante no WhatsApp oficial.

## Identidade

Revisão solicitada pelo usuário: abandonar a composição convencional de catálogo. Conceito dominante: “Ninguém mora como você”. Direção de atelier de interiores com presença gráfica: foto imersiva, tipografia Manrope em grande escala, tinta verde profunda, papel verde claro e vermelho da marca. A abertura oferece cenas de vida em vez de colocar um catálogo antes da pessoa. O visitante compõe um caderno com rotina, prioridades e fotografias do acervo; essas escolhas chegam ao briefing. Projetos são referências, não soluções prontas vendidas para todos. Sem provas comerciais inventadas.

## Sistema

Cores: fundo #f2f3ed, papel #edf0e6, tinta #1f3127, superfície #e7eae0, elevado #fff, borda #cdd2c5, secundário #62665f, marca #b6202a, destrutivo #a51f28, sucesso #386347, atenção #8a631c. Manrope 500 nas composições e 400/600 na interface. Escala 4/8/12/16/24/32/48/64/80/96/128. Raios 0/4; círculo apenas nos controles de seleção. Sombras apenas onde há elevação. Movimento 160/240/400ms; diálogo entra lateralmente para explicar seu lugar no espaço. Reduced-motion preserva estados sem movimento.

## Fluxo

Início → escolher cena de vida → selecionar prioridades → explorar referências → abrir caderno → briefing → revisar → conversar no WhatsApp. O caderno também permanece acessível em outras páginas. Todas as escolhas são opcionais, persistem localmente e podem ser removidas. Blog → artigo → ambiente relacionado/briefing. UTM preservada. Nenhum envio automático de mensagens e nenhuma confirmação falsa de recebimento. CSV mantém o contrato posicional do importador SAAS---LEADS; integração direta depende de backend autorizado e configurado.

## Engenharia

Manter Vite/React da base. Pré-renderizar todas as rotas em HTML usando React DOM Server; hidratar apenas interações. Conteúdo editorial e projetos separados da interface. Sem nova biblioteca de UI/animação; remover Lenis e Framer Motion do bundle. Imagens WebP locais em tamanhos adequados, dimensões declaradas, lazy loading abaixo da abertura. Metadados únicos, canonical, sitemap, robots e schema Organization/Article/BreadcrumbList. Nenhum endereço, horário, avaliação ou cidade não confirmados.

## Responsividade e acessibilidade

Desktop com grade assimétrica; mobile com índice horizontal de ambientes, texto legível e foto dedicada. Sem scroll artificial. Formulário com labels, validação, feedback e resumo revisável. Navegação por teclado, skip link, foco visível, diálogo nativo com retorno de foco. Rascunho local recuperável; dados pessoais removíveis. QA 320/390/768/1440, favoritos, formulário, filtros, rotas, 404 e HTML sem JS.

## Composição e movimento da revisão

Abertura: fotografia de uma cena real do acervo, com véu escuro apenas para legibilidade; três escolhas trocam foto e contexto. Nenhum texto centralizado sobre brilho ou efeito abstrato. Prioridades: texto grande usado como controle, sem grade de cards. Acervo: uma foto principal e uma segunda referência em escala menor; botões anterior/próximo e tabs acessíveis. Interlúdio: um detalhe real de madeira com uma pergunta sobre usos particulares. Journal: links editoriais em lista, sem nova repetição de cards. Fecho vermelho: a marca chama para escutar o projeto individual.

Caderno: gatilho voluntário, painel nativo lateral, 400ms apenas em transform, superfície sempre opaca e legível, foco contido e restaurado. Mobile usa a largura disponível; reduced-motion remove entrada. Não há scroll interceptado, parallax ou animação que esconda conteúdo. Cena e prioridades ficam legíveis sem movimento. Fotos preservam dimensões; scripts e pixels externos não foram adicionados.
