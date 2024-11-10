'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { NotificationProvider } from '@/components/notifications/notification-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <NotificationProvider>{children}</NotificationProvider>
    </ThemeProvider>
  )
}