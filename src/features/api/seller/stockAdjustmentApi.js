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
            updatedAt,
            eventDate,
            expiryDate

          }) => ({
            id,
            product,
            productName: product.productName,
            batchNo,
            adjustmentType,
            eventType,
            transactionType,
            quantity: adjustedProductQuantity,
            mrpPerUnit,
            productTotalPrice,
            date: updatedAt?.split("T")[0],
            eventDate,
            expiryDate
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

    updateAdjustment: builder.mutation({
      query: ({ updatedData }) => ({
        url: "stock/update",
        method: 'PUT',
        body: updatedData,
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
            productName: product.productName,
            mrp: mrpPerUnit.toFixed(2),
            stockQuantity,
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
      providesTags: ["Stock-Item"],
    }),

    // all Expiring Product
    getAllExpiringProduct: builder.query({
      query: ({ page, pageSize, searchKey, sellerId, showExpired }) => ({
        url: "stock/items/expired",
        params: { page, pageSize, searchKey, sellerId, showExpired },
      }),
      transformResponse: (res) => {
        console.log("Expiring Product", res.data);
        const data = res.data.map(
          ({ productId, batchNo, expiryDate, stockQuantity, mrpPerUnit }) => ({
            productId,
            batchNo,
            expiryDate: expiryDate.split("T")[0],
            stockQuantity,
            mrp: mrpPerUnit.toFixed(2),
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
      providesTags: ["Expiring"],
    }),

    // all Expired Product
    getAllExpiredProduct: builder.query({
      query: ({ page, pageSize, searchKey, sellerId, showExpired }) => ({
        url: "stock/items/expired",
        params: { page, pageSize, searchKey, sellerId, showExpired },
      }),
      transformResponse: (res) => {
        console.log("Expired Product", res.data);
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
