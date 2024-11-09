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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface TimelineItem {
  id: number
  title: string
  status: 'completed' | 'in-progress' | 'pending' | 'delayed'
  date: string
  description: string
  milestone: boolean
  reference?: string
  priority?: '1' | '2' | '3'
  arguments?: string // Added for feature reasoning
  impact?: string // Added for feature impact
  recommendation?: string // Added for development group recommendation
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
    arguments:
      'This is a prerequisite for utilizing Datahub possibilities in the consumer segment. Current authorization process needs improvement to be more efficient.',
    impact:
      'Authorization service would function similar to current authentication services or payment services, where users move from one website to another to complete necessary actions.',
  },
  {
    id: 80,
    title: 'Customer Level Authorization',
    status: 'pending',
    date: 'June 9, 2022',
    description:
      'Implement light customer-specific authorization to retrieve accounting points with minimum data',
    milestone: false,
    reference: 'CSUSE0070711',
    priority: '2',
    arguments:
      'Customer might have many accounting points (e.g. 100) and the amount may vary. Third parties lack visibility to notice missing accounting points, leading to incomplete service coverage.',
    impact:
      'Simplifies authorization process for large customers with multiple accounting points, reducing workload for all parties.',
    recommendation:
      'Proposal supported to proceed. Particularly important for large customers where managing multiple accounting point authorizations is challenging and time-consuming.',
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
    arguments:
      'Current process requires customers to log into multiple systems to complete authorization process.',
    impact:
      'Improves customer experience by allowing all steps to be completed in one system.',
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
    arguments:
      'Currently authorizations must be done one accounting point at a time, making the process time-consuming for customers with multiple points.',
    impact:
      'Significantly reduces time and effort required for managing multiple authorizations.',
  },
  {
    id: 376,
    title: 'Authorization Restoration Process',
    status: 'in-progress',
    date: 'Feb 22, 2024',
    description:
      'Restore authorizations when sales contracts are restored in DH-351 process',
    milestone: false,
    reference: 'CSUSE0070406',
    priority: '2',
    arguments:
      'Issue discovered as part of processing flexibility service provider authorizations.',
    impact:
      'Ensures continuous service delivery and proper authorization management during contract restorations.',
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
    arguments:
      'Need for precise energy community measurements to ensure accurate calculations.',
    impact:
      'Improves accuracy of energy community calculations and ensures consistent measurement standards.',
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
    arguments:
      'Current system lacks controls on time series message sizes, potentially affecting system performance.',
    impact:
      'Optimizes system performance and ensures efficient handling of time series data, particularly for energy community calculations.',
  },
  {
    id: 336,
    title: 'Consumer Authorization Termination Rights',
    status: 'pending',
    date: 'Nov 6, 2023',
    description:
      'Enable third parties to terminate consumer customer authorizations similar to business customer authorizations',
    milestone: false,
    reference: 'CSUSE0070406',
    priority: '2',
    arguments:
      'Current process does not align with EU reference model for access to meter and consumption data (05/01/2025). Third parties cannot terminate consumer authorizations.',
    impact:
      'Brings system in compliance with EU regulations and improves authorization management capabilities.',
  },
  {
    id: 365,
    title: 'Customer Portal Enhancement for Energy Reporting',
    status: 'pending',
    date: 'Jan 12, 2024',
    description:
      'Improve customer portal interface for adding energy reporting authorizations (AP01)',
    milestone: false,
    reference: 'CSUSE0068715',
    priority: '2',
    arguments:
      'Current interface allows selection of any company regardless of role, leading to incorrect authorization attempts.',
    impact:
      'Reduces incorrect authorization attempts and customer service inquiries by showing only valid authorization options.',
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
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)

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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedItem(item)}
                      >
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

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedItem?.title || 'Feature Details'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                Status
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {selectedItem?.status
                  ? selectedItem.status.charAt(0).toUpperCase() +
                    selectedItem.status.slice(1)
                  : 'Not specified'}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                Description
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {selectedItem?.description || 'No description available'}
              </p>
            </div>

            {selectedItem?.arguments && (
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                  Reasoning
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {selectedItem.arguments}
                </p>
              </div>
            )}

            {selectedItem?.impact && (
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                  Impact
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {selectedItem.impact}
                </p>
              </div>
            )}

            {selectedItem?.recommendation && (
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                  Development Group Recommendation
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {selectedItem.recommendation}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedItem?.milestone && (
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                  Milestone
                </span>
              )}
              {selectedItem?.priority && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
                  Priority {selectedItem.priority}
                </span>
              )}
              {selectedItem?.reference && (
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                  Ref: {selectedItem.reference}
                </span>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
