import { deletePlan } from '@/api/plan';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import type { PlanItem } from '@/types/plan';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useDeletePlanMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlan,
    onSuccess: (data, variables) => {
      callbacks?.onSuccess?.(data);

      const prevPlanList = queryClient.getQueryData<PlanItem[]>(
        QUERY_KEY.plans.list(variables.subscribeId.toString()),
      );
      if (!prevPlanList) throw new Error('멤버십 목록을 불러오지 못했습니다.');

      queryClient.setQueryData(
        QUERY_KEY.plans.list(variables.subscribeId.toString()),
        () => {
          const updatedPlanList = prevPlanList.filter(
            (plan) => plan.id !== variables.planId,
          );

          return updatedPlanList;
        },
      );
    },
  });
}

export default useDeletePlanMutate;
