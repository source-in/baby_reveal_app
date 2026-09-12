import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { messages } from "@/lib/content";
import { Art, EmojiArt, Heart, Sparkles } from "./art";
import { Float, Pulse } from "./motion";
import { CircleButton, PageDots } from "./ui";

export function MessageModal({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const m = messages[index];
  const isLast = index === messages.length - 1;
  // Longer letters get a smaller portrait and tighter text so the sign-off still fits.
  const long = m.body.join(" ").length > 260;

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-night/55 px-3 py-6 backdrop-blur-[3px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative flex h-full max-h-190 w-full flex-col overflow-hidden rounded-[1.75rem] bg-cream px-7 pb-5 pt-10 text-center text-ink shadow-2xl"
        initial={{ y: 60, scale: 0.85, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          aria-label="Close"
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.8 }}
          className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center text-2xl leading-none text-ink/70"
        >
          ×
        </motion.button>

        <Sparkles
          items={[
            { x: "12%", y: "22%", size: 20 },
            { x: "82%", y: "30%", size: 12 },
          ]}
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="flex-1 overflow-y-auto"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.28 }}
          >
            <p className="text-sm text-ink-soft">A message from</p>
            <h2 className="font-hand text-[1.9rem] leading-tight">{m.from}</h2>
            {m.side && <p className="text-sm text-ink-soft">{m.side}</p>}

            <Float amplitude={5} duration={3.5} className={cn("mx-auto", m.art ? (long ? "mt-3 h-44 w-44" : "mt-4 h-56 w-56") : "mt-6 h-48 w-64")}>
              <Art
                asset={m.art}
                sizes="240px"
                className={cn("h-full w-full", m.art && "soft-portrait")}
                fallback={<EmojiArt emoji={m.emoji} className="text-[6.5rem]" />}
              />
            </Float>

            <div
              className={cn(
                "mx-auto mt-5 max-w-68 space-y-3 text-ink-soft",
                long ? "text-[0.9rem] leading-[1.45]" : "text-[0.95rem] leading-relaxed",
              )}
            >
              {m.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <Pulse className="mx-auto mt-5 w-fit">
              <Heart className="h-4 w-4" />
            </Pulse>

            <p className="mt-5 text-sm text-ink-soft">{m.signoffLead}</p>
            <p className="font-hand text-[1.6rem] leading-tight">{m.signName} ♡</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between">
          <CircleButton direction="left" disabled={index === 0} onClick={() => onChange(index - 1)} />
          <PageDots total={messages.length} active={index} />
          <CircleButton onClick={() => (isLast ? onClose() : onChange(index + 1))} />
        </div>
      </motion.div>
    </motion.div>
  );
}
