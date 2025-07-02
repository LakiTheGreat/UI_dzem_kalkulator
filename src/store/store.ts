/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  combineReducers,
  configureStore,
  type Reducer,
} from '@reduxjs/toolkit';

import { realApi } from '../api/realApi';

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

// const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootReducer = combineReducers({
  [realApi.reducerPath]: realApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  // storage,
  // whitelist: ['auth', 'canvas', 'overlays', 'configuration'],
};

// const reducer: Reducer = shouldPersist ? persistReducer(persistConfig, rootReducer) : rootReducer;
const reducer: Reducer = rootReducer;

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: shouldPersist
    //     ? {
    //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //       }
    //     : false,
    // })
    getDefaultMiddleware().concat(realApi.middleware),
});

// export const persistor = shouldPersist ? persistStore(store) : null;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
