import { adminBaseApi } from "../admin/adminBaseApi";

const saleProductApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Sale-product"],
  endpoints: (builder) => ({
    // all Sale product
    getAllSaleProduct: builder.query({
      query: ({ page, pageSize, searchKey, status, sellerId }) => ({
        url: "sales-order/all",
        params: { page, pageSize, searchKey, status, sellerId },
      }),
      transformResponse: (res) => {
        // console.log('res data from sale api:',res)
        const data = res.data.map(
          ({
            id,
            product,
            BMDCRegistrationNo,
            date,
            doctorName,
            discount,
            quantity,
          }) => ({
            id,
            name: product.productName,
            genericName: product.genericName,
            BMDCRegistrationNo,
            date: date.split('T')[0],
            doctorName,
            discount,
            quantity,
            product
          })
        );
        const metadata = {
          totalItems: res.metadata.totalItems,
          totalPages: res.metadata.totalPages,
          currentPage: res.metadata.currentPage,
          pageSize: res.metadata.pageSize,
        };
        return {
          data,
          metadata,
        };
      },
      providesTags: ["Sale-product"],
    }),

    // add Sale-product
    addSaleProduct: builder.mutation({
      query: (saleProduct) => ({
        url: "sales-order/create",
        method: "POST",
        body: saleProduct,
      }),
      invalidatesTags: ["Sale-product"],
    }),

    // update Sale-product
    updateSaleProduct: builder.mutation({
      query: (saleProduct) => ({
        url: "sales-order/update",
        method: "POST",
        body: saleProduct,
      }),
      invalidatesTags: ["Sale-product"],
    }),

    // delete Sale-product
    deleteSaleProduct: builder.mutation({
      query: (id) => ({
        url: `sales-order/delete?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Sale-product"],
    }),
  }),
});

export const {
  useGetAllSaleProductQuery,
  useAddSaleProductMutation,
  useUpdateSaleProductMutation,
  useDeleteSaleProductMutation,
} = saleProductApi;
