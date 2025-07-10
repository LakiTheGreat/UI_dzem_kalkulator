import { createBrowserRouter, Navigate } from 'react-router';

import App from './App';
import { routes } from './constants/routes';
import DzemCalculator from './pages/dzem_calculator';
import GeneralCalculator from './pages/general_calculator';
import Settings from './pages/settings';

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
        element: <DzemCalculator />,
      },
      {
        path: `${routes.general_calculator}`,
        element: <GeneralCalculator />,
      },
      {
        path: `${routes.settings}`,
        element: <Settings />,
      },
    ],
  },
]);

export default router;
