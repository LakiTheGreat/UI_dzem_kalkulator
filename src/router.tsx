import { createBrowserRouter, Navigate } from 'react-router';

import App from './App';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import {
  routesAuth,
  routesBouquets,
  routesGeneralCalculator,
  routesJam,
  routesSettings,
  routesTomatoes,
} from './constants/routes';
import BouquetPage from './pages/Bouquets/BouquetPage';
import CreateBouquetTransaction from './pages/Bouquets/BouquetPage/form/CreateBouquetTransaction';
import EditBouquetTransaction from './pages/Bouquets/BouquetPage/form/EditBouquetTransaction';
import InventoryPage from './pages/Jams/InventoryPage';
import OrdersPage from './pages/Jams/OrdersPage';
import CreateOrder from './pages/Jams/OrdersPage/form/CreateOrder';
import EditOrder from './pages/Jams/OrdersPage/form/EditOrder';
import TransactionsPage from './pages/Jams/TransactionsPage';
import CreateTransaction from './pages/Jams/TransactionsPage/form/CreateTransaction';
import EditTransaction from './pages/Jams/TransactionsPage/form/EditTransaction';
import CalculatorPage from './pages/Other/CalculatorPage';
import LoginPage from './pages/Other/LoginPage';
import SettingsPage from './pages/Other/SettingsPage';
import TomatoesInventoryPage from './pages/Tommatoes/TomatoesInventoryPage';
import TomatoesTransactionPage from './pages/Tommatoes/TomatoesTransactionPage';

const router = createBrowserRouter([
  {
    path: routesAuth.login,
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
          ///   JAMS   ////////////////////////////////////////////////////////////////////
          {
            index: true,
            element: <Navigate to={routesJam.orders} replace />,
          },
          {
            path: routesJam.inventory,
            element: <InventoryPage />,
          },
          {
            path: routesJam.transactions,
            element: <TransactionsPage />,
          },
          {
            path: `${routesJam.transactions}/new`,
            element: <CreateTransaction />,
          },
          {
            path: `${routesJam.transactions}/:id`,
            element: <EditTransaction />,
          },
          {
            path: routesJam.orders,
            element: <OrdersPage />,
          },
          {
            path: `${routesJam.orders}/new`,
            element: <CreateOrder />,
          },
          {
            path: `${routesJam.orders}/:id`,
            element: <EditOrder />,
          },
          ///   TOMATOES   ////////////////////////////////////////////////////////////////////
          {
            path: routesTomatoes.inventory,
            element: <TomatoesInventoryPage />,
          },
          {
            path: routesTomatoes.transactions,
            element: <TomatoesTransactionPage />,
          },
          ///   BOUQUETS   ////////////////////////////////////////////////////////////////////
          {
            path: routesBouquets.root,
            element: <BouquetPage />,
          },
          {
            path: `${routesBouquets.root}/new`,
            element: <CreateBouquetTransaction />,
          },
          {
            path: `${routesBouquets.root}/:id`,
            element: <EditBouquetTransaction />,
          },
          ///   CALCULATOR   ////////////////////////////////////////////////////////////////////////
          {
            path: routesGeneralCalculator.root,
            element: <CalculatorPage />,
          },
          ///   SETTINGS   ////////////////////////////////////////////////////////////////////
          {
            path: routesSettings.root,
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
