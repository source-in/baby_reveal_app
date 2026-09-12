"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { messages } from "@/lib/content";
import { MessageModal } from "./MessageModal";
import { EASE } from "./motion";
import { SCREENS } from "./screens";
import { BG_SIZES, Background, CircleButton, PageDots, THEME_BG } from "./ui";

const DOTS = 5;

const pageVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 40, scale: 1.03 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -40, scale: 0.97 }),
};

export function Story() {
  const [[index, dir], setPage] = useState<[number, number]>([0, 1]);
  const [openMessage, setOpenMessage] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const touchX = useRef<number | null>(null);

  const screen = SCREENS[index];
  const Current = screen.component;
  const nextBg = SCREENS[index + 1]?.bg;

  const go = useCallback((delta: number) => {
    setPage((prev) => {
      const n = Math.min(SCREENS.length - 1, Math.max(0, prev[0] + delta));
      return n === prev[0] ? prev : [n, delta];
    });
  }, []);

  const showMessage = useCallback((i: number | null) => {
    setOpenMessage(i);
    if (i !== null) setSeen((s) => new Set(s).add(i));
  }, []);

  // Dev helper: ?screen=3 jumps to a screen, ?message=0 opens a star message.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = Number(params.get("screen"));
    const m = params.get("message");
    /* eslint-disable react-hooks/set-state-in-effect */
    if (s > 0 && s < SCREENS.length) setPage([s, 1]);
    if (m !== null) showMessage(Number(m));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [showMessage]);

  useEffect(() => {
    if (openMessage !== null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, openMessage]);

  const showArrow = screen.arrow === true || (screen.arrow === "afterMessages" && seen.size === messages.length);
  const dotTone = screen.theme === "cream" ? "light" : "dark";
  const activeDot = Math.min(DOTS - 1, Math.floor((index / SCREENS.length) * DOTS));

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative h-full w-full overflow-hidden"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null || openMessage !== null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <AnimatePresence custom={dir}>
          <motion.div
            key={screen.id}
            custom={dir}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: EASE }}
            className={cn("absolute inset-0", THEME_BG[screen.theme])}
          >
            {screen.bg && <Background src={screen.bg} />}
            <Current next={() => go(1)} openMessage={showMessage} seenMessages={seen} />
          </motion.div>
        </AnimatePresence>

        {/* Warm the next screen's background so it's ready when we get there. */}
        {nextBg && (
          <div aria-hidden className="invisible absolute inset-0 -z-10">
            <Image src={nextBg} alt="" fill sizes={BG_SIZES} loading="eager" className="object-cover" />
          </div>
        )}

        {screen.dots && (
          <PageDots
            total={DOTS}
            active={activeDot}
            tone={dotTone}
            className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2"
          />
        )}
        {/* Back to the previous screen. */}
        <AnimatePresence>
          {index > 0 && (
            <motion.div
              key="back"
              className="absolute bottom-4 left-5 z-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <CircleButton direction="left" tone={dotTone} onClick={() => go(-1)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showArrow && (
            <motion.div
              key="arrow"
              className="absolute bottom-4 right-5 z-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <CircleButton tone={dotTone} nudge onClick={() => go(1)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {openMessage !== null && (
            <MessageModal
              key="message"
              index={openMessage}
              onChange={showMessage}
              onClose={() => showMessage(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
