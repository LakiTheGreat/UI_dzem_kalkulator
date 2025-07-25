import {
  combineReducers,
  configureStore,
  type Reducer,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { api } from '../api';
import authReducer from './authSlice';

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

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [],
};

const reducer: Reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
