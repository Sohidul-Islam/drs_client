import { adminBaseApi } from "../admin/adminBaseApi";

const purchaseProductApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Purchase-product"],
  endpoints: (builder) => ({
    // all purchase product
    getAllPurchaseProduct: builder.query({
      query: ({ page, pageSize, searchKey, status, sellerId }) => ({
        url: "purchase-product/all",
        params: { page, pageSize, searchKey, status, sellerId },
      }),
      transformResponse: (res) => {
        const data = res.data.map(
          ({
            id,
            product,
            batchNo,
            unit,
            manufacturedDate,
            expiryDate,
            quantity,
            tradePrice,
            VAT,
            totalTradePrice,
            MRP,
          }) => ({
            id,
            genericName: product.genericName,
            batchNo,
            unit,
            manufacturedDate: manufacturedDate?.split("T")[0],
            expiryDate: expiryDate?.split("T")[0],
            quantity,
            tradePrice,
            VAT,
            totalTradePrice,
            MRP,
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
      providesTags: ["Purchase-product"],
    }),

    // add purchase-product
    addPurchaseProduct: builder.mutation({
      query: (purchaseProduct) => ({
        url: "/purchase-product/create",
        method: "POST",
        body: purchaseProduct,
      }),
      invalidatesTags: ["Purchase-product"],
    }),

    // delete purchase-product
    deletePurchaseProduct: builder.mutation({
      query: (id) => ({
        url: `/purchase-product/delete?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Purchase-product"],
    }),
  }),
});

export const {
  useGetAllPurchaseProductQuery,
  useAddPurchaseProductMutation,
  useDeletePurchaseProductMutation,
} = purchaseProductApi;
