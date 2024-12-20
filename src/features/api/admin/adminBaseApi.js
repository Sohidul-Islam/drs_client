import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const adminBaseApi = createApi({
  baseQuery,
  tagTypes: [
    "Manufactures",
    "Purchase-product",
    "Customers",
    "Products",
    "ProductCategories",
    "Subscription",
    "User-Subscription",
    "Supplier",
    "Payment",
    "Sale-product",
    "Adjustments",
    "Stock-Item",
    "Expiring",
    "Expired",
    "DosageForm",
  ],
  endpoints: () => ({}),
});

// export const adminBaseApi = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: "https://dra-server.onrender.com/api" }),
//   tagTypes: ["Manufactures"],
//   endpoints: () => ({}),
// });
