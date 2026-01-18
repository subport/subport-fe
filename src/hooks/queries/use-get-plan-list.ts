import { getPlans } from '@/api/plan';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetPlanList(subscribeId: string) {
  return useQuery({
    queryKey: QUERY_KEY.plans.list(subscribeId),
    queryFn: () => getPlans(subscribeId),
    enabled: Boolean(subscribeId),
  });
}

export default useGetPlanList;
