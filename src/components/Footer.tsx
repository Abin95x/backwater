import Link from "next/link";
import Logo from "./Logo";
import { KARIMEEN_BODY } from "./art/KarimeenArt";

const COLUMNS = [
  {
    title: "Our story",
    sub: ["The lake", "through our eyes"],
    copy: "Backwater began as a fisherman's family kitchen on the jetty. Three generations on, the karimeen is still fried in the same iron cheenachatti.",
    link: "Explore the kayal",
  },
  {
    title: "The kitchen",
    sub: ["Fresh", "from Vembanad"],
    copy: "Coconut oil, curry leaf, kudampuli and the morning's catch. The board changes with the tide, the monsoon and whatever the nets bring in.",
    link: "See the menu",
  },
  {
    title: "Events",
    sub: ["Feasts", "by the water"],
    copy: "Sadyas on the jetty, houseboat lunches and lamp-lit dinners for weddings, birthdays and everything in between.",
    link: "Plan an event",
  },
  {
    title: "Visit",
    sub: ["Find us", "in Kumarakom"],
    copy: "Kavanattinkara, Kumarakom, Kottayam, Kerala 686563. Arrive by road or ask for a boat from the Kumarakom jetty.",
    link: "Get directions",
  },
];

export default function Footer() {
  return (
    <footer id="visit" className="relative overflow-hidden bg-kayal text-white">
      <svg
        viewBox="100 80 660 440"
        className="pointer-events-none absolute -bottom-[18%] -right-[12%] w-[95vw] max-w-[1400px] text-white/[0.06]"
        fill="none"
        stroke="currentColor"
        strokeWidth={10}
        aria-hidden="true"
      >
        <path d={KARIMEEN_BODY} />
        <path d="M605,262 C640,240 684,208 728,188 C714,238 709,270 711,298 C709,330 714,362 730,412 C686,390 646,362 606,338" />
        <circle cx={184} cy={262} r={16} />
      </svg>

      <div className="relative mx-auto max-w-[1500px] px-6 pb-10 pt-20 md:px-14 md:pt-24">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <h2 className="display text-[clamp(36px,4.4vw,64px)]">The world of Backwater</h2>
            <p className="script mt-1 text-[clamp(44px,5.6vw,88px)] text-white/90">where the tide brings us together</p>
            <p className="mt-6 text-[14px] text-white/80">
              Reservations — <a className="font-semibold italic text-white hover:underline" href="tel:+914810000000">+91 481 000 0000</a>
              {" · "}
              <a className="font-semibold italic text-white hover:underline" href="mailto:hello@backwater.example">
                hello@backwater.example
              </a>
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Logo />
            <span className="font-ml text-[22px] text-white/60">കായൽ</span>
          </div>
        </div>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 md:mt-40 lg:grid-cols-4">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <h3 className="display text-[28px]">{c.title}</h3>
              <p className="mt-1 text-[14px] text-white/85">
                {c.sub[0]} <b className="font-bold">{c.sub[1]}</b>
              </p>
              <p className="mt-5 max-w-[34ch] text-[12.5px] leading-relaxed text-white/70">{c.copy}</p>
              <span className="display mt-6 inline-block border-b border-white/70 pb-0.5 text-[16px] tracking-[0.02em]">{c.link}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/20 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="display text-[17px] tracking-[0.02em] text-white/85">
            © 2026 Backwater · Kumarakom, Kerala ·{" "}
            <Link href="/credits" className="border-b border-white/50 hover:border-white">
              Photo credits
            </Link>
          </p>
          <div className="flex items-center gap-5">
            <a href="https://wa.me/914810000000" aria-label="WhatsApp" className="opacity-85 transition-opacity hover:opacity-100">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" strokeLinejoin="round" />
                <path d="M9 8.5c.3 2.6 2.4 5 5.3 5.8l1.2-1.2 1.8.9c-.2 1-1.1 1.8-2.2 1.7C10.8 15.3 8.2 12.4 8 8.9 8 7.9 8.8 7 9.8 6.9l.8 1.8z" />
              </svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="opacity-85 transition-opacity hover:opacity-100">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
