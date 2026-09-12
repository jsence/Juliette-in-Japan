import type { WorkPageContent } from "@/types/work";

export const unwrittenRulesPage: WorkPageContent = {
  slug: "unwritten-rules",
  title: "Unwritten rules",
  glyph: "空",
  description: "Reading the air, honne/tatemae, hierarchy in daily life, and silent rudeness.",
  introLines: [
    "Nobody gives you a handbook for lifts, taxis, drinks, or who leaves first.",
    "These rules punish you quietly — through distance, not through a meeting.",
  ],
  tldr: [
    "Sense the group mood before becoming the lone champion of an idea.",
    "Do not call public harmony fake in the room.",
    "Pour for others before yourself; let seniors exit the elevator first.",
    "Observe one week before copying the fastest-leaving colleague.",
  ],
  concepts: [
    {
      id: "kuuki",
      title: "Reading the air",
      ruby: { kanji: "空気", reading: "くうき" },
      romaji: "kūki o yomu",
      summaryLines: [
        "Sense the group's mood and do not break it — even when you are technically right.",
      ],
      terms: [
        {
          id: "ur-kuuki",
          japanese: "空気を読む",
          ruby: [{ text: "空気", reading: "くうき" }, { text: "読", reading: "よ" }],
          romaji: "kūki o yomu",
          meaning: "Read the air / read the room",
        },
      ],
      whatToDo: [
        "If everyone stayed silent after the boss's idea, do not become the lone champion unless your manager asked you privately.",
        "When laughter drops suddenly, switch topic — do not explain the joke again.",
        "If a colleague changes subject after your comment, take the hint; revisit one-to-one if needed.",
        "Watch who speaks first in a room — that order often mirrors real influence.",
      ],
    },
    {
      id: "honne-tatemae",
      title: "Honne and tatemae",
      ruby: { kanji: "本音", reading: "ほんね" },
      romaji: "honne / tatemae",
      summaryLines: [
        "Private truth vs the public line that keeps harmony.",
        "Meetings often run on the public line until a private chat.",
      ],
      terms: [
        {
          id: "ur-honne",
          japanese: "本音",
          ruby: [{ text: "本音", reading: "ほんね" }],
          romaji: "honne",
          meaning: "True feeling / private opinion",
        },
        {
          id: "ur-tatemae",
          japanese: "建前",
          ruby: [{ text: "建前", reading: "たてまえ" }],
          romaji: "tatemae",
          meaning: "Public stance / harmonious line",
        },
      ],
      whatToDo: [
        "Do not call the public line fake in the room — it destroys trust.",
        "If you need private truth, ask one-to-one after a neutral moment.",
        "Accept vague yeses until a calendar invite or document proves commitment.",
      ],
    },
    {
      id: "daily-hierarchy",
      title: "Everyday hierarchy",
      summaryLines: [
        "Rank shows up outside the desk: lifts, taxis, pouring drinks, who leaves first.",
      ],
      whatToDo: [
        "Elevator: hold the door, let seniors exit first; press buttons if asked.",
        "Taxi: senior sits behind the driver (often considered safer/honour); you sit shotgun if you are junior.",
        "Drinks: pour for others before yourself; hold the bottle with two hands for seniors.",
        "Leaving: wait for manager signal before heading out early on day one.",
      ],
    },
    {
      id: "silent-rude",
      title: "Things that are rude without anyone telling you",
      summaryLines: [
        "These erode trust faster than bad grammar.",
      ],
      whatToDo: [
        "Do not wear outdoor shoes on tatami or in rooms where others remove shoes — ask.",
        "Do not blow your nose loudly at the desk; excuse yourself.",
        "Do not take phone calls on speaker in open offices.",
        "Do not leave trash on the meeting table — you carry it out.",
        "Do not open bento with strong smell at a shared desk without checking.",
      ],
    },
  ],
  phrases: [
    {
      id: "ur-lift",
      japanese: "どうぞ、お先にお上がりください。",
      ruby: [{ text: "先", reading: "さき" }, { text: "上", reading: "あ" }],
      romaji: "Dōzo, osaki ni o-agari kudasai.",
      english: "Please — go ahead and enter first.",
      register: "internal-peer",
      usage: "Elevator / door — gesture with hand, slight bow.",
    },
    {
      id: "ur-pour",
      japanese: "いかがですか。",
      romaji: "Ikaga desu ka.",
      english: "Would you like some? (refill)",
      register: "internal-peer",
      usage: "Holding a beer or tea pot — wait for a nod before pouring.",
    },
    {
      id: "ur-leave",
      japanese: "お先に失礼します。問題なければ、本日はこれで失礼します。",
      ruby: [{ text: "失礼", reading: "しつれい" }],
      romaji: "Osaki ni shitsurei shimasu. Mondai nakereba, honjitsu wa kore de shitsurei shimasu.",
      english: "I will leave before you — if all is well, I will head out for today.",
      register: "internal-peer",
      usage: "To your manager when leaving — many teams still expect this signal.",
    },
  ],
  doDont: {
    do: [
      "Observe one week before copying the fastest-leaving colleague.",
      "Offer to pour drinks at nomikai before filling your own glass.",
      "Apologise lightly if you misread the air.",
    ],
    dont: [
      "Insist on Western directness in a group that went quiet.",
      "Take the honour taxi seat as a guest without being told.",
      "Treat the first team drinks invite as optional without checking norms.",
    ],
  },
  sources: [
    "Sociolinguistic studies on 空気を読む in Japanese organisations.",
    "Business manner guides — elevator, taxi, and seating customs.",
    "Field notes; phrasing checked for natural business Japanese.",
  ],
};
