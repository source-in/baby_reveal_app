import { moon } from "@/lib/content";
import { Twinkles } from "../art";
import { FadeUp, Glow } from "../motion";
import { PillButton, Screen, Title } from "../ui";
import type { ScreenProps } from ".";

export function Moon({ next }: ScreenProps) {
  return (
    <Screen theme="night">
      <Twinkles count={10} seed={5} top={3} bottom={60} />
      {/* Breathing halo over the painted moon. */}
      <Glow
        duration={4}
        className="absolute left-1/2 top-[41%] z-1 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,232,170,0.5)_35%,rgba(255,232,170,0)_68%)] mix-blend-screen"
      />

      <header className="relative z-10 px-7 pt-12 text-center">
        <Title lines={moon.title} className="text-glow" />
        <FadeUp delay={0.6}>
          <p className="text-glow mx-auto mt-3 max-w-64 text-[0.95rem] leading-snug text-white/90">{moon.subtitle}</p>
        </FadeUp>
      </header>

      <div className="absolute inset-x-0 bottom-16 z-10 flex flex-col items-center gap-5 px-8 text-center">
        <FadeUp delay={1.4}>
          <p className="text-glow max-w-52 text-[1rem] leading-snug text-white">{moon.footer}</p>
        </FadeUp>
        <FadeUp delay={1.9}>
          <PillButton breathe onClick={next} className="px-6 text-base">
            {moon.cta}
          </PillButton>
        </FadeUp>
      </div>
    </Screen>
  );
}
