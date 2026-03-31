import { activateMemberSubscribe } from '@/api/member-subscribe';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { MemberSubscribeItem } from '@/types/member-subscribe';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useMemberSubscribeActivateMutate(
  callbacks?: useMutationCallbacks<MemberSubscribeItem>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateMemberSubscribe,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);

      queryClient.setQueryData(
        QUERY_KEY.userSubscription.byId(data.id.toString()),
        data,
      );
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.spendingRecords.all,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.userSubscription.lists,
      });
    },
  });
}

export default useMemberSubscribeActivateMutate;
