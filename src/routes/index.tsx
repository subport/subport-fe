import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';

import RootLayout from '@/components/layout/root-layout';
import { RequireAuth, RequireGuest } from '@/components/layout/private-route';

import MainPage from '../domains/subscription/pages/main/main-page';
import LoginPage from '../domains/auth/pages/login-page';
import LoginSuccessPage from '../domains/auth/pages/login-success-page';
import MyPage from '../domains/account/pages/my-page/my-page';
import AddPlanPage from '../domains/subscription/pages/add-plan-page';
import EditPlanPage from '../domains/subscription/pages/edit-plan-page';
import PlanPageLayout from '@/components/layout/plan-page-layout';
import PlanEditorPage from '../domains/subscription/pages/plan-editor/plan-editor-page';
import SubscribeEditorPage from '../domains/subscription/pages/custom-service-editor/custom-service-editor-page';
import AddSubscribePageLayout from '@/components/layout/add-user-subscription-page-layout';
import UserSubscriptionReactivatePage from '../domains/subscription/user-subscription/pages/user-subscription-reactivate-page';
import FaqPage from '../domains/subport/pages/faq-page';
import UserCommentPage from '../domains/subport/pages/user-comment-page';
import FeedbackModalPage from '../domains/subport/pages/feed-back-modal-page';
import RootErrorPage from './pages/root-error-page';
import AddCustomServicesPage from '../domains/subscription/pages/add-custom-service-page';
import EditCustomServicePage from '@/domains/subscription/pages/edit-custom-service-page';
import AddUserSubscriptionPage from '../domains/subscription/pages/add-user-subscription-page';
import SubscriptionServiceListPage from '@/domains/subscription/pages/subscription-service-list/subscription-service-list-page';
import UserSubscriptionPlanManagePage from '../domains/subscription/user-subscription/pages/user-subscription-plan-manage-page';
import EditAccountPage from '@/domains/account/pages/edit-account-page/edit-account-page';
import EditReminderPage from '@/domains/account/pages/edit-reminder-page/edit-reminder-page';
import MySubscriptionsListPage from '@/domains/account/pages/my-subscriptions-list-page';
import MySubscriptionSchedulePage from '@/domains/subscription/schedule/pages/my-subscription-schedule/my-subscription-schedule-page';
import UserSubscriptionDetailPage from '../domains/subscription/user-subscription/pages/user-subscription-detail/user-subscription-detail-page';
import UserSubscriptionEditLayout from '@/domains/subscription/user-subscription/pages/layouts/user-subscription-edit-layout';
import EditUserSubscriptionPlanPage from '@/domains/subscription/user-subscription/pages/edit-user-subscription-plan-page';
import EditUserSubscriptionPage from '@/domains/subscription/user-subscription/pages/edit-user-subscription-page';
import EditUserSubscriptionDutchPayPage from '@/domains/subscription/user-subscription/pages/edit-user-subscription-dutchpay-page';
import EditUserSubscriptionStatePage from '@/domains/subscription/user-subscription/pages/edit-user-subscription-state-page';
import UserSubscriptionEditLink from '@/domains/subscription/user-subscription/components/edit/user-subscription-edit-link';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [
      {
        element: <RequireGuest />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
        ],
      },
      {
        path: '/login-success',
        element: <LoginSuccessPage />,
      },
      {
        element: <RequireAuth />,

        children: [
          {
            path: '/',
            element: <MainPage />,
            handle: { bottomNavigation: true },
            children: [
              {
                path: '/feedback',
                element: <FeedbackModalPage />,
              },
            ],
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
                path: 'edit/:serviceId',
                element: <EditCustomServicePage />,
                handle: {
                  header: {
                    header: true,
                  },
                },
              },
              {
                element: <AddSubscribePageLayout />,
                children: [
                  {
                    path: 'add',
                    element: <SubscriptionServiceListPage />,
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
                    element: <AddUserSubscriptionPage />,
                    handle: { header: true },
                  },
                ],
              },
              {
                path: 'add/custom',
                element: <AddCustomServicesPage />,
                handle: {
                  header: {
                    header: true,
                  },
                },
              },

              {
                path: ':subscribeId/plan',
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
            path: '/member-subscribe',
            children: [
              {
                path: ':memberSubscribeId',
                element: <UserSubscriptionDetailPage />,
                handle: {
                  header: {
                    header: true,
                    right: <UserSubscriptionEditLink />,
                  },
                },
              },
              {
                path: ':memberSubscribeId/edit',
                element: <UserSubscriptionEditLayout />,
                handle: {
                  header: { header: true },
                },
                children: [
                  {
                    index: true,
                    element: <EditUserSubscriptionPage />,
                  },
                  {
                    path: 'plan',
                    element: <EditUserSubscriptionPlanPage />,
                  },
                  {
                    path: 'dutchpay',
                    element: <EditUserSubscriptionDutchPayPage />,
                  },
                  {
                    path: 'state',
                    element: <EditUserSubscriptionStatePage />,
                  },
                ],
              },

              {
                path: ':memberSubscribeId/edit/plan/manage/:subscribeId',
                element: <UserSubscriptionPlanManagePage />,
                handle: {
                  header: { header: true, title: '멤버십 관리' },
                },
              },
              {
                path: ':memberSubscribeId/reactivate',
                element: <UserSubscriptionReactivatePage />,
                handle: { header: { header: true } },
              },
            ],
          },

          {
            path: '/my',
            children: [
              {
                index: true,
                element: <MyPage />,
                handle: { bottomNavigation: true },
              },
              {
                path: 'edit-account',
                element: <EditAccountPage />,
                handle: {
                  header: { header: true },
                },
              },
              {
                path: 'reminder',
                element: <EditReminderPage />,
                handle: {
                  header: { header: true },
                },
              },
              {
                path: 'subscriptions',
                element: <MySubscriptionsListPage />,
                handle: {
                  header: { header: true },
                },
              },
              {
                path: 'schedule',
                element: <MySubscriptionSchedulePage />,
                handle: {
                  header: { header: true },
                },
              },
            ],
          },

          {
            path: '/faq',
            element: <FaqPage />,
            handle: {
              header: { header: true, title: 'FAQ' },
            },
          },

          {
            path: 'user-comment',
            element: <UserCommentPage />,
            handle: {
              header: { header: true },
            },
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
