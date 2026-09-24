"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const TITLE = "Your table awaits";

export default function Reserve() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", mobile: "(max-width: 767px)" },
        (ctx) => {
          const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
          if (!motion) return;
          const start = mobile ? "inset(26% 10% 26% 10% round 22px)" : "inset(22% 31% 22% 31% round 28px)";
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7 },
          });
          tl.fromTo(q("[data-window]"), { clipPath: start }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.5, ease: "power2.inOut" }, 0)
            .fromTo(q("[data-img]"), { scale: 1.35 }, { scale: 1, duration: 0.7 }, 0)
            .to(q("[data-pre]"), { autoAlpha: 0, y: -30, duration: 0.2 }, 0.05)
            .from(q("[data-char]"), { autoAlpha: 0, yPercent: 60, stagger: 0.012, duration: 0.14, ease: "power2.out" }, 0.45)
            .from(q("[data-after]"), { autoAlpha: 0, y: 24, stagger: 0.05, duration: 0.14 }, 0.62)
            .to({}, { duration: 0.2 }, 0.8);
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="reserve" className="relative h-[300svh] bg-white">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div data-pre className="absolute inset-x-0 top-[8%] z-10 px-6 text-center text-ink">
          <p className="kicker text-ink-soft">Reservations</p>
          <p className="script mt-2 text-[clamp(34px,3.4vw,52px)] text-leaf-deep">a seat by the water</p>
        </div>

        <div data-window className="absolute inset-0" style={{ clipPath: "inset(22% 31% 22% 31% round 28px)" }}>
          <div data-img className="absolute inset-0">
            <Image
              src="/images/cta-sunset.jpg"
              alt="Sunset over the Kerala backwaters framed by coconut palms"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#061a1c]/25 via-[#061a1c]/35 to-[#061a1c]/60" />
          <div className="light-wash" aria-hidden="true" />
        </div>

        <div className="absolute inset-0 grid place-content-center justify-items-center px-6 text-center text-white">
          <h2 className="display text-[clamp(46px,7.6vw,128px)]" aria-label={TITLE}>
            {TITLE.split(" ").map((word, w) => (
              <span key={w} className="inline-block whitespace-nowrap px-[0.12em]" aria-hidden="true">
                {word.split("").map((c, i) => (
                  <span key={i} data-char className="inline-block">
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p data-after className="script -mt-[0.15em] -rotate-2 text-[clamp(38px,5vw,80px)] text-[#f3dca4]">
            by the backwaters
          </p>
          <div data-after className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="tel:+914810000000"
              className="kicker rounded-full bg-white px-8 py-4 text-[11px] text-ink transition-colors duration-300 hover:bg-sand"
            >
              Reserve a table
            </a>
            <a
              href="https://wa.me/914810000000"
              target="_blank"
              rel="noreferrer"
              className="kicker rounded-full border border-white/60 px-8 py-4 text-[11px] text-white transition-colors duration-300 hover:bg-white/10"
            >
              WhatsApp us
            </a>
          </div>
          <p data-after className="kicker mt-8 max-w-[46ch] text-[10px] leading-loose text-white/75">
            Open daily 12 – 11 pm · Free boat pick-up from Kumarakom jetty
          </p>
        </div>
      </div>
    </section>
  );
}
