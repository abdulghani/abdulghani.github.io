import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode: no runtime server.
  ssr: false,
  // Pre-render each route so the served HTML carries real markup and meta tags
  // instead of an empty shell. Anything else falls back to the SPA shell.
  prerender: ["/", "/portfolio", "/portfolio/salah", "/portfolio/task-manager", "/portfolio/wallet", "/portfolio/finance", "/portfolio/shop"],
} satisfies Config;
