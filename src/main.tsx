// src/main.tsx
import "./styles/aetheris-colors.css";
import "./styles/tomy-ui.css";


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
// loading AFTER index.css to allow overrides
import "./styles/projects.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
