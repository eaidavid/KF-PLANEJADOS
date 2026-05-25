# Art Móveis Interiores — Site

Landing page institucional para a **Art Móveis Interiores** (móveis planejados), com portfólio, formulário de orçamento em etapas e integração com WhatsApp/Instagram.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## Personalização

Edite `src/siteConfig.js` para alterar:

- Textos, cores e imagens
- Links de redes sociais (Instagram, WhatsApp, e-mail)
- Número do WhatsApp (`contact.whatsapp` — formato: `55DDDNUMERO`, sem símbolos)
- Endereço e contatos reais

O logo está em `public/assets/logo-art-moveis.png`.

## Link na bio

Página estilo Linktree em **`/link-bio`** (site principal continua na raiz `/`).

```text
http://localhost:5173/link-bio
```

Links e textos: `siteConfig.linkBio` em `src/siteConfig.js`.

## Build

```bash
npm run build
npm run preview
```

Arquivos estáticos em `dist/` — prontos para hospedar na Vercel, Netlify, etc. O arquivo `public/_redirects` e `vercel.json` garantem que `/link-bio` funcione em produção.
