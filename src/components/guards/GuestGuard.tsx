import { Navigate, Outlet, useLocation } from 'react-router';

import { useAppSelector } from '../../hooks/reduxStoreHooks';
import { routesJam } from '../../constants/routes';

export default function GuestGuard() {
  const location = useLocation();
  const userId = useAppSelector((state) => state.auth.userId);

  if (userId) {
    return (
      <Navigate
        to={`/${routesJam.orders}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}
