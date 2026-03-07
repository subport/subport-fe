import { tokenStorage } from '@/lib/token-storage';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function LoginSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access');
  const firstLogin = searchParams.get('firstLogin');
  useEffect(() => {
    if (!accessToken) {
      navigate('/login', { replace: true });
    }

    if (accessToken) {
      tokenStorage.setToken(accessToken);
      navigate('/', { replace: true, state: { showOnboarding: true } });

      if (firstLogin) {
        sessionStorage.setItem(
          'first-login-onboarding-consumed',
          'un-consumed',
        );
      }
    }
  }, []);

  return null;
}
export default LoginSuccessPage;
