import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
// import { DraggableCharacter } from "@/app/components/DraggableCharacter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // --- 基本的なメタデータ ---
  title: "spiraludon's portfolio", // サイトのタイトル
  description: "アプリやイラストの情報がのっています", // サイトの概要

  // --- OGP設定 (X, Facebook, Discordなどで使用) ---
  openGraph: {
    title: "spiraludon's portfolio", // OGP用のタイトル
    description: "アプリやイラストの情報がのっています", // OGP用の説明
    url: 'https://spiral987.vercel.app', // ★ あなたのサイトのURLに必ず変更してください
    siteName: "spiraludon",
    images: [
      {
        url: '/og-image.png', // publicフォルダに置いた画像へのパス
        width: 1200,
        height: 630,
        alt: "Portfolio Site",
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },

  // --- Twitterカード用の設定 ---
  twitter: {
    card: 'summary_large_image', // 大きな画像付きのカードタイプ
    title: "spiraludon's portfolio", // Twitter用のタイトル
    description: "アプリやイラストの情報がのっています", // Twitter用の説明
    creator: '@spiralneet', // あなたのXのユーザー名(@から始まる)に変更してください
    images: ['/og-image.png'], // OGPと同じ画像を指定
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="OCa1bV5Co7j2KsRXWk0hBz42yp1-GQSBa0uL_fKFiBI" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        {/* <DraggableCharacter /> */}
        <Footer />
      </body>
    </html>
  );
}
