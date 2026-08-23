import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("portfolio", "routes/portfolio.tsx"),
  route("portfolio/task-manager", "routes/task-manager.tsx"),
  route("portfolio/wallet", "routes/wallet.tsx"),
  route("portfolio/finance", "routes/finance.tsx"),
] satisfies RouteConfig;
