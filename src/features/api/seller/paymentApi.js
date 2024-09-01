import { adminBaseApi } from "../admin/adminBaseApi";

const paymentApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    // all Payment
    getAllPayment: builder.query({
      query: ({ page, pageSize, searchKey, type }) => ({
        url: "payment/all",
        params: { page, pageSize, searchKey, type },
      }),
      transformResponse: (res) => {
        console.log(res.data);
        const data = res?.data?.map(
          ({ id, payment, updatedAt, purchase_product }) => ({
            id,
            due: payment?.due,
            paidAmount: payment?.paidAmount,
            paymentMethod: payment?.paymentMethod,
            total: payment?.total,
            date: updatedAt?.split("T")[0],
            invoiceNumber: purchase_product?.invoiceNumber,
            invoiceDate: purchase_product?.invoiceDate?.split("T")[0],
            manufacturer: "Missing",
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
      providesTags: ["Payment"],
    }),

    // add Payment
    addPayment: builder.mutation({
      query: (paymentData) => ({
        url: "payment/create",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),

    // delete Payment
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `payment/delete?id=${id}`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useGetAllPaymentQuery,
  useAddPaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
