import { getMemberSubscriptions } from '@/api/subscribe';
import { QUERY_KEY } from '@/constants/query-key';
import type { MemberSubscriptionsParams } from '@/types/subscribe';
import { useQuery } from '@tanstack/react-query';

function useGetMemberSubscriptions(params: MemberSubscriptionsParams) {
  return useQuery({
    queryKey: QUERY_KEY.memberSubscriptions.all(params),
    queryFn: () => getMemberSubscriptions(params),
  });
}

export default useGetMemberSubscriptions;
