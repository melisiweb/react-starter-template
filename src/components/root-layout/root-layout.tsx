import { Outlet } from 'react-router-dom';

import { QueryProvider } from '@/providers';

export const RootLayout = () => {
  return (
    <main>
      <div>
        <QueryProvider>
          <Outlet />
        </QueryProvider>
      </div>
    </main>
  );
};
