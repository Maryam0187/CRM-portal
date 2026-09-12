import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Business OS - Technonaire',
  description: 'Launch your business in 60 seconds. Website, bookings, and sales management by Technonaire.',
  icons: {
    icon: '/favicon.svg',
  },
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
