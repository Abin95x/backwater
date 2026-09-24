"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { dishes } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

export default function TheCatch() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = dishes.length;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.45 * n}`,
            pin: q("[data-pin]")[0],
            scrub: true,
            onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
          },
        });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-reveal]"), {
          autoAlpha: 0,
          y: 30,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        gsap.from(q("[data-card]"), {
          autoAlpha: 0,
          rotate: 6,
          y: 80,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const dish = dishes[active];

  return (
    <section ref={root} id="catch" className="relative bg-gradient-to-b from-white to-cream">
      <div
        data-pin
        className="relative grid min-h-[100svh] items-center gap-12 px-6 py-24 min-[900px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,32vw)] min-[900px]:gap-14 min-[900px]:px-14 min-[900px]:py-0"
      >
        <div className="relative min-[900px]:self-stretch min-[900px]:py-14">
          <p data-reveal className="kicker text-ink-soft">
            The catch · today&apos;s board
          </p>
          <div className="mt-10 min-[900px]:mt-[22svh]">
            <h2 data-reveal className="display text-[clamp(40px,4.4vw,66px)] text-ink">
              From the nets
            </h2>
            <p data-reveal className="script -mt-2 ml-6 -rotate-2 text-[clamp(32px,2.8vw,46px)] text-leaf-deep">
              to your leaf
            </p>
            <p data-reveal className="mt-5 max-w-[36ch] text-[14.5px] leading-relaxed text-ink-soft">
              Almost everything here swam in Vembanad this morning. Pick a dish and we&apos;ll tell you where it came from —
              and which toddy to drink with it.
            </p>
          </div>
          <div data-reveal className="mt-10 max-w-[300px] min-[900px]:absolute min-[900px]:bottom-14">
            <span className="mb-4 block h-px w-28 bg-ink/60" />
            <p className="text-[12px] leading-relaxed text-ink-soft">
              Crab and tiger prawn at market price. Ask about today&apos;s karimeen — fried, in the leaf or in a moilee.
            </p>
          </div>
        </div>

        <ul data-reveal className="order-last flex flex-col gap-1 min-[900px]:order-none min-[900px]:items-end">
          {dishes.map((d, i) => (
            <li key={d.name}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={i === active}
                className={`kicker flex items-center gap-3 py-2 text-[12px] transition-all duration-500 ease-editorial md:text-[13px] ${
                  i === active ? "text-ink min-[900px]:-translate-x-2" : "text-ink/30 hover:text-ink/60"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full bg-leaf transition-transform duration-500 ${i === active ? "scale-100" : "scale-0"}`}
                />
                {d.name}
              </button>
            </li>
          ))}
        </ul>

        <figure data-card className="polaroid relative mx-auto w-full max-w-[460px] rotate-[1.5deg] bg-[#fdfcf8] p-2.5 pb-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            {dishes.map((d, i) => (
              <Image
                key={d.name}
                src={d.image.src}
                alt={d.image.alt}
                fill
                sizes="(max-width: 900px) 90vw, 460px"
                className={`object-cover transition-[opacity,transform] duration-[900ms] ease-editorial ${
                  i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                }`}
              />
            ))}
          </div>
          <figcaption className="flex items-end justify-between gap-4 px-1.5 pt-4">
            <span className="kicker text-[9px] text-ink-muted">
              {String(active + 1).padStart(2, "0")} / {dish.line}
            </span>
            <span key={dish.note} className="script shrink-0 text-[30px] text-leaf-deep motion-safe:animate-[fadeIn_.6s_ease]">
              {dish.note}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
