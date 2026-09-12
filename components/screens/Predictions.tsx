import { AnimatePresence, motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { backgrounds, parentPoses } from "@/lib/assets";
import { predictions, type Parent } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ArrowIcon, StarShape } from "../art";
import { FadeUp, HeartBurst } from "../motion";
import { BG_SIZES, Background, PillButton, Screen, Title } from "../ui";

function ChoiceTile({
  label,
  photo,
  tone,
  selected,
  isAnswer,
  revealed,
  burst,
  onClick,
}: {
  label: Parent;
  photo: StaticImageData;
  tone: "pink" | "blue";
  selected: boolean;
  isAnswer: boolean;
  revealed: boolean;
  burst: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      animate={selected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col items-center gap-2"
    >
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-2xl transition",
          tone === "pink" ? "bg-tile-pink" : "bg-tile-blue",
          selected && "ring-2 ring-rose ring-offset-2",
        )}
      >
        {/* A different pose for every question. */}
        <AnimatePresence initial={false}>
          <motion.div
            key={photo.src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={photo} alt={label} fill sizes="170px" placeholder="blur" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="text-[0.95rem]">{label}</span>

      {/* A little star marks who we think it really is. */}
      <AnimatePresence>
        {revealed && isAnswer && (
          <motion.span
            key="answer"
            className="absolute -right-2 -top-2"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
          >
            <StarShape className="w-8 drop-shadow-[0_2px_6px_rgba(180,140,60,0.5)]" />
          </motion.span>
        )}
      </AnimatePresence>

      {selected && <HeartBurst key={burst} />}
    </motion.button>
  );
}

export function Predictions() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Parent>>({});
  const [taps, setTaps] = useState(0);

  const questions = predictions.questions;
  const q = questions[i];
  const choice = answers[i] ?? null;
  const isLast = i === questions.length - 1;
  const pose = i % parentPoses.Mumma.length;

  const pick = (p: Parent) => {
    setAnswers((a) => ({ ...a, [i]: p }));
    setTaps((t) => t + 1);
  };

  return (
    <Screen theme="cream" className="flex flex-col">
      {/* The backdrop alternates as you move through the questions. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={i % 2}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Background src={i % 2 ? backgrounds.afterBaby : backgrounds.beforeBaby} />
        </motion.div>
      </AnimatePresence>

      {/* Warm the other backdrop so the swap never flashes. */}
      <div aria-hidden className="invisible absolute inset-0 -z-10">
        <Image
          src={i % 2 ? backgrounds.beforeBaby : backgrounds.afterBaby}
          alt=""
          fill
          sizes={BG_SIZES}
          loading="eager"
          className="object-cover"
        />
      </div>

      <header className="relative z-10 shrink-0 px-8 pt-10 text-center">
        <Title lines={predictions.title} size="text-[2.3rem] leading-[1.08]" />
        <FadeUp delay={0.5}>
          <p className="mx-auto mt-1 max-w-64 text-[0.95rem] leading-snug text-ink-soft">{predictions.subtitle}</p>
        </FadeUp>
      </header>

      <div className="relative z-10 mx-5 mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            className="rounded-3xl bg-white/90 px-5 pb-5 pt-6 shadow-soft backdrop-blur-sm"
            initial={{ opacity: 0, x: 60, rotate: 0 }}
            animate={{ opacity: 1, x: 0, rotate: i % 2 ? 2 : -2 }}
            exit={{ opacity: 0, x: -60, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
          >
            <p className="mx-auto max-w-60 text-center text-[1.1rem] leading-snug">{q.text}</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <ChoiceTile
                label="Mumma"
                photo={parentPoses.Mumma[pose]}
                tone="pink"
                selected={choice === "Mumma"}
                isAnswer={q.answer === "Mumma"}
                revealed={choice !== null}
                burst={taps}
                onClick={() => pick("Mumma")}
              />
              <ChoiceTile
                label="Daddy"
                photo={parentPoses.Daddy[pose]}
                tone="blue"
                selected={choice === "Daddy"}
                isAnswer={q.answer === "Daddy"}
                revealed={choice !== null}
                burst={taps}
                onClick={() => pick("Daddy")}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-4 flex min-h-36 flex-col items-center gap-3 px-7 text-center">
        <AnimatePresence mode="wait">
          {choice && (
            <motion.p
              key={`${i}-${choice}`}
              className="font-hand text-[1.55rem] leading-snug text-rose"
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 240, damping: 16 }}
            >
              {q.reaction[choice]}
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {choice && !isLast && (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <PillButton className="px-5 py-2 text-base" onClick={() => setI(i + 1)}>
                {predictions.next} <ArrowIcon className="h-4 w-4" />
              </PillButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-14 z-10 flex flex-col items-center gap-1.5">
        <div className="flex gap-1.5">
          {questions.map((item, j) => (
            <button
              key={item.text}
              onClick={() => setI(j)}
              aria-label={`Question ${j + 1}`}
              className={cn("h-2 rounded-full transition-all duration-300", j === i ? "w-5 bg-rose" : "w-2 bg-rose/35")}
            />
          ))}
        </div>
        <p className="text-xs text-ink-soft">
          {i + 1} / {questions.length}
        </p>
      </div>
    </Screen>
  );
}
