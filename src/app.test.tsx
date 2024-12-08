import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { RootLayout } from './components';
import { HomePage } from './pages';

jest.mock('./providers', () => ({
  QueryProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

function renderComponent(index = 0) {
  render(
    <MemoryRouter initialEntries={['/']} initialIndex={index}>
      <Routes>
        <Route element={<RootLayout />}>
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
