import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { Analytics } from '@vercel/analytics/react';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';

import router from './router';
import AppTheme from './theme/AppTheme';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppTheme>
      <CssBaseline />
      <Provider store={store}>
        <SnackbarProvider
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </Provider>
      <Analytics />
    </AppTheme>
  </React.StrictMode>
);
