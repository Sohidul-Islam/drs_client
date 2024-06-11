import { adminBaseApi } from "./adminBaseApi";

const adminManufactureApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Manufactures"],
  endpoints: (builder) => ({
    // get all manufacturer
    getAllManufacture: builder.query({
      query: () => "/manufacture/all",
      transformResponse: (response) => {
        // return response.data.map(({ id, name }) => ({ id, name }));
        return response.data;
      },
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

export const { useGetAllManufactureQuery, useAddManufacturerMutation } =
  adminManufactureApi;
