'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    return (
      <select
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-neutral-200 bg-background px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-300',
          className
        )}
        onChange={handleChange}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = 'Select'

// Wrapper components to maintain compatibility with existing code
const SelectTrigger = Select
const SelectContent = ({ children }: { children: React.ReactNode }) => children
const SelectItem = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: string
}) => <option value={value}>{children}</option>
const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <option value="">{placeholder}</option>
)

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }
