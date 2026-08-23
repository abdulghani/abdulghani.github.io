import { PhoneFrame } from "./phone-frame";
import { useContent } from "~/i18n/use-content";

/**
 * Shared shell for every prototype: the device frame plus the reset control
 * underneath it. Each prototype passes the class that defines its --app-*
 * palette.
 */
export function PrototypeStage({
  palette,
  onReset,
  children,
  time,
  controls,
}: {
  palette: string;
  onReset: () => void;
  children: React.ReactNode;
  time?: string;
  /** Prototype-level controls shown under the device, outside the app itself. */
  controls?: React.ReactNode;
}) {
  const { t } = useContent();

  return (
    <div className="flex flex-col items-center gap-4">
      <PhoneFrame className={palette} time={time}>
        {children}
      </PhoneFrame>
      {controls}

      <button
        type="button"
        onClick={onReset}
        className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
      >
        {t.ui.resetPrototype}
      </button>
    </div>
  );
}
