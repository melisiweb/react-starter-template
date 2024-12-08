import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './login-form';

describe('LoginForm', () => {
  const onLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form', () => {
    render(<LoginForm onLogin={onLogin} />);

    const emailLabel = screen.getByText('Email');
    const passwordLabel = screen.getByText('Password');
    const submitBtn = screen.getByRole('button', { name: /Login/i });

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it('should show error message on invalid email', async () => {
    const user = userEvent.setup();
    render(<LoginForm onLogin={onLogin} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const submitBtn = screen.getByRole('button', { name: /Login/i });

    await user.type(emailInput, 'invalid-email');
    await user.click(submitBtn);

    const emailError = await screen.findByText('Invalid email');
    expect(emailError).toBeInTheDocument();
  });

  it('should show error message on invalid password', async () => {
    const user = userEvent.setup();
    render(<LoginForm onLogin={onLogin} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitBtn = screen.getByRole('button', { name: /Login/i });

    await user.type(emailInput, 'correct@email.com');
    await user.type(passwordInput, '123');
    await user.click(submitBtn);

    const passwordError = await screen.findByText(
      'String must contain at least 6 character(s)',
    );
    expect(passwordError).toBeInTheDocument();
  });

  it('should call onSubmit with form data', async () => {
    const user = userEvent.setup();
    render(<LoginForm onLogin={onLogin} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitBtn = screen.getByRole('button', { name: /Login/i });

    await user.type(emailInput, 'correct@email.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitBtn);

    expect(onLogin).toHaveBeenCalledWith({
      email: 'correct@email.com',
      password: 'password123',
    });
  });
});
