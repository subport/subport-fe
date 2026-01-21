import { addPlan } from '@/api/plan';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import type { PlanItem } from '@/types/plan';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useAddPlanMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPlan,
    onSuccess: (data, variables) => {
      callbacks?.onSuccess?.(data);
      queryClient.setQueryData<PlanItem[]>(
        QUERY_KEY.plans.list(variables.id.toString()),
        (prev) => {
          if (!prev) throw new Error('멤버십 목록을 불러오지 못했습니다');
          return [...prev, variables];
        },
      );
    },
  });
}

export default useAddPlanMutate;
