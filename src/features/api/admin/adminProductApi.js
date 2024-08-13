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
        // return console.log(
        //   "response of product data from admin product api",
        //   res?.data
        // );
        return res.data
        // return res.data.map(
        //   ({
        //     id,
        //     productName,
        //     genericName,
        //     menufacturer,
        //     strength,
        //     dosageForm,
        //     packBoxSize,
        //     quantity,
        //     updatedAt,
        //     status,
        //   }) => ({
        //     id,
        //     productName,
        //     genericName,
        //     manufacturer: menufacturer.name,
        //     strength,
        //     dosageForm,
        //     packBoxSize,
        //     quantity,
        //     date: updatedAt?.split("T")[0],
        //     status,
        //   })
        // );
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

    // delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        // url: `product/delete`,
        url: `product/delete?id=${id}`,
        method: "POST",
        // params: {id:6},
        // body: { id, name, status }
        body: { id },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = adminProductApi;
