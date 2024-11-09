'use client'

import {
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  ChevronRight,
  CalendarDays,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TimelineItem {
  id: number
  title: string
  status: 'completed' | 'in-progress' | 'pending' | 'delayed'
  date: string
  description: string
  milestone: boolean
  reference?: string
  priority?: '1' | '2' | '3'
}

const timelineData: TimelineItem[] = [
  {
    id: 39,
    title: 'Authorization Service Integration',
    status: 'in-progress',
    date: 'Nov 3, 2021',
    description:
      'Enable authorization management through separate service for better integration with customer applications',
    milestone: true,
    reference: 'CSUSE0007907',
    priority: '3',
  },
  {
    id: 80,
    title: 'Customer Level Authorization',
    status: 'pending',
    date: 'June 9, 2022',
    description:
      'Implement light customer-specific authorization to retrieve accounting points with minimum data',
    milestone: false,
    priority: '2',
  },
  {
    id: 377,
    title: 'Third Party Authorization in Customer Portal',
    status: 'in-progress',
    date: 'Jan 24, 2024',
    description:
      'Streamline the authorization process for third-party applications through customer portal',
    milestone: true,
    reference: 'CSUSE0069362',
    priority: '2',
  },
  {
    id: 381,
    title: 'Bulk Authorization Management',
    status: 'pending',
    date: 'Feb 8, 2024',
    description:
      'Enable authorization for multiple accounting points simultaneously',
    milestone: false,
    reference: 'CSUSE0070176',
    priority: '2',
  },
  {
    id: 376,
    title: 'Authorization Restoration Process',
    status: 'in-progress',
    date: 'Feb 22, 2024',
    description:
      'Restore authorizations when sales contracts are restored in DH-351 process',
    milestone: false,
    priority: '2',
  },
  {
    id: 388,
    title: 'Energy Community Calculation Precision',
    status: 'completed',
    date: 'Feb 29, 2024',
    description:
      'Clarification of calculation precision in energy community measurements',
    milestone: false,
    reference: 'CSUSE0068632',
    priority: '1',
  },
  {
    id: 390,
    title: 'Time Series Data Control',
    status: 'pending',
    date: 'Feb 26, 2024',
    description:
      'Implementation of size limits for outbound time series messages including energy community calculations',
    milestone: true,
    reference: 'CSUSE0071213',
    priority: '1',
  },
]

type StatusConfigType = {
  [K in TimelineItem['status']]: {
    icon: typeof CheckCircle2
    color: string
    bgColor: string
  }
}

const statusConfig: StatusConfigType = {
  completed: {
    icon: CheckCircle2,
    color: 'text-green-500',
    bgColor: 'bg-green-500',
  },
  'in-progress': {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
  },
  pending: {
    icon: Circle,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500',
  },
  delayed: {
    icon: AlertCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-500',
  },
}

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Development Timeline</h1>
          <p className="text-muted-foreground mt-2">
            System Development Progress
          </p>
        </div>
        <Card className="w-fit">
          <CardContent className="flex items-center gap-2 py-2">
            <CalendarDays className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">Last updated: March 1, 2024</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Development Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative ml-4">
            {timelineData.map((item, index) => {
              const StatusIcon = statusConfig[item.status].icon
              const isLast = index === timelineData.length - 1

              return (
                <div key={item.id} className="relative pb-10 last:pb-0">
                  {!isLast && (
                    <div
                      className={cn(
                        'absolute left-[9px] top-[30px] h-full w-[2px]',
                        item.status === 'completed'
                          ? 'bg-green-200'
                          : 'bg-gray-200'
                      )}
                    />
                  )}

                  <div className="flex gap-4">
                    <div
                      className={cn(
                        'relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background',
                        statusConfig[item.status].bgColor
                      )}
                    >
                      <StatusIcon className="h-3 w-3 text-white" />
                    </div>

                    <div className="bg-card flex flex-1 items-center justify-between rounded-lg border p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{item.title}</h3>
                          {item.milestone && (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                              Milestone
                            </span>
                          )}
                          {item.priority && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
                              Priority {item.priority}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-muted-foreground text-xs">
                            {item.date}
                          </p>
                          {item.reference && (
                            <span className="text-muted-foreground text-xs">
                              Ref: {item.reference}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
