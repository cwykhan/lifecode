import "./globals.css";
import Script from "next/script";
import PaddleInit from "./components/PaddleInit";

export const metadata = {
  title: "LifeCode",
  description: "LifeCode SaaS Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Paddle SDK */}
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="beforeInteractive"
        />
        <PaddleInit />
        {children}
      </body>
    </html>
  );
}
