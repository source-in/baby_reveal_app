import type { StaticImageData } from "next/image";
import type { ComponentType } from "react";
import { backgrounds } from "@/lib/assets";
import type { Theme } from "../ui";
import { Constellation } from "./Constellation";
import { Finale } from "./Finale";
import { Interview } from "./Interview";
import { Intro } from "./Intro";
import { Letter } from "./Letter";
import { Moon } from "./Moon";
import { Predictions } from "./Predictions";
import { Stars } from "./Stars";
import { SurvivalKit } from "./SurvivalKit";

export type ScreenProps = {
  next: () => void;
  openMessage: (i: number) => void;
  seenMessages: Set<number>;
};

type ScreenDef = {
  id: string;
  component: ComponentType<ScreenProps>;
  theme: Theme;
  /** Painted full-screen background. Screens that change their own backdrop leave this out. */
  bg?: StaticImageData;
  dots: boolean;
  /** "afterMessages": arrow appears once every star message has been opened. */
  arrow: boolean | "afterMessages";
};

export const SCREENS: ScreenDef[] = [
  { id: "intro", component: Intro, theme: "night", bg: backgrounds.intro, dots: false, arrow: false },
  { id: "letter", component: Letter, theme: "cream", bg: backgrounds.letter, dots: true, arrow: true },
  { id: "stars", component: Stars, theme: "night", bg: backgrounds.stars, dots: true, arrow: "afterMessages" },
  { id: "predictions", component: Predictions, theme: "cream", dots: true, arrow: true },
  { id: "interview", component: Interview, theme: "cream", dots: true, arrow: true },
  { id: "survival-kit", component: SurvivalKit, theme: "cream", bg: backgrounds.soft, dots: true, arrow: true },
  {
    id: "constellation",
    component: Constellation,
    theme: "night",
    bg: backgrounds.constellation,
    dots: true,
    arrow: true,
  },
  { id: "moon", component: Moon, theme: "night", bg: backgrounds.moon, dots: true, arrow: false },
  { id: "finale", component: Finale, theme: "dusk", bg: backgrounds.finale, dots: false, arrow: false },
];
