import { getMemberSubscriptions } from '@/api/subscribe';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { UserSubscriptionParams } from '@/domains/subscription/user-subscription/types/api';
import { useQuery } from '@tanstack/react-query';

function useGetMemberSubscriptions(params: UserSubscriptionParams) {
  return useQuery({
    queryKey: QUERY_KEY.userSubscription.list(params),
    queryFn: () => getMemberSubscriptions(params),
  });
}

export default useGetMemberSubscriptions;
