import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layout/layout.tsx", [
    index("./bbs/list.jsx"),
    route("bbs/:id", "./bbs/detail.tsx"),
  ]),
] satisfies RouteConfig;
