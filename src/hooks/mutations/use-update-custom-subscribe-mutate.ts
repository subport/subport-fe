import { updatedCustomSubscribe } from '@/api/subscribe';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useUpdateCustomSubscribeMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatedCustomSubscribe,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.subscriptions.all,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.subscriptions.byId(variables.subscribeId),
      });

      callbacks?.onSuccess?.(data);
    },
  });
}

export default useUpdateCustomSubscribeMutate;
