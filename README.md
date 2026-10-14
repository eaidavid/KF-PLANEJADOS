# ART Móveis Interiores

Site de móveis planejados com acervo, referências salvas, journal e briefing. Mantém Vite/React da base original e gera HTML completo para todas as páginas em produção.

A direção atual é **Ninguém mora como você**: cenas de rotina, escolhas de prioridades e um caderno pessoal que acompanha o visitante até a conversa sobre o projeto. A home usa fotografia imersiva do acervo, tipografia Manrope em grande escala e composição de atelier; o catálogo é uma etapa da experiência.

## Rodar e publicar

```bash
npm ci
npm run dev
npm run build
node scripts/serve.mjs
vercel deploy --prod --yes
```

O preview estático em `http://127.0.0.1:5173` corresponde ao HTML publicado. O build gera o cliente, um bundle de renderização e 28 páginas em `dist`. Projeto Vercel: `kf-planejados`; endereço público `https://artmoveis.vercel.app`. URLs limpas e 404 real, sem redirecionamento geral à página inicial.

## Editar

- `src/data/catalog.js`: marca, contato, categorias, projetos e perguntas.
- `src/data/articles.js`: artigos completos e conteúdo editorial.
- `src/pages/`: páginas com responsabilidades próprias.
- `src/components/`: navegação, fotos, projetos e briefing.
- `src/index.css`: tokens e layouts responsivos.
- `scripts/prerender.mjs`: rotas, metadados, schema, sitemap e robots.

Adicionar projetos/artigos ao conteúdo e executar o build atualiza as páginas e o sitemap. Fotos selecionadas do acervo original, sem novas imagens de projetos inventados. Nomes editoriais não representam clientes/localidades. WhatsApp `(14) 99851-5849` confirmado no Linktree da marca em 14/10/2026: https://linktr.ee/artmoveisinteriores_. Não foram inventados endereço, garantia, prazo, avaliações ou métricas comerciais.

## Briefing e prospecção

### Caderno pessoal

O visitante escolhe entre receber à mesa, ter tudo à mão e encontrar seu canto; a cena muda a fotografia e o contexto da abertura. As prioridades são opcionais e múltiplas. Cena, prioridades e referências ficam no caderno acessível pelo cabeçalho. Elas persistem localmente e entram no resumo do briefing para WhatsApp/CSV. O painel usa `dialog` nativo com foco contido, Escape e retorno de foco. Em dispositivos móveis ele ocupa a largura disponível; a superfície permanece opaca durante a entrada. Todas as escolhas podem ser removidas.

O visitante escolhe ambientes, informa o contexto e revisa o resumo. A ação final abre o WhatsApp com o texto pronto; a pessoa decide enviar. Favoritos e rascunho são locais, removíveis em `/privacidade`. Não há confirmação falsa de recebimento.

Parâmetros UTM são preservados na sessão e incluídos no resumo. Exemplo para prospecção:

```text
https://artmoveis.vercel.app/?utm_source=prospeccao&utm_medium=whatsapp&utm_campaign=planejados
```

O download CSV usa as 19 colunas posicionais do `ImportController` de `eaidavid/SAAS---LEADS`. Nome na coluna E, cidade/endereço na F, telefone na I/K, categoria na O, briefing/origem na Q. O arquivo não é enviado automaticamente ao CRM. Esta versão não conecta bancos, não cria leads no servidor e não envia mensagens automaticamente. Telefone é opcional; o resumo enviado pelo WhatsApp identifica a pessoa na conversa.

## Verificações

QA utiliza Chrome instalado e Playwright do runtime disponível neste computador. `scripts/qa.mjs` exercita filtros, favoritos, rascunho, validação, exportação, UTM, menu, navegação e 404. `scripts/quality.mjs` verifica HTML e aplica axe às rotas principais. Ferramentas de auditoria, relatórios e capturas ficam em `qa/`, fora do bundle e do Git.

Fontes Literata e Manrope são locais, sob SIL Open Font License; origem em `public/fonts/SOURCES.txt`. WebP locais responsivos. Serviços externos usam `noopener noreferrer`. Sem pixels de marketing, credenciais no cliente ou endpoint público de dados pessoais.
