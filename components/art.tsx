import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { ImageSrc } from "@/lib/assets";
import { cn } from "@/lib/cn";

type SvgProps = { className?: string; style?: CSSProperties };

function starPoints(cx: number, cy: number, outer: number, inner: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? inner : outer;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

const STAR = starPoints(60, 64, 50, 25);
const SPARKLE = "M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z";

/** Chubby rounded star, optionally with a sleepy smile. */
export function StarShape({
  className,
  style,
  color = "#f6d47e",
  face = false,
}: SvgProps & { color?: string; face?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} aria-hidden>
      <polygon points={STAR} fill={color} stroke={color} strokeWidth={12} strokeLinejoin="round" />
      {face && (
        <g>
          <ellipse cx="49" cy="66" rx="3.2" ry="4" fill="#5a4636" />
          <ellipse cx="71" cy="66" rx="3.2" ry="4" fill="#5a4636" />
          <path d="M53 75 Q60 82 67 75" stroke="#5a4636" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <circle cx="42" cy="75" r="4" fill="#f4a9a0" opacity="0.6" />
          <circle cx="78" cy="75" r="4" fill="#f4a9a0" opacity="0.6" />
        </g>
      )}
    </svg>
  );
}

export type Spark = { x: string; y: string; size: number };

export function Sparkles({ items, color = "#f6d47e" }: { items: Spark[]; color?: string }) {
  return (
    <>
      {items.map((s, i) => (
        <StarShape
          key={i}
          color={color}
          className="pointer-events-none absolute"
          style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
        />
      ))}
    </>
  );
}

function twinkleField(count: number, seed: number, top: number, bottom: number) {
  let s = seed * 9973;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: top + rand() * (bottom - top),
    size: 2 + rand() * 3,
    delay: rand() * 4,
    duration: 2.4 + rand() * 2.4,
    sparkle: rand() > 0.6,
  }));
}

/** Softly twinkling dots and sparkles, scattered deterministically by `seed`. */
export function Twinkles({
  count = 14,
  seed = 1,
  top = 0,
  bottom = 60,
}: {
  count?: number;
  seed?: number;
  top?: number;
  bottom?: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-1">
      {twinkleField(count, seed, top, bottom).map((t, i) => {
        const style = {
          left: `${t.x}%`,
          top: `${t.y}%`,
          animationDelay: `${t.delay}s`,
          animationDuration: `${t.duration}s`,
        };
        return t.sparkle ? (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="absolute animate-twinkle"
            style={{ ...style, width: t.size * 3.4, height: t.size * 3.4 }}
            aria-hidden
          >
            <path d={SPARKLE} fill="#fff4d0" />
          </svg>
        ) : (
          <span
            key={i}
            className="absolute animate-twinkle rounded-full bg-[#fff6dc] shadow-[0_0_6px_1px_rgba(255,240,200,0.8)]"
            style={{ ...style, width: t.size, height: t.size }}
          />
        );
      })}
    </div>
  );
}

export function ShootingStar({ top, left, delay = 0 }: { top: string; left: string; delay?: number }) {
  return (
    <span
      className="pointer-events-none absolute z-1 h-0.5 w-24 animate-shoot rounded-full bg-[linear-gradient(90deg,#fff,rgba(255,255,255,0))] opacity-0"
      style={{ top, left, animationDelay: `${delay}s` }}
    />
  );
}

export function Heart({ className, style, color = "#ec8c9c" }: SvgProps & { color?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={className} style={style} aria-hidden>
      <path
        d="M12 20.5s-8-5-10.2-10A5.6 5.6 0 0 1 12 4.6a5.6 5.6 0 0 1 10.2 5.9C20 15.5 12 20.5 12 20.5z"
        fill={color}
      />
    </svg>
  );
}

export function ArrowIcon({ className, direction = "right" }: { className?: string; direction?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(className, direction === "left" && "rotate-180")}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Renders `asset` when set, otherwise the fallback placeholder. Size comes from `className`. */
export function Art({
  asset,
  fallback,
  className,
  alt = "",
  sizes = "300px",
}: {
  asset: ImageSrc;
  fallback: ReactNode;
  className?: string;
  alt?: string;
  sizes?: string;
}) {
  return (
    <div className={cn("pointer-events-none", className)}>
      {asset ? (
        <div className="relative h-full w-full">
          <Image
            src={asset}
            alt={alt}
            fill
            sizes={sizes}
            placeholder={typeof asset === "string" ? "empty" : "blur"}
            className="object-contain"
          />
        </div>
      ) : (
        fallback
      )}
    </div>
  );
}

export function EmojiArt({ emoji, className }: { emoji: string; className?: string }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center leading-none", className)}>
      <span>{emoji}</span>
    </div>
  );
}
