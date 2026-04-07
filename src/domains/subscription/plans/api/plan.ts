import { client } from '@/api/client';
import type { PlanItem, PlanList } from '../types/api';

export const getPlans = async (planId: string) => {
  const response = await client.get<PlanList>(
    `/api/subscriptions/${planId}/plans`,
  );

  return response.data;
};

export const getPlan = async (planId: string) => {
  const response = await client.get<PlanItem>(`/api/plans/${planId}`);

  return response.data;
};
