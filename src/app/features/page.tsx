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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
]

const categories = [
  'Data Management',
  'User Interface',
  'Documentation',
  'API Integration',
  'Performance',
  'Security',
  'Analytics',
  'Automation',
  'Other',
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

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [submittedBy, setSubmittedBy] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpvote = (id: number, isUpvoted: boolean) => {
    setFeatureRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? { ...request, upvotes: request.upvotes + (isUpvoted ? 1 : -1) }
          : request
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newFeature: FeatureRequest = {
        id: featureRequests.length + 1,
        title,
        description,
        category,
        submittedBy,
        submittedDate: new Date().toISOString().split('T')[0],
        upvotes: 0,
        status: 'new',
      }

      setFeatureRequests((prev) => [...prev, newFeature])
      setIsDialogOpen(false)

      // Reset form
      setTitle('')
      setDescription('')
      setCategory('')
      setSubmittedBy('')
    } catch (error) {
      console.error('Error submitting feature request:', error)
    } finally {
      setIsSubmitting(false)
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter feature title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the feature and its benefits..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="submittedBy">Organization / Team</Label>
                  <Input
                    id="submittedBy"
                    value={submittedBy}
                    onChange={(e) => setSubmittedBy(e.target.value)}
                    placeholder="Enter your organization or team name"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  )
}
