import { createBrowserRouter, Navigate } from 'react-router';

import App from './App';
import { routes } from './constants/routes';

import CalculatorPage from './pages/CalculatorPage';
import SettingsPage from './pages/SettingsPage';
import OrdersPage from './pages/OrdersPage';
import OrderForm from './pages/OrdersPage/form';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={`${routes.orders}`} replace />,
      },
      {
        path: `${routes.orders}`,
        element: <OrdersPage />,
      },
      {
        path: `${routes.orders}/${routes.new}`,
        element: <OrderForm />,
      },
      {
        path: `${routes.general_calculator}`,
        element: <CalculatorPage />,
      },
      {
        path: `${routes.settings}`,
        element: <SettingsPage />,
      },
    ],
  },
]);

export default router;
