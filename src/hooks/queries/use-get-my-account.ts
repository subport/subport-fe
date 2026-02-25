import { getMyAccount } from '@/api/profile';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetMyAccount() {
  return useQuery({
    queryKey: QUERY_KEY.my.account,
    queryFn: getMyAccount,
  });
}

export default useGetMyAccount;
