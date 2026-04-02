import { addSubscribe } from '@/api/subscribe';
import { queryClient } from '@/components/providers/query-provider';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation } from '@tanstack/react-query';

export const useAddUserSubscriptionMutate = (
  callbacks?: useMutationCallbacks,
) => {
  return useMutation({
    mutationFn: addSubscribe,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.spendingRecords.all,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.userSubscription.lists,
      });
      callbacks?.onSuccess?.(data);
    },
  });
};
