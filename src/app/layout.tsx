import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LifeCode | Architecting Destiny',
  description: 'Saju System Architecture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
