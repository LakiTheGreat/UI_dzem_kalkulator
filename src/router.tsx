import { createBrowserRouter, Navigate } from 'react-router';

import App from './App';
import { routes } from './constants/routes';

import AuthGuard from './components/guards/AuthGuard';
import CalculatorPage from './pages/CalculatorPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import CreateOrder from './pages/OrdersPage/form/CreateOrder';
import EditOrder from './pages/OrdersPage/form/EditOrder';
import SettingsPage from './pages/SettingsPage';
import GuestGuard from './components/guards/GuestGuard';

const router = createBrowserRouter([
  {
    path: routes.login,
    element: <GuestGuard />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },

  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <Navigate to={routes.orders} replace />,
          },
          {
            path: routes.orders,
            element: <OrdersPage />,
          },
          {
            path: `${routes.orders}/${routes.new}`,
            element: <CreateOrder />,
          },
          {
            path: `${routes.orders}/:id`,
            element: <EditOrder />,
          },
          {
            path: routes.general_calculator,
            element: <CalculatorPage />,
          },
          {
            path: routes.settings,
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
