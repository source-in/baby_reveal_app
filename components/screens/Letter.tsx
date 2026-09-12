import { letter } from "@/lib/content";
import { Heart } from "../art";
import { FadeUp, Pulse } from "../motion";
import { Screen, Title } from "../ui";

export function Letter() {
  return (
    <Screen theme="cream">
      <div className="absolute inset-x-0 top-[15%] z-10 px-8">
        <Title lines={letter.title} size="text-[3.3rem] leading-none" />
        <div className="mt-5 space-y-4 text-[1.02rem] leading-normal text-ink-soft">
          {letter.paragraphs.map((p, i) => (
            <FadeUp key={p} delay={0.7 + i * 0.35}>
              <p>{p}</p>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={1.9} className="mt-6 flex justify-center">
          <Pulse>
            <Heart className="h-4 w-4" />
          </Pulse>
        </FadeUp>
      </div>
    </Screen>
  );
}
