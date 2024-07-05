import { adminBaseApi } from "./adminBaseApi";

const adminCustomerApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Customers"],
  endpoints: (builder) => ({
    // get all customers

    
    // add cunstomer
    addCustomer: builder.mutation({
      query: (customerData) => ({
        url: "/customer/create",
        method: "POST",
        body: customerData
      }),
      invalidatesTags: ["Customers"]
    }),
  }),
});

export const { useAddCustomerMutation} = adminCustomerApi;
