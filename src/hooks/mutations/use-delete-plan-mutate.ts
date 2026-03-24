import { deletePlan } from '@/api/plan';
import { QUERY_KEY } from '@/constants/query-key';
import type { ApiErrorRes } from '@/types/error';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

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
    onError: (error) => {
      if (isAxiosError<ApiErrorRes>(error)) {
        console.log(error.response?.data);
      }
      callbacks?.onError?.(error);
    },
  });
}

export default useDeletePlanMutate;
