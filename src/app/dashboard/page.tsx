'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Clock,
  GitPullRequestDraft,
  Bell,
  ChevronRight,
  Filter,
  SortAsc,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type Status = 'completed' | 'in-progress' | 'pending'
type SortField = 'date' | 'priority' | 'status'

interface TimelineItem {
  id: number
  title: string
  status: Status
  date: string
  description: string
  milestone: boolean
  reference?: string
  priority?: string
  arguments?: string
  impact?: string
  recommendation?: string
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

export default function DashboardPage() {
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([])
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortAscending, setSortAscending] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  // Calculate statistics for the cards
  const activeFeatures = timelineData.length
  const inProgressCount = timelineData.filter(
    (item) => item.status === 'in-progress'
  ).length
  const pendingCount = timelineData.filter(
    (item) => item.status === 'pending'
  ).length
  const completedCount = timelineData.filter(
    (item) => item.status === 'completed'
  ).length

  // Get most recent development
  const mostRecent = [...timelineData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0]

  // Calculate priority distribution
  const p1Count = timelineData.filter((item) => item.priority === '1').length
  const p2Count = timelineData.filter((item) => item.priority === '2').length
  const p3Count = timelineData.filter((item) => item.priority === '3').length

  const filteredDevelopments = timelineData
    .filter(
      (item) =>
        selectedStatuses.length === 0 || selectedStatuses.includes(item.status)
    )
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortAscending
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      if (sortField === 'priority') {
        return sortAscending
          ? (a.priority || '').localeCompare(b.priority || '')
          : (b.priority || '').localeCompare(a.priority || '')
      }
      return 0
    })
    .slice(0, 5) // Show only the 5 most recent items in dashboard

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            System Development Overview
          </p>
        </div>
        <Button
          variant={notificationsEnabled ? 'default' : 'outline'}
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
        >
          <Bell className="mr-2 h-4 w-4" />
          {notificationsEnabled ? 'Notifications On' : 'Enable Notifications'}
        </Button>
      </div>

      {/* Feature Progress Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Features
            </CardTitle>
            <BarChart3 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFeatures}</div>
            <div className="text-muted-foreground text-xs">
              {inProgressCount} in progress, {pendingCount} pending,{' '}
              {completedCount} completed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Recent Development
            </CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mostRecent?.title}</div>
            <div className="text-muted-foreground text-xs">
              Ref: {mostRecent?.reference}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Priority Distribution
            </CardTitle>
            <GitPullRequestDraft className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">P2</div>
            <div className="text-muted-foreground text-xs">
              {p2Count} P2, {p1Count} P1, {p3Count} P3 tasks
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Preview & Notifications */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Developments</CardTitle>
              <div className="flex items-center gap-2">
                {/* Filter Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      {selectedStatuses.length > 0 && (
                        <span className="bg-primary ml-1 rounded-full px-2 py-0.5 text-xs text-white">
                          {selectedStatuses.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {(['completed', 'in-progress', 'pending'] as Status[]).map(
                      (status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => {
                            setSelectedStatuses((prev) =>
                              prev.includes(status)
                                ? prev.filter((s) => s !== status)
                                : [...prev, status]
                            )
                          }}
                        >
                          <div className="flex items-center">
                            {selectedStatuses.includes(status) && (
                              <span className="mr-2">✓</span>
                            )}
                            {status.charAt(0).toUpperCase() +
                              status.slice(1).replace('-', ' ')}
                          </div>
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <SortAsc className="mr-2 h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setSortField('date')
                        setSortAscending(!sortAscending)
                      }}
                    >
                      Date {sortField === 'date' && (sortAscending ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortField('priority')
                        setSortAscending(!sortAscending)
                      }}
                    >
                      Priority{' '}
                      {sortField === 'priority' && (sortAscending ? '↑' : '↓')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="sm" asChild>
                  <Link href="/timeline">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedStatuses.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">
                    Filtered by:
                  </span>
                  {selectedStatuses.map((status) => (
                    <span
                      key={status}
                      className="bg-secondary flex items-center gap-1 rounded-full px-2 py-1 text-xs"
                    >
                      {status.charAt(0).toUpperCase() +
                        status.slice(1).replace('-', ' ')}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          setSelectedStatuses((prev) =>
                            prev.filter((s) => s !== status)
                          )
                        }
                      />
                    </span>
                  ))}
                </div>
              )}
              {filteredDevelopments.map((item) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <div className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p
                          className={cn(
                            'text-sm',
                            item.status === 'completed'
                              ? 'text-green-600'
                              : item.status === 'in-progress'
                                ? 'text-blue-600'
                                : 'text-muted-foreground'
                          )}
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1).replace('-', ' ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {item.milestone && (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                              Milestone
                            </span>
                          )}
                          <p className="text-muted-foreground text-sm">
                            Priority {item.priority}
                          </p>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {item.reference}
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                      <DialogDescription>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                              Status
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {item.status.charAt(0).toUpperCase() +
                                item.status.slice(1).replace('-', ' ')}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                              Description
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {item.description}
                            </p>
                          </div>

                          {item.arguments && (
                            <div>
                              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                Reasoning
                              </h4>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {item.arguments}
                              </p>
                            </div>
                          )}

                          {item.impact && (
                            <div>
                              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                Impact
                              </h4>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {item.impact}
                              </p>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 pt-2">
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
                            {item.reference && (
                              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                                Ref: {item.reference}
                              </span>
                            )}
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground mb-2 text-sm">
                  Get notified about:
                </p>
                <div className="space-y-2">
                  <Button
                    variant={notificationsEnabled ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() =>
                      setNotificationsEnabled(!notificationsEnabled)
                    }
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Development Updates
                    {notificationsEnabled && (
                      <span className="ml-auto rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                        On
                      </span>
                    )}
                  </Button>
                  <Button
                    variant={notificationsEnabled ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() =>
                      setNotificationsEnabled(!notificationsEnabled)
                    }
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Timeline Changes
                    {notificationsEnabled && (
                      <span className="ml-auto rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                        On
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              <div className="pt-4">
                <h4 className="text-sm font-medium">Milestone Alerts</h4>
                <p className="text-muted-foreground mb-2 text-xs">
                  {timelineData.filter((item) => item.milestone).length}{' '}
                  upcoming milestones
                </p>
                <div className="space-y-2">
                  {timelineData
                    .filter(
                      (item) => item.milestone && item.status !== 'completed'
                    )
                    .slice(0, 2)
                    .map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between rounded-lg border p-2 text-sm"
                      >
                        <div>
                          <p className="font-medium">{milestone.title}</p>
                          <p className="text-muted-foreground text-xs">
                            {milestone.date}
                          </p>
                        </div>
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-xs font-medium',
                            milestone.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-neutral-100 text-neutral-600'
                          )}
                        >
                          {milestone.status.charAt(0).toUpperCase() +
                            milestone.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="pt-4">
                <h4 className="text-sm font-medium">Priority Overview</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">High Priority (P1)</span>
                    <span className="text-xs font-medium">{p1Count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100">
                    <div
                      className="h-2 rounded-full bg-red-500"
                      style={{ width: `${(p1Count / activeFeatures) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Medium Priority (P2)</span>
                    <span className="text-xs font-medium">{p2Count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100">
                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{ width: `${(p2Count / activeFeatures) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Low Priority (P3)</span>
                    <span className="text-xs font-medium">{p3Count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${(p3Count / activeFeatures) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
