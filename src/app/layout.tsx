import type { Metadata } from "next";
import { Red_Hat_Display, Noto_Sans_JP, IBM_Plex_Sans_JP, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-redhat",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
});

const ibmPlexSansJP = IBM_Plex_Sans_JP({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans-jp",
  weight: ["400", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "FRONT DISPATCH",
  description: "フロントエンド方面の備忘録",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-pt-[2rem]">
      <body 
        className={`${ibmPlexMono.variable} ${ibmPlexSansJP.variable} font-ibmSans antialiased bg-[#F9F9F9]`}
      >
        {children}
      </body>
    </html>
  );
}
