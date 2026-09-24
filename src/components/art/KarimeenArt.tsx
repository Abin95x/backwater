import { useSvgId } from "./useSvgId";

/*
 * Karimeen (pearl spot) fried in masala — the hero dish.
 * Drawn facing left in a 760×520 box so it can be placed inside any SVG.
 */

export const KARIMEEN_BODY =
  "M122,298 C132,248 180,196 256,174 C350,148 470,150 540,185 C585,208 605,232 615,255 L618,340 C600,372 560,405 490,425 C400,450 300,446 228,412 C176,388 138,350 122,312 Z";

const HEAD = "M122,298 C132,248 180,196 240,180 C214,236 212,330 248,410 C182,388 138,350 122,312 Z";

const TAIL =
  "M605,262 C640,240 684,208 728,188 C714,238 709,270 711,298 C709,330 714,362 730,412 C686,390 646,362 606,338 Z";

const round = (n: number) => Math.round(n * 100) / 100;

// Back profile of the body, used to seat the dorsal fin.
const BACK: [number, number][] = [
  [246, 178], [300, 164], [350, 157], [400, 154], [450, 155], [500, 166], [540, 185], [580, 210], [612, 246],
];
function backY(x: number) {
  for (let i = 1; i < BACK.length; i++) {
    const [x1, y1] = BACK[i];
    const [x0, y0] = BACK[i - 1];
    if (x <= x1) return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
  }
  return BACK[BACK.length - 1][1];
}
const SPINES = Array.from({ length: 15 }, (_, i) => 258 + i * 19);
const DORSAL = (() => {
  let d = `M246,${backY(246) + 4}`;
  SPINES.forEach((x, i) => {
    const h = 30 + Math.sin(i * 1.7) * 4 + (i > 10 ? 6 : 0);
    d += ` L${x},${round(backY(x) - h)} L${x + 9},${round(backY(x + 9) - h * 0.55)}`;
  });
  d += " C566,168 600,196 614,244";
  d += ` C590,226 560,204 530,${round(backY(530) + 4)} C440,162 330,166 246,${backY(246) + 4} Z`;
  return d;
})();

const ANAL = "M430,436 C480,470 530,482 578,472 C562,432 590,396 602,360 C562,396 502,426 430,436 Z";

const PELVIC = "M246,418 L232,482 L302,438 Z";

const PECTORAL = "M250,300 C292,286 336,300 358,326 C328,346 284,342 250,318 Z";

// Knife slits: outer (charred edge) and inner (flesh) lens shapes.
const CUTS = [
  ["M332,168 C356,250 344,352 302,432 C324,352 324,250 332,168 Z", "M333,190 C349,260 339,350 307,418 C322,350 325,262 333,190 Z"],
  ["M422,158 C446,250 434,352 392,442 C414,352 414,250 422,158 Z", "M423,180 C439,254 429,350 397,428 C412,350 415,256 423,180 Z"],
  ["M510,174 C530,250 520,342 486,422 C506,342 506,250 510,174 Z", "M511,194 C524,256 516,338 491,408 C504,338 507,258 511,194 Z"],
];

const LEAVES: [number, number, number, number][] = [
  [318, 238, -22, 1.1],
  [372, 222, 24, 0.95],
  [452, 296, -48, 1.02],
  [246, 336, 8, 0.86],
  [520, 252, 36, 0.8],
];

// Deterministic spice speckles so server and client markup match.
function speckles(count: number, seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const out: { x: number; y: number; r: number; c: string }[] = [];
  const palette = ["#2a0c04", "#2a0c04", "#3d1406", "#d9481e", "#e8662a", "#f2b774"];
  while (out.length < count) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand());
    out.push({
      x: round(372 + Math.cos(a) * d * 236),
      y: round(300 + Math.sin(a) * d * 128),
      r: round(0.8 + rand() * 1.9),
      c: palette[Math.floor(rand() * palette.length)],
    });
  }
  return out;
}
const SPECKLES = speckles(170, 20240915);

