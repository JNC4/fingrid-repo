import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Sidebar } from '@/components/layouts/sidebar'
import { TopNav } from '@/components/layouts/top-nav'
import Script from 'next/script'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Fingrid Dashboard',
  description: 'Feature request tracking and development dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geistSans.className}>
      <body className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <TopNav />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
        <Script strategy="afterInteractive">
          {`
            window.chtlConfig = {
              chatbotId: "3994814494"
            }
          `}
        </Script>
        <Script
          async
          data-id="3994814494"
          id="chatling-embed-script"
          src="https://chatling.ai/js/embed.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
