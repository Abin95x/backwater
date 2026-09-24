import type { Metadata } from "next";
import Link from "next/link";
import credits from "@/data/credits.json";

export const metadata: Metadata = {
  title: "Photo credits — Backwater",
};

export default function Credits() {
  return (
    <main className="min-h-screen bg-cream px-6 py-20 text-ink md:px-14">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="kicker text-ink-soft hover:text-ink">
          ← Back to Backwater
        </Link>
        <h1 className="display mt-10 text-[clamp(40px,6vw,72px)]">Photo credits</h1>
        <p className="mt-4 max-w-[60ch] text-[14.5px] leading-relaxed text-ink-soft">
          Photography on the Backwater site comes from Wikimedia Commons under Creative Commons licences. Images were resized; no
          other changes were made. The karimeen, plate, coconut and palm illustrations are original SVG artwork.
        </p>
        <ul className="mt-12 divide-y divide-ink-line border-y border-ink-line">
          {credits.map((c) => (
            <li key={c.slug} className="grid gap-1 py-4 text-[13.5px] md:grid-cols-[1.4fr_1fr_auto] md:gap-6">
              <a href={c.source} className="font-medium hover:underline" target="_blank" rel="noreferrer">
                {c.title}
              </a>
              <span className="text-ink-soft">{c.author}</span>
              <span className="kicker text-[10px] text-ink-muted">{c.license}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
