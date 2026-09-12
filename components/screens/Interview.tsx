import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { interview } from "@/lib/content";
import { cn } from "@/lib/cn";
import { FadeUp } from "../motion";
import { BG_SIZES, Screen, Title } from "../ui";

export function Interview() {
  const [i, setI] = useState(0);
  const cards = interview.cards;
  const card = cards[i];

  return (
    <Screen theme="cream" className="flex flex-col">
      {/* The current card, softly blurred, doubles as the background. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image src={card.src} alt="" fill sizes={BG_SIZES} className="scale-110 object-cover opacity-60 blur-2xl" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-cream/45" />

      <header className="relative z-10 shrink-0 px-7 pt-10 text-center">
        <Title lines={interview.title} size="text-[2.3rem] leading-[1.08]" />
        <FadeUp delay={0.5}>
          <p className="mx-auto mt-1 max-w-64 text-[0.95rem] leading-snug text-ink-soft">{interview.subtitle}</p>
        </FadeUp>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-5 pb-24 pt-4">
        <FadeUp delay={0.7} y={40} className="relative aspect-29/50 h-full max-w-full">
          <div className="absolute inset-0 translate-x-2 rotate-4 rounded-[1.75rem] bg-white/70 shadow-soft" />
          <div className="absolute inset-0 -translate-x-1 -rotate-3 rounded-[1.75rem] bg-white/85 shadow-soft" />
          <AnimatePresence initial={false}>
            <motion.button
              key={i}
              onClick={() => setI((i + 1) % cards.length)}
              aria-label="Next answer"
              className="absolute inset-0 overflow-hidden rounded-[1.75rem] border-4 border-white shadow-soft"
              initial={{ opacity: 0, x: 80, rotate: 8, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, x: -120, rotate: -10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 130, damping: 18 }}
              whileTap={{ scale: 0.97 }}
            >
              <Image src={card.src} alt={card.alt} fill sizes="320px" placeholder="blur" className="object-cover" />
            </motion.button>
          </AnimatePresence>
        </FadeUp>
      </div>

      <FadeUp delay={1.2} className="absolute inset-x-0 bottom-14 z-10 flex flex-col items-center gap-1.5">
        <div className="flex gap-1.5">
          {cards.map((c, j) => (
            <button
              key={c.alt}
              onClick={() => setI(j)}
              aria-label={`Question ${j + 1}`}
              className={cn("h-2 rounded-full transition-all duration-300", j === i ? "w-5 bg-rose" : "w-2 bg-rose/35")}
            />
          ))}
        </div>
        <p className="text-xs text-ink-soft">{interview.hint}</p>
      </FadeUp>
    </Screen>
  );
}
