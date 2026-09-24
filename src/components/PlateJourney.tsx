"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import PlateArt from "./art/PlateArt";
import Doodle from "./art/Doodles";
import { journey } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

type Pos = CSSProperties & { r: number };

// Two photo frames + two doodles per step, alternating around the plate.
const FRAME_POS: [Pos, Pos][] = [
  [{ left: "4%", top: "13%", r: -5 }, { right: "5%", top: "55%", r: 4 }],
  [{ right: "4%", top: "11%", r: 4 }, { left: "7%", top: "57%", r: -3 }],
  [{ left: "3%", top: "44%", r: -4 }, { right: "7%", top: "9%", r: 5 }],
  [{ right: "3%", top: "47%", r: -3 }, { left: "9%", top: "8%", r: 3 }],
  [{ left: "5%", top: "12%", r: 3 }, { right: "5%", top: "54%", r: -5 }],
];
const DOODLE_POS: [CSSProperties, CSSProperties][] = [
  [{ left: "20%", top: "70%" }, { right: "13%", top: "20%" }],
  [{ left: "15%", top: "22%" }, { right: "16%", top: "74%" }],
  [{ left: "17%", top: "16%" }, { right: "14%", top: "64%" }],
  [{ left: "14%", top: "66%" }, { right: "17%", top: "18%" }],
  [{ left: "17%", top: "68%" }, { right: "15%", top: "22%" }],
];

