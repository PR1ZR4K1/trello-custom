import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Todos for the day!',
  description: "Using ChatGPT's API to generate some content baby",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
