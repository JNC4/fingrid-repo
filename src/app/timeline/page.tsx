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

// Add TypeScript interfaces
interface TimelineItem {
  id: number
  title: string
  status: 'completed' | 'in-progress' | 'pending' | 'delayed'
  date: string
  description: string
  milestone: boolean
}

// Mock data
const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: 'User Authentication System',
    status: 'completed',
    date: 'December 1, 2024',
    description: 'Implement secure login and registration system',
    milestone: true,
  },
  {
    id: 2,
    title: 'Database Integration',
    status: 'in-progress',
    date: 'December 15, 2024',
    description: 'Set up and configure PostgreSQL database',
    milestone: false,
  },
  {
    id: 3,
    title: 'API Development',
    status: 'pending',
    date: 'December 30, 2024',
    description: 'Create RESTful API endpoints',
    milestone: true,
  },
  {
    id: 4,
    title: 'Frontend Implementation',
    status: 'delayed',
    date: 'January 15, 2025',
    description: 'Develop user interface components',
    milestone: true,
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
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Development Timeline</h1>
          <p className="text-muted-foreground mt-2">
            Track development progress and upcoming milestones
          </p>
        </div>
        <Card className="w-fit">
          <CardContent className="flex items-center gap-2 py-2">
            <CalendarDays className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">Last updated: December 9, 2024</span>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Section */}
      <Card>
        <CardHeader>
          <CardTitle>Project Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative ml-4">
            {timelineData.map((item, index) => {
              const StatusIcon = statusConfig[item.status].icon
              const isLast = index === timelineData.length - 1

              return (
                <div key={item.id} className="relative pb-10 last:pb-0">
                  {/* Timeline line */}
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

                  {/* Timeline item */}
                  <div className="flex gap-4">
                    {/* Status indicator */}
                    <div
                      className={cn(
                        'relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background',
                        statusConfig[item.status].bgColor
                      )}
                    >
                      <StatusIcon className="h-3 w-3 text-white" />
                    </div>

                    {/* Content */}
                    <div className="bg-card flex flex-1 items-center justify-between rounded-lg border p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{item.title}</h3>
                          {item.milestone && (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                              Milestone
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.date}
                        </p>
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
