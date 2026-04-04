import { getSubscriptions } from '@/api/subscribe';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetSubscriptions(searchTerm?: string) {
  return useQuery({
    queryKey: searchTerm
      ? QUERY_KEY.services.search(searchTerm)
      : QUERY_KEY.services.lists,
    queryFn: () => getSubscriptions(searchTerm ?? ''),
  });
}

export default useGetSubscriptions;
