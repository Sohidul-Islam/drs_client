import { adminBaseApi } from "../admin/adminBaseApi";

const stockAdjustmentApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Adjustments", "Stock-Item", "Expiring", "Expired"],
  endpoints: (builder) => ({
    // all adjustment
    getAllAdjustment: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "stock/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        const data = res.data.map(
          ({
            id,
            product,
            batchNo,
            adjustmentType,
            eventType,
            transactionType,
            adjustedProductQuantity,
            mrpPerUnit,
            productTotalPrice,
            productUnitPrice,
            updatedAt,
            eventDate,
            expiryDate,
          }) => ({
            id,
            product,
            productName: product?.productName,
            batchNo,
            adjustmentType,
            eventType,
            transactionType,
            quantity: adjustedProductQuantity,
            productUnitPrice,
            productTotalPrice,
            mrpPerUnit,
            date: updatedAt?.split("T")[0],
            eventDate:eventDate?.split("T")[0],
            expiryDate:expiryDate?.split("T")[0],
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

    // update stock adjustment
    updateAdjustment: builder.mutation({
      query: (updatedData) => ({
        url: `stock/update?id=${updatedData?.id}`,
        method: "POST",
        body: updatedData
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

    // all Stock Item
    getAllStockItem: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "stock/items",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        // console.log(res.data,'stock items')
        const data = res.data.map(
          ({ productId, product, mrpPerUnit, stockQuantity }) => ({
            productId,
            productName: product?.productName,
            mrp: mrpPerUnit?.toFixed(2),
            stockQuantity,
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
      providesTags: ["Stock-Item"],
    }),

    // all Expiring Product
    getAllExpiringProduct: builder.query({
      query: ({ page, pageSize, searchKey, sellerId, showExpired }) => ({
        url: "stock/items/expired",
        params: { page, pageSize, searchKey, sellerId, showExpired },
      }),
      transformResponse: (res) => {
        const data = res.data.map(
          ({ productId, batchNo, expiryDate, stockQuantity, mrpPerUnit }) => ({
            productId,
            batchNo,
            expiryDate: expiryDate?.split("T")[0],
            stockQuantity,
            mrp: mrpPerUnit?.toFixed(2),
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
      providesTags: ["Expiring"],
    }),

    // all Expired Product
    getAllExpiredProduct: builder.query({
      query: ({ page, pageSize, searchKey, sellerId, showExpired }) => ({
        url: "stock/items/expired",
        params: { page, pageSize, searchKey, sellerId, showExpired },
      }),
      transformResponse: (res) => {
        const data = res.data.map(
          ({ productId, batchNo, expiryDate, stockQuantity, mrpPerUnit }) => ({
            productId,
            batchNo,
            expiryDate: expiryDate?.split("T")[0],
            stockQuantity,
            mrp: mrpPerUnit?.toFixed(2),
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
      providesTags: ["Expired"],
    }),
  }),
});

export const {
  useGetAllAdjustmentQuery,
  useAddAdjustmentMutation,
  useUpdateAdjustmentMutation,
  useDeleteAdjustmentMutation,
  useGetAllStockItemQuery,
  useGetAllExpiringProductQuery,
  useGetAllExpiredProductQuery,
} = stockAdjustmentApi;
