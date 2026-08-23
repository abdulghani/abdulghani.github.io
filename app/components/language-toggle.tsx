import { cn } from "~/lib/utils";
import { languages } from "~/i18n/config";
import { useContent } from "~/i18n/use-content";

const LABEL: Record<string, string> = { en: "EN", id: "ID" };

export function LanguageToggle() {
  const { t, language, setLanguage } = useContent();

  return (
    <div
      role="group"
      aria-label={t.ui.language}
      className="flex items-center gap-0.5 rounded-sm border p-0.5"
    >
      {languages.map((code) => {
        const active = language === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => setLanguage(code)}
            className={cn(
              "rounded-[2px] px-1.5 py-0.5 font-mono text-[0.62rem] tracking-[0.08em] transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {LABEL[code]}
          </button>
        );
      })}
    </div>
  );
}
