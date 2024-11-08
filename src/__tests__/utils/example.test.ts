import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('should merge className strings', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })

  it('should handle conditional classes', () => {
    const condition = true
    const result = cn('base', condition && 'conditional')
    expect(result).toBe('base conditional')
  })

  it('should filter out falsy values', () => {
    const result = cn(
      'base',
      false && 'not-included',
      '' as string,
      undefined,
      null
    )
    expect(result).toBe('base')
  })
})
