import type { Metadata } from 'next'
import './globals.css'
import Modal from '@/components/Modal'

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
      <body className=' bg-gray-400/30'>
        {children}
        <Modal />
      </body>
    </html>
  )
}
