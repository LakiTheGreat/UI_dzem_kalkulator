import '@fontsource/montserrat'; // Defaults to weight 400
import CssBaseline from '@mui/material/CssBaseline';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { Bounce, ToastContainer } from 'react-toastify';

import { TOASTIFY_AUTO_CLOSE_TIME } from './constants';
import router from './router';
import { store } from './store/store';
import AppTheme from './theme/AppTheme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppTheme>
      <CssBaseline />
      <Provider store={store}>
        <ToastContainer
          position='bottom-left'
          autoClose={TOASTIFY_AUTO_CLOSE_TIME}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme='light'
          style={{
            width: 'fit-content',
            marginBottom: 20,
          }}
          transition={Bounce}
        />
        <RouterProvider router={router} />
      </Provider>
      <Analytics />
    </AppTheme>
  </React.StrictMode>
);
