import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// This is just an example component - you'll replace this with your actual components
const ExampleButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick}>Click me</button>
)

describe('ExampleButton', () => {
  it('renders button and handles click', async () => {
    const handleClick = jest.fn()

    render(<ExampleButton onClick={handleClick} />)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()

    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
