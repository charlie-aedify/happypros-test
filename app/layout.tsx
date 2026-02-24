import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Handyman AI Assistant',
  description: 'AI-powered chatbot for handyman professionals',
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
