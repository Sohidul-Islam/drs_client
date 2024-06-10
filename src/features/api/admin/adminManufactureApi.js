import { adminBaseApi } from "./adminBaseApi";

const adminManufactureApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Manufactures"],
  endpoints: (builder) => ({
    getAllManufacture: builder.query({
      query: () => "/manufacture/all",
      transformResponse: (response) => {
        // return response.data.map(({ id, name }) => ({ id, name }));
        return response.data;
      },
      providesTags: ["Manufactures"],
    }),
  }),
});

export const { useGetAllManufactureQuery } = adminManufactureApi;
