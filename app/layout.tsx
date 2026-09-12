import type { Metadata, Viewport } from "next";
import { Caveat, Patrick_Hand } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Our Little Star",
  description: "A little something for Mom & Dad, before they meet their little star.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#232b55",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${caveat.variable} ${patrickHand.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
