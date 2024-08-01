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
        // return console.log(res?.data, 'res from slice')
        return res.data.map(
          ({
            id,
            product,
            batchNo,
            adjustmentType,
            eventType,
            transactionType,
            adjustedProductQuantity,
            productTotalPrice,
            user,
          }) => ({
            id,
            productName: product.productName,
            batchNo,
            adjustmentType,
            eventType,
            transactionType,
            quantity: adjustedProductQuantity,
            productTotalPrice,
            updater: user.shop_owner_name
          })
        );
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
        method: "DELETE",
      }),
      invalidatesTags: ["Adjustments"],
    }),
  }),
});

export const { useGetAllAdjustmentQuery, useAddAdjustmentMutation, useDeleteAdjustmentMutation } =
  stockAdjustmentApi;
