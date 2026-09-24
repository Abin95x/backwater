"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Atmosphere() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          q("[data-bg]"),
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.02,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "top 5%", scrub: 1 },
        });
        tl.fromTo(q("[data-title]"), { letterSpacing: "0.28em", autoAlpha: 0 }, { letterSpacing: "0.01em", autoAlpha: 1, ease: "power2.out" })
          .fromTo(q("[data-script]"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "power1.inOut" }, 0.3)
          .from(q("[data-kicker]"), { autoAlpha: 0, y: 10 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="atmosphere" className="relative isolate z-10 min-h-[140svh] overflow-hidden bg-night text-white">
      <div data-bg className="absolute inset-x-0 -top-[8%] h-[116%]">
        <Image
          src="/images/atmosphere-nets.jpg"
          alt="A Chinese fishing net rising at sunrise with birds overhead, Ashtamudi Lake"
          fill
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1206]/35 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-transparent via-white/75 to-white" />
      <div className="light-wash" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center px-6 pt-[16svh] text-center">
        <p data-kicker className="kicker mb-5 text-white/85">
          Sunrise on the nets · Ashtamudi
        </p>
        <h2 data-title className="display text-[clamp(44px,8.6vw,146px)] drop-shadow-[0_6px_30px_rgb(40_20_0/0.25)]">
          Come for the kayal
        </h2>
        <p data-script className="script -mt-[0.25em] -rotate-2 pb-4 text-[clamp(40px,6.4vw,104px)] text-[#f7ecd0]">
          stay for the karimeen
        </p>
      </div>
    </section>
  );
}
