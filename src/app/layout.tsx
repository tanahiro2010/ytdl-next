import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ORIGIN = "https://ytdl.tanahiro2010.com";

export const metadata: Metadata = {
  title: {
    default: "YouTube Downloader — 無料オンライン動画ダウンローダー",
    template: "%s | YouTube Downloader",
  },
  description:
    "YouTubeの動画をMP4/MP3で高速かつ安全にダウンロード・変換します。広告なし・ソフト不要で簡単に保存できます。",
  keywords: [
    "YouTube ダウンロード",
    "動画ダウンロード",
    "MP4 ダウンロード",
    "MP3 抽出",
    "オンラインツール",
    "YouTube 保存",
  ],
  metadataBase: new URL(ORIGIN),
  authors: [{ name: "YouTube Downloader", url: ORIGIN }],
  openGraph: {
    title: "YouTube Downloader — 無料オンライン動画ダウンローダー",
    description:
      "YouTubeの動画をMP4/MP3で高速かつ安全にダウンロード・変換します。広告なしで使いやすいオンラインツール。",
    siteName: "YouTube Downloader",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YouTube Downloader",
      },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Downloader — 無料オンライン動画ダウンローダー",
    description:
      "YouTubeの動画をMP4/MP3で高速かつ安全にダウンロード・変換します。広告なしで使いやすいオンラインツール。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
