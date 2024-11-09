'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Clock,
  GitPullRequestDraft,
  Bell,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
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
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Enable Notifications
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
              <Button variant="ghost" size="sm" asChild>
                <Link href="/timeline">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Energy Community Calculation',
                  status: 'Completed',
                  date: 'Priority 1 • Ref: CSUSE0068632',
                },
                {
                  title: 'Time Series Data Control',
                  status: 'Pending',
                  date: 'Priority 1 • Ref: CSUSE0071213',
                },
                {
                  title: 'Authorization Restoration Process',
                  status: 'In Progress',
                  date: 'Priority 2',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
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
                    {item.date}
                  </p>
                </div>
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
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Development Updates
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
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
