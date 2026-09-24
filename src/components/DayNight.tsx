"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function DayNight() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        tl.fromTo(q("[data-day-img]"), { scale: 1.12 }, { scale: 1, duration: 1 }, 0)
          .from(q("[data-day] > *"), { autoAlpha: 0, y: 30, stagger: 0.06, duration: 0.25 }, 0.02)
          .to(q("[data-day] > *"), { autoAlpha: 0, y: -30, stagger: 0.04, duration: 0.18 }, 0.42)
          .fromTo(q("[data-night]"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "power1.inOut" }, 0.36)
          .fromTo(q("[data-night-img]"), { scale: 1.2, xPercent: -6 }, { scale: 1.04, xPercent: 0, duration: 0.64 }, 0.36)
          .from(q("[data-night-copy] > *"), { autoAlpha: 0, y: 30, stagger: 0.06, duration: 0.2 }, 0.68)
          .fromTo(q("[data-dn-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="daynight" className="relative h-[280svh] bg-night text-white">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div data-day-img className="absolute inset-0">
          <Image
            src="/images/day-houseboat.jpg"
            alt="A houseboat drifting on the Punnamada backwaters in daylight"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#0b2226]/30" />

        <div data-day className="absolute inset-0 grid place-content-center justify-items-center px-6 text-center">
          <p className="kicker mb-5 text-white/85">Afternoon</p>
          <h2 className="display text-[clamp(52px,8.4vw,136px)]">Day drifts</h2>
          <p className="script -mt-[0.2em] -rotate-2 text-[clamp(38px,5vw,78px)] text-[#cfeabf]">into golden hour</p>
        </div>

        <div data-night className="absolute inset-0" style={{ clipPath: "inset(0 100% 0 0)" }}>
          <div data-night-img className="absolute inset-0">
            <Image
              src="/images/night-lamps.jpg"
              alt="Chinese fishing nets lit by lamps over the water at night, Ashtamudi Lake"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#061a1c]/40 via-[#061a1c]/20 to-[#061a1c]/55" />
          <div data-night-copy className="absolute inset-0 grid place-content-center justify-items-center px-6 text-center">
            <p className="kicker mb-5 text-white/85">After dark</p>
            <h2 className="display text-[clamp(52px,8.4vw,136px)]">Night unfolds</h2>
            <p className="script -mt-[0.2em] -rotate-2 text-[clamp(38px,5vw,78px)] text-[#f3dca4]">lamps, toddy &amp; the tide</p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 flex w-[min(360px,70vw)] -translate-x-1/2 items-center gap-4">
          <span className="kicker text-[9px] text-white/70">Day</span>
          <span className="relative h-px flex-1 bg-white/25">
            <span data-dn-bar className="absolute inset-0 origin-left bg-white" />
          </span>
          <span className="kicker text-[9px] text-white/70">Night</span>
        </div>
      </div>
    </section>
  );
}
