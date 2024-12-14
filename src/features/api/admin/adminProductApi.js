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
        console.log(res)
        const data = res?.data?.map(
          ({
            id,
            productName,
            category,
            genericName,
            menufacturer,
            strength,
            dosageForm,
            packBoxSize,
            updatedAt,
            stockQuantity
          }) => ({
            id,
            productName,
            category,
            genericName,
            menufacturer,
            strength,
            dosageForm,
            packBoxSize,
            date: updatedAt?.split("T")[0],
            stockQuantity
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

    // update product
    updateProduct: builder.mutation({
      query: (updatedData) => ({
        url: "product/update",
        method: 'POST',
        body: updatedData,
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
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminProductApi;
