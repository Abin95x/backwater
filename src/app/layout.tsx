import type { Metadata, Viewport } from "next";
import { Italiana, Manjari, Manrope, Ms_Madi } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const italiana = Italiana({
  variable: "--font-italiana",
  weight: "400",
  subsets: ["latin"],
});

const msMadi = Ms_Madi({
  variable: "--font-ms-madi",
  weight: "400",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const manjari = Manjari({
  variable: "--font-manjari",
  weight: ["400", "700"],
  subsets: ["malayalam"],
});

export const metadata: Metadata = {
  title: "Backwater — Kerala Fish Restaurant, Kumarakom",
  description:
    "Karimeen pollichathu, toddy-shop classics and long lunches on the banana leaf, served at the edge of Vembanad Lake.",
};

export const viewport: Viewport = {
  themeColor: "#0c4a4a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} ${msMadi.variable} ${manrope.variable} ${manjari.variable} antialiased`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
