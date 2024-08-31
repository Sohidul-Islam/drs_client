import { adminBaseApi } from "../admin/adminBaseApi";


const paymentApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    // all Payment
    getAllPayment: builder.query({
      query: ({ page, pageSize, searchKey,type }) => ({
        url: "payment/all",
        params: { page, pageSize, searchKey,type },
      }),
      transformResponse: (res) => {
        // console.log(res.data, 'res from payment api')
        return res.data
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
