import AddSubscribePageLayout from '@/components/layout/add-user-subscription-page-layout';
import PlanPageLayout from '@/components/layout/plan-page-layout';
import AddCustomServicesPage from '@/domains/subscription/pages/add-custom-service-page';
import AddPlanPage from '@/domains/subscription/pages/add-plan-page';
import AddUserSubscriptionPage from '@/domains/subscription/pages/add-user-subscription-page';
import SubscribeEditorPage from '@/domains/subscription/pages/custom-service-editor/custom-service-editor-page';
import EditCustomServicePage from '@/domains/subscription/pages/edit-custom-service-page';
import EditPlanPage from '@/domains/subscription/pages/edit-plan-page';
import PlanEditorPage from '@/domains/subscription/pages/plan-editor/plan-editor-page';
import SubscriptionServiceListPage from '@/domains/subscription/pages/subscription-service-list/subscription-service-list-page';
import { Link, type RouteObject } from 'react-router-dom';
import { headerHandle, withHeader } from './route-handles';

export const serviceRoutes: RouteObject[] = [
  {
    path: '/service',
    children: [
      {
        path: 'edit',
        element: <SubscribeEditorPage />,
        handle: headerHandle('구독 서비스 관리'),
      },
      {
        path: 'edit/:serviceId',
        element: <EditCustomServicePage />,
        handle: withHeader,
      },
      {
        element: <AddSubscribePageLayout />,
        children: [
          {
            path: 'add',
            element: <SubscriptionServiceListPage />,
            handle: headerHandle(
              '구독추가',
              <Link
                to="/service/edit"
                className="bg-box-black block rounded-full px-5 py-2 text-xs"
              >
                관리
              </Link>,
            ),
          },
          {
            path: 'add/:id',
            element: <AddUserSubscriptionPage />,
            handle: withHeader,
          },
        ],
      },
      {
        path: 'add/custom',
        element: <AddCustomServicesPage />,
        handle: withHeader,
      },
      {
        path: ':serviceId/plan',
        element: <PlanPageLayout />,
        children: [
          {
            path: 'add',
            element: <AddPlanPage />,
            handle: withHeader,
          },
          {
            path: 'edit',
            element: <PlanEditorPage />,
            handle: headerHandle('멤버십 관리'),
          },
          {
            path: 'edit/:planId',
            element: <EditPlanPage />,
            handle: withHeader,
          },
        ],
      },
    ],
  },
];
