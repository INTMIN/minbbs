import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("bbs", "./bbs/list.tsx"),
    route("bbs/:id", "./bbs/detail.tsx"),
] satisfies RouteConfig;
