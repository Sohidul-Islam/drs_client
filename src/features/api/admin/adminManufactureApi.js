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
        return res.data
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

     // delete a manufacturer
     deleteManufacturer: builder.mutation({
      query: (id) => ({
        url: `manufacturer/delete?id=${id}`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Manufactures"],
    }),
  }),
});

export const { useGetAllManufactureQuery, useGetSingleManufacturerQuery, useAddManufacturerMutation, useDeleteManufacturerMutation } =
  adminManufactureApi;
