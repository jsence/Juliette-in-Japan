import type { WorkPageContent } from "@/types/work";

export const firstDaysPage: WorkPageContent = {
  slug: "first-days",
  title: "First days",
  glyph: "初",
  description: "Self-introduction, business cards, titles, and morning assembly on day one.",
  intro:
    "Your first week is mostly logistics and introductions. These are the concrete moves that signal you understand baseline office manners — not perfect Japanese, but correct behaviour.",
  concepts: [
    {
      id: "jikoshokai",
      title: "Self-introduction to the team",
      ruby: { kanji: "自己紹介", reading: "じこしょうかい" },
      romaji: "jikoshōkai",
      summary:
        "You will introduce yourself in the morning meeting, to each desk, and again to partners. Keep it short: name, department, role, one line of relevant background, then ask for guidance.",
      whatToDo: [
        "Stand (or unmute) when called; bow slightly at the start and end.",
        "State your department and job title exactly as HR wrote them on your contract.",
        "Say you are still learning and ask them to correct you — it lowers tension.",
        "Memorise a 20-second version and a 60-second version; use the short one in 朝礼.",
      ],
    },
    {
      id: "meishi",
      title: "Business card exchange",
      ruby: { kanji: "名刺", reading: "めいし" },
      romaji: "meishi",
      summary:
        "Cards are exchanged standing, with two hands, at the start of a first meeting — not mid-conversation at your desk unless someone initiates.",
      whatToDo: [
        "Hold your card facing the other person; receive theirs with both hands and a slight bow.",
        "Read the card aloud or silently for a moment — do not slide it away instantly.",
        "Place it on the table in front of you for the meeting, or in a card case on your desk — not loose in a pocket.",
        "Never write on someone's card in front of them; note details after they leave.",
        "Never put a card in a back trouser pocket and sit on it — that reads as disrespect.",
      ],
    },
    {
      id: "titles",
      title: "Learning titles and how to address people",
      summary:
        "Japanese workplaces run on titles (役職) more than first names. Until invited otherwise, use surname + さん, or the title on the org chart.",
      whatToDo: [
        "Draw a simple chart: who is your 上司, who is 先輩 on the team, who handles what.",
        "Use 課長, 部長, 主任, さん as printed on their card — not invented nicknames.",
        "If unsure, ask HR or your desk neighbour: 「〇〇さん、どうお呼びすればよろしいでしょうか。」",
        "Switch to first names only when a Japanese colleague explicitly suggests it — often never with clients.",
      ],
    },
    {
      id: "chorei",
      title: "Morning assembly",
      ruby: { kanji: "朝礼", reading: "ちょうれい" },
      romaji: "chōrei",
      summary:
        "Many offices still hold a short stand-up: greeting, company motto, sometimes a one-line report from each section.",
      whatToDo: [
        "Arrive five minutes early; stand in your team's area facing the manager.",
        "Join the group bow and greeting in a normal voice — not silent, not loud.",
        "If asked for 一言, give one sentence: yesterday / today / blockers — no jokes on day one.",
        "After 朝礼, greet nearby desks with a nod and おはようございます before opening your laptop.",
      ],
    },
  ],
  phrases: [
    {
      id: "fd-intro-short",
      japanese: "はじめまして。〇〇部の〇〇と申します。本日よりよろしくお願いいたします。",
      romaji: "Hajimemashite. ○○-bu no ○○ to mōshimasu. Honjitsu yori yoroshiku onegai itashimasu.",
      english: "Nice to meet you. I am ○○ from the ○○ department. I look forward to working with you from today.",
      register: "Internal · polite (です・ます)",
      usage: "First introduction to your team or floor. Replace 部 with 課 if that is your unit name.",
    },
    {
      id: "fd-intro-learning",
      japanese: "まだ慣れておりませんが、ご指導ご鞭撻のほど、よろしくお願いいたします。",
      ruby: [{ text: "鞭撻", reading: "べんたつ" }],
      romaji: "Mada narete orimasen ga, go-shidō go-bentatsu no hodo, yoroshiku onegai itashimasu.",
      english: "I am still getting used to things; I appreciate your guidance and feedback.",
      register: "Internal · humble (team / upward)",
      usage: "Closing line after 自己紹介 — standard, slightly formal, safe with managers.",
    },
    {
      id: "fd-meishi-offer",
      japanese: "恐れ入りますが、名刺をお渡ししてもよろしいでしょうか。",
      ruby: [{ text: "恐れ入", reading: "おそれ" }, { text: "名刺", reading: "めいし" }],
      romaji: "Osore irimasu ga, meishi o o-watashi shite mo yoroshii deshō ka.",
      english: "Excuse me — may I offer you my business card?",
      register: "Client · humble",
      usage: "When meeting an external contact for the first time; bow as you offer the card.",
    },
    {
      id: "fd-meishi-receive",
      japanese: "ありがとうございます。拝見いたします。",
      ruby: [{ text: "拝見", reading: "はいけん" }],
      romaji: "Arigatō gozaimasu. Haiken itashimasu.",
      english: "Thank you. I will look at it respectfully.",
      register: "Client · humble",
      usage: "When receiving someone's card — said quietly while holding it with both hands.",
    },
    {
      id: "fd-how-to-address",
      japanese: "失礼ですが、お呼び方を教えていただけますでしょうか。",
      ruby: [{ text: "失礼", reading: "しつれい" }],
      romaji: "Shitsurei desu ga, o-yobikata o oshiete itadakemasu deshō ka.",
      english: "Forgive me — could you tell me how I should address you?",
      register: "Internal · polite (です・ます)",
      usage: "To a senior or new colleague when the org chart is unclear.",
    },
  ],
  doDont: {
    do: [
      "Arrive early on day one; introduce yourself to everyone you share space with.",
      "Keep cards pristine; carry a dedicated case.",
      "Write down names and titles the same day you hear them.",
      "Use です・ます with everyone until you hear otherwise.",
    ],
    dont: [
      "Skip introducing yourself because your Japanese is short — a brief attempt matters.",
      "Shove a card across the table one-handed while on a phone call.",
      "Call seniors by first name because Western colleagues do.",
      "Leave 朝礼 early without telling your manager.",
    ],
  },
  sources: [
    "Ministry of Economy, Trade and Industry — business manner guides for new employees (general practice).",
    "Japan External Trade Organization (JETRO) — business card etiquette summaries.",
    "Personal notes from onboarding at Japanese offices; phrasing checked against standard ビジネスマナー textbooks (同内容の定番表現).",
  ],
};
