import { adminBaseApi } from "./adminBaseApi";

const adminCustomerApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Customers"],
  endpoints: (builder) => ({
    // get all customers
    getAllCustomer: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "customer/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        return res.data.map(
          ({ id, name, store, phoneNumber, updatedAt, status }) => ({
            id,
            customer_name: name,
            store_name: store.shop_name,
            mobile_number: phoneNumber,
            updater: store.shop_owner_name,
            date: updatedAt,
            status,
          })
        );
      },
      providesTags: ["Manufactures"],
    }),

    // get single customer
    getSingleCustomer: builder.query({
      query: ({ customerId }) => ({
        url: "customer/single",
        params: { id: customerId },
      }),
      transformResponse: (res) => res.data,
      providesTags: ["Manufactures"],
    }),

    // add cunstomer
    addCustomer: builder.mutation({
      query: (customerData) => ({
        url: "/customer/create",
        method: "POST",
        body: customerData,
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetAllCustomerQuery,
  useGetSingleCustomerQuery,
  useAddCustomerMutation,
} = adminCustomerApi;
