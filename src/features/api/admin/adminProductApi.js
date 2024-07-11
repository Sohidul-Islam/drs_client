import { adminBaseApi } from "./adminBaseApi";

const adminProductApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // all product
    getAllProduct: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "product/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        // return console.log(res?.data, 'res')
        return res.data.map(
          ({
            id,
            productName,
            store,
            genericName,
            menufacturer,
            strength,
            dosageForm,
            Updater,
            updatedAt,
            status,
          }) => ({
            id,
            productName,
            store,
            genericName,
            manufacturer: menufacturer?.name,
            strength,
            dosageForm,
            Updater,
            date: updatedAt?.split("T")[0],
            status,
          })
        );
      },
      providesTags: ["Products"],
    }),

    // add product
    addProduct: builder.mutation({
      query: (categoryData) => ({
        url: "/product/create",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useGetAllProductQuery, useAddProductMutation } = adminProductApi;
