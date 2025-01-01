import { adminBaseApi } from "../admin/adminBaseApi";

const paymentApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    // all Payment
    getAllPayment: builder.query({
      query: ({ page, pageSize, searchKey, type, startDate, endDate }) => ({
        url: "payment/all/final",
        params: { page, pageSize, searchKey, type, startDate, endDate },
      }),
      transformResponse: (res) => {
        // console.log("Payment api data: ", res.data);
        const data = res?.data?.map(
          ({
            id,
            paymentMethod,
            total,
            paidAmount,
            due,
            invoices,
            payment,
            updatedAt,
          }) => ({
            id,
            paymentMethod,
            total,
            paidAmount,
            due,
            paymentId: payment?.id,
            date: updatedAt?.split("T")[0],
            invoiceNumber: invoices[0]?.purchase_product?.invoiceNumber,
            invoiceDate:
              invoices[0]?.purchase_product?.invoiceDate?.split("T")[0],
            manufacturer: invoices[0]?.purchase_product?.manufacturer?.name,

            // sales product
            customerName: invoices[0]?.sales_order?.customer?.name,
            phoneNumber: invoices[0]?.sales_order?.customer?.phoneNumber,
            updateOn: invoices[0]?.sales_order?.createdAt?.split("T")[0],
            orderDate: invoices[0]?.sales_order?.date?.split("T")[0],
            invoices
          })
        );
        const metadata = {
          totalItems: res?.metadata?.totalItems || 0,
          totalPages: res?.metadata?.totalPages || 0,
          currentPage: res?.metadata?.currentPage || 0,
          pageSize: res?.metadata?.pageSize || 0,
        };

        return {
          data: data,
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
