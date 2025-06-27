import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { Analytics } from '@vercel/analytics/react';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router';

import { register as registerServiceWorker } from './serviceWorkerRegistration';
import router from './router';
import AppTheme from './theme/AppTheme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppTheme>
      <CssBaseline />
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <RouterProvider router={router} />
      </SnackbarProvider>
      <Analytics />
    </AppTheme>
  </React.StrictMode>
);

registerServiceWorker();
