# abdulghani.github.io

Personal portfolio of Abdul Ghani — senior back-end engineer, Jakarta (GMT+8).

Live at **https://abdulghani.github.io**

## Stack

- **React Router 8** in framework mode, running as an SPA (`ssr: false`) — the
  build pre-renders `index.html` and the app takes over on the client.
- **Tailwind CSS 4** with the design tokens in `app/app.css`.
- **shadcn/ui** (Radix primitives) for card, badge, separator, button, tooltip.
- **i18next / react-i18next** for English and Indonesian, with the copy held in
  typed content objects (`app/i18n/content/`) rather than flat keys.
- **Vite** for the build; deployed to GitHub Pages by
  `.github/workflows/deploy.yml` on every push to `master`.

## Layout

```
app/
  root.tsx              document shell, fonts, theme bootstrap
  routes.ts             route config (single index route)
  routes/home.tsx       page composition + meta
  data/resume.ts        language-independent facts: companies, links, tags
  i18n/
    config.ts           i18next setup (querystring → localStorage → navigator)
    content/en.ts       English copy; its shape is the Content type
    content/id.ts       Indonesian copy, checked against that type
    use-content.ts      useContent() → copy for the active language
  components/
    site-rail.tsx       sticky rail: name, nav, contacts
    section-heading.tsx
    theme-toggle.tsx    system / light / dark
    sections/           about, experience, stack, education
    ui/                 shadcn components
  hooks/
    use-active-section.ts   scroll-spy for the rail nav
```

Site copy lives in `app/i18n/content/` — edit both locales there, not in the
components. Adding a string to `en.ts` makes `id.ts` fail to type-check until it
is translated too.

Append `?lang=id` (or `?lang=en`) to any URL to force a language; the choice is
remembered in `localStorage`. The prototypes' own UI stays in English, since
their screens reproduce English-language design comps.

## Development

Node 24 (see `.nvmrc`); React Router 8 needs Node > 22.22.

```sh
nvm use
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # → build/client
```

`npm run build` also copies `index.html` to `404.html` so client-side routes
survive a hard refresh on GitHub Pages.

The previous 2017 university project that lived in this repo has been archived
outside of git history.
