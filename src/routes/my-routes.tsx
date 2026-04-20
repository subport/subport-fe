import EditAccountPage from '@/domains/account/pages/edit-account-page/edit-account-page';
import EditReminderPage from '@/domains/account/pages/edit-reminder-page/edit-reminder-page';
import MyPage from '@/domains/account/pages/my-page/my-page';
import MySubscriptionsListPage from '@/domains/account/pages/my-subscriptions-list-page';
import MySubscriptionSchedulePage from '@/domains/subscription/schedule/pages/my-subscription-schedule/my-subscription-schedule-page';
import type { RouteObject } from 'react-router-dom';
import { withBottomNav, withHeader } from './route-handles';

export const myRoutes: RouteObject[] = [
  {
    path: '/my',
    children: [
      {
        index: true,
        element: <MyPage />,
        handle: withBottomNav,
      },
      {
        path: 'edit-account',
        element: <EditAccountPage />,
        handle: withHeader,
      },
      {
        path: 'reminder',
        element: <EditReminderPage />,
        handle: withHeader,
      },
      {
        path: 'subscriptions',
        element: <MySubscriptionsListPage />,
        handle: withHeader,
      },
      {
        path: 'schedule',
        element: <MySubscriptionSchedulePage />,
        handle: withHeader,
      },
    ],
  },
];
