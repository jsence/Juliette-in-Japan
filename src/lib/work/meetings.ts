import type { WorkPageContent } from "@/types/work";

export const meetingsPage: WorkPageContent = {
  slug: "meetings",
  title: "Meetings",
  glyph: "会",
  description: "Seating, when to speak, 根回し, consensus, and minutes.",
  intro:
    "Meetings often confirm what was already agreed in corridors. Your job in the room is to listen, take accurate notes, and support the decision — not to surprise the chair with a new idea.",
  concepts: [
    {
      id: "seating",
      title: "Where to sit",
      ruby: { kanji: "上座", reading: "かみざ" },
      romaji: "kamiza / shimoza",
      summary:
        "上座 is the honour seat — usually farthest from the door. 下座 is near the door where juniors sit and where you sit if unsure.",
      whatToDo: [
        "Enter, pause, and let the most senior person sit first if it is a formal client meeting.",
        "If nobody directs you, take the seat nearest the door and keep your materials compact.",
        "Do not argue about seating — accept a gesture if someone points you to a chair.",
      ],
    },
    {
      id: "when-speak",
      title: "When to speak",
      summary:
        "Speak after the chair opens the floor, or when your manager nods to you. Long silence then a sudden monologue reads as disrespect.",
      whatToDo: [
        "Prepare one slide or three bullet points maximum for your slot.",
        "Open with 一言: purpose → fact → request.",
        "If interrupted, stop immediately — do not talk over seniors.",
        "Summarise agreement before the room moves on: 「では、〇〇で進める、という理解でよろしいでしょうか。」",
      ],
    },
    {
      id: "consensus",
      title: "Why decisions look pre-made",
      ruby: { kanji: "合意", reading: "ごうい" },
      romaji: "gōi",
      summary:
        "Visible consensus in the meeting means 根回し happened earlier. The meeting ratifies; it rarely discovers.",
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
      summary:
        "根回し is quiet pre-alignment: one-to-one chats, draft mails, and «would this direction be acceptable?» before the group meets.",
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
      summary:
        "Someone will write 議事録 — decisions, owners, dates. If you are junior, you may be asked to draft.",
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
      register: "Internal · humble (team / upward)",
      usage: "Only if you are chair; juniors rarely say this.",
    },
    {
      id: "mtg-opinion",
      japanese: "一点、ご説明させていただけますでしょうか。",
      ruby: [{ text: "説明", reading: "せつめい" }],
      romaji: "Itten, go-setsumei sasete itadakemasu deshō ka.",
      english: "May I explain one point?",
      register: "Internal · humble (team / upward)",
      usage: "When invited to speak; wait for eye contact or a nod first.",
    },
    {
      id: "mtg-confirm",
      japanese: "本日の決定事項は、〇〇という理解でよろしいでしょうか。",
      ruby: [{ text: "決定", reading: "けってい" }, { text: "事項", reading: "じこう" }],
      romaji: "Honjitsu no kettei jikō wa, ○○ to iu rikai de yoroshii deshō ka.",
      english: "Is it correct that today's decision is ○○?",
      register: "Neutral · polite (either side)",
      usage: "End of meeting — saves silent disagreement later.",
    },
    {
      id: "mtg-gijiroku",
      japanese: "議事録を本日中に共有いたします。",
      ruby: [{ text: "議事録", reading: "ぎじろく" }, { text: "共有", reading: "きょうゆう" }],
      romaji: "Gijiroku o honjitsu-jū ni kyōyū itashimasu.",
      english: "I will share the minutes within today.",
      register: "Internal · humble (team / upward)",
      usage: "Closing line when you are the note-taker.",
    },
  ],
  doDont: {
    do: [
      "Sit near the door until you know the room.",
      "Pre-align controversial items in one-to-ones.",
      "Send minutes within 24 hours while memory is fresh.",
    ],
    dont: [
      "Present a surprise proposal the manager has never seen.",
      "Contradict your manager in front of a client.",
      "Record personal opinions in 議事録 as if they were decisions.",
    ],
  },
  sources: [
    "Japanese meeting practice literature on 根回し and nemawashi in decision-making.",
    "Standard 議事録 templates used in corporate Japan.",
    "Seating diagrams from business manner guides (kamiza / shimoza).",
  ],
};
