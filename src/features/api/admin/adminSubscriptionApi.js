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
        // console.log("res data from subscription api:", res.data);
        return res.data;
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

    // update Subscription
    updateSubscription: builder.mutation({
      query: (subscription) => ({
        url: "subscription/update",
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
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
