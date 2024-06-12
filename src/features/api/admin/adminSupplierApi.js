import { adminBaseApi } from "./adminBaseApi";

const adminSupplierApi = adminBaseApi.injectEndpoints({
  tagTypes: ['Supplier'],
  endpoints: (builder) => ({
    addSupplier: builder.mutation({
      query: (supplierData) => ({
        url: '/suppliers/create',
        method: "POST",
        body: supplierData
      }),
      invalidatesTags: ["Supplier"]
    })
  })
})

export const { useAddSupplierMutation} = adminSupplierApi;