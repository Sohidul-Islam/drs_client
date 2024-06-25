import { adminBaseApi } from "./adminBaseApi";

const adminSupplierApi = adminBaseApi.injectEndpoints({
  tagTypes: ['Supplier'],
  endpoints: (builder) => ({
    // get all supplier 
    getAllSupplier: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "suppliers/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        const data = res.data.map(
          ({ id, name, status, updatedAt, Seller, Updater }) => ({
            id,
            supplier_name: name,
            status,
            date: updatedAt,
            store_name: Seller.shop_name,
            updater: Updater.shop_owner_name,
          })
        );
        const metadata = {
          totalItems: res.metadata.totalItems,
          totalPages: res.metadata.totalPages,
          currentPage: res.metadata.currentPage,
          pageSize: res.metadata.pageSize,
        };
        return {
          data: data,
          metadata,
        };
      },
      providesTags: ["Supplier"],
    }),

    // add supplier 
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

export const { useGetAllSupplierQuery, useAddSupplierMutation} = adminSupplierApi;