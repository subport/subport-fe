import { updateMemberSubscribePlan } from '@/api/member-subscribe';
import { QUERY_KEY } from '@/shared/constants/query-key';
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
        QUERY_KEY.userSubscription.byId(data.id.toString()),
        data,
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.userSubscription.lists,
      });
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useUpdateMemberSubscribePlanMutate;
