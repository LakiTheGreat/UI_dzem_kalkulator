import { createBrowserRouter, Navigate } from 'react-router';

import App from './App';
import { routes } from './constants/routes';
import NewOrderPage from './pages/NewOrderPage';
import CalculatorPage from './pages/CalculatorPage';
import SettingsPage from './pages/SettingsPage';
import NewForm from './pages/NewOrderPage/newForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={`${routes.new_order}`} replace />,
      },
      {
        path: `${routes.new_order}`,
        element: <NewForm />,
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
