import { adminBaseApi } from "../admin/adminBaseApi";

const purchaseProductApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Purchase-product"],
  endpoints: (builder) => ({
    // all purchase product
    // getAllAdjustment: builder.query({
    //   query: ({ page, pageSize, searchKey }) => ({
    //     url: "purchase-product/all",
    //     params: { page, pageSize, searchKey },
    //   }),
    //   transformResponse: (res) => {
    //     console.log(res.data,'purchase-product')
    //     const data =  res.data.map(
    //       ({
    //         id,
    //         product,
    //         batchNo,
    //         adjustmentType,
    //         eventType,
    //         transactionType,
    //         adjustedProductQuantity,
    //         mrpPerUnit,
    //         productTotalPrice,
    //         updatedAt
    //       }) => ({
    //         id,
    //         productName: product.productName,
    //         batchNo,
    //         adjustmentType,
    //         eventType,
    //         transactionType,
    //         quantity: adjustedProductQuantity,
    //         mrpPerUnit,
    //         productTotalPrice,
    //         date: updatedAt?.split("T")[0],
    //       })
    //     );
    //     const metadata = {
    //       totalItems: res.metadata.totalItems,
    //       totalPages: res.metadata.totalPages,
    //       currentPage: res.metadata.currentPage,
    //       pageSize: res.metadata.pageSize,
    //     };

    //     return {
    //       data,
    //       metadata,
    //     };
    //   },
    //   providesTags: ["Purchase-product"],
    // }),

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
    // deleteAdjustment: builder.mutation({
    //   query: (id) => ({
    //     url: `/purchase-product/delete?id=${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["Purchase-product"],
    // }),
  }),
});

export const { useGetAllAdjustmentQuery, useAddPurchaseProductMutation, useDeleteAdjustmentMutation } =
purchaseProductApi;