function CurryLeaf({ x, y, rotate, scale, fill }: { x: number; y: number; rotate: number; scale: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 0 C14 -14 46 -16 72 0 C46 16 14 14 0 0 Z" fill={fill} stroke="#1c2e0f" strokeWidth={1.4} />
      <path d="M4 0 L68 0" stroke="#9fb86a" strokeWidth={1.3} opacity={0.7} />
      <path d="M22 0 l8 -6 M36 0 l8 -7 M50 0 l7 -5 M22 0 l8 6 M36 0 l8 7 M50 0 l7 5" stroke="#9fb86a" strokeWidth={0.8} opacity={0.45} />
      <path d="M0 0 l-10 3" stroke="#4a3a14" strokeWidth={2} strokeLinecap="round" />
      <path d="M10 -5 C24 -10 40 -10 56 -4" stroke="#ffffff" strokeWidth={1.6} opacity={0.25} fill="none" />
    </g>
  );
}

export default function KarimeenArt() {
  const id = useSvgId("karimeen");
  const url = (n: string) => `url(#${id(n)})`;

  return (
    <g filter={url("drop")}>
      <defs>
        <radialGradient id={id("masala")} cx="42%" cy="38%" r="72%">
          <stop offset="0" stopColor="#e2581b" />
          <stop offset="0.38" stopColor="#b03414" />
          <stop offset="0.75" stopColor="#6a1d0c" />
          <stop offset="1" stopColor="#2e0c05" />
        </radialGradient>
        <linearGradient id={id("flesh")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d88a48" />
          <stop offset="1" stopColor="#8e4220" />
        </linearGradient>
        <radialGradient id={id("head")} cx="30%" cy="40%" r="80%">
          <stop offset="0" stopColor="#8a2c10" stopOpacity="0.2" />
          <stop offset="1" stopColor="#2a0a03" stopOpacity="0.75" />
        </radialGradient>
        <linearGradient id={id("fin")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c0702" />
          <stop offset="1" stopColor="#4a1708" />
        </linearGradient>
        <linearGradient id={id("tail")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#541b09" />
          <stop offset="1" stopColor="#1e0802" />
        </linearGradient>
        <linearGradient id={id("leaf")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#56782c" />
          <stop offset="0.6" stopColor="#2f4d1a" />
          <stop offset="1" stopColor="#5a4a16" />
        </linearGradient>
        <clipPath id={id("clip")}>
          <path d={KARIMEEN_BODY} />
        </clipPath>
        <filter id={id("crust")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves={4} seed={11} result="noise" />
          <feDiffuseLighting in="noise" surfaceScale={3.2} diffuseConstant={1} lightingColor="#ffffff" result="diff">
            <feDistantLight azimuth={235} elevation={50} />
          </feDiffuseLighting>
          <feSpecularLighting in="noise" surfaceScale={3.2} specularConstant={0.7} specularExponent={42} lightingColor="#ffe6bd" result="spec">
            <feDistantLight azimuth={235} elevation={50} />
          </feSpecularLighting>
          <feComposite in="SourceGraphic" in2="diff" operator="arithmetic" k1={1.12} k2={0} k3={0} k4={0} result="lit" />
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feComposite in="lit" in2="specIn" operator="arithmetic" k1={0} k2={1} k3={0.28} k4={0} result="shiny" />
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves={2} seed={5} result="blot" />
          <feColorMatrix in="blot" type="matrix" values="0 0 0 0 0.19  0 0 0 0 0.05  0 0 0 0 0.015  3.6 0 0 0 -1.45" result="blotC" />
          <feMerge result="merged">
            <feMergeNode in="shiny" />
            <feMergeNode in="blotC" />
          </feMerge>
          <feComposite in="merged" in2="SourceAlpha" operator="in" />
        </filter>
        <filter id={id("finTex")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.3" numOctaves={2} seed={3} result="noise" />
          <feDiffuseLighting in="noise" surfaceScale={2.5} lightingColor="#ffffff" result="light">
            <feDistantLight azimuth={225} elevation={60} />
          </feDiffuseLighting>
          <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1={1.25} k2={0} k3={0} k4={0} result="lit" />
          <feComposite in="lit" in2="SourceAlpha" operator="in" />
        </filter>
        <filter id={id("soft")} x="-30%" y="-10%" width="160%" height="120%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <filter id={id("blur")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={id("drop")} x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#1b0c05" floodOpacity="0.38" />
        </filter>
      </defs>

      {/* fins behind the body */}
      <path d={TAIL} fill={url("tail")} filter={url("finTex")} />
      <g stroke="#b0673a" strokeWidth={1.6} opacity={0.55} fill="none">
        {[196, 232, 268, 300, 332, 366, 404].map((y) => (
          <path key={y} d={`M612 300 L${y < 300 ? 722 - (300 - y) * 0.06 : 722 - (y - 300) * 0.04} ${y}`} />
        ))}
      </g>
      <path d={DORSAL} fill={url("fin")} filter={url("finTex")} opacity={0.94} />
      <g stroke="#9c5028" strokeWidth={1.2} opacity={0.55} fill="none">
        {SPINES.map((x, i) => (
          <path key={x} d={`M${x + 2},${round(backY(x) + 6)} L${x},${round(backY(x) - 30 - Math.sin(i * 1.7) * 4 - (i > 10 ? 6 : 0))}`} />
        ))}
      </g>
      <path d={ANAL} fill={url("fin")} filter={url("finTex")} />
      <path d={PELVIC} fill={url("fin")} />

      {/* body */}
      <path d={KARIMEEN_BODY} fill={url("masala")} filter={url("crust")} />

      <g clipPath={url("clip")}>
        {/* scored cuts showing the flesh */}
        {CUTS.map(([outer, inner]) => (
          <g key={outer}>
            <path d={outer} fill="#240903" opacity={0.9} filter={url("soft")} />
            <path d={inner} fill={url("flesh")} />
            <path d={inner} fill="none" stroke="#f6cf98" strokeWidth={1} opacity={0.35} transform="translate(-1.2 0)" />
          </g>
        ))}

        {SPECKLES.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity={0.85} />
        ))}

        {/* oily sheen */}
        <ellipse cx={380} cy={212} rx={170} ry={26} fill="#fff1d6" opacity={0.2} filter={url("blur")} transform="rotate(-5 380 212)" />
        <path d="M188,208 C282,166 432,158 548,196" stroke="#ffd8a6" strokeWidth={7} fill="none" opacity={0.45} filter={url("blur")} />
        {/* darker belly */}
        <path d="M150,340 C240,430 420,460 610,350 L640,520 L100,520 Z" fill="#2a0a03" opacity={0.28} filter={url("blur")} />
      </g>

      <path d={HEAD} fill={url("head")} />
      <path d={KARIMEEN_BODY} fill="none" stroke="#2e0d04" strokeWidth={5} opacity={0.55} />

      {/* head details */}
      <path d="M238,196 C214,250 214,332 248,404" fill="none" stroke="#2e0d04" strokeWidth={6} opacity={0.55} strokeLinecap="round" />
      <path d="M244,200 C222,252 222,330 254,400" fill="none" stroke="#f0a060" strokeWidth={1.6} opacity={0.4} strokeLinecap="round" />
      <path d={PECTORAL} fill="#4a1507" opacity={0.38} />
      <path d="M254 304 L352 322 M254 310 L348 330 M254 316 L338 338" stroke="#d08850" strokeWidth={1} opacity={0.4} />
      <path d="M123,303 L141,305" stroke="#1c0702" strokeWidth={2.6} fill="none" strokeLinecap="round" opacity={0.8} />
      <circle cx={184} cy={262} r={13} fill="#2a0c06" />
      <circle cx={184} cy={262} r={10} fill="#d7c7ad" />
      <circle cx={185} cy={263} r={4.5} fill="#7d6a55" />
      <circle cx={181} cy={259} r={2} fill="#ffffff" opacity={0.85} />

      {/* fried curry leaves */}
      {LEAVES.map(([x, y, r, s]) => (
        <CurryLeaf key={`${x}-${y}`} x={x} y={y} rotate={r} scale={s} fill={url("leaf")} />
      ))}
    </g>
  );
}
