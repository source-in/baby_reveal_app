import { assets, interviewCards, starPortraits, survivalIcons, type ImageSrc } from "./assets";

// All copy lives here so it can be edited without touching the screens.

export const intro = {
  title: ["Just the Two of You...", "And a Little More", "on the Way"],
  subtitle: "A little something from us to you, before you meet your little star.",
  cta: "Let's Begin",
};

export const letter = {
  title: ["Dear", "Mom & Dad,"],
  paragraphs: [
    "Before you find out who your little star is, we wanted to take a moment to celebrate you.",
    "This little person hasn't even arrived yet, and already, you've created so much love, excitement and a whole new world of dreams.",
    "Tap the stars to see some messages just for you! ♡",
  ],
};

export type Message = {
  starLabel: string;
  starSub?: string;
  from: string;
  side?: string;
  emoji: string;
  /** Painted star shown on the stars screen. */
  starArt: ImageSrc;
  /** Portrait inside the message card. */
  art: ImageSrc;
  body: string[];
  signoffLead: string;
  signName: string;
};

export const stars = {
  title: ["A Few Words", "from Your Stars"],
  hint: "Tap a star ♡",
};

export const messages: Message[] = [
  {
    starLabel: "Nana & Nani",
    from: "Nana & Nani",
    emoji: "👵👴",
    starArt: starPortraits.nanaNani,
    art: assets.nanaNani,
    body: [
      "We are excited for your arrival. Sushegaat ani safe yo. We are waiting to play with you. Nani is waiting to feed you yummy fish and Nana is waiting for you to sleep with him on his tummy like your Mummy used to.",
      "To Nikee and Mrunal, we know you will make the best parents and Nani & Nana are ready to spoil your little one 😉",
    ],
    signoffLead: "Love & blessings,",
    signName: "Nana & Nani",
  },
  {
    starLabel: "Dada & Dadi",
    from: "Dada & Dadi",
    emoji: "👵👴",
    starArt: starPortraits.dadaDadi,
    art: assets.dadaDadi,
    body: [
      "To our little cutest grandbaby, ❤️",
      "Grow strong and healthy!",
      "Dada and Dadi are eager to Welcome and have you in our arms..😘❤️🙌.",
      "To Mrunal and Nikee  be ready for the new adventure of life..Good luck 😘",
    ],
    signoffLead: "Love & blessings,",
    signName: "Dada & Dadi",
  },
  {
    starLabel: "Mamzz & Nini Masi",
    from: "Mamzz & Nini Masi",
    emoji: "👩‍🦱👩",
    starArt: starPortraits.mamzzNini,
    art: assets.mamzzNini,
    body: [
      "We already know your little one is going to be the luckiest, with two of the most amazing and funny parents. We can't wait to be part of all the chaos, cuddles and adventures.",
      "For Gundush, Mamzz and Nini masi can't wait to do lots of masti and majja with you, have lots of sweet treats, khabri marpak, and go on bike rides. Don't worry, Mamzz will save you from your angry mom, see you soon!",
    ],
    signoffLead: "Always here,",
    signName: "Mamzz & Nini Masi",
  },
];

export type Parent = "Mummy" | "Daddy";

export type Prediction = {
  text: string;
  /** Who we think it really is — marked with a star once a guess is made. */
  answer: Parent;
  reaction: Record<Parent, string>;
};

