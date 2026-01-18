import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from '@/components/layout/root-layout';
import { RequireAuth, RequireGuest } from '@/components/layout/private-route';

import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import LoginSuccessPage from './pages/login-success-page';
import AddSubscribePage from './pages/add-subscribe-page';
import AddSubscribeFormPage from './pages/add-subscribe-form-page';
import MyPage from './pages/my-page';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <RequireGuest />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/login-success',
            element: <LoginSuccessPage />,
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/',
            element: <MainPage />,
            handle: { bottomNavigation: true },
          },

          {
            path: '/add-subscribe',
            element: <AddSubscribePage />,
            handle: {
              header: {
                header: true,
                title: '구독추가',
                right: (
                  <span className="bg-box-black rounded-full px-3.5 py-2.5 text-xs">
                    직접입력
                  </span>
                ),
              },
            },
          },
          {
            path: '/add-subscribe/:id',
            element: <AddSubscribeFormPage />,
            handle: { header: true },
          },
          {
            path: '/my',
            element: <MyPage />,
            handle: { bottomNavigation: true },
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
