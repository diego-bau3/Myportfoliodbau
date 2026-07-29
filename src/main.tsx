import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import LanguageToggle from "./components/LanguageToggle.tsx";
import { LanguageProvider } from "./i18n.tsx";
import LandingScreen from "./screens/LandingScreen.tsx";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element in index.html");

createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      {/* Outside the screen, so it stays put on every screen we ever add. */}
      <LanguageToggle />
      <LandingScreen />
    </LanguageProvider>
  </StrictMode>,
);