export const predictions = {
  title: "Parenting Predictions",
  subtitle: "Let's make some guesses...",
  next: "Next question",
  questions: [
    {
      text: "Who is more likely to sleep in until noon?",
      answer: "Mummy",
      reaction: {
        Mummy: "Beauty sleep is important. 😴",
        Daddy: "Nice try, Daddy. Mummy is winning this one. 😂",
      },
    },
    {
      text: "Who will say “We're not spoiling this baby” and then immediately spoil them?",
      answer: "Daddy",
      reaction: {
        Daddy: "Caught in 4K, Daddy. 😂",
        Mummy: "Mummy said she won't spoil me... she already has a secret shopping cart. 🛍️",
      },
    },
    {
      text: "Who will wake up first at 3 AM?",
      answer: "Daddy",
      reaction: {
        Mummy: "Mommy can sleep… Daddy’s on night duty! 😂❤️",
        Daddy: "The moment I make the tiniest little sound, Daddy will be wide awake!",
      },
    },
    {
      text: "Who will be the stricter parent?",
      answer: "Mummy",
      reaction: {
        Mummy: "Mummy says no... but her hugs say yes. ❤️",
        Daddy: "Daddy thinks he's strict. That's adorable. 😂",
      },
    },
    {
      text: "Who will take the most baby pictures?",
      answer: "Mummy",
      reaction: {
        Mummy: "My personal photographer is ready. Say cheese, baby! 📸",
        Daddy: "Daddy, you have 14,827 pictures to catch up on. 😂",
      },
    },
    {
      text: "Who will cry first when the baby says “I love you”?",
      answer: "Daddy",
      reaction: {
        Daddy: "Daddy has officially melted. Someone get tissues. 🥹",
        Mummy: "Mummy says she's fine... her eyes say otherwise. ❤️",
      },
    },
    {
      text: "Who will fall asleep while putting the baby to sleep?",
      answer: "Daddy",
      reaction: {
        Daddy: "Baby's asleep. Daddy's asleep. Everybody wins. 😴",
        Mummy: "Mummy is still on duty. Send coffee. ☕",
      },
    },
  ] satisfies Prediction[],
};

export const interview = {
  title: "Baby's First Interview",
  subtitle: "We asked your little one a few questions... and here's what they had to say!",
  hint: "Tap the card for the next answer ♡",
  cards: [
    {
      src: interviewCards[0],
      alt: "What do you want Mom & Dad to know? “Thank you for keeping me warm, Mummy & Dad! I want to eat chocolates and fish with Mummy while watching SRK movies, and have chai with Dad while screaming at the TV during United matches!”",
    },
    {
      src: interviewCards[1],
      alt: "Who are you going to manipulate first? “Nani. She seems easy. I can already tell she's going to say no and then do exactly what I want. Hehe!”",
    },
    {
      src: interviewCards[2],
      alt: "What are your demands from Nana & Nani? “Nana, your first job is to play horsey with me! And Nani, you better be ready with all the cuddles, snacks, and unlimited spoiling.”",
    },
    {
      src: interviewCards[3],
      alt: "Who is going to teach you your first bad habit? “Mamzz and Nini masi. They already have a few ideas... and honestly, I'm listening.”",
    },
    {
      src: interviewCards[4],
      alt: "Who will you convince to buy you things? “Dada & Dadi! Dadi has the yummy Gujarati food, Dada has the Mumbai adventures... and both of them have absolutely no chance of saying no to me.”",
    },
  ],
};

export const survivalKit = {
  title: ["The Parent", "Survival Kit"],
  subtitle: "A few essentials for the journey...",
  items: [
    { image: survivalIcons.coffee, name: "Coffee", note: "(You'll need this)" },
    { image: survivalIcons.diapers, name: "Diapers", note: "(Somehow still not enough)" },
    { image: survivalIcons.pillow, name: "Patience", note: "(Loading...)" },
    { image: survivalIcons.camera, name: "Camera", note: "(For 14,827,392 photos)" },
    { image: survivalIcons.heart, name: "Love", note: "(Already included)" },
  ],
};

export const constellation = {
  title: ["Your Family", "Constellation"],
  subtitle: "Two stars found each other...",
  footer: "And together, you made a whole new universe.",
};

export const moon = {
  title: ["The Moon Knows", "Something..."],
  subtitle: "You've laughed, guessed, dreamt and imagined...",
  footer: "But there's only one way to find out...",
  cta: "Go find the real moon ♡",
};

export const finale = {
  text: "No matter what, your little star is already surrounded by so much love.",
  footer: ["Here's to your next", "big adventure. ♡"],
};
