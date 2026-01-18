import { getSubscriptions } from '@/api/subscribe';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetSubscriptions() {
  return useQuery({
    queryKey: QUERY_KEY.subscriptions.all,
    queryFn: getSubscriptions,
  });
}

export default useGetSubscriptions;
