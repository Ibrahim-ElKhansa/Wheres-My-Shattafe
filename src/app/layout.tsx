import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.scss";
import "leaflet/dist/leaflet.css";
import NavigationMenu from "@/components/navigation-menu";
import { AppContextProvider } from "@/contexts/app-context";
import Image from "next/image";
import ShattafeMarker from "../../public/shattafe-marker.png";
import { Analytics } from "@vercel/analytics/react";

const oswald = Oswald({
  variable: "--font-oswald",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Where's My Shattafe? | Public hygiene, one tap away.",
    template: "%s | Where's My Shattafe? – Public hygiene, one tap away",
  },
  description:
    "Everyone needs a clean bathroom, and sometimes you need one fast. 'Where’s My Shattafe?' is a community-powered map of public bidets on campuses and public spaces. Easily find the closest bidet in seconds and submit new locations today! Share Where’s My Shattafe? with friends to make public hygiene simple.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable}`}>
        <AppContextProvider>
          <NavigationMenu />
          <div className="main">
            <header className="main__header">
              <div className="main__logo">
                <Image src={ShattafeMarker} alt="Shattafe Marker" fill placeholder="blur" />
              </div>
              <h1 className="main__title">Where&apos;s My Shattafe?</h1>
            </header>
            {children}
          </div>
        </AppContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
