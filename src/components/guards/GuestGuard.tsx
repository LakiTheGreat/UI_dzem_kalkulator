import { Navigate, Outlet, useLocation } from 'react-router';

import { useAppSelector } from '../../hooks/reduxStoreHooks';
import { routes } from '../../constants/routes';

export default function GuestGuard() {
  const location = useLocation();
  const userId = useAppSelector((state) => state.auth.userId);

  if (userId) {
    return (
      <Navigate to={`/${routes.orders}`} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}
