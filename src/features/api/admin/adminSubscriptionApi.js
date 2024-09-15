import { adminBaseApi } from "../admin/adminBaseApi";

const subscriptionApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({
    // all subscription
    getAllSubscription: builder.query({
      query: () => ({
        url: "subscription/all",
      }),
      transformResponse: (res) => {
        // console.log('res data from sale api:',res)
        const data = res.data.map(
          ({
            id,
            product,
            BMDCRegistrationNo,
            doctorName,
            discount,
            quantity,
          }) => ({
            id,
            name: product.productName,
            genericName: product.genericName,
            regNo: BMDCRegistrationNo,
            doctorName,
            discount,
            quantity,
            product
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
      providesTags: ["Subscription"],
    }),

    // add Subscription
    addSubscription: builder.mutation({
      query: (subscription) => ({
        url: "subscription/create",
        method: "POST",
        body: subscription,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // delete Subscription
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `subscription/delete?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetAllSubscriptionQuery,
  useAddSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
