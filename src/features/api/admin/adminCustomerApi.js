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
        // console.log(res, 'customer')
        const data = res.data.map(
          ({ id, name, address, phoneNumber, updatedAt }) => ({
            id,
            name,
            address,
            phoneNumber,
            date: updatedAt?.split("T")[0],
          })
        );
        const metadata = {
          totalItems: res?.metadata?.totalItems || 0,
          totalPages: res?.metadata?.totalPages || 0,
          currentPage: res?.metadata?.currentPage || 0,
          pageSize: res?.metadata?.pageSize || 0,
        };
        return {
          data: data,
          metadata,
        };
      },
      providesTags: ["Customers"],
    }),

    // get single customer
    getSingleCustomer: builder.query({
      query: ({ customerId }) => ({
        url: "customer/single",
        params: { id: customerId },
      }),
      transformResponse: (res) => res.data,
      providesTags: ["Customers"],
    }),

    // add customer
    addCustomer: builder.mutation({
      query: (customerData) => ({
        url: "customer/create",
        method: "POST",
        body: customerData,
      }),
      invalidatesTags: ["Customers"],
    }),

    // update customer
    updateCustomer: builder.mutation({
      query: (customerData) => ({
        url: "customer/update",
        method: "POST",
        body: customerData,
      }),
      invalidatesTags: ["Customers"],
    }),

    // delete a customer
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `customer/delete?id=${id}`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Customers"],
    }),

  }),
});

export const {
  useGetAllCustomerQuery,
  useGetSingleCustomerQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation
} = adminCustomerApi;
