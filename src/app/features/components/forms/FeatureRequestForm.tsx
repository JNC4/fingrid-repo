import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DialogFooter } from '@/components/ui/dialog'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

interface FeatureRequestFormProps {
  onSubmit: (data: {
    title: string
    description: string
    category: string
    submittedBy: string
  }) => void
  onCancel: () => void
}

export function FeatureRequestForm({
  onSubmit,
  onCancel,
}: FeatureRequestFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [submittedBy, setSubmittedBy] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit({
        title,
        description,
        category,
        submittedBy,
      })

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter feature title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the feature and its benefits..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          placeholder="Enter your organization or team name"
          value={submittedBy}
          onChange={(e) => setSubmittedBy(e.target.value)}
          required
        />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </DialogFooter>
    </form>
  )
}
