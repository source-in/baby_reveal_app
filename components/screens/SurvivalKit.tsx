import { motion } from "motion/react";
import Image from "next/image";
import { survivalKit } from "@/lib/content";
import { cn } from "@/lib/cn";
import { FadeUp, Float, Pulse } from "../motion";
import { Screen, Title } from "../ui";

export function SurvivalKit() {
  const last = survivalKit.items.length - 1;

  return (
    <Screen theme="cream" className="flex flex-col">
      <div className="h-[13%] shrink-0" />
      <header className="relative z-10 px-7 text-center">
        <Title lines={survivalKit.title} />
        <FadeUp delay={0.5}>
          <p className="mt-2 text-[0.95rem] text-ink-soft">{survivalKit.subtitle}</p>
        </FadeUp>
      </header>

      <div className="relative z-10 mt-5 grid grid-cols-2 gap-x-6 gap-y-4 px-8">
        {survivalKit.items.map((item, i) => {
          const icon = <Image src={item.image} alt="" fill sizes="120px" className="object-contain" />;
          return (
            <motion.div
              key={item.name}
              className={cn("flex flex-col items-center text-center", i === last && "col-span-2")}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 13, delay: 0.6 + i * 0.15 }}
            >
              {i === last ? (
                <Pulse className="relative h-[4.5rem] w-24">{icon}</Pulse>
              ) : (
                <Float
                  amplitude={4}
                  duration={3 + (i % 3) * 0.6}
                  delay={i * 0.3}
                  rotate={2}
                  className="relative h-[4.5rem] w-24"
                >
                  {icon}
                </Float>
              )}
              <p className="mt-1 text-[1rem]">{item.name}</p>
              <p className="text-[0.8rem] leading-tight text-ink-soft">{item.note}</p>
            </motion.div>
          );
        })}
      </div>
    </Screen>
  );
}
