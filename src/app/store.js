// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// store.js

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "../features/auth/authSlice";
import { adminBaseApi } from "../features/api/admin/adminBaseApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [adminBaseApi.reducerPath]: adminBaseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(adminBaseApi.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
