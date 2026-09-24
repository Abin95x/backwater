import { useSvgId } from "./useSvgId";

/** Trimmed tender coconut (elaneer) with a paper straw and a hibiscus. */
export default function TenderCoconut({ className }: { className?: string }) {
  const id = useSvgId("coconut");
  const url = (n: string) => `url(#${id(n)})`;
  return (
    <svg viewBox="0 0 400 480" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={id("skin")} cx="36%" cy="38%" r="75%">
          <stop offset="0" stopColor="#b5d86a" />
          <stop offset="0.45" stopColor="#6f9d2f" />
          <stop offset="1" stopColor="#35581a" />
        </radialGradient>
        <linearGradient id={id("husk")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d7c79a" />
          <stop offset="0.4" stopColor="#f6eed6" />
          <stop offset="1" stopColor="#c7b27c" />
        </linearGradient>
        <pattern id={id("stripe")} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="14" height="14" fill="#ffffff" />
          <rect width="6" height="14" fill="#c8402c" />
        </pattern>
        <filter id={id("blur")} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id={id("grain")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.06" numOctaves={2} seed={4} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.3  0 0 0 0 0.05  0 0 0 0.5 0" result="g" />
          <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="gi" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx={206} cy={448} rx={128} ry={18} fill="#3b2a12" opacity={0.28} filter={url("blur")} />

      {/* straw */}
      <g transform="rotate(26 206 112)">
        <rect x={198} y={-40} width={16} height={160} rx={3} fill={url("stripe")} />
        <rect x={198} y={-40} width={5} height={160} fill="#ffffff" opacity={0.35} />
      </g>

      <path
        d="M96,250 C92,320 120,392 170,428 C188,440 212,440 230,428 C280,392 308,320 304,250 C300,210 280,190 200,186 C120,190 100,210 96,250 Z"
        fill={url("skin")}
        filter={url("grain")}
      />
      <path d="M132,232 C118,290 132,350 162,398" stroke="#e6f5b8" strokeWidth={10} fill="none" opacity={0.25} strokeLinecap="round" />

      <path d="M104,236 C120,200 150,150 168,112 L232,112 C250,150 280,200 296,236 C260,258 140,258 104,236 Z" fill={url("husk")} />
      <path d="M168,112 L150,244 M200,112 L200,252 M232,112 L252,246" stroke="#b9a473" strokeWidth={1.5} opacity={0.6} />
      <ellipse cx={200} cy={112} rx={33} ry={9} fill="#f3ead0" stroke="#bda878" strokeWidth={1.2} />
      <ellipse cx={204} cy={112} rx={12} ry={4} fill="#a99664" />

      {/* hibiscus */}
      <g transform="translate(118 262) rotate(-18)">
        {[0, 72, 144, 216, 288].map((a) => (
          <path
            key={a}
            d="M0 0 C-18 -14 -22 -48 0 -58 C22 -48 18 -14 0 0 Z"
            fill="#d7263d"
            stroke="#9d1427"
            strokeWidth={1.2}
            transform={`rotate(${a})`}
          />
        ))}
        <circle r={10} fill="#7a0d1d" />
        <path d="M0 0 L26 -34" stroke="#f5d24b" strokeWidth={2.4} strokeLinecap="round" />
        <circle cx={27} cy={-36} r={3.4} fill="#f5d24b" />
      </g>
    </svg>
  );
}