export default function PlateJourney() {
  const root = useRef<HTMLElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const steps = journey.length;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px)",
        },
        (ctx) => {
          const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
          const frames = (i: number) => q(`[data-frame="${i}"]`);
          const doodles = (i: number) => q(`[data-doodle="${i}"] path`);
          const content = (i: number) => q(`[data-content="${i}"] > *`);

          gsap.set(q("[data-frame]"), { autoAlpha: 0 });
          gsap.set(q("[data-content] > *"), { autoAlpha: 0 });
          gsap.set(q("[data-doodle] path"), { strokeDasharray: 1, strokeDashoffset: 1 });

          const setStep = (i: number) => {
            if (count.current) count.current.textContent = String(i + 1).padStart(2, "0");
            gsap.to(bar.current, { scaleX: (i + 1) / steps, duration: 0.5, ease: "power2.out", overwrite: true });
          };

          const frameIn = (tl: gsap.core.Timeline, i: number, at: number) => {
            frames(i).forEach((el, k) => {
              const side = k === 0 ? (i % 2 ? 1 : -1) : i % 2 ? -1 : 1;
              tl.fromTo(
                el,
                { autoAlpha: 0, xPercent: side * 80, yPercent: 30, rotate: Number(el.dataset.r) + side * 14 },
                { autoAlpha: 1, xPercent: 0, yPercent: 0, rotate: Number(el.dataset.r), duration: 1, ease: "power3.out" },
                at + k * 0.12,
              );
            });
            tl.to(doodles(i), { strokeDashoffset: 0, duration: 0.9, stagger: 0.05, ease: "power1.inOut" }, at + 0.2);
            tl.fromTo(content(i), { autoAlpha: 0, y: 26, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.08 }, at + 0.35);
          };
          const frameOut = (tl: gsap.core.Timeline, i: number, at: number) => {
            tl.to(frames(i), { autoAlpha: 0, yPercent: -70, rotate: "+=8", duration: 0.8, ease: "power2.in", stagger: 0.08 }, at);
            tl.to(doodles(i), { strokeDashoffset: -1, duration: 0.6, ease: "power1.in" }, at);
            tl.to(content(i), { autoAlpha: 0, y: -20, filter: "blur(6px)", duration: 0.45, stagger: 0.04 }, at);
          };

          if (!motion) {
            // Static fallback: show the first course only.
            gsap.set([frames(0), content(0)], { autoAlpha: 1 });
            gsap.set(doodles(0), { strokeDashoffset: 0 });
            return;
          }

          // Approach: the plate rises out of the hero and the first course is served.
          const approach = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top 90%", end: "top top", scrub: 0.8 },
          });
          approach.fromTo(
            q("[data-plate]"),
            { yPercent: 55, scale: 0.7, rotate: -80 },
            { yPercent: 0, scale: 1, rotate: 0, duration: 1, ease: "power2.out" },
            0,
          );
          approach.from(q("[data-progress], [data-side]"), { autoAlpha: 0, duration: 0.3 }, 0.6);
          frameIn(approach, 0, 0.35);

          // Pinned: each course rotates the plate and swaps the table around it.
          const total = (steps - 1) * 2 + 1;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${window.innerHeight * (mobile ? 3.6 : 4.6)}`,
              pin: q("[data-pin]")[0],
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const t = self.progress * total;
                const idx = Math.min(steps - 1, Math.max(0, Math.floor((t + 0.5) / 2)));
                if (count.current?.textContent !== String(idx + 1).padStart(2, "0")) setStep(idx);
              },
            },
          });
          for (let i = 1; i < steps; i++) {
            const at = i * 2 - 1;
            frameOut(tl, i - 1, at);
            tl.to(q("[data-plate]"), { rotate: i * 72, duration: 1, ease: "power2.inOut" }, at);
            frameIn(tl, i, at + 0.3);
          }
          tl.to({}, { duration: 0.01 }, total - 0.01);
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="story" className="relative bg-white" aria-label="A day at Backwater">
      <div data-pin className="relative h-[100svh] min-h-[600px] overflow-hidden">
        <p data-side className="kicker absolute left-6 top-8 z-30 text-ink-soft md:left-14 md:top-14">Backwater · Kumarakom</p>

        <div data-side className="absolute bottom-8 left-6 z-30 hidden max-w-[300px] md:left-14 md:block">
          <span className="mb-4 block h-px w-28 bg-ink/60" />
          <p className="text-[12.5px] leading-relaxed text-ink-soft">
            Arrive the slow way — by boat, past the paddy and the nets. Coconut oil and curry leaf in the air, tables set on the
            jetty, and Vembanad all around: Backwater is where the lake comes to lunch.
          </p>
        </div>

        {journey.map((step, i) => (
          <div key={step.title}>
            {step.frames.map((f, k) => {
              const { r, ...pos } = FRAME_POS[i][k];
              return (
                <figure
                  key={f.src}
                  data-frame={i}
                  data-r={r}
                  className="polaroid absolute z-10 w-[34vw] max-w-[330px] md:w-[21vw]"
                  style={{ ...pos, transform: `rotate(${r}deg)` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={f.src} alt={f.alt} fill sizes="(max-width: 768px) 34vw, 330px" className="object-cover" />
                  </div>
                </figure>
              );
            })}
            {step.doodles.map((d, k) => (
              <Doodle
                key={d + k}
                name={d}
                data-doodle={i}
                className="absolute z-[5] hidden w-[88px] text-leaf md:block lg:w-[110px]"
                style={DOODLE_POS[i][k]}
              />
            ))}
          </div>
        ))}

        <div className="absolute left-1/2 top-1/2 z-20 aspect-square w-[min(92vw,78svh)] -translate-x-1/2 -translate-y-1/2">
          <svg data-plate viewBox="0 0 1000 1000" className="h-full w-full overflow-visible" aria-hidden="true">
            <PlateArt />
          </svg>

          <div className="absolute inset-0 grid place-items-center">
            <div className="relative -mt-[6%] grid w-[58%] place-items-center text-center">
              {journey.map((step, i) => (
                <div key={step.title} data-content={i} className="col-start-1 row-start-1 flex flex-col items-center">
                  <h2 className="display text-[clamp(30px,4.3vw,64px)] text-ink">{step.title}</h2>
                  <p className="script -mt-[0.35em] -rotate-3 text-[clamp(26px,3.2vw,46px)] text-leaf-deep">{step.script}</p>
                  <p className="mt-3 max-w-[32ch] text-[12px] leading-relaxed text-ink-soft md:mt-4 md:text-[14px]">{step.copy}</p>
                </div>
              ))}

            </div>
          </div>

          <div
            data-progress
            className="absolute bottom-[23%] left-1/2 flex w-[min(210px,30%)] -translate-x-1/2 items-center gap-3 text-ink-soft"
          >
            <span ref={count} className="kicker">
              01
            </span>
            <span className="relative h-px flex-1 bg-ink/15">
              <span ref={bar} className="absolute inset-0 origin-left scale-x-[0.2] bg-ink" />
            </span>
            <span className="kicker">/ {String(steps).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
