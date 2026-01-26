import { getPlan } from '@/api/plan';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetPlan(planId: string) {
  return useQuery({
    queryKey: QUERY_KEY.plans.byId(planId),
    queryFn: () => getPlan(planId),
  });
}

export default useGetPlan;
