import type { WorkPageContent } from "@/types/work";

export const colleaguesPage: WorkPageContent = {
  slug: "colleagues",
  title: "Colleagues",
  glyph: "同",
  description: "Daily greetings, 報連相, asking for help, soft refusals, and listening cues.",
  intro:
    "Day-to-day work is less about grand etiquette than about rhythm: when to greet, what to report, how to ask without blocking someone, and how to hear a polite no.",
  concepts: [
    {
      id: "otsukaresama",
      title: "End-of-day greeting",
      ruby: { kanji: "お疲れ様", reading: "おつかれさま" },
      romaji: "otsukaresama",
      summary:
        "お疲れ様です is the default closing signal in many offices — not only when you leave, but when a shared task ends or someone finishes a call.",
      whatToDo: [
        "Say it when leaving your floor if others are still there — not a whisper.",
        "Say it to teammates when you finish a joint task, even if you stay at your desk.",
        "Reply お疲れ様です when someone says it to you; add お先に失礼します only when you leave before them.",
        "With clients, use お疲れ様ではなく 本日はありがとうございました unless they use お疲れ様 first.",
      ],
    },
    {
      id: "horenso",
      title: "Report, contact, consult",
      ruby: { kanji: "報連相", reading: "ほうれんそう" },
      romaji: "hōren-sō",
      summary:
        "報連相 means: report outcomes, contact before problems spread, consult before deciding alone. It is how trust is built with a Japanese manager.",
      whatToDo: [
        "Report small completions — silence reads as nothing happened.",
        "Contact early when a deadline slips; bring one proposed fix, not only the problem.",
        "Consult before changing scope, spending money, or emailing a client — even if you could decide alone in your home country.",
        "Match channel to urgency: chat for quick ping, email for record, phone for same-day crisis.",
      ],
    },
    {
      id: "help",
      title: "Asking for help without losing face",
      summary:
        "Asking is normal; how you ask should show you tried first and you respect their time.",
      whatToDo: [
        "Open with context in three lines: goal, what you tried, where you are stuck.",
        "Offer a specific ask: 「10分ほどご相談可能でしょうか」 not 「わかりません」 alone.",
        "Take notes while they explain; summarise back in one sentence before you leave.",
        "Thank them later in writing if they saved your deadline.",
      ],
    },
    {
      id: "soft-no",
      title: "Refusing indirectly and hearing no",
      summary:
        "A flat いいえ is rare. 「ちょっと難しいですね」 often means no; 「検討します」 often means no unless a date is set.",
      whatToDo: [
        "When you must refuse extra work: acknowledge → reason briefly → offer alternative or timing.",
        "When you hear ちょっと難しいですね: treat as no; do not push the same idea in the same meeting.",
        "If you need a real answer: ask 「承知しました。別の方法で進めてもよろしいでしょうか。」",
        "Use 相槌 (はい、ええ、うん) while listening — silence sounds like disagreement on phone calls.",
      ],
    },
  ],
  phrases: [
    {
      id: "col-otsukare",
      japanese: "お先に失礼します。お疲れ様でした。",
      ruby: [{ text: "失礼", reading: "しつれい" }],
      romaji: "Osaki ni shitsurei shimasu. Otsukaresama deshita.",
      english: "I will leave before you — thank you for your hard work today.",
      register: "Internal · polite (です・ます)",
      usage: "Leaving the office while colleagues remain. Past tense でした is common at the end of the day.",
    },
    {
      id: "col-hokoku",
      japanese: "〇〇の件、完了しましたのでご報告いたします。",
      ruby: [{ text: "報告", reading: "ほうこく" }],
      romaji: "○○ no ken, kanryō shimashita node go-hōkoku itashimasu.",
      english: "I am reporting that the ○○ matter is complete.",
      register: "Internal · humble (team / upward)",
      usage: "Short status mail or desk-side report to your manager after finishing a task.",
    },
    {
      id: "col-renraku",
      japanese: "恐れ入ります。〇〇の納期が一日ほど後ろ倒しになる可能性がございます。",
      ruby: [{ text: "納期", reading: "のうき" }, { text: "後ろ倒", reading: "うしろだ" }],
      romaji: "Osore irimasu. ○○ no nōki ga ichinichi hodo ushiroda shi ni naru kanōsei ga gozaimasu.",
      english: "Sorry — the ○○ deadline may slip by about one day.",
      register: "Internal · humble (team / upward)",
      usage: "Early 連絡 when you see a slip; follow with cause and proposed recovery in the next sentence.",
    },
    {
      id: "col-help",
      japanese: "お忙しいところ恐れ入ります。〇〇について10分ほどご教示いただけますでしょうか。",
      ruby: [{ text: "教示", reading: "きょうじ" }],
      romaji: "O-isogashii tokoro osore irimasu. ○○ ni tsuite juppun hodo go-kyōji itadakemasu deshō ka.",
      english: "Sorry to bother you while busy — could you advise me on ○○ for about ten minutes?",
      register: "Internal · humble (team / upward)",
      usage: "Desk or chat to a senior peer; bring your notes open on screen.",
    },
    {
      id: "col-refuse",
      japanese: "申し訳ございません。本日は〇〇を優先せざるを得ず、別日で対応させていただけますでしょうか。",
      ruby: [{ text: "優先", reading: "ゆうせん" }, { text: "別日", reading: "べつじつ" }],
      romaji: "Mōshiwake gozaimasen. Honjitsu wa ○○ o yūsen sezaru o ezu, betsujitsu de taiō sasete itadakemasu deshō ka.",
      english: "I am sorry — I must prioritise ○○ today; could I handle your request on another day?",
      register: "Internal · humble (team / upward)",
      usage: "When declining extra work from a senior; propose a date, do not leave open-ended.",
    },
    {
      id: "col-aizuchi",
      japanese: "はい、承知しました。",
      ruby: [{ text: "承知", reading: "しょうち" }],
      romaji: "Hai, shōchi shimashita.",
      english: "Yes, understood.",
      register: "Neutral · polite (either side)",
      usage: "Phone or meeting — frequent 相槌; shows you are following without interrupting.",
    },
  ],
  doDont: {
    do: [
      "Report finished work the same day, even if it seems small.",
      "Name the person who helped you when you report upward.",
      "Listen for soft refusals and change approach instead of repeating.",
    ],
    dont: [
      "Disappear until deadline day with bad news.",
      "Say いいえ directly to a manager's face except in real emergencies.",
      "Stay silent on calls while someone explains — they may think the line dropped.",
    ],
  },
  sources: [
    "Standard 新入社員研修 materials on 報連相 (reporting/contact/consultation).",
    "Business Japanese corpora — fixed phrases for お疲れ様 / お先に失礼します.",
    "Intercultural communication research on indirect refusals in Japanese workplaces.",
  ],
};
