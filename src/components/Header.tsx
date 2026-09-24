"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { gsap, ScrollTrigger, scrollToId, useGSAP } from "@/lib/gsap";

const NAV = [
  { id: "story", label: "Our Story", note: "from first light" },
  { id: "days", label: "Days on the Kayal", note: "choose your tide" },
  { id: "toddy", label: "Toddy Hour", note: "as the sun softens" },
  { id: "catch", label: "The Catch", note: "fresh from Vembanad" },
  { id: "reserve", label: "Reserve", note: "your table awaits" },
  { id: "visit", label: "Find Us", note: "Kumarakom, Kerala" },
];

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const el = overlay.current;
    if (!el) return;
    tl.current = gsap
      .timeline({ paused: true })
      .set(el, { visibility: "visible" })
      .fromTo(
        el,
        { clipPath: "circle(0% at calc(100% - 64px) 56px)" },
        { clipPath: "circle(150% at calc(100% - 64px) 56px)", duration: 1, ease: "power3.inOut" },
      )
      .from(
        el.querySelectorAll("[data-menu-item]"),
        { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" },
        "-=0.45",
      )
      .from(el.querySelectorAll("[data-menu-fade]"), { opacity: 0, y: 20, duration: 0.7, stagger: 0.08 }, "<0.1");

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScrolled(self.scroll() > window.innerHeight * 0.8),
    });
  });

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      tl.current.timeScale(1).play();
      lenis()?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      tl.current.timeScale(1.6).reverse();
      lenis()?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    // Let the overlay start closing before we scroll.
    window.setTimeout(() => scrollToId(id), open ? 450 : 0);
  }, [open]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 text-white">
        <div className="mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-5 pt-6 md:px-14 md:pt-10">
          <nav className="hidden items-center gap-6 md:flex">
            {[
              ["visit", "Find us"],
              ["catch", "Menu"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="display text-[19px] tracking-[0.02em] transition-opacity hover:opacity-70"
              >
                {label}
              </button>
            ))}
          </nav>
          <span className="md:hidden" />
          <a href="#top" aria-label="Backwater — home" onClick={(e) => (e.preventDefault(), scrollToId("top"))}>
            <Logo />
          </a>
        </div>
      </header>

      {/* Floating menu toggle — sits on the hero, becomes a pill once scrolled */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
        className={`fixed right-4 top-5 z-[120] grid size-14 place-items-center rounded-full transition-[background-color,color,box-shadow] duration-500 md:right-10 md:top-8 ${
          open
            ? "text-white"
            : scrolled
              ? "bg-white/85 text-ink shadow-[0_8px_30px_-10px_rgb(15_58_51/0.35)] backdrop-blur-md"
              : "text-white"
        }`}
      >
        <span className="relative block h-3.5 w-9">
          <span
            className={`absolute right-0 top-0 h-px w-9 bg-current transition-transform duration-500 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`absolute right-0 top-[7px] h-px w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute right-0 top-[14px] h-px bg-current transition-all duration-500 ${open ? "w-9 -translate-y-[7px] -rotate-45" : "w-7"}`}
          />
        </span>
      </button>

      <div
        id="site-menu"
        ref={overlay}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className="invisible fixed inset-0 z-[110] overflow-y-auto overflow-x-hidden bg-kayal text-white"
        style={{ clipPath: "circle(0% at calc(100% - 64px) 56px)" }}
        data-lenis-prevent
      >
        <div className="pointer-events-none absolute -right-24 bottom-[-12%] font-ml text-[34vw] leading-none text-white/[0.04] md:text-[26vw]">
          കായൽ
        </div>
        <div className="relative mx-auto grid min-h-full max-w-[1400px] gap-12 px-6 pb-12 pt-28 md:grid-cols-[1.4fr_1fr] md:px-14 md:pt-32">
          <nav>
            <p className="kicker mb-8 text-leaf" data-menu-fade>
              Navigate
            </p>
            <ul className="space-y-1 md:space-y-2">
              {NAV.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <button
                    data-menu-item
                    onClick={() => go(item.id)}
                    className="group flex items-baseline gap-4 py-1 text-left md:gap-6"
                  >
                    <span className="kicker w-6 text-white/45">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display whitespace-nowrap text-[34px] transition-transform duration-500 ease-editorial group-hover:translate-x-3 sm:text-[40px] md:text-[60px]">
                      {item.label}
                    </span>
                    <span className="script hidden translate-y-2 text-[30px] text-leaf opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:inline">
                      {item.note}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <aside className="flex flex-col justify-end gap-8 md:pb-4">
            <div className="polaroid w-[min(100%,340px)] rotate-2 bg-cream" data-menu-fade>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/karimeen-pollichathu.jpg"
                  alt="Karimeen pollichathu opened on a banana leaf"
                  fill
                  sizes="340px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-end justify-between px-1 pb-1 pt-3 text-ink">
                <span className="kicker text-[9px] text-ink-muted">Tonight · Karimeen pollichathu</span>
                <span className="script text-2xl text-leaf-deep">our signature</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 text-sm text-white/75" data-menu-fade>
              <div>
                <p className="kicker mb-2 text-leaf">Hours</p>
                <p>Lunch 12 – 3:30</p>
                <p>Toddy hour 4:30 – 6:30</p>
                <p>Dinner 7 – 11</p>
              </div>
              <div>
                <p className="kicker mb-2 text-leaf">Jetty</p>
                <p>Kavanattinkara,</p>
                <p>Kumarakom, Kottayam</p>
                <p>Kerala 686563</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
