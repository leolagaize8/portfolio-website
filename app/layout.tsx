import type { Metadata } from 'next'
import { Instrument_Sans, Cormorant } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Leo Lagaize — Investment Analyst & Builder',
  description:
    'VC analyst at Hexa Scale who builds. Automation pipelines, internal tools, and AI agents — across Hexa Scale and Newfund.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} ${cormorant.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
