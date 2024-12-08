import { render, screen } from '@testing-library/react';

import { Counter } from './counter';

describe('Counter', () => {
  it('should render Counter component', () => {
    render(<Counter />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Counter',
    );
  });

  it('should render initial count', () => {
    render(<Counter />);
    expect(screen.getByText('Counter 0')).toBeInTheDocument();
  });

  it('should increment count', async () => {
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: /Increment/i });
    incrementButton.click();

    expect(await screen.findByText('Counter 1')).toBeInTheDocument();
  });

  it('should decrement count', async () => {
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: /Increment/i });
    const decrementButton = screen.getByRole('button', { name: /Decrement/i });
    incrementButton.click();
    incrementButton.click();
    incrementButton.click();
    incrementButton.click();

    decrementButton.click();
    decrementButton.click();

    expect(await screen.findByText('Counter 2')).toBeInTheDocument();
  });
});
