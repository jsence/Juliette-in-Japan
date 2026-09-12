import type { WorkPageContent } from "@/types/work";

export const interviewPage: WorkPageContent = {
  slug: "interview",
  title: "Interview",
  glyph: "面",
  description: "Common questions, Japanese level, self-PR, expectations, and punctuality.",
  introLines: [
    "Interviews for foreign candidates often mix language check, culture fit, and role skill.",
    "Suggested answers below are examples to adapt to your CV — not scripts to recite verbatim.",
  ],
  tldr: [
    "Self-PR: strength → evidence → how it helps this company — one to two minutes.",
    "State Japanese level in terms of tasks you can do, not only JLPT.",
    "Ask about onboarding, success at six months, and day-to-day language.",
    "Dark suit, arrive 5–10 minutes early, phone fully off.",
  ],
  concepts: [
    {
      id: "jikopr",
      title: "Self-introduction and self-PR",
      ruby: { kanji: "自己PR", reading: "じこPR" },
      romaji: "jiko PR",
      summaryLines: [
        "Structured pitch: strength → evidence → how it helps this company.",
        "One to two minutes spoken.",
      ],
      whatToDo: [
        "Open with role fit tied to their business line.",
        "Give one metric or project, not a life story.",
        "Close with motivation tied to their product — not only interest in Japan.",
        "Practice aloud until you can do it without reading.",
      ],
    },
    {
      id: "japanese-level",
      title: "Describing your Japanese honestly",
      summaryLines: [
        "Overclaiming breaks trust in the first week.",
        "Underclaiming wastes the interview — tie level to work tasks.",
      ],
      whatToDo: [
        "State JLPT if you have it; add what you can do: mail with review, calls with notes, meetings with prep.",
        "Say what you still need help with — specialist mail checked with your manager, for example.",
        "Offer a short live sample if asked — do not refuse entirely.",
      ],
    },
    {
      id: "expectations",
      title: "What employers often expect from foreign hires",
      summaryLines: [
        "Many firms hire for global reach plus domestic teamwork.",
        "They rarely expect you to replace all Japanese communication alone.",
      ],
      whatToDo: [
        "Show you will learn keigo and reporting norms, not only English bridge role.",
        "Ask how the team communicates (mail, chat, meeting language).",
        "Signal long-term intent if true — churn after one year is a known fear.",
      ],
    },
    {
      id: "questions-ask",
      title: "What to ask at the end",
      summaryLines: [
        "Good questions show you think about the job, not only visa and salary.",
      ],
      whatToDo: [
        "Ask about first-month onboarding and who you report to daily.",
        "Ask what success looks like at six months.",
        "Ask language environment: client-facing Japanese vs internal English.",
        "Avoid only asking about holidays and remote on the first round.",
      ],
    },
    {
      id: "dress-punctuality",
      title: "Dress code and punctuality",
      ruby: { kanji: "時間厳守", reading: "じかんげんしゅ" },
      romaji: "jikan genshu",
      summaryLines: [
        "Dark suit, neat hair, minimal fragrance for traditional companies.",
        "Arrive on time — punctuality is a basic pass/fail signal.",
      ],
      whatToDo: [
        "Confirm address and enter reception 5–10 minutes before — not 30 (that burdens staff).",
        "If delayed, call reception immediately with ETA — do not only mail.",
        "Bring printed resume and portfolio copies even if sent PDF.",
        "Switch phone off completely — not vibrate in pocket during group interview.",
      ],
    },
  ],
  phrases: [
    {
      id: "int-motivation",
      japanese: "御社の〇〇という点に強く惹かれ、志望いたしました。",
      ruby: [{ text: "志望", reading: "しぼう" }, { text: "惹", reading: "ひ" }],
      romaji: "Onsha no ○○ to iu ten ni tsuyoku hikare, shibō itashimashita.",
      english: "I applied because I am strongly drawn to your ○○ (product / mission).",
      register: "client",
      usage: "Why this company — replace the slot with something specific you researched.",
    },
    {
      id: "int-strength",
      japanese: "私の強みは、〇〇の経験を活かした△△です。前職では…",
      ruby: [{ text: "強", reading: "つよ" }, { text: "活", reading: "い" }],
      romaji: "Watashi no tsuyomi wa, ○○ no keiken o ikashita △△ desu. Zenshoku de wa…",
      english: "My strength is △△, using my experience in ○○. In my previous role…",
      register: "internal-peer",
      usage: "Self-PR body — follow with one concrete episode.",
    },
    {
      id: "int-japanese",
      japanese: "日常会話とビジネスメールは対応可能です。専門的な契約書は確認しながら進めます。",
      ruby: [{ text: "契約書", reading: "けいやくしょ" }],
      romaji: "Nichijō kaiwa to bijinesu mēru wa taiō kanō desu. Senmonteki na keiyakusho wa kakunin shinagara susumemasu.",
      english: "I can handle daily conversation and business mail. I proceed on specialist contracts while verifying wording.",
      register: "internal-peer",
      usage: "Honest level statement — adjust to your real ability.",
    },
    {
      id: "int-weakness",
      japanese: "現在、敬語の使い分けは学習中です。入社後も積極的に改善いたします。",
      ruby: [{ text: "敬語", reading: "けいご" }, { text: "学習", reading: "がくしゅう" }],
      romaji: "Genzai, keigo no tsukaiwake wa gakushū-chū desu. Nyūsha-go mo sekkyokuteki ni kaizen itashimasu.",
      english: "I am still learning keigo distinctions. I will keep improving after joining.",
      register: "internal-peer",
      usage: "Weakness question — pair with what you already do well.",
    },
    {
      id: "int-ask-team",
      japanese: "配属予定のチームでは、日常のコミュニケーションはどのような言語が多いでしょうか。",
      ruby: [{ text: "配属", reading: "はいぞく" }],
      romaji: "Haizoku yotei no chīmu de wa, nichijō no komyunikēshon wa dono yō na gengo ga ooi deshō ka.",
      english: "In the team I would join, what language is used day to day?",
      register: "internal-peer",
      usage: "End-of-interview question — practical and respected.",
    },
    {
      id: "int-close",
      japanese: "本日は貴重なお時間をいただき、ありがとうございました。",
      ruby: [{ text: "貴重", reading: "きちょう" }],
      romaji: "Honjitsu wa kichō na o-jikan o itadaki, arigatō gozaimashita.",
      english: "Thank you for your valuable time today.",
      register: "client",
      usage: "Stand, bow, say at the door — even if the interview was in English.",
    },
  ],
  doDont: {
    do: [
      "Research the company product name and one recent news item.",
      "Adapt example answers to your real history — interviewers follow up.",
      "Arrive early; call if trains delay you.",
    ],
    dont: [
      "Memorise scripts that do not match your CV.",
      "Claim fluent Japanese if your manager will discover otherwise in week one.",
      "Ask only about visa sponsorship and salary in the first interview.",
    ],
  },
  sources: [
    "MHLW / Hello Work guidance for job interviews in Japan (punctuality, documents).",
    "Common 面接 FAQ lists from Japanese career sites — adapted, not copied.",
    "Disclaimer: example answers only; tailor to your role and visa status.",
  ],
};
