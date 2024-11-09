import { LayoutDashboard, GitPullRequest, Timer } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const sidebarLinks = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/features',
    icon: GitPullRequest,
    label: 'Features',
  },
  {
    href: '/timeline',
    icon: Timer,
    label: 'Timeline',
  },
] as const

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-card flex h-screen w-64 flex-col border-r">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-lg font-bold">Fingrid</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Button
              key={link.href}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn('w-full justify-start', isActive && 'bg-muted')}
              asChild
            >
              <Link href={link.href}>
                <Icon className="mr-3 h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
