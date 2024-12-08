import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { HomePage } from './home-page';

function renderComponent() {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe('home.tsx', () => {
  it('should display Home title', () => {
    renderComponent();
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('Home');
  });
});
