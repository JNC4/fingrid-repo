import React from 'react'
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react'
import type { Notification, NotificationStatus } from '@/lib/types/notifications'
import { cn } from '@/lib/utils'

interface NotificationToastProps {
  notification: Notification
  onClose: () => void
}

const statusIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
} as const

const statusStyles: Record<NotificationStatus, string> = {
  info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
  success: 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-200',
  warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
  error: 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-200',
}

export function NotificationToast({ notification, onClose }: NotificationToastProps) {
  const Icon = statusIcons[notification.status]

  return (
    <div
      className={cn(
        'flex w-96 items-start gap-3 rounded-lg p-4 shadow-lg',
        statusStyles[notification.status]
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="flex-1">
        <h3 className="font-medium">{notification.title}</h3>
        <p className="mt-1 text-sm opacity-90">{notification.message}</p>
      </div>
      <button
        onClick={onClose}
        className="shrink-0 rounded-lg p-1 opacity-70 transition-opacity hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}