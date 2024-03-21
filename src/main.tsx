import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import { AppRoutes } from "./routes";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
