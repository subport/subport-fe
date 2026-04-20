import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserSubscription } from '../../api/user-subscription';
import { QUERY_KEY } from '@/shared/constants/query-key';

function useDeleteUserSubscriptionMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserSubscription,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.userSubscription.all,
      });
    },
  });
}

export default useDeleteUserSubscriptionMutate;
