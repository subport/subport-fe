import { updateMemberSubscribePlan } from '@/api/member-subscribe';
import { QUERY_KEY } from '@/constants/query-key';
import type { MemberSubscribeItem } from '@/types/member-subscribe';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useUpdateMemberSubscribePlanMutate(
  callbacks?: useMutationCallbacks<MemberSubscribeItem>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMemberSubscribePlan,
    onSuccess: (data) => {
      queryClient.setQueryData(
        QUERY_KEY.memberSubscriptions.byId(data.id.toString()),
        data,
      );

      queryClient.invalidateQueries({
        queryKey: ['member-subscriptions'],
        predicate: (q) => {
          const second = q.queryKey[1];
          return (
            typeof second === 'object' && second !== null && 'active' in second
          );
        },
      });
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useUpdateMemberSubscribePlanMutate;
