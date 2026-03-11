import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PaddleInit from "./components/PaddleInit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LifeCode - AI Saju Analysis",
  description: "Unlock your destiny with advanced AI Saju analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Paddle 결제 시스템 초기화 스크립트 */}
        <PaddleInit />
        
        <main className="min-h-screen bg-slate-900 text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
