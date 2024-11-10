import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UpvoteButtonProps {
  initialCount?: number
  onUpvote?: (isUpvoted: boolean) => void
  size?: 'default' | 'sm' | 'lg'
  className?: string
  disabled?: boolean
}

const UpvoteButton = ({
  initialCount = 0,
  onUpvote = () => {},
  size = 'default',
  className,
  disabled = false,
}: UpvoteButtonProps) => {
  const [upvoted, setUpvoted] = useState(false)
  const [count, setCount] = useState(initialCount)

  const handleUpvote = () => {
    if (disabled) return

    if (!upvoted) {
      setCount((prev) => prev + 1)
      setUpvoted(true)
      onUpvote(true)
    } else {
      setCount((prev) => prev - 1)
      setUpvoted(false)
      onUpvote(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleUpvote}
      disabled={disabled}
      className={cn(
        'gap-1.5 transition-colors',
        upvoted && 'text-blue-600 hover:bg-blue-50 hover:text-blue-600',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <ArrowUpCircle
        className={cn(
          'h-4 w-4 transition-transform',
          upvoted && 'fill-current'
        )}
      />
      {count}
    </Button>
  )
}

export default UpvoteButton
