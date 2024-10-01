import { adminBaseApi } from "./adminBaseApi";

const adminManageStoreApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Manage-Store"],
  endpoints: (builder) => ({
    // all manage store
    getAllManageStore: builder.query({
      query: () => ({
        url: "user/all",
      }),
      transformResponse: (res) => {
        return res.data;
      },
      providesTags: ["Manage-Store"],
    }),

    // add manage store
    addManageStore: builder.mutation({
      query: (manageStore) => ({
        url: "user/create",
        method: "POST",
        body: manageStore,
      }),
      invalidatesTags: ["Manage-Store"],
    }),

    // update manage store
    updateManageStore: builder.mutation({
      query: (manageStore) => ({
        url: "user/update",
        method: "POST",
        body: manageStore,
      }),
      invalidatesTags: ["Manage-Store"],
    }),

    // delete manage store
    deleteManageStore: builder.mutation({
      query: (id) => ({
        url: `user/delete?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Manage-Store"],
    }),
  }),
});

export const {
  useGetAllManageStoreQuery,
  useAddManageStoreMutation,
  useUpdateManageStoreMutation,
  useDeleteManageStoreMutation,
} = adminManageStoreApi;