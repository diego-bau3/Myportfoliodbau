import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import LanguageToggle from "./components/LanguageToggle.tsx";
import { LanguageProvider } from "./i18n.tsx";
import HangarScreen from "./screens/HangarScreen.tsx";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element in index.html");

createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      {/* Outside the screen, so it stays put on every screen we ever add. */}
      <LanguageToggle />
      <HangarScreen />
    </LanguageProvider>
  </StrictMode>,
);
