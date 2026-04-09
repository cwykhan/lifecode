import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'LifeCode AI | Architecting Destiny',
  description: 'Enterprise-grade AI Saju Intelligence',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Paddle 결제 라이브러리 로드 */}
        <Script src="https://cdn.paddle.com/paddle/paddle.js" strategy="beforeInteractive" />
      </head>
      <body>{children}</body>
    </html>
  );
}
