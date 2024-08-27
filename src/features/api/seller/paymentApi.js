import { adminBaseApi } from "../admin/adminBaseApi";


const paymentApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    // all Payment
    // getAllProduct: builder.query({
    //   query: ({ page, pageSize, searchKey }) => ({
    //     url: "product/all",
    //     params: { page, pageSize, searchKey },
    //   }),
    //   transformResponse: (res) => {
    //     const data = res.data.map(
    //       ({
    //         id,
    //         productName,
    //         genericName,
    //         menufacturer,
    //         strength,
    //         dosageForm,
    //         packBoxSize,
    //         updatedAt,
    //       }) => ({
    //         id,
    //         productName,
    //         genericName,
    //         manufacturer: menufacturer.name,
    //         strength,
    //         dosageForm,
    //         packBoxSize,
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
    //   providesTags: ["Payment"],
    // }),

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
    // deletePayment: builder.mutation({
    //   query: (id) => ({
    //     url: `payment/delete?id=${id}`,
    //     method: "POST",
    //     body: { id },
    //   }),
    //   invalidatesTags: ["Payment"],
    // }),
  }),
});

export const {
  useGetAllPaymentQuery,
  useAddPaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
