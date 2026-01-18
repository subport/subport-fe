import { Navigate, Outlet } from 'react-router-dom';
import { tokenStorage } from '@/lib/token-storage';

export function RequireAuth() {
  const token = tokenStorage.getToken();
  const isLoggedIn = token !== null;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export function RequireGuest() {
  const token = tokenStorage.getToken();
  const isLoggedIn = token !== null;

  if (isLoggedIn) return <Navigate to="/" replace />;

  return <Outlet />;
}
