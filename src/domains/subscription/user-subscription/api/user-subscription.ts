import { client } from '@/api/client';
import type { UserSubscribeSummary } from '../types/api';

export const getUserSubscriptionMonthlySummary = async () => {
  const response = await client.get<UserSubscribeSummary>(
    '/api/member-subscriptions/monthly-summary',
  );

  return response.data;
};
