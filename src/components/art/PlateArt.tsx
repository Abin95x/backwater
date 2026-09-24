import { useSvgId } from "./useSvgId";

/** Small line-drawn karimeen used as the plate's rim motif. */
function RimFish({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(0.62)`}
      fill="none"
      stroke="#2f6d57"
      strokeWidth={3.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.85}
    >
      <path d="M-48 0 C-40 -24 -10 -34 18 -28 C34 -24 44 -14 50 -6 L50 6 C44 14 34 24 18 28 C-10 34 -40 24 -48 0 Z" />
      <path d="M50 -6 L76 -24 C70 -8 70 8 76 24 L50 6" />
      <circle cx={-30} cy={-6} r={3.2} fill="#2f6d57" stroke="none" />
      <path d="M-18 -22 C-24 -8 -24 8 -18 22" />
      <path d="M-4 -12 l6 6 m6 -6 l6 6 m6 -6 l6 6 M-4 4 l6 6 m6 -6 l6 6 m6 -6 l6 6" strokeWidth={2.4} />
    </g>
  );
}

/**
 * Porcelain plate with a kasavu (gold + thin maroon) border.
 * Drawn top-down in a 1000×1000 box; scale Y for a perspective view.
 */
export default function PlateArt({ shadow = true }: { shadow?: boolean }) {
  const id = useSvgId("plate");
  return (
    <g>
      <defs>
        <radialGradient id={id("porcelain")} cx="42%" cy="38%" r="68%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.62" stopColor="#f9f7f2" />
          <stop offset="1" stopColor="#e8e2d5" />
        </radialGradient>
        <radialGradient id={id("well")} cx="46%" cy="42%" r="60%">
          <stop offset="0" stopColor="#fdfcf9" />
          <stop offset="0.8" stopColor="#f3efe7" />
          <stop offset="1" stopColor="#e6e0d3" />
        </radialGradient>
        <linearGradient id={id("gold")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1d68a" />
          <stop offset="0.28" stopColor="#c2932f" />
          <stop offset="0.5" stopColor="#f6e2a2" />
          <stop offset="0.74" stopColor="#b1821f" />
          <stop offset="1" stopColor="#e3c16c" />
        </linearGradient>
        <filter id={id("blur")} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={id("soft")} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {shadow && (
        <circle cx={512} cy={522} r={488} fill="rgb(15 40 36 / 0.22)" filter={`url(#${id("blur")})`} />
      )}

      <circle cx={500} cy={500} r={490} fill={`url(#${id("porcelain")})`} />
      <circle cx={500} cy={500} r={481} fill="none" stroke={`url(#${id("gold")})`} strokeWidth={15} />
      <circle cx={500} cy={500} r={465} fill="none" stroke="#c49a45" strokeWidth={2} opacity={0.9} />
      <circle cx={500} cy={500} r={458} fill="none" stroke="#8a2e1f" strokeWidth={1.4} opacity={0.55} />

      {/* well */}
      <circle cx={500} cy={505} r={340} fill="none" stroke="rgb(40 30 10 / 0.07)" strokeWidth={14} filter={`url(#${id("soft")})`} />
      <circle cx={500} cy={500} r={330} fill={`url(#${id("well")})`} />
      <circle cx={500} cy={500} r={331} fill="none" stroke={`url(#${id("gold")})`} strokeWidth={4} />
      <circle cx={500} cy={500} r={322} fill="none" stroke="#c49a45" strokeWidth={1.2} opacity={0.7} />

      {/* sheen */}
      <path
        d="M170 330 C230 200 360 120 500 112"
        fill="none"
        stroke="#ffffff"
        strokeWidth={26}
        strokeLinecap="round"
        opacity={0.7}
        filter={`url(#${id("soft")})`}
      />

      <RimFish x={264.6} y={176.6} rotate={-36} />
      <RimFish x={735.9} y={823} rotate={144} />
    </g>
  );
}
