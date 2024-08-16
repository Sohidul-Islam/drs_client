import { adminBaseApi } from "./adminBaseApi";

const adminSupplierApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Supplier"],
  endpoints: (builder) => ({
    // get all supplier
    getAllSupplier: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "suppliers/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        const data = res.data.map(
          ({ id, name, Seller, contactPerson, phone, updatedAt}) => ({
            id,
            supplier_name: name,   
            Seller,
            contactPerson,
            phone,
            date: updatedAt.split("T")[0],
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
        url: "/suppliers/create",
        method: "POST",
        body: supplierData,
      }),
      invalidatesTags: ["Supplier"],
    }),

     // delete a supplier
     deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `suppliers/delete?id=${id}`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Supplier"],
    }),
  }),
});

export const { useGetAllSupplierQuery, useAddSupplierMutation, useDeleteSupplierMutation } =
  adminSupplierApi;
