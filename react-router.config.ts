import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode: no runtime server, index.html is pre-rendered at build time
  ssr: false,
} satisfies Config;
