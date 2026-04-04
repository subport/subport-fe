import { getSubscribeTypes } from '@/api/subscribe';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetServiceTypes() {
  return useQuery({
    queryKey: QUERY_KEY.services.types,
    queryFn: getSubscribeTypes,
  });
}
export default useGetServiceTypes;
