import { cn } from "~/lib/utils";
import type { ArtKind } from "./shop-store";

/**
 * Stand-in product photography: each garment is drawn as flat SVG art tinted
 * by the selected colourway, so the prototype ships no borrowed imagery.
 */
export function ProductArt({
  art,
  hex,
  className,
  shade = true,
}: {
  art: ArtKind;
  hex: string;
  className?: string;
  shade?: boolean;
}) {
  const dark = isDark(hex);
  const stroke = dark ? "rgba(255,255,255,0.35)" : "rgba(15,15,15,0.28)";
  const shadow = dark ? "rgba(255,255,255,0.12)" : "rgba(15,15,15,0.08)";

  return (
    <svg viewBox="0 0 120 120" className={cn("size-full", className)} role="presentation">
      {shade && (
        <ellipse cx="60" cy="108" rx="34" ry="5" fill={shadow} />
      )}
      <g fill={hex} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round">
        {art === "sweater" && (
          <>
            <path d="M40 26h40l18 12-9 14-7-5v45H38V47l-7 5-9-14z" />
            <path d="M50 26c3 6 17 6 20 0" fill="none" />
          </>
        )}
        {art === "hoodie" && (
          <>
            <path d="M42 28h36l18 13-9 14-7-5v42H40V50l-7 5-9-14z" />
            <path d="M46 26c5 10 23 10 28 0" fill="none" />
            <path d="M50 70h20v10H50z" fill="none" />
            <path d="M58 34v10M62 34v10" fill="none" />
          </>
        )}
        {art === "shirt" && (
          <>
            <path d="M44 28h32l20 11-8 15-6-4v42H38V50l-6 4-8-15z" />
            <path d="M52 28l8 10 8-10" fill="none" />
            <path d="M60 40v50" fill="none" />
          </>
        )}
        {art === "jacket" && (
          <>
            <path d="M42 28h36l18 12-8 14-6-4v42H38V50l-6 4-8-14z" />
            <path d="M52 28l8 8 8-8" fill="none" />
            <path d="M60 36v56M44 66h12M64 66h12" fill="none" />
          </>
        )}
        {art === "sneaker" && (
          <>
            <path d="M20 78c0-10 6-14 10-22 3-6 5-14 5-14l14 6c0 6 4 10 12 14l24 10c8 3 14 5 14 12v6H24z" />
            <path d="M18 84h84v10H18z" />
            <path d="M50 62l10 6M60 68l8 5" fill="none" />
          </>
        )}
        {art === "beanie" && (
          <>
            <path d="M30 74a30 30 0 0 1 60 0z" />
            <rect x="26" y="72" width="68" height="16" rx="8" />
          </>
        )}
        {art === "bag" && (
          <>
            <rect x="22" y="52" width="76" height="40" rx="14" />
            <path d="M46 52V44a14 14 0 0 1 28 0v8" fill="none" />
            <path d="M22 70h76" fill="none" />
          </>
        )}
      </g>
    </svg>
  );
}

function isDark(hex: string) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
