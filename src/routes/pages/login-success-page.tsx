import { tokenStorage } from '@/lib/token-storage';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function LoginSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login', { replace: true });
    }

    if (accessToken) {
      tokenStorage.setToken(accessToken);
      navigate('/', { replace: true });
    }
  }, []);

  return null;
}
export default LoginSuccessPage;
