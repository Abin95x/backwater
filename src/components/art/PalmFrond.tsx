import type { CSSProperties } from "react";

/** A coconut frond generated along a curved rachis. 560×440 box. */

const P0 = [10, 430];
const P1 = [180, 120];
const P2 = [550, 30];

const round = (n: number) => Math.round(n * 10) / 10;
const COLORS = ["#2f6a34", "#4f8f3d", "#3b7a36", "#6aa548"];

function point(t: number) {
  const u = 1 - t;
  return [u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0], u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1]];
}
function angle(t: number) {
  const dx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
  const dy = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

const LEAFLETS = (() => {
  const out: { x: number; y: number; a: number; l: number; c: string }[] = [];
  let k = 0;
  for (let t = 0.12; t < 0.97; t += 0.035) {
    const [x, y] = point(t);
    const base = angle(t);
    const l = 60 + 150 * Math.sin(Math.PI * Math.min(1, t * 1.15));
    for (const side of [-1, 1]) {
      out.push({ x: round(x), y: round(y), a: round(base + side * (58 - t * 18)), l: round(l * (side > 0 ? 1 : 0.9)), c: COLORS[k++ % COLORS.length] });
    }
  }
  return out;
})();

export default function PalmFrond({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 560 440" className={className} style={style} aria-hidden="true" overflow="visible">
      {LEAFLETS.map((f, i) => (
        <path
          key={i}
          d={`M0 0 Q${f.l * 0.5} ${-9} ${f.l} ${round(f.l * 0.16)} Q${f.l * 0.5} ${7} 0 0 Z`}
          transform={`translate(${f.x} ${f.y}) rotate(${f.a})`}
          fill={f.c}
        />
      ))}
      <path d={`M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`} stroke="#8a9a3a" strokeWidth={5} fill="none" strokeLinecap="round" />
    </svg>
  );
}
