import type { WorkPageContent } from "@/types/work";

export const unwrittenRulesPage: WorkPageContent = {
  slug: "unwritten-rules",
  title: "Unwritten rules",
  glyph: "空",
  description: "Reading the air, honne/tatemae, hierarchy in daily life, and silent rudeness.",
  intro:
    "Nobody gives you a handbook for lifts, taxis, drinks, or who leaves first. These rules punish you quietly — through distance, not through a meeting.",
  concepts: [
    {
      id: "kuuki",
      title: "Reading the air",
      ruby: { kanji: "空気", reading: "くうき" },
      romaji: "kūki o yomu",
      summary:
        "空気を読む means sensing the group's mood and not breaking it — even when you are technically right.",
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
      summary:
        "本音 is private truth; 建前 is the public line that keeps harmony. Meetings often run on 建前 until drinks or a private chat.",
      whatToDo: [
        "Do not call out 建前 as fake in the room — it destroys trust.",
        "If you need 本音, ask in private after a neutral event (coffee, walk to station).",
        "Accept vague yeses until a calendar invite or document proves commitment.",
      ],
    },
    {
      id: "daily-hierarchy",
      title: "Everyday hierarchy",
      summary:
        "Rank shows up outside the desk: lifts, taxis, pouring drinks, who leaves the office first.",
      whatToDo: [
        "Elevator: hold the door, let seniors exit first; press buttons if asked.",
        "Taxi: senior sits behind the driver (often considered safer/honour); you sit shotgun if you are junior.",
        "Drinks: pour for others before yourself; hold the bottle with two hands for seniors.",
        "Leaving: juniors often leave after the manager signals 先に帰ってください — do not sprint out at 18:00 on day one.",
      ],
    },
    {
      id: "silent-rude",
      title: "Things that are rude without anyone telling you",
      summary: "These erode trust faster than bad grammar.",
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
      register: "Internal · polite (です・ます)",
      usage: "Elevator / door — gesture with hand, slight bow.",
    },
    {
      id: "ur-pour",
      japanese: "いかがですか。",
      romaji: "Ikaga desu ka.",
      english: "Would you like some? (refill)",
      register: "Neutral · polite (either side)",
      usage: "Holding a beer or tea pot — wait for a nod before pouring.",
    },
    {
      id: "ur-leave",
      japanese: "お先に失礼します。問題なければ、本日はこれで失礼します。",
      ruby: [{ text: "失礼", reading: "しつれい" }],
      romaji: "Osaki ni shitsurei shimasu. Mondai nakereba, honjitsu wa kore de shitsurei shimasu.",
      english: "I will leave before you — if all is well, I will head out for today.",
      register: "Internal · polite (です・ます)",
      usage: "To your manager when leaving — many teams still expect this signal.",
    },
  ],
  doDont: {
    do: [
      "Observe one week before copying the fastest-leaving colleague.",
      "Offer to pour drinks at nomikai before filling your own glass.",
      "Apologise lightly if you misread the air — 空気が読めずすみません.",
    ],
    dont: [
      "Insist on Western directness in a group that went quiet.",
      "Sit in the back-left taxi seat as a guest without being told.",
      "Treat 飲み会 as optional on your first invitation without checking team norms.",
    ],
  },
  sources: [
    "Sociolinguistic studies on 空気を読む in Japanese organisations.",
    "Business manner guides — elevator, taxi, and seating customs.",
    "Field notes; phrasing checked for natural business Japanese.",
  ],
};
