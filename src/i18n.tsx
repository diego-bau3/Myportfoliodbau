import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { homePath, languageFromPath, pathWithLanguage, replaceRoute } from "./routing.ts";

export const LANGUAGES = ["en", "es"] as const;
export type Language = (typeof LANGUAGES)[number];

/** Names stay in their own language — that's the convention for switchers. */
export const LANGUAGE_LABELS: Record<Language, { flag: string; name: string }> = {
  en: { flag: "🇺🇸", name: "English" },
  es: { flag: "🇲🇽", name: "Español" },
};

/** Every string that isn't project content. */
/** Section headings above the project grid. */
export type SectionId = "hardware" | "software" | "work";

type UiCopy = {
  tagline: string;
  primaryNavigation: string;
  work: string;
  hangarKicker: string;
  featuredProjects: string;
  explore: string;
  scrollToExplore: string;
  heroLinksAria: string;
  startupLink: string;
  portfolioNav: string;
  portfolioLink: string;
  detailKicker: string;
  close: string;
  closeAria: string;
  languageAria: string;
  openProject: (title: string) => string;
  sections: Record<SectionId, string>;
};

const UI: Record<Language, UiCopy> = {
  en: {
    tagline: "Mechanical Engineering · Aeronautics · Robotics",
    primaryNavigation: "Primary navigation",
    work: "Projects",
    hangarKicker: "Portfolio / Selected machines",
    featuredProjects: "Featured projects",
    explore: "Explore",
    scrollToExplore: "Scroll to explore",
    heroLinksAria: "Links",
    startupLink: "Ready2L — Robotics Startup",
    portfolioNav: "Portfolio",
    portfolioLink: "Portfolio PDF",
    detailKicker: "Project detail",
    close: "Close",
    closeAria: "Close project details",
    languageAria: "Language",
    openProject: (title) => `Open ${title} details`,
    sections: { hardware: "Hardware", software: "Software", work: "Work experience" },
  },
  es: {
    tagline: "Ingeniería Mecánica · Aeronáutica · Robótica",
    primaryNavigation: "Navegación principal",
    work: "Proyectos",
    hangarKicker: "Portafolio / Máquinas seleccionadas",
    featuredProjects: "Proyectos destacados",
    explore: "Explorar",
    scrollToExplore: "Desliza para explorar",
    heroLinksAria: "Enlaces",
    startupLink: "Ready2L — Startup de robótica",
    portfolioNav: "Portafolio",
    portfolioLink: "Portafolio PDF",
    detailKicker: "Detalle del proyecto",
    close: "Cerrar",
    closeAria: "Cerrar detalles del proyecto",
    languageAria: "Idioma",
    openProject: (title) => `Abrir detalles de ${title}`,
    sections: { hardware: "Hardware", software: "Software", work: "Experiencia laboral" },
  },
};

const STORAGE_KEY = "language";

function initialLanguage(): Language {
  const routed = languageFromPath();
  if (routed) return routed;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "es") return saved;
  return "en";
}

type LanguageValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  ui: UiCopy;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    const nextPath = pathWithLanguage(nextLanguage);
    replaceRoute(`${nextPath}${window.location.search}${window.location.hash}`);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(STORAGE_KEY, language);
    if (!languageFromPath()) {
      replaceRoute(`${homePath(language)}${window.location.search}${window.location.hash}`);
    }
  }, [language]);

  useEffect(() => {
    const syncLanguageFromRoute = (): void => {
      const routed = languageFromPath();
      if (routed) setLanguageState(routed);
    };

    window.addEventListener("popstate", syncLanguageFromRoute);
    return () => window.removeEventListener("popstate", syncLanguageFromRoute);
  }, []);

  const value = useMemo<LanguageValue>(
    () => ({ language, setLanguage, ui: UI[language] }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage needs a <LanguageProvider> above it");
  return value;
}
