import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { en } from "./content/en";
import { id } from "./content/id";

export const languages = ["en", "id"] as const;
export type Language = (typeof languages)[number];

export const content: Record<Language, typeof en> = { en, id };

/**
 * i18next owns the language itself — detection, persistence and the re-render
 * on change. The copy lives in typed content objects rather than flat keys, so
 * structured things like the role list stay type-checked.
 */
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: {} },
      id: { translation: {} },
    },
    supportedLngs: languages,
    fallbackLng: "en",
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lang",
      lookupLocalStorage: "language",
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

export default i18next;
