import { Navigate, Outlet, useLocation } from 'react-router';

import { useAppSelector } from '../../hooks/reduxStoreHooks';
import { routesAuth } from '../../constants/routes';

export default function AuthGuard() {
  const location = useLocation();
  const userId = useAppSelector((state) => state.auth.userId);

  if (!userId) {
    return (
      <Navigate to={routesAuth.login} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}
