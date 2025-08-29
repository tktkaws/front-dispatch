import type { Metadata } from "next";
import { Red_Hat_Display, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-redhat",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
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
    <html lang="en">
      <body 
        className={`${redHatDisplay.variable} ${notoSansJP.variable} antialiased bg-[#F9F9F9]`}
      >
        {children}
      </body>
    </html>
  );
}
