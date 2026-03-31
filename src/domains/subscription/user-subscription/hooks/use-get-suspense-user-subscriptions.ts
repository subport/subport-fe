import { getMemberSubscriptions } from '@/api/subscribe';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { UserSubscriptionParams } from '../types/api';

function useGetSuspenseUserSubscription(params: UserSubscriptionParams) {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.userSubscription.list(params),
    queryFn: () => getMemberSubscriptions(params),
  });
}

export default useGetSuspenseUserSubscription;
