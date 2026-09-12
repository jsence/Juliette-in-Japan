import type { WorkPageContent } from "@/types/work";

export const socialPage: WorkPageContent = {
  slug: "social",
  title: "Social",
  glyph: "飲",
  description: "Nomikai etiquette, pouring, topics, and after-parties.",
  intro:
    "Work drinks are part of the relationship layer — not a second office, but not a free-for-all either. Optional on paper, often expected in practice on your team.",
  concepts: [
    {
      id: "nomikai",
      title: "Whether to attend",
      ruby: { kanji: "飲み会", reading: "のみかい" },
      romaji: "nomikai",
      summary:
        "Officially voluntary; skipping every time can slow trust. First invitation: go unless you have a real conflict — then decline properly.",
      whatToDo: [
        "Reply in the invite thread with yes/no and thanks — not silence.",
        "If you cannot drink alcohol, say so early; order soft drinks confidently.",
        "Stay through at least the first toast and one round of conversation.",
        "Thank the organiser the next day: 昨日はありがとうございました.",
      ],
    },
    {
      id: "kanpai",
      title: "Toast order",
      ruby: { kanji: "乾杯", reading: "かんぱい" },
      romaji: "kanpai",
      summary:
        "Wait for the senior's 乾杯の音頭 — do not clink before they speak. Glass below theirs if you clink with a senior.",
      whatToDo: [
        "Hold glass with both hands when toasting upward.",
        "Say 乾杯 with the group; sip, do not chug unless the room does.",
        "Do not start eating before 乾杯 unless everyone already has.",
      ],
    },
    {
      id: "pouring",
      title: "Pouring for others",
      summary: "You watch glasses, not only your plate. Refill others before yours.",
      whatToDo: [
        "Notice empty glasses — offer with the bottle neck down politely.",
        "If someone pours for you, hold your glass with both hands and take a sip before putting it down.",
        "Do not let a senior's glass stay empty while you pour your own beer.",
      ],
    },
    {
      id: "topics",
      title: "What loosens and what stays off-limits",
      summary:
        "Small talk opens; complaints about colleagues, salary, or politics close doors.",
      whatToDo: [
        "Safe: travel, food, hobbies, light questions about weekend.",
        "Careful: religion, immigration debates, criticising other departments.",
        "Off-limits: gossip that could identify someone, client's confidential numbers.",
        "If a senior opens up, listen — do not live-tweet the story tomorrow.",
      ],
    },
    {
      id: "nijikai",
      title: "Second party",
      ruby: { kanji: "二次会", reading: "にじかい" },
      romaji: "nijikai",
      summary:
        "After the main 飲み会, a smaller group may move to karaoke or izakaya. Truly optional — bow out with thanks.",
      whatToDo: [
        "Decline with 明日も早いので、一次会で失礼します — no long excuse needed.",
        "Pay your share if the group splits cash; carry enough yen.",
        "If you go, energy drops but manners stay — still pour, still listen.",
      ],
    },
  ],
  phrases: [
    {
      id: "soc-decline",
      japanese: "誠に残念ですが、本日は参加できません。次回よろしくお願いします。",
      ruby: [{ text: "誠", reading: "まこと" }, { text: "残念", reading: "ざんねん" }],
      romaji: "Makoto ni zannen desu ga, honjitsu wa sanka dekimasen. Jikai yoroshiku onegai shimasu.",
      english: "I am sorry — I cannot join today. I hope to next time.",
      register: "Internal · polite (です・ます)",
      usage: "Reply to invite — offer to join another time if true.",
    },
    {
      id: "soc-no-drink",
      japanese: "本日はお酒を控えさせていただきます。",
      ruby: [{ text: "控", reading: "ひか" }],
      romaji: "Honjitsu wa osake o hikaesasete itadakimasu.",
      english: "I will refrain from alcohol today.",
      register: "Neutral · polite (either side)",
      usage: "At seating — order oolong or soda immediately after.",
    },
    {
      id: "soc-thanks",
      japanese: "楽しいお時間をありがとうございました。",
      ruby: [{ text: "楽", reading: "たの" }],
      romaji: "Tanoshii o-jikan o arigatō gozaimashita.",
      english: "Thank you for a enjoyable time.",
      register: "Internal · polite (です・ます)",
      usage: "When leaving the main party — even if you skip 二次会.",
    },
  ],
  doDont: {
    do: [
      "Attend the first team nomikai if you can.",
      "Pour for others; thank people who pour for you.",
      "Leave 二次会 gracefully when tired.",
    ],
    dont: [
      "Lecture the table on cultural differences after drinks.",
      "Pressure anyone to drink alcohol.",
      "Repeat confidential work stories told after 乾杯.",
    ],
  },
  sources: [
    "Business manner texts on 飲み会 and 乾杯 etiquette.",
    "HR guidance on alcohol at company events (voluntary participation).",
    "Common izakaya social norms; phrasing verified for natural Japanese.",
  ],
};
