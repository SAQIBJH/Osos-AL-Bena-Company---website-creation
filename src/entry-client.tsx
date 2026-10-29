import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "@fontsource/barlow/latin-400.css";
import "@fontsource/barlow/latin-500.css";
import "@fontsource/barlow/latin-600.css";
import "@fontsource/barlow-condensed/latin-600.css";
import "./styles.css";
const root = document.getElementById("root")!;
const path = window.location.pathname.endsWith("/")
  ? window.location.pathname
  : window.location.pathname + "/";
const app = <App path={path} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
