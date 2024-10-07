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
        // console.log(res, 'from api')
        const data = res?.data?.map(
          ({
            id,
            shop_name,
            email,
            image,
            banner,
            shop_owner_name,
            division,
            district,
            upazila,
            phone_number,
            pharmacistName,
            pharmacistRegNo,
            drugLicenseNo,
            drugLicenseDocument,
            status,
            updatedAt,
            establishMentData,
          }) => ({
            id,
            shop_name,
            email,
            image,
            banner,
            shop_owner_name,
            division,
            district,
            upazila,
            phone_number,
            pharmacistName,
            pharmacistRegNo,
            drugLicenseNo,
            drugLicenseDocument,
            status,
            date: updatedAt?.split("T")[0],
            establishMentData: establishMentData?.split("T")[0],
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
      providesTags: ["Users"],
    }),

    // add User
    addUser: builder.mutation({
      query: (userData) => ({
        url: "register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),


    // update Users
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "update/seller",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
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

export const {
  useGetAllUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminUserApi;
