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
        // console.log('sales api data:',res)
        const data = res.data.map(
          ({
            id,
            product,
            customer,
            BMDCRegistrationNo,
            date,
            doctorName,
            discount,
            quantity,
          }) => ({
            id,
            name: product?.productName,
            genericName: product?.genericName,
            BMDCRegistrationNo,
            date: date?.split('T')[0],
            doctorName,
            discount,
            quantity,
            product,
            customer
          })
        );
        const metadata = {
          totalItems: res?.metadata?.totalItems || 0,
          totalPages: res?.metadata?.totalPages || 0,
          currentPage: res?.metadata?.currentPage || 0,
          pageSize: res?.metadata?.pageSize || 0,
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
