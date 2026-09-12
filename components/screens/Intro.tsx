import { intro } from "@/lib/content";
import { ArrowIcon, Heart, ShootingStar, Twinkles } from "../art";
import { FadeUp, Pulse } from "../motion";
import { PillButton, Screen, Title } from "../ui";
import type { ScreenProps } from ".";

export function Intro({ next }: ScreenProps) {
  return (
    <Screen theme="night">
      <Twinkles count={16} seed={3} top={8} bottom={58} />
      <ShootingStar top="20%" left="70%" delay={2.5} />

      <div className="absolute inset-x-0 top-[31%] z-10 flex flex-col items-center px-8 text-center">
        <Title lines={intro.title} size="text-[2.4rem] leading-[1.12]" className="text-glow" delay={0.4} />
        <FadeUp delay={1.2} className="mt-2">
          <Pulse>
            <Heart className="h-4 w-4" />
          </Pulse>
        </FadeUp>
        <FadeUp delay={1.4}>
          <p className="text-glow mt-3 max-w-60 text-[0.95rem] leading-snug text-white/95">{intro.subtitle}</p>
        </FadeUp>
      </div>

      <FadeUp delay={1.9} className="absolute inset-x-0 bottom-[7%] z-20 flex justify-center">
        <PillButton breathe onClick={next}>
          {intro.cta} <ArrowIcon className="h-5 w-5" />
        </PillButton>
      </FadeUp>
    </Screen>
  );
}
