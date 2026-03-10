import { deletePlan } from '@/api/plan';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useDeletePlanMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlan,
    onSuccess: (data, variables) => {
      callbacks?.onSuccess?.(data);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.plans.list(variables.subscribeId.toString()),
      });
    },
  });
}

export default useDeletePlanMutate;
