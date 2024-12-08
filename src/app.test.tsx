import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { RootLayout } from './components';
import { HomePage } from './pages';

function renderComponent(index = 0) {
  render(
    <MemoryRouter initialEntries={['/']} initialIndex={index}>
      <Routes>
        <Route element={<RootLayout />} errorElement={<div>Not found</div>}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('App.tsx', () => {
  it('should render HomePage content on /', async () => {
    renderComponent();
    const title = await screen.findByText('Home');

    expect(title).toBeInTheDocument();
  });
});
