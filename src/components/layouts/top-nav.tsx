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

  const showNotification = (type: 'info' | 'success' | 'warning' | 'error') => {
    const messages = {
      info: 'This is an informational message',
      success: 'Operation completed successfully',
      warning: 'Please review this warning',
      error: 'An error has occurred',
    }

    addNotification({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      message: messages[type],
      status: type,
      duration: 5000,
    })
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-end border-b bg-background px-4">
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => showNotification('info')}>
              Show Info
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => showNotification('success')}>
              Show Success
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => showNotification('warning')}>
              Show Warning
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => showNotification('error')}>
              Show Error
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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