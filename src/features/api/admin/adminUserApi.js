import { adminBaseApi } from "./adminBaseApi";

const adminUserApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // all users
    getAllUsers: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "user/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        const metadata = {
          totalItems: res.metadata.totalItems,
          totalPages: res.metadata.totalPages,
          currentPage: res.metadata.currentPage,
          pageSize: res.metadata.pageSize,
        };
        return {
          data: res?.data,
          metadata,
        };
      },
      providesTags: ["Users"],
    }),

     // delete user
     deleteUser: builder.mutation({
      query: (id) => ({
        url: "user/delete",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation, } = adminUserApi;
