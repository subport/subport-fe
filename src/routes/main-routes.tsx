import MainPage from '@/domains/subscription/pages/main/main-page';
import FeedbackModalPage from '@/domains/subport/pages/feed-back-modal-page';
import type { RouteObject } from 'react-router-dom';
import { withBottomNav } from './route-handles';

export const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
    handle: withBottomNav,
    children: [
      {
        path: '/feedback',
        element: <FeedbackModalPage />,
      },
    ],
  },
];
