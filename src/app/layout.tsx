import type { Metadata } from "next";
import { IBM_Plex_Sans_JP, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/theme-provider";

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
    <html lang="ja" className="scroll-pt-[2rem]" suppressHydrationWarning>
      <body
        className={`${ibmPlexMono.variable} ${ibmPlexSansJP.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
