import type { Metadata } from "next";
import { Inter, Noto_Serif, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const serifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — a learning log`,
    template: `%s · ${site.name}`,
  },
  description:
    "A personal travel-journal-style site documenting the journey toward working in Japan: honest progress, curated resources, and N5 study material from open, human-verified data.",
  metadataBase: new URL("https://juliette-in-japan.vercel.app"),
  openGraph: {
    title: site.name,
    description:
      "Honest progress, curated resources, and N5 study material from open, human-verified data.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${serifJp.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-hanko focus:px-4 focus:py-2 focus:text-paper-50"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
