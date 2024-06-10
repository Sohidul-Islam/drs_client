import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminBaseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dra-server.onrender.com/api" }),
  endpoints: () => ({}),
});
