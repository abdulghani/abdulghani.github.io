import { PhoneFrame } from "./phone-frame";

/**
 * Shared shell for every prototype: the device frame plus the reset control
 * underneath it. Each prototype passes the class that defines its --app-*
 * palette.
 */
export function PrototypeStage({
  palette,
  onReset,
  children,
}: {
  palette: string;
  onReset: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <PhoneFrame className={palette}>{children}</PhoneFrame>
      <button
        type="button"
        onClick={onReset}
        className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
      >
        Reset the prototype
      </button>
    </div>
  );
}
