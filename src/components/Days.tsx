"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { days } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Days() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = days.length;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - (el.parentElement?.clientWidth ?? 0) + 56;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance() * 1.1}`,
            pin: q("[data-pin]")[0],
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(n - 1, Math.round(self.progress * (n - 1)))),
          },
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-reveal]"), {
          autoAlpha: 0,
          y: 30,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Mobile: native horizontal scroll with snap.
  const onScroll = () => {
    const el = track.current;
    if (!el || window.innerWidth >= 768) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    setActive(Math.min(n - 1, Math.round(el.scrollLeft / (card.offsetWidth + 20))));
  };

  return (
    <section ref={root} id="days" className="relative bg-white">
      <div data-pin className="relative flex min-h-[100svh] flex-col overflow-hidden py-20 md:flex-row md:items-center md:py-0">
        <div className="relative z-10 flex flex-col bg-white px-6 md:h-[100svh] md:w-[34%] md:shrink-0 md:justify-center md:pl-14 md:pr-10">
          <p data-reveal className="kicker mb-10 text-ink-soft md:absolute md:left-14 md:top-14 md:mb-0">
            Ways to spend the day
          </p>
          <h2 data-reveal className="display text-[clamp(40px,4.4vw,66px)] text-ink">
            Days on
            <br />
            the kayal
          </h2>
          <p data-reveal className="script -mt-2 ml-6 -rotate-2 text-[clamp(32px,2.8vw,44px)] text-leaf-deep">
            choose your tide
          </p>
          <p data-reveal className="mt-5 max-w-[36ch] text-[14.5px] leading-relaxed text-ink-soft">
            Begin with the nets at dawn, drift the canals, linger over lunch or arrive as the light turns gold. There is no
            itinerary — only more reasons to stay.
          </p>
          <div data-reveal className="mt-10 max-w-[300px] md:absolute md:bottom-14 md:left-14 md:mt-0">
            <span className="mb-4 block h-px w-28 bg-ink/60" />
            <p className="text-[12px] leading-relaxed text-ink-soft">
              Sunrise nets, canal drifts, long lunches and celebrations shaped around you.
            </p>
          </div>
        </div>

        <div className="relative mt-12 md:mt-0 md:w-[66%] md:overflow-hidden md:py-12">
          <div
            ref={track}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:snap-none md:overflow-visible md:px-0 md:pb-0"
          >
            {days.map((d, i) => (
              <article
                key={d.title.join(" ")}
                className={`group flex w-[80vw] shrink-0 snap-center flex-col border bg-white transition-[opacity,border-color,box-shadow,transform] duration-700 ease-editorial md:w-[27vw] md:min-w-[340px] md:max-w-[420px] ${
                  i === active
                    ? "border-ink/25 opacity-100 shadow-[0_24px_60px_-30px_rgb(15_58_51/0.45)]"
                    : "border-ink-line opacity-60 md:translate-y-2"
                }`}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={d.image.src}
                    alt={d.image.alt}
                    fill
                    sizes="(max-width: 768px) 80vw, 420px"
                    className="object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col px-7 pb-7 pt-7 md:px-10 md:pt-8">
                  <h3 className="display text-[30px] leading-[0.95] text-ink md:text-[34px]">
                    {d.title[0]}
                    <br />
                    {d.title[1]}
                  </h3>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-ink-soft">{d.copy}</p>
                  <div className="mt-auto pt-12">
                    <span className="mb-4 block h-px w-full bg-ink-line" />
                    <p className="kicker text-[9.5px] text-ink-muted">{d.tags}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4 px-6 md:px-0 md:pr-14">
            <span className="display w-10 text-[34px] leading-none text-ink">{String(active + 1).padStart(2, "0")}</span>
            <span className="kicker text-ink-muted">/ {String(n).padStart(2, "0")}</span>
            <span className="relative ml-3 h-px flex-1 bg-ink/15">
              <span
                className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-700 ease-editorial"
                style={{ width: `${((active + 1) / n) * 100}%` }}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
