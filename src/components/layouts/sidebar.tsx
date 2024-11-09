import { LayoutDashboard, Home, Bell, Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

const sidebarLinks = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
  { href: '/settings', icon: Settings, label: 'Settings' },
] as const

export function Sidebar() {
  return (
    <div className="bg-card text-card-foreground flex h-screen w-64 flex-col border-r">
      <div className="flex h-14 items-center border-b px-4">
        <span className="text-lg font-semibold">Fingrid Dashboard</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          return (
            <Button
              key={link.href}
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link href={link.href}>
                <Icon className="mr-3 h-5 w-5" />
                {link.label}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
