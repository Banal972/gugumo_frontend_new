import fcmtoken from '@/lib/store/features/fcmtoken';
import modal from '@/lib/store/features/modals/modal';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal,
      fcmtoken,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
