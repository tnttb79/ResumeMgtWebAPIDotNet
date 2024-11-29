import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import ThemeProvider from "./context/theme.context.js";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
