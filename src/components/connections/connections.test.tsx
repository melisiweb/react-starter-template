import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import { Connections } from './connections'; // Assuming Connections.tsx is the component file

describe('Connections', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  afterEach(() => {
    queryClient.clear();
    jest.resetAllMocks(); // Clean up fetch mocks after each test
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <Connections />
      </QueryClientProvider>,
    );

  it('renders loading state initially', async () => {
    global.fetch = jest.fn(); // Mock fetch globally

    renderComponent();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders error state on fetch failure', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API is down'));

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText('Error in fetching connections'),
      ).toBeInTheDocument();
    });
  });

  it('renders connection data on successful fetch', async () => {
    const mockData = { server_id: 'server123' };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Connections')).toBeInTheDocument();
    });
    expect(screen.getByText('server123')).toBeInTheDocument();
  });
});
