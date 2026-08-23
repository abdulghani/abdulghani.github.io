import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode: no runtime server.
  ssr: false,
  // Pre-render the one route so the served HTML carries real markup and meta
  // tags instead of an empty shell.
  prerender: ["/"],
} satisfies Config;
