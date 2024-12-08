import {
  createBrowserRouter,
  RouterProvider as Provider,
} from 'react-router-dom';

import { RootLayout } from '@/components';
import { HomePage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
    ],
  },
]);

export const RouterProvider = () => {
  return <Provider router={router} />;
};
