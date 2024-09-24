import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import exportReducer from "../features/export/exportSlice";
import deleteModalReducer from "../features/deleteModal/deleteModalSlice";
import advanceFilterReducer from "../features/advanceFilter/advanceFilterSlice"; 
import { adminBaseApi } from "../features/api/admin/adminBaseApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    export: exportReducer, 
    deleteModal: deleteModalReducer,
    advanceFilter: advanceFilterReducer,
    [adminBaseApi.reducerPath]: adminBaseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(adminBaseApi.middleware),
});

setupListeners(store.dispatch);
