import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Bahae's Portfolio",
  description: 'A showcase of Bahaeddine\'s software development projects and skills',
  icons: {
    icon: [
      {
        url: '/bee.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/bee.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    shortcut: '/bee.png',
    apple: '/bee.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/bee.png" />
        <link rel="shortcut icon" type="image/png" href="/bee.png" />
        <link rel="apple-touch-icon" type="image/png" href="/bee.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

// yak akhay
// allaho akbar 
// zidni