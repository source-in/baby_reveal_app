import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { Heart } from "./art";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FadeUp({
  delay = 0,
  y = 16,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Gentle endless bobbing, like something floating on a cloud. */
export function Float({
  children,
  className,
  amplitude = 6,
  duration = 4,
  delay = 0,
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0], rotate: [-rotate, rotate, -rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/** A little heartbeat. */
export function Pulse({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ scale: [1, 1.22, 1, 1.12, 1] }}
      transition={{ duration: 1.6, times: [0, 0.15, 0.3, 0.45, 1], repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/** A breathing glow; style its colour and shape with `className`. */
export function Glow({ className, duration = 3, delay = 0 }: { className?: string; duration?: number; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ opacity: [0.45, 1, 0.45], scale: [0.95, 1.06, 0.95] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** Hearts popping outwards once. Re-mount with a new `key` to replay. */
export function HeartBurst({ count = 7 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute"
            initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
            animate={{ x: Math.cos(a) * 64, y: Math.sin(a) * 64 - 24, scale: 1, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Heart className="h-4 w-4" />
          </motion.span>
        );
      })}
    </div>
  );
}

/** Hearts drifting up from the bottom of the screen, forever. */
export function FloatingHearts({ count = 9 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const size = 10 + ((i * 7) % 12);
        return (
          <motion.div
            key={i}
            className="absolute bottom-0"
            style={{ left: `${(i * 37 + 8) % 92}%` }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: -700, opacity: [0, 0.9, 0.9, 0], x: [0, 14, -14, 0] }}
            transition={{ duration: 7 + (i % 4), delay: i * 0.9, repeat: Infinity, ease: "easeOut" }}
          >
            <Heart style={{ width: size, height: size }} color="#f7a8b8" />
          </motion.div>
        );
      })}
    </div>
  );
}
