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
        // console.log("Purchase Product Api --> ", res.data);
        const data = res.data.map(
          ({
            id,
            product,
            supplier,
            batchNo,
            unit,
            manufacturer,
            manufacturedDate,
            invoiceDate,
            invoiceNumber,
            expiryDate,
            quantity,
            tradePrice,
            VAT,
            totalTradePrice,
            MRP,
          }) => ({
            id,
            product,
            supplier,
            genericName: product?.genericName,
            batchNo,
            unit,
            manufacturer,
            manufacturedDate: manufacturedDate?.split("T")[0],
            invoiceDate: invoiceDate?.split("T")[0],
            expiryDate: expiryDate?.split("T")[0],
            invoiceNumber,
            quantity,
            tradePrice,
            VAT,
            totalTradePrice,
            MRP,
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
      providesTags: ["Purchase-product"],
    }),

    // add purchase-product
    addPurchaseProduct: builder.mutation({
      query: (purchaseProduct) => ({
        url: "purchase-product/create",
        method: "POST",
        body: purchaseProduct,
      }),
      invalidatesTags: ["Purchase-product"],
    }),

    // update purchase-product
    updatePurchaseProduct: builder.mutation({
      query: (purchaseProduct) => ({
        url: "purchase-product/update",
        method: "POST",
        body: purchaseProduct,
      }),
      invalidatesTags: ["Purchase-product"],
    }),

    // delete purchase-product
    deletePurchaseProduct: builder.mutation({
      query: (id) => ({
        url: `purchase-product/delete?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Purchase-product"],
    }),
  }),
});

export const {
  useGetAllPurchaseProductQuery,
  useAddPurchaseProductMutation,
  useUpdatePurchaseProductMutation,
  useDeletePurchaseProductMutation,
} = purchaseProductApi;
