"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

type LenisLike = { scrollTo: (target: Element | number, opts?: object) => void };

/** Scroll to an element id, via Lenis when it is running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (lenis) lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}
