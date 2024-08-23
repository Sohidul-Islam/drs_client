import { adminBaseApi } from "../admin/adminBaseApi";

const stockAdjustmentApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Adjustments"],
  endpoints: (builder) => ({
    // all adjustment
    getAllAdjustment: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "stock/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        const data =  res.data.map(
          ({
            id,
            product,
            batchNo,
            adjustmentType,
            eventType,
            transactionType,
            adjustedProductQuantity,
            productTotalPrice,
            updatedAt
          }) => ({
            id,
            productName: product.productName,
            batchNo,
            adjustmentType,
            eventType,
            transactionType,
            quantity: adjustedProductQuantity,
            productTotalPrice,
            date: updatedAt?.split("T")[0],
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
      providesTags: ["Adjustments"],
    }),

    // add stock adjustment
    addAdjustment: builder.mutation({
      query: (adjustments) => ({
        url: "/stock/create",
        method: "POST",
        body: adjustments,
      }),
      invalidatesTags: ["Adjustments"],
    }),

    // delete stock adjustment
    deleteAdjustment: builder.mutation({
      query: (id) => ({
        url: `/stock/delete?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Adjustments"],
    }),
  }),
});

export const { useGetAllAdjustmentQuery, useAddAdjustmentMutation, useDeleteAdjustmentMutation } =
  stockAdjustmentApi;
