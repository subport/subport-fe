import { getSubscribeTypes } from '@/api/subscribe';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetSubscribeTypes() {
  return useQuery({
    queryKey: QUERY_KEY.subscriptions.types,
    queryFn: getSubscribeTypes,
  });
}
export default useGetSubscribeTypes;
