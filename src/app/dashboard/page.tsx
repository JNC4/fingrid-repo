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
  ChevronDown,
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

type Status = 'Completed' | 'In Progress' | 'Pending'
type SortField = 'date' | 'priority' | 'status'

interface DevelopmentItem {
  title: string
  status: Status
  date: string
  description?: string
  priority: string
  reference?: string
}

const recentDevelopments: DevelopmentItem[] = [
  {
    title: 'Energy Community Calculation',
    status: 'Completed',
    date: '2024-02-29',
    description:
      'Clarification of calculation precision in energy community measurements',
    priority: '1',
    reference: 'CSUSE0068632',
  },
  {
    title: 'Time Series Data Control',
    status: 'Pending',
    date: '2024-02-26',
    description:
      'Implementation of size limits for outbound time series messages',
    priority: '1',
    reference: 'CSUSE0071213',
  },
  {
    title: 'Authorization Restoration Process',
    status: 'In Progress',
    date: '2024-02-22',
    description:
      'Restore authorizations when sales contracts are restored in DH-351 process',
    priority: '2',
    reference: 'CSUSE0070406',
  },
]

export default function DashboardPage() {
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([])
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortAscending, setSortAscending] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const filteredDevelopments = recentDevelopments
    .filter(
      (item) =>
        selectedStatuses.length === 0 || selectedStatuses.includes(item.status)
    )
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortAscending
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date)
      }
      if (sortField === 'priority') {
        return sortAscending
          ? a.priority.localeCompare(b.priority)
          : b.priority.localeCompare(a.priority)
      }
      return 0
    })

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
            <div className="text-2xl font-bold">7</div>
            <div className="text-muted-foreground text-xs">
              3 in progress, 3 pending, 1 completed
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
            <div className="text-2xl font-bold">
              Energy Community Calculation
            </div>
            <div className="text-muted-foreground text-xs">
              Ref: CSUSE0068632
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
              4 P2, 2 P1, 1 P3 tasks
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
                    {(['Completed', 'In Progress', 'Pending'] as Status[]).map(
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
                            {status}
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
                      {status}
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
              {filteredDevelopments.map((item, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p
                          className={cn(
                            'text-sm',
                            item.status === 'Completed'
                              ? 'text-green-600'
                              : item.status === 'In Progress'
                                ? 'text-blue-600'
                                : 'text-muted-foreground'
                          )}
                        >
                          {item.status}
                        </p>
                      </div>
                      <p className="text-muted-foreground text-right text-sm">
                        Priority {item.priority}
                        {item.reference && ` • Ref: ${item.reference}`}
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                      <DialogDescription>
                        <div className="mt-4 space-y-2">
                          <p>
                            <strong>Status:</strong> {item.status}
                          </p>
                          <p>
                            <strong>Priority:</strong> {item.priority}
                          </p>
                          {item.reference && (
                            <p>
                              <strong>Reference:</strong> {item.reference}
                            </p>
                          )}
                          <p>
                            <strong>Description:</strong> {item.description}
                          </p>
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
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
