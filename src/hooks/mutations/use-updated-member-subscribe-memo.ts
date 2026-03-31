import { updateMemberSubscribeMemo } from '@/api/member-subscribe';
import { queryClient } from '@/components/providers/query-provider';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { MemberSubscribeItem } from '@/types/member-subscribe';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation } from '@tanstack/react-query';

function useUpdatedMemberSubscribeMemo(
  callbacks?: useMutationCallbacks<MemberSubscribeItem>,
) {
  return useMutation({
    mutationFn: updateMemberSubscribeMemo,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);

      queryClient.setQueryData(
        QUERY_KEY.memberSubscriptions.byId(data.id.toString()),
        data,
      );
    },
  });
}

export default useUpdatedMemberSubscribeMemo;
