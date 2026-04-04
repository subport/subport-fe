import { getSubscriptionsById } from '@/api/subscribe';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetSubscriptionsById(id: string) {
  return useQuery({
    queryKey: QUERY_KEY.services.byId(id),
    queryFn: () => getSubscriptionsById(id),
  });
}

export default useGetSubscriptionsById;
