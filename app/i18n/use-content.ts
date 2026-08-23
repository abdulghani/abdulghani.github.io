import { useTranslation } from "react-i18next";

import { content, languages, type Language } from "./config";

function resolve(language: string | undefined): Language {
  const base = (language ?? "en").split("-")[0];
  return (languages as readonly string[]).includes(base) ? (base as Language) : "en";
}

/** The copy for the active language, plus the setter the toggle uses. */
export function useContent() {
  const { i18n } = useTranslation();
  const language = resolve(i18n.resolvedLanguage ?? i18n.language);

  return {
    t: content[language],
    language,
    setLanguage: (next: Language) => i18n.changeLanguage(next),
  };
}
