import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Captain Claw - 20th Anniversary Web Edition',
  description: 'A browser-based recreation of the classic Captain Claw platformer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
