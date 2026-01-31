import { getSubscriptions } from '@/api/subscribe';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetSubscriptions(searchTerm?: string) {
  return useQuery({
    queryKey: searchTerm
      ? QUERY_KEY.subscriptions.search(searchTerm)
      : QUERY_KEY.subscriptions.all,
    queryFn: () => getSubscriptions(searchTerm ?? ''),
  });
}

export default useGetSubscriptions;
