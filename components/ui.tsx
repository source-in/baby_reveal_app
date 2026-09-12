import { motion, type HTMLMotionProps } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./art";
import { EASE } from "./motion";

export type Theme = "cream" | "night" | "dusk";

/** Fallback colour behind each screen (visible while its painted background loads). */
export const THEME_BG: Record<Theme, string> = {
  cream: "bg-[linear-gradient(180deg,#fdf6f0_0%,#fbefe9_65%,#f8e7e4_100%)]",
  night: "bg-[linear-gradient(180deg,#1f2750_0%,#343f71_55%,#555b8d_100%)]",
  dusk: "bg-[linear-gradient(180deg,#3b3865_0%,#65598a_45%,#a98fb2_100%)]",
};

export const BG_SIZES = "(max-width: 430px) 100vw, 430px";

export function Screen({ theme, children, className }: { theme: Theme; children: ReactNode; className?: string }) {
  return (
    <section
      className={cn("relative h-full w-full overflow-hidden", theme === "cream" ? "text-ink" : "text-white", className)}
    >
      {children}
    </section>
  );
}

/** Full-bleed painted background with a slow, gentle zoom-out. */
export function Background({ src }: { src: StaticImageData }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.08 }}
      animate={{ scale: 1 }}
      transition={{ duration: 9, ease: "easeOut" }}
    >
      <Image src={src} alt="" fill sizes={BG_SIZES} placeholder="blur" loading="eager" className="object-cover" />
    </motion.div>
  );
}

/** Handwritten title whose lines drift in one after another. */
export function Title({
  lines,
  className,
  size = "text-[2.6rem] leading-[1.08]",
  delay = 0.15,
}: {
  lines: string | string[];
  className?: string;
  size?: string;
  delay?: number;
}) {
  const list = Array.isArray(lines) ? lines : [lines];
  return (
    <h1 className={cn("font-hand", size, className)}>
      {list.map((l, i) => (
        <motion.span
          key={l}
          className="block"
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: delay + i * 0.18, ease: EASE }}
        >
          {l}
        </motion.span>
      ))}
    </h1>
  );
}

const BREATHE_SHADOW = [
  "0 8px 22px -6px rgba(234,169,168,0.6)",
  "0 8px 34px 4px rgba(246,190,186,0.95)",
  "0 8px 22px -6px rgba(234,169,168,0.6)",
];

export function PillButton({
  children,
  className,
  breathe = false,
  ...rest
}: HTMLMotionProps<"button"> & { breathe?: boolean }) {
  return (
    <motion.button
      {...rest}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      animate={breathe ? { boxShadow: BREATHE_SHADOW } : undefined}
      transition={breathe ? { boxShadow: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } } : undefined}
      className={cn(
        "flex items-center gap-3 rounded-full bg-blush px-8 py-3 text-lg text-ink shadow-[0_8px_24px_-6px_rgba(234,169,168,0.7)]",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}

export function CircleButton({
  direction = "right",
  tone = "light",
  nudge = false,
  className,
  ...rest
}: HTMLMotionProps<"button"> & { direction?: "left" | "right"; tone?: "light" | "dark"; nudge?: boolean }) {
  return (
    <motion.button
      aria-label={direction === "right" ? "Next" : "Previous"}
      {...rest}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.86 }}
      animate={nudge ? { x: [0, 4, 0] } : undefined}
      transition={nudge ? { x: { duration: 1.1, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" } } : undefined}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border disabled:opacity-40",
        tone === "light"
          ? "border-blush-deep/40 bg-white/85 text-ink shadow-soft"
          : "border-white/30 bg-white/15 text-white backdrop-blur-sm",
        className,
      )}
    >
      <ArrowIcon direction={direction} className="h-5 w-5" />
    </motion.button>
  );
}

export function PageDots({
  total,
  active,
  tone = "light",
  className,
}: {
  total: number;
  active: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-500",
            i === active ? "w-4" : "w-1.5",
            tone === "light" ? (i === active ? "bg-ink/70" : "bg-ink/20") : i === active ? "bg-white" : "bg-white/40",
          )}
        />
      ))}
    </div>
  );
}
