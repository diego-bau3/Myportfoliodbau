import { LANGUAGE_LABELS, LANGUAGES, useLanguage } from "../i18n.tsx";

export default function LanguageToggle() {
  const { language, setLanguage, ui } = useLanguage();

  return (
    <div
      className="language-toggle"
      role="group"
      aria-label={ui.languageAria}
      data-language={language}
    >
      {/* Slides between the two halves, so the pair reads as one control. */}
      <span className="language-toggle-thumb" aria-hidden="true" />
      {LANGUAGES.map((code) => {
        const { flag, name } = LANGUAGE_LABELS[code];
        return (
          <button
            key={code}
            type="button"
            aria-label={name}
            aria-pressed={language === code}
            title={name}
            onClick={() => setLanguage(code)}
          >
            <span aria-hidden="true">{flag}</span>
          </button>
        );
      })}
    </div>
  );
}
