import type { DoodleName } from "@/components/art/Doodles";

export type Frame = { src: string; alt: string };

export const journey: {
  title: string;
  script: string;
  copy: string;
  frames: [Frame, Frame];
  doodles: [DoodleName, DoodleName];
}[] = [
  {
    title: "Breakfast",
    script: "at first light",
    copy: "Lace-edged palappam, a pepper-flecked stew in coconut milk and filter coffee poured long — a slow start while the mist lifts off the lake.",
    frames: [
      { src: "/images/appam-stew.jpg", alt: "Palappam served with vegetable stew" },
      { src: "/images/boatman.jpg", alt: "A boatman poling a country boat through the backwaters" },
    ],
    doodles: ["coconut", "leaf"],
  },
  {
    title: "Lunch",
    script: "on the leaf",
    copy: "Red rice, avial, sambar and karimeen fried to order, served the old way on a banana leaf and eaten with your hands.",
    frames: [
      { src: "/images/sadya.jpg", alt: "A Kerala sadya laid out on a banana leaf" },
      { src: "/images/kappa-meen.jpg", alt: "Kappa with meen curry" },
    ],
    doodles: ["fish", "chilli"],
  },
  {
    title: "The Catch",
    script: "straight from the nets",
    copy: "What the fishermen bring in at dawn decides the board: pearl spot, tiger prawns, mussels and mud crab from Vembanad.",
    frames: [
      { src: "/images/morning-fishing.jpg", alt: "Fishermen casting nets at sunrise" },
      { src: "/images/meen-mulakittathu.jpg", alt: "Red meen mulakittathu fish curry" },
    ],
    doodles: ["prawn", "crab"],
  },
  {
    title: "Toddy Hour",
    script: "as the tide turns",
    copy: "Kappa and meen curry, a fiery chemmeen roast and something cold in hand while the light drops gold over the water.",
    frames: [
      { src: "/images/toddy-table.jpg", alt: "Dishes on a toddy shop table" },
      { src: "/images/prawn-roast.jpg", alt: "Kerala style prawn roast" },
    ],
    doodles: ["pot", "chilli"],
  },
  {
    title: "Feasts",
    script: "for the whole tharavad",
    copy: "Weddings, birthdays and long family lunches — set out on the jetty, lit by brass lamps and cooked for everyone.",
    frames: [
      { src: "/images/oil-lamps.jpg", alt: "Brass oil lamps of Kerala" },
      { src: "/images/houseboat-kettuvallam.jpg", alt: "A kettuvallam houseboat on the lake" },
    ],
    doodles: ["lamp", "boat"],
  },
];

export const days = [
  {
    title: ["Sunrise", "Catch"],
    copy: "Watch the Chinese nets rise at first light, then breakfast on appam and whatever came in with the tide.",
    tags: "Nets / Appam / Filter coffee",
    image: { src: "/images/morning-fishing.jpg", alt: "Fishermen on the backwater at sunrise" },
  },
  {
    title: ["Canal", "Drift"],
    copy: "Paddle a country boat through Kumarakom's narrow canals, past paddy, coir and kingfishers, before lunch.",
    tags: "Canoe / Village / Slow water",
    image: { src: "/images/canoe.jpg", alt: "Canoeing through a narrow backwater canal" },
  },
  {
    title: ["Long", "Lunches"],
    copy: "Karimeen in its leaf, a pot of meen curry and red rice aboard a kettuvallam with nowhere else to be.",
    tags: "Houseboat / Leaf / Shared plates",
    image: { src: "/images/houseboat-kettuvallam.jpg", alt: "A kettuvallam houseboat on Vembanad Lake" },
  },
  {
    title: ["Sunset", "Hours"],
    copy: "Stay as the sky softens over the nets and the first round of toddy turns an afternoon into an evening.",
    tags: "Toddy / Golden hour / Music",
    image: { src: "/images/dusk-nets.jpg", alt: "Chinese fishing nets at dusk" },
  },
  {
    title: ["Your", "Occasion"],
    copy: "Bring everyone together for birthdays, private dinners and sadyas worth remembering — we'll light the lamps.",
    tags: "Private dining / Sadya / Celebrations",
    image: { src: "/images/oil-lamps.jpg", alt: "Brass oil lamps" },
  },
];

export const dishes = [
  {
    name: "Karimeen Pollichathu",
    note: "our signature",
    line: "Pearl spot / shallot masala / banana leaf",
    image: { src: "/images/karimeen-pollichathu.jpg", alt: "Karimeen pollichathu on a banana leaf" },
  },
  {
    name: "Chemmeen Roast",
    note: "fiery & slow",
    line: "Tiger prawns / shallots / curry leaf",
    image: { src: "/images/prawn-roast.jpg", alt: "Kerala prawn roast" },
  },
  {
    name: "Meen Mulakittathu",
    note: "sour, red, perfect",
    line: "Seer fish / kudampuli / Kashmiri chilli",
    image: { src: "/images/meen-mulakittathu.jpg", alt: "Meen mulakittathu" },
  },
  {
    name: "Kuttanadan Meen Curry",
    note: "cooked in the chatti",
    line: "Clay pot / coconut / green mango",
    image: { src: "/images/meen-curry-pot.jpg", alt: "Fish curry in a clay pot" },
  },
  {
    name: "Kappa & Meen",
    note: "toddy-shop classic",
    line: "Tapioca / red fish curry / green chilli",
    image: { src: "/images/kappa-meen.jpg", alt: "Kappa and meen curry" },
  },
  {
    name: "Meen Moilee",
    note: "coconut-soft",
    line: "Pomfret / coconut milk / appam",
    image: { src: "/images/meen-moilee.jpg", alt: "Fish moilee with appam" },
  },
  {
    name: "Karimeen Ilayil",
    note: "wrapped at the fire",
    line: "Pearl spot / tomato / green chilli / leaf",
    image: { src: "/images/karimeen-ilayil.jpg", alt: "Karimeen cooked in banana leaf" },
  },
];
