"use client";

import Image from "next/image";
import { useRef } from "react";
import Header from "./Header";
import { gsap, useGSAP } from "@/lib/gsap";

const HEADLINE = "DINING BY THE LAKE";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          if (!ctx.conditions?.motion) return;
          const q = gsap.utils.selector(root);

          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
          intro
            .fromTo(q("[data-bg]"), { scale: 1.2, opacity: 0 }, { scale: 1.08, opacity: 1, duration: 2.4 })
            .from(q("[data-char]"), { opacity: 0, duration: 0.9, stagger: { each: 0.05, from: "center" } }, 0.4)
            .from(q("[data-headline]"), { y: 50, duration: 1.8 }, 0.4)
            .from(q("header, [data-hero-meta]"), { opacity: 0, y: -12, duration: 1, stagger: 0.1 }, 1.2);

          const scroll = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
            defaults: { ease: "none" },
          });
          scroll
            .to(q("[data-bg-wrap]"), { yPercent: 18 }, 0)
            .to(q("[data-headline]"), { yPercent: -45, opacity: 0 }, 0);
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#8fb6c9]">
      <div data-bg-wrap className="absolute inset-0">
        <div data-bg className="absolute inset-0 scale-[1.08]">
          <Image
            src="/images/hero-backwater.jpg"
            alt="Coconut palms leaning over the Kumarakom backwaters"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_62%]"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c2c33]/45 via-[#0c2c33]/5 to-[#0c2c33]/10" />
      <div className="light-wash" aria-hidden="true" />

      <Header />

      <h1 className="sr-only">Backwater — Kerala fish restaurant in Kumarakom</h1>
      <div
        data-headline
        className="pointer-events-none absolute left-1/2 top-[17svh] w-[112vw] max-w-[1180px] -translate-x-1/2 md:top-[15svh] md:w-[96vw]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1200 430" className="w-full overflow-visible">
          <path id="hero-arc" d="M 110 410 A 620 620 0 0 1 1090 410" fill="none" />
          <text
            className="font-display"
            fontSize="100"
            fill="#ffffff"
            letterSpacing="2"
            style={{ filter: "drop-shadow(0 4px 18px rgb(0 30 40 / 0.25))" }}
          >
            <textPath href="#hero-arc" startOffset="50%" textAnchor="middle">
              {HEADLINE.split("").map((c, i) => (
                <tspan key={i} data-char>
                  {c}
                </tspan>
              ))}
            </textPath>
          </text>
        </svg>
      </div>



      <div data-hero-meta className="absolute bottom-[17svh] left-6 hidden max-w-[220px] text-white md:left-14 md:block">
        <p className="kicker mb-3 text-white/80">Kumarakom · Kerala</p>
        <p className="font-ml text-[22px] leading-tight">കരിമീൻ പൊള്ളിച്ചത്</p>
        <p className="script mt-1 text-[30px] text-[#cfe9bd]">caught this morning</p>
      </div>
      <div data-hero-meta className="absolute bottom-[17svh] right-6 hidden text-right text-white md:right-14 md:block">
        <p className="kicker text-white/80">Lunch · Toddy hour · Dinner</p>
        <p className="kicker mt-2 text-white/60">Open daily</p>
      </div>

      {/* Wave edge into the next section */}
      <svg
        className="pointer-events-none absolute bottom-[-1px] left-0 h-[13svh] w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,118 C220,168 420,196 720,190 C1010,184 1220,120 1440,66 L1440,200 L0,200 Z" fill="#ffffff" />
      </svg>

    </section>
  );
}
