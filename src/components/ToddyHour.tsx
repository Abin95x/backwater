"use client";

import { useRef } from "react";
import Doodle from "./art/Doodles";
import PalmFrond from "./art/PalmFrond";
import TenderCoconut from "./art/TenderCoconut";
import { gsap, useGSAP } from "@/lib/gsap";

const WORD = ["Toddy", "Hour"];

export default function ToddyHour() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 65%", toggleActions: "play none none reverse" },
        });
        tl.from(q("[data-letter]"), { yPercent: 110, duration: 1.1, stagger: 0.045, ease: "power4.out" })
          .from(q("[data-coconut]"), { y: -220, rotate: -18, autoAlpha: 0, duration: 1.4, ease: "bounce.out" }, 0.35)
          .from(q("[data-fade]"), { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.5)
          .from(q("[data-frond]"), { autoAlpha: 0, scale: 0.8, duration: 1.4, ease: "power3.out", stagger: 0.1 }, 0);

        gsap.to(q("[data-ghost]"), {
          rotate: 12,
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="toddy"
      className="relative isolate grid min-h-[112svh] place-items-center overflow-hidden bg-sand px-6 py-[16svh]"
    >
      <div data-frond className="absolute -right-[8%] -top-[6%] w-[48vw] max-w-[560px] origin-top-right md:-right-[3%]">
        <div className="sway" style={{ ["--sway-from" as string]: "-3deg", ["--sway-to" as string]: "2deg", transformOrigin: "100% 0%" }}>
          <PalmFrond className="w-full -scale-x-100 rotate-[160deg]" />
        </div>
      </div>
      <div data-frond className="absolute -bottom-[8%] -left-[10%] w-[52vw] max-w-[600px] origin-bottom-left md:-left-[4%]">
        <div
          className="sway"
          style={{ ["--sway-from" as string]: "2deg", ["--sway-to" as string]: "-3deg", ["--sway-duration" as string]: "8s", transformOrigin: "0% 100%" }}
        >
          <PalmFrond className="w-full" />
        </div>
      </div>

      <Doodle
        name="fish"
        data-ghost
        strokeWidth={1.4}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(70vw,720px)] -translate-x-1/2 -translate-y-1/2 text-[#d9ccb2]"
      />

      <div className="relative w-full max-w-[1200px]">
        <p data-fade className="kicker mb-4 text-ink-soft md:ml-[10%]">
          When the tide turns gold
        </p>
        <h2 className="display relative z-10 text-center text-[clamp(78px,15vw,232px)] leading-[0.82] text-ink">
          {WORD.map((w) => (
            <span key={w} className="inline-block overflow-hidden px-[0.04em] align-top">
              {w.split("").map((c, i) => (
                <span key={i} data-letter className="inline-block">
                  {c}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div
          data-coconut
          className="pointer-events-none absolute left-1/2 top-[48%] z-20 w-[clamp(170px,22vw,320px)] -translate-x-1/2 -translate-y-1/2"
        >
          <TenderCoconut className="w-full drop-shadow-[0_30px_40px_rgb(60_40_10/0.25)]" />
        </div>

        <div className="relative z-30 mt-[clamp(120px,14vw,190px)] flex flex-col gap-6 md:mt-10 md:flex-row md:items-start md:justify-end md:gap-16">
          <p data-fade className="max-w-[34ch] text-[14.5px] leading-relaxed text-ink-soft md:mr-[4%]">
            Toddy tapped from the palms at dawn, tender coconut cracked to order and a plate of kappa for the table. The lake
            slows down; so should you.
          </p>
          <p data-fade className="kicker text-ink-muted md:mt-1">4:30 – 6:30 · every day</p>
        </div>
      </div>
    </section>
  );
}
