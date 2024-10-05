import { adminBaseApi } from "../admin/adminBaseApi";

const subscriptionApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Subscription", "User-Subscription"],
  endpoints: (builder) => ({
    // all subscription plan
    getAllSubscription: builder.query({
      query: () => ({
        url: "subscription/all",
      }),
      transformResponse: (res) => {
        return res.data;
      },
      providesTags: ["Subscription"],
    }),

    // add Subscription plan
    addSubscription: builder.mutation({
      query: (subscription) => ({
        url: "subscription/create",
        method: "POST",
        body: subscription,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // update Subscription plan
    updateSubscription: builder.mutation({
      query: (subscription) => ({
        url: "subscription/update",
        method: "POST",
        body: subscription,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // delete Subscription plan
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `subscription/delete?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Subscription"],
    }),

    // ______USER SUBSCRIPTION______

    // All USER Subscription
    getAllUserSubscription: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "subscription/user/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        const data = res.data.map(
          ({
            id,
            user,
            prevPlan,
            subscription_plan,
            price,
            subscribed_date,
          }) => ({
            id,
            storeName: user?.shop_name,
            ownerName: user?.shop_owner_name,
            mobileNumber: user?.phone_number,
            prevPlan,
            currentPackage: subscription_plan?.package,
            price,
            updateOn: subscribed_date?.split("T")[0],
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
      providesTags: ["User-Subscription"],
    }),

    // add USER Subscription
    addUserSubscription: builder.mutation({
      query: (userSubscription) => ({
        url: "subscription/user",
        method: "POST",
        body: userSubscription,
      }),
      invalidatesTags: ["User-Subscription"],
    }),

    // delete USER Subscription
    deleteUserSubscription: builder.mutation({
      query: (userSubscription) => ({
        url: "subscription/user/delete",
        method: "POST",
        body: userSubscription,
      }),
      invalidatesTags: ["User-Subscription"],
    }),
  }),
});

export const {
  useGetAllSubscriptionQuery,
  useAddSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useGetAllUserSubscriptionQuery,
  useAddUserSubscriptionMutation,
  useDeleteUserSubscriptionMutation,
} = subscriptionApi;
