import { adminBaseApi } from "./adminBaseApi";

const adminUserApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // all users
    getAllUsers: builder.query({
      query: ({ page, pageSize, searchKey, division, district, upazila }) => ({
        url: "user/all",
        params: { page, pageSize, searchKey, division, district, upazila },
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
          totalItems: res?.metadata?.totalItems || 0,
          totalPages: res?.metadata?.totalPages || 0,
          currentPage: res?.metadata?.currentPage || 0,
          pageSize: res?.metadata?.pageSize || 0,
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
