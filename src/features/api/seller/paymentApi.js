import { adminBaseApi } from "../admin/adminBaseApi";

const paymentApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    // all Payment
    getAllPayment: builder.query({
      query: ({ page, pageSize, searchKey, type, startDate, endDate }) => ({
        url: "payment/all",
        params: { page, pageSize, searchKey, type, startDate,endDate },
      }),
      transformResponse: (res) => {
        console.log("Payment data from api: ", res.data);
        const data = res?.data?.map(
          ({ id, payment, updatedAt, purchase_product, sales_order }) => ({
            id,
            paymentId: payment?.id,
            due: payment?.due?.toFixed(2),
            paidAmount: payment?.paidAmount?.toFixed(2),
            paymentMethod: payment?.paymentMethod,
            total: payment?.total?.toFixed(2),
            date: updatedAt?.split("T")[0],
            invoiceNumber: purchase_product?.invoiceNumber,
            invoiceDate: purchase_product?.invoiceDate?.split("T")[0],
            manufacturer: purchase_product?.manufacturer?.name,

            // sales product
            customerName: sales_order?.customer?.name,
            phoneNumber: sales_order?.customer?.phoneNumber,
            orderDate: sales_order?.createdAt?.split("T")[0],
          })
        );
        const metadata = {
          totalItems: res?.metadata?.totalItems,
          totalPages: res?.metadata?.totalPages,
          currentPage: res?.metadata?.currentPage,
          pageSize: res?.metadata?.pageSize,
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
      query: (paymentId) => ({
        url: "payment/delete",
        method: "POST",
        body: { paymentId },
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
