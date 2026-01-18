import { getSubscriptionsById } from '@/api/subscribe';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetSubscriptionsById(id: string) {
  return useQuery({
    queryKey: QUERY_KEY.subscriptions.byId(id),
    queryFn: () => getSubscriptionsById(id),
  });
}

export default useGetSubscriptionsById;
