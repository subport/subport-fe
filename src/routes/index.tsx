import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';

import RootLayout from '@/components/layout/root-layout';
import { RequireAuth, RequireGuest } from '@/components/layout/private-route';

import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import LoginSuccessPage from './pages/login-success-page';
import AddSubscribePage from './pages/add-subscribe-page';
import AddSubscribeFormPage from './pages/add-subscribe-form-page';
import MyPage from './pages/my-page';
import AddCustomSubscribePage from './pages/add-custom-subscribe-page';
import AddPlanPage from './pages/add-plan-page';
import EditPlanPage from './pages/edit-plan-page';
import PlanPageLayout from '@/components/layout/plan-page-layout';
import PlanEditorPage from './pages/plan-editor-page';
import SubscribeEditorPage from './pages/subscribe-editor-page';
import EditCustomSubscribePage from './pages/edit-custom-subscribe-page';

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
            path: '/subscribe',
            children: [
              {
                path: 'edit',
                element: <SubscribeEditorPage />,
                handle: { header: { header: true, title: '구독 서비스 관리' } },
              },
              {
                path: 'edit/:subscribeId',
                element: <EditCustomSubscribePage />,
                handle: {
                  header: {
                    header: true,
                  },
                },
              },
              {
                path: 'add',
                element: <AddSubscribePage />,
                handle: {
                  header: {
                    header: true,
                    title: '구독추가',
                    right: (
                      <Link
                        to="/subscribe/edit"
                        className="bg-box-black block rounded-full px-5 py-2 text-xs"
                      >
                        관리
                      </Link>
                    ),
                  },
                },
              },
              {
                path: 'add/:id',
                element: <AddSubscribeFormPage />,
                handle: { header: true },
              },
              {
                path: 'add/custom',
                element: <AddCustomSubscribePage />,
                handle: {
                  header: {
                    header: true,
                  },
                },
              },

              {
                path: 'add/:subscribeId/plan',
                element: <PlanPageLayout />,
                children: [
                  {
                    path: 'add',
                    element: <AddPlanPage />,
                    handle: { header: true },
                  },
                  {
                    path: 'edit',
                    element: <PlanEditorPage />,
                    handle: {
                      header: {
                        header: true,
                        title: '멤버십 관리',
                      },
                    },
                  },
                  {
                    path: 'edit/:planId',
                    element: <EditPlanPage />,
                    handle: { header: true },
                  },
                ],
              },
            ],
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
