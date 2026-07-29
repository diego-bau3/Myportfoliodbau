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
type UiCopy = {
  tagline: string;
  heroLinksAria: string;
  startupLink: string;
  portfolioLink: string;
  detailKicker: string;
  close: string;
  closeAria: string;
  languageAria: string;
  openProject: (title: string) => string;
};

const UI: Record<Language, UiCopy> = {
  en: {
    tagline: "Mechanical Engineering | Aeronautics | Robotics",
    heroLinksAria: "Links",
    startupLink: "My Startup",
    portfolioLink: "100 page portfolio",
    detailKicker: "Project detail",
    close: "Close",
    closeAria: "Close project details",
    languageAria: "Language",
    openProject: (title) => `Open ${title} details`,
  },
  es: {
    tagline: "Ingeniería Mecánica | Aeronáutica | Robótica",
    heroLinksAria: "Enlaces",
    startupLink: "Mi Startup",
    portfolioLink: "Portafolio de 100 páginas",
    detailKicker: "Detalle del proyecto",
    close: "Cerrar",
    closeAria: "Cerrar detalles del proyecto",
    languageAria: "Idioma",
    openProject: (title) => `Abrir detalles de ${title}`,
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
