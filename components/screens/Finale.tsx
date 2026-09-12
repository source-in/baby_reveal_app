import { motion } from "motion/react";
import { finale } from "@/lib/content";
import { Heart, ShootingStar, Twinkles } from "../art";
import { FadeUp, FloatingHearts, Pulse } from "../motion";
import { Screen } from "../ui";

export function Finale() {
  const words = finale.text.split(" ");

  return (
    <Screen theme="dusk">
      <Twinkles count={12} seed={9} top={5} bottom={45} />
      <ShootingStar top="22%" left="82%" delay={2.5} />
      <FloatingHearts />

      <div className="absolute inset-x-0 top-[19%] z-10 flex flex-col items-center px-10 text-center">
        <p className="text-glow font-hand text-[2.2rem] leading-[1.15] text-white">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.12 }}
            >
              {w}
            </motion.span>
          ))}
        </p>
        <FadeUp delay={0.8 + words.length * 0.12} className="mt-4">
          <Pulse>
            <Heart className="h-5 w-5" />
          </Pulse>
        </FadeUp>
      </div>

      <FadeUp
        delay={1.4 + words.length * 0.12}
        className="text-glow absolute inset-x-0 bottom-10 z-10 text-center text-[1.1rem] leading-snug text-white"
      >
        {finale.footer.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </FadeUp>
    </Screen>
  );
}
