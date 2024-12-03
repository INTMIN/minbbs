import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  layout("./layout/layout.tsx", [
    route("bbs", "./bbs/list.jsx"),
    route("bbs/:id", "./bbs/detail.tsx"),
  ]),
] satisfies RouteConfig;
