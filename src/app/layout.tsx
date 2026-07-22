import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Caveat,
  Kalam,
  Pacifico,
  Dancing_Script,
  Great_Vibes,
  Satisfy,
  Permanent_Marker,
  Indie_Flower,
  Shadows_Into_Light,
  Amatic_SC,
  Sacramento,
  Homemade_Apple,
} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { getAuthUser } from "@/lib/supabase/get-user";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Caption fonts — used deep in the photo editor's font picker (src/data/fonts.ts), never
// above the fold. Not preloaded so they don't compete with the page's actual heading font.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600"],
  preload: false,
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-shadows-into-light",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const amaticSc = Amatic_SC({
  variable: "--font-amatic-sc",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const homemadeApple = Homemade_Apple({
  variable: "--font-homemade-apple",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const captionFontVariables = [
  caveat.variable,
  kalam.variable,
  pacifico.variable,
  dancingScript.variable,
  greatVibes.variable,
  satisfy.variable,
  permanentMarker.variable,
  indieFlower.variable,
  shadowsIntoLight.variable,
  amaticSc.variable,
  sacramento.variable,
  homemadeApple.variable,
].join(" ");

export const metadata: Metadata = {
  title: "Caphoto — Instant camera-style photo captions",
  description:
    "Upload your photo, add a caption, and get an instant white-framed shot with your camera's brand and specs printed below — no editing skills required.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthUser();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${captionFontVariables} h-full antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar initialUser={user} />
          <main className="flex flex-1 flex-col">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
