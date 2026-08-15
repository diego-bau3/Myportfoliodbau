import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

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
  about: string;
  hangarKicker: string;
  featuredProjects: string;
  explore: string;
  scrollToExplore: string;
  hangarNextKicker: string;
  hangarNextTitle: string;
  heroLinksAria: string;
  startupLink: string;
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
    tagline: "Mechanical Engineering | Aeronautics | Robotics",
    primaryNavigation: "Primary navigation",
    work: "Work",
    about: "About",
    hangarKicker: "Portfolio / Selected machines",
    featuredProjects: "Featured projects",
    explore: "Explore",
    scrollToExplore: "Scroll to explore",
    hangarNextKicker: "Next milestone",
    hangarNextTitle: "Project details will become technical stations inside this same hangar.",
    heroLinksAria: "Links",
    startupLink: "My Robotics Startup",
    portfolioLink: "Portafolio [50p]",
    detailKicker: "Project detail",
    close: "Close",
    closeAria: "Close project details",
    languageAria: "Language",
    openProject: (title) => `Open ${title} details`,
    sections: { hardware: "Hardware", software: "Software", work: "Work experience" },
  },
  es: {
    tagline: "Ingeniería Mecánica | Aeronáutica | Robótica",
    primaryNavigation: "Navegación principal",
    work: "Proyectos",
    about: "Acerca de",
    hangarKicker: "Portafolio / Máquinas seleccionadas",
    featuredProjects: "Proyectos destacados",
    explore: "Explorar",
    scrollToExplore: "Desliza para explorar",
    hangarNextKicker: "Siguiente etapa",
    hangarNextTitle: "Los detalles de cada proyecto serán estaciones técnicas dentro de este mismo hangar.",
    heroLinksAria: "Enlaces",
    startupLink: "Mi Startup de Robótica",
    portfolioLink: "Portafolio [50p]",
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
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

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
