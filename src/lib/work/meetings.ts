import type { WorkPageContent } from "@/types/work";

export const meetingsPage: WorkPageContent = {
  slug: "meetings",
  title: "Meetings",
  glyph: "会",
  description: "Seating, when to speak, 根回し, consensus, and minutes.",
  introLines: [
    "Meetings often confirm what was already agreed in corridors.",
    "Listen, take accurate notes, and support the decision — do not surprise the chair with a new idea.",
  ],
  tldr: [
    "Honour seat is farthest from the door; sit near the door if unsure.",
    "Sound out stakeholders before the invite — the meeting ratifies, it rarely discovers.",
    "Speak after the chair opens the floor or your manager nods to you.",
    "Minutes: who decided what, owners, dates — send within 24 hours.",
  ],
  concepts: [
    {
      id: "seating",
      title: "Where to sit",
      ruby: { kanji: "上座", reading: "かみざ" },
      romaji: "kamiza / shimoza",
      summaryLines: [
        "The honour seat is usually farthest from the door.",
        "The lower seat is near the door — where juniors sit when unsure.",
      ],
      terms: [
        {
          id: "mtg-kamiza",
          japanese: "上座",
          ruby: [{ text: "上座", reading: "かみざ" }],
          romaji: "kamiza",
          meaning: "Honour / senior seat",
        },
        {
          id: "mtg-shimoza",
          japanese: "下座",
          ruby: [{ text: "下座", reading: "しもざ" }],
          romaji: "shimoza",
          meaning: "Lower / junior seat (often by the door)",
        },
      ],
      whatToDo: [
        "Enter, pause, and let the most senior person sit first if it is a formal client meeting.",
        "If nobody directs you, take the seat nearest the door and keep your materials compact.",
        "Do not argue about seating — accept a gesture if someone points you to a chair.",
      ],
    },
    {
      id: "when-speak",
      title: "When to speak",
      summaryLines: [
        "Speak after the chair opens the floor, or when your manager nods to you.",
        "Long silence then a sudden monologue reads as disrespect.",
      ],
      whatToDo: [
        "Prepare one slide or three bullet points maximum for your slot.",
        "Open with one line: purpose → fact → request.",
        "If interrupted, stop immediately — do not talk over seniors.",
        "Summarise agreement before the room moves on — use the confirmation phrase in the table below.",
      ],
    },
    {
      id: "consensus",
      title: "Why decisions look pre-made",
      ruby: { kanji: "合意", reading: "ごうい" },
      romaji: "gōi",
      summaryLines: [
        "Visible consensus in the meeting means pre-alignment happened earlier.",
        "The meeting ratifies; it rarely discovers.",
      ],
      whatToDo: [
        "If you need a yes, sound out key people before the calendar invite goes out.",
        "Bring concerns to your manager privately first, not as an ambush in the room.",
        "Support the final decision in the room even if you lost — dissent stays inside.",
      ],
    },
    {
      id: "nemawashi",
      title: "Building agreement beforehand",
      ruby: { kanji: "根回し", reading: "ねまわし" },
      romaji: "nemawashi",
      summaryLines: [
        "Quiet pre-alignment: one-to-one chats, draft mails, and direction checks before the group meets.",
      ],
      whatToDo: [
        "List stakeholders who can block the idea (legal, finance, section chief).",
        "Visit or mail each with a short brief and ask for concerns — not permission yet.",
        "Revise the proposal from their feedback.",
        "Only then schedule the meeting with an agenda that names the already-leaning decision.",
        "In the meeting, let a senior state the conclusion; you supply facts if asked.",
      ],
    },
    {
      id: "gijiroku",
      title: "Notes and minutes",
      ruby: { kanji: "議事録", reading: "ぎじろく" },
      romaji: "gijiroku",
      summaryLines: [
        "Someone writes formal minutes — decisions, owners, dates.",
        "If you are junior, you may be asked to draft.",
      ],
      whatToDo: [
        "Note who said what decision — not verbatim jokes or side chat.",
        "Record: date, attendees, agenda, conclusion, action items (who / what / by when).",
        "Send draft to your manager before circulating externally.",
        "Use past tense and neutral language — no emotional adjectives.",
      ],
    },
  ],
  phrases: [
    {
      id: "mtg-open",
      japanese: "それでは、定刻になりましたので、始めさせていただきます。",
      ruby: [{ text: "定刻", reading: "ていこく" }],
      romaji: "Sore dewa, teikoku ni narimashita node, hajime sasete itadakimasu.",
      english: "It is the scheduled time — we will begin.",
      register: "internal-senior",
      usage: "Only if you are chair; juniors rarely say this.",
    },
    {
      id: "mtg-opinion",
      japanese: "一点、ご説明させていただけますでしょうか。",
      ruby: [{ text: "説明", reading: "せつめい" }],
      romaji: "Itten, go-setsumei sasete itadakemasu deshō ka.",
      english: "May I explain one point?",
      register: "internal-senior",
      usage: "When invited to speak; wait for eye contact or a nod first.",
    },
    {
      id: "mtg-confirm",
      japanese: "本日の決定事項は、〇〇という理解でよろしいでしょうか。",
      ruby: [{ text: "決定", reading: "けってい" }, { text: "事項", reading: "じこう" }],
      romaji: "Honjitsu no kettei jikō wa, ○○ to iu rikai de yoroshii deshō ka.",
      english: "Is it correct that today's decision is ○○?",
      register: "internal-peer",
      usage: "End of meeting — saves silent disagreement later.",
    },
    {
      id: "mtg-gijiroku",
      japanese: "議事録を本日中に共有いたします。",
      ruby: [{ text: "議事録", reading: "ぎじろく" }, { text: "共有", reading: "きょうゆう" }],
      romaji: "Gijiroku o honjitsu-jū ni kyōyū itashimasu.",
      english: "I will share the minutes within today.",
      register: "internal-senior",
      usage: "Closing line when you are the note-taker.",
    },
  ],
  doDont: {
    do: [
      "Sit near the door until you know the room.",
      "Pre-align controversial items in one-to-ones.",
      "Send minutes within 24 hours.",
    ],
    dont: [
      "Present a surprise proposal the manager has never seen.",
      "Contradict your manager in front of a client.",
      "Record opinions in minutes as if they were decisions.",
    ],
  },
  sources: [
    "Japanese meeting practice literature on 根回し and nemawashi in decision-making.",
    "Standard 議事録 templates used in corporate Japan.",
    "Seating diagrams from business manner guides (kamiza / shimoza).",
  ],
};
