import { type PlanList } from '@/types/plan';
import { client } from './client';

export const getPlans = async (id: string) => {
  const response = await client.get<PlanList>(`/api/subscriptions/${id}/plans`);

  return response.data.plans;
};
