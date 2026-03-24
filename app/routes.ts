import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Main page — your app lives here
  index("routes/home.tsx"),

  // Server-side API route for Gemini calls (keeps API key safe)
  route("api/gemini", "routes/api.gemini.tsx"),
] satisfies RouteConfig;
