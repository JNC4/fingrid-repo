'use client'

import { Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { useNotifications } from '@/components/notifications/notification-provider'

export function TopNav() {
  const { addNotification } = useNotifications()

  const showTestNotification = () => {
    addNotification({
      title: 'New Notification',
      message: 'This is a test notification.',
      status: 'info',
      duration: 5000,
    })
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-end border-b bg-background px-4">
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        
        <Button variant="ghost" size="icon" onClick={showTestNotification}>
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Theme</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}