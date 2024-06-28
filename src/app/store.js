import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import exportReducer from "../features/export/exportSlice"
import { adminBaseApi } from "../features/api/admin/adminBaseApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    export: exportReducer, 
    [adminBaseApi.reducerPath]: adminBaseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(adminBaseApi.middleware),
});

setupListeners(store.dispatch);
