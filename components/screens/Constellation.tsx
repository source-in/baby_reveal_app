import { motion } from "motion/react";
import { constellation } from "@/lib/content";
import { ShootingStar, StarShape, Twinkles } from "../art";
import { FadeUp, Float, Glow } from "../motion";
import { Screen, Title } from "../ui";

const NODES = [
  { label: "Mummy", x: 22, y: 30, delay: 0.7 },
  { label: "Daddy", x: 78, y: 28, delay: 1.0 },
  { label: "Baby", x: 50, y: 72, delay: 3.0 },
];
const [MOM, DAD, BABY] = NODES;
const LINES = [`M${MOM.x} ${MOM.y} L${BABY.x} ${BABY.y}`, `M${DAD.x} ${DAD.y} L${BABY.x} ${BABY.y}`];

export function Constellation() {
  return (
    <Screen theme="night">
      <Twinkles count={10} seed={11} top={4} bottom={70} />
      <ShootingStar top="16%" left="92%" delay={4} />

      <header className="relative z-10 px-7 pt-12 text-center">
        <Title lines={constellation.title} className="text-glow" />
        <FadeUp delay={0.5}>
          <p className="text-glow mt-3 text-[0.95rem] text-white/90">{constellation.subtitle}</p>
        </FadeUp>
      </header>

      <div className="relative mx-auto mt-4 h-[38%] w-full">
        {/* Dashed lines revealed by a mask whose stroke draws itself towards Baby. */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <mask id="constellation-draw">
              {LINES.map((d) => (
                <motion.path
                  key={d}
                  d={d}
                  stroke="#fff"
                  strokeWidth={8}
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                />
              ))}
            </mask>
          </defs>
          {LINES.map((d) => (
            <path
              key={d}
              d={d}
              mask="url(#constellation-draw)"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth={1.5}
              strokeDasharray="4 5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {NODES.map((n, i) => (
          <motion.div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 11, delay: n.delay }}
          >
            <Float amplitude={4} duration={3.2 + i * 0.4} delay={i * 0.5} rotate={3} className="relative">
              <Glow
                duration={2.4 + i * 0.3}
                className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(255,226,140,0.55)_0%,rgba(255,226,140,0)_70%)]"
              />
              <StarShape face className="relative w-[5.2rem] drop-shadow-[0_0_14px_rgba(246,212,126,0.6)]" />
            </Float>
            <span className="text-glow absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap text-[0.95rem] text-white/95">{n.label}</span>
          </motion.div>
        ))}
      </div>

      <FadeUp delay={3.6}>
        <p className="text-glow relative z-10 mx-auto mt-6 max-w-56 text-center text-[1rem] leading-snug text-white/95">
          {constellation.footer}
        </p>
      </FadeUp>
    </Screen>
  );
}
