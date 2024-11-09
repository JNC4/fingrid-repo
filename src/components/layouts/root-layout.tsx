import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/layouts/sidebar'
import { TopNav } from '@/components/layouts/top-nav'

interface RootLayoutProps {
  children: React.ReactNode
  className?: string
}

export function RootLayout({ children, className }: RootLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar />
        <main className={cn('flex-1 p-6', className)}>{children}</main>
      </div>
    </div>
  )
}
