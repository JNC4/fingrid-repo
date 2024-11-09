import { Inter } from 'next/font/google'
import { RootLayout } from '@/components/layouts/root-layout'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fingrid Dashboard',
  description: 'Feature request tracking and development dashboard',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
