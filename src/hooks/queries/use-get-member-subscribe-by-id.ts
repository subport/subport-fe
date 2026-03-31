import { getMemberSubscribeById } from '@/api/member-subscribe';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetMemberSubscribeById(subscribeId: string) {
  return useQuery({
    queryKey: QUERY_KEY.userSubscription.byId(subscribeId),
    queryFn: () => getMemberSubscribeById(subscribeId),
  });
}

export default useGetMemberSubscribeById;
