'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Filter,
  SortAsc,
  GitPullRequestDraft,
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle,
  GitPullRequest,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import UpvoteButton from '@/components/ui/UpvoteButton'
import { FeatureRequestForm } from './components/forms/FeatureRequestForm'

interface TimelineItem {
  id: number
  title: string
  status: 'completed' | 'in-progress' | 'pending'
  date: string
  description: string
  milestone: boolean
  reference?: string
  priority?: string
  arguments?: string
  impact?: string
  recommendation?: string
}

interface FeatureRequest {
  id: number
  title: string
  description: string
  submittedBy: string
  submittedDate: string
  category: string
  upvotes: number
  status: 'new' | 'under-review' | 'planned' | 'rejected'
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

// Placeholder feature requests data
const featureRequestsData: FeatureRequest[] = [
  {
    id: 1,
    title: 'Bulk Data Export Functionality',
    description: 'Add ability to export multiple datasets simultaneously',
    submittedBy: 'User Organization A',
    submittedDate: '2024-03-01',
    category: 'Data Management',
    upvotes: 15,
    status: 'under-review',
  },
  {
    id: 2,
    title: 'Enhanced API Documentation',
    description:
      'Provide more detailed API documentation with practical examples',
    submittedBy: 'User Organization B',
    submittedDate: '2024-02-28',
    category: 'Documentation',
    upvotes: 8,
    status: 'new',
  },
  // Add more feature requests as needed
]

type SortField = 'date' | 'priority' | 'upvotes' | 'status'
type FilterStatus =
  | 'completed'
  | 'in-progress'
  | 'pending'
  | 'new'
  | 'under-review'
  | 'planned'
  | 'rejected'

  export default function FeaturesPage() {
    const [selectedStatuses, setSelectedStatuses] = useState<FilterStatus[]>([])
    const [sortField, setSortField] = useState<SortField>('date')
    const [sortAscending, setSortAscending] = useState(false)
    const [activeTab, setActiveTab] = useState('in-development')
    const [featureRequests, setFeatureRequests] = useState(featureRequestsData)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
  
    const handleUpvote = (id: number, isUpvoted: boolean) => {
      setFeatureRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id
            ? { ...request, upvotes: request.upvotes + (isUpvoted ? 1 : -1) }
            : request
        )
      )
    }
    const handleSubmit = async (data: {
      title: string
      description: string
      category: string
      submittedBy: string
    }) => {
      const newFeature: FeatureRequest = {
        id: featureRequests.length + 1,
        ...data,
        submittedDate: new Date().toISOString().split('T')[0],
        status: 'new',
        upvotes: 0,
      }
  
      setFeatureRequests((prev) => [...prev, newFeature])
      setIsDialogOpen(false)
    }
  

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'in-progress':
        return 'text-blue-600 bg-blue-50'
      case 'pending':
        return 'text-orange-600 bg-orange-50'
      case 'new':
        return 'text-purple-600 bg-purple-50'
      case 'under-review':
        return 'text-yellow-600 bg-yellow-50'
      case 'planned':
        return 'text-indigo-600 bg-indigo-50'
      case 'rejected':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <GitPullRequest className="h-4 w-4 text-blue-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />
      case 'new':
        return <GitPullRequestDraft className="h-4 w-4 text-purple-500" />
      case 'under-review':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <GitPullRequestDraft className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Features</h1>
        <p className="mt-2 text-muted-foreground">
          Track development progress and propose new features
        </p>
      </div>

      <Tabs
        defaultValue="in-development"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="in-development">In Development</TabsTrigger>
          <TabsTrigger value="requests">Feature Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="default" onClick={() => setIsDialogOpen(true)}>
                Submit New Feature Request
              </Button>
            </div>
            <div className="flex items-center gap-2">
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
                      setSortField('upvotes')
                      setSortAscending(!sortAscending)
                    }}
                  >
                    Upvotes{' '}
                    {sortField === 'upvotes' && (sortAscending ? '↑' : '↓')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureRequests.map((request) => (
              <Card
                key={request.id}
                className="cursor-pointer transition-colors hover:bg-accent/5"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {request.title}
                  </CardTitle>
                  <UpvoteButton
                    initialCount={request.upvotes}
                    size="sm"
                    onUpvote={(isUpvoted) =>
                      handleUpvote(request.id, isUpvoted)
                    }
                  />
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {request.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                          getStatusColor(request.status)
                        )}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1).replace('-', ' ')}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
                        {request.category}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {request.submittedDate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {featureRequests.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <GitPullRequestDraft className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No feature requests yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Be the first to submit a feature request!
              </p>
              <Button
                variant="default"
                className="mt-4"
                onClick={() => setIsDialogOpen(true)}
              >
                Submit New Feature Request
              </Button>
            </div>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Submit Feature Request</DialogTitle>
                <DialogDescription>
                  Propose a new feature or enhancement for the system.
                </DialogDescription>
              </DialogHeader>
              <FeatureRequestForm
                onSubmit={handleSubmit}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  )
}