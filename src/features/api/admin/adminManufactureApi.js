import { adminBaseApi } from "./adminBaseApi";

const adminManufactureApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Manufactures"],
  endpoints: (builder) => ({
    // get all manufacturer
    getAllManufacture: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "manufacturer/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        return res.data.map(
          ({ id, name, status, updatedAt, Seller, Updater }) => ({
            id,
            manufacturer_name: name,
            status,
            date: updatedAt,
            store_name: Seller.shop_name,
            updater: Updater.shop_owner_name,
          })
        );
      },
      providesTags: ["Manufactures"],
    }),

     // get single manufacturer
     getSingleManufacturer: builder.query({
      query: ({ sellerId }) => ({
        url: "manufacturer/single",
        params: { id: sellerId },
      }),
      transformResponse: (res) => res?.data?.id,
      providesTags: ["Manufactures"],
    }),

    // add manufacturer
    addManufacturer: builder.mutation({
      query: (manufacturerData) => ({
        url: "/manufacturer/create",
        method: "POST",
        body: manufacturerData,
      }),
      invalidatesTags: ["Manufactures"],
    }),
  }),
});

export const { useGetAllManufactureQuery, useGetSingleManufacturerQuery, useAddManufacturerMutation } =
  adminManufactureApi;
