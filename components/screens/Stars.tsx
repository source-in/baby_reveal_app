import { motion } from "motion/react";
import { messages, stars } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Art, EmojiArt, Heart, ShootingStar, StarShape, Twinkles } from "../art";
import { FadeUp, Float, Glow } from "../motion";
import { Screen, Title } from "../ui";
import type { ScreenProps } from ".";

export function Stars({ openMessage, seenMessages }: ScreenProps) {
  return (
    <Screen theme="night">
      <Twinkles count={12} seed={7} top={5} bottom={70} />
      <ShootingStar top="32%" left="88%" delay={3.5} />

      <div className="relative z-10 px-6 pt-12 text-center">
        <Title lines={stars.title} className="text-glow" />
        <FadeUp delay={1.8}>
          <p className="text-glow mt-1 text-sm text-white/85">{stars.hint}</p>
        </FadeUp>
      </div>

      <div className="relative z-10 mt-1 grid grid-cols-2 gap-x-3 gap-y-1 px-5">
        {messages.map((m, i) => (
          <motion.button
            key={i}
            onClick={() => openMessage(i)}
            className={cn(
              "flex flex-col items-center",
              i === 0 && "mt-5",
              i === 2 && "mt-1",
              // An odd number of stars: centre the last one across both columns.
              messages.length % 2 === 1 && i === messages.length - 1 && "col-span-2",
            )}
            initial={{ opacity: 0, scale: 0.3, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 170, damping: 13, delay: 0.6 + i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <Float amplitude={6} duration={3.4 + i * 0.5} delay={i * 0.4} rotate={2.5} className="relative w-40 max-w-full">
              <Glow
                duration={2.6 + i * 0.3}
                className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(255,226,140,0.6)_0%,rgba(255,226,140,0)_70%)]"
              />
              {m.starArt ? (
                <Art
                  asset={m.starArt}
                  sizes="180px"
                  className="relative mx-auto aspect-square w-full drop-shadow-[0_0_14px_rgba(246,212,126,0.55)]"
                  fallback={null}
                />
              ) : (
                <>
                  <StarShape className="relative w-full drop-shadow-[0_0_14px_rgba(246,212,126,0.5)]" />
                  <div className="absolute inset-x-[22%] top-[34%] h-[42%]">
                    <EmojiArt emoji={m.emoji} className="text-[2.2rem]" />
                  </div>
                </>
              )}
              {seenMessages.has(i) && (
                <motion.span
                  className="absolute right-[16%] top-[26%]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                >
                  <Heart className="h-4 w-4 drop-shadow" />
                </motion.span>
              )}
            </Float>
            <span
              className={cn(
                "text-glow text-[0.8rem] leading-tight text-white/95",
                m.starArt ? "mt-1" : "-mt-3",
              )}
            >
              {m.starLabel}
              {m.starSub && <span className="block">{m.starSub}</span>}
            </span>
          </motion.button>
        ))}
      </div>
    </Screen>
  );
}
