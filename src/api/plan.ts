import { type AddPlanReq, type PlanList } from '@/types/plan';
import { client } from './client';

export const getPlans = async (id: string) => {
  const response = await client.get<PlanList>(`/api/subscriptions/${id}/plans`);

  return response.data.plans;
};

export const addPlan = async ({
  amount,
  amountUnit,
  durationMonths,
  name,
  id,
}: AddPlanReq & { id: number }) => {
  const response = await client.post<{ id: number }>(
    `/api/subscriptions/${id}/plans`,
    { amount: Number(amount), amountUnit, durationMonths, name },
  );

  return response.data;
};
