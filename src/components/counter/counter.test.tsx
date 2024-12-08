import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useAppStore } from '@/stores/app-store';

// import { useAppStore } from '@/stores/app-store';
import { Counter } from './counter';

describe('Counter', () => {
  beforeEach(() => {
    useAppStore.getState().reset();
    jest.clearAllMocks();
  });
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
    const user = userEvent.setup();
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: /Increment/i });
    await user.click(incrementButton);

    expect(await screen.findByText('Counter 1')).toBeInTheDocument();
  });

  it('should decrement count', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const incrementButton = screen.getByRole('button', { name: /Increment/i });
    const decrementButton = screen.getByRole('button', { name: /Decrement/i });

    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    await user.click(decrementButton);
    await user.click(decrementButton);

    expect(await screen.findByText('Counter 2')).toBeInTheDocument();
  });
});
