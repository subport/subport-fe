import FaqPage from '@/domains/subport/pages/faq-page';
import UserCommentPage from '@/domains/subport/pages/user-comment-page';
import type { RouteObject } from 'react-router-dom';
import { headerHandle, withHeader } from './route-handles';

export const supportRoutes: RouteObject[] = [
  {
    path: '/faq',
    element: <FaqPage />,
    handle: headerHandle('FAQ'),
  },
  {
    path: '/user-comment',
    element: <UserCommentPage />,
    handle: withHeader,
  },
];
