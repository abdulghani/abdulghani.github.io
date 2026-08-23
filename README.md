# abdulghani.github.io

Personal portfolio of Abdul Ghani — senior back-end engineer, Jakarta (GMT+8).

Live at **https://abdulghani.github.io**

## Stack

- **React Router 8** in framework mode, running as an SPA (`ssr: false`) — the
  build pre-renders `index.html` and the app takes over on the client.
- **Tailwind CSS 4** with the design tokens in `app/app.css`.
- **shadcn/ui** (Radix primitives) for card, badge, separator, button, tooltip.
- **Vite** for the build; deployed to GitHub Pages by
  `.github/workflows/deploy.yml` on every push to `master`.

## Layout

```
app/
  root.tsx              document shell, fonts, theme bootstrap
  routes.ts             route config (single index route)
  routes/home.tsx       page composition + meta
  data/resume.ts        all portfolio content, typed
  components/
    site-rail.tsx       sticky rail: name, nav, contacts
    section-heading.tsx
    theme-toggle.tsx    system / light / dark
    sections/           about, experience, stack, education
    ui/                 shadcn components
  hooks/
    use-active-section.ts   scroll-spy for the rail nav
```

Content lives in `app/data/resume.ts` — edit there, not in the components.

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
