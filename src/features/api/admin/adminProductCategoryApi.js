import { adminBaseApi } from "./adminBaseApi";

const adminProductCategoryApi = adminBaseApi.injectEndpoints({
  tagTypes: ["ProductCategories"],
  endpoints: (builder) => ({
    // all product category
    getAllProductCategory: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "product-categories/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        const data = res.data.map(
          ({ id, name, Seller, Updater, updatedAt }) => ({
            id,
            category_name: name,
            Seller,
            addedBy: Updater?.shop_owner_name,
            date: updatedAt?.split("T")[0],
          })
        );
        const metadata = {
          totalItems: res.metadata.totalItems,
          totalPages: res.metadata.totalPages,
          currentPage: res.metadata.currentPage,
          pageSize: res.metadata.pageSize,
        };
        return {
          data: data,
          metadata,
        };
      },
      providesTags: ["ProductCategories"],
    }),

    // get single product category
    getSingleProductCategory: builder.query({
      query: ({ sellerId }) => ({
        url: "product-categories/single",
        params: { id: sellerId },
      }),
      transformResponse: (res) => res?.data?.id,
      providesTags: ["ProductCategories"],
    }),

    // add product category
    addProductCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/product-categories/create",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["ProductCategories"],
    }),

    // update product category
    updateProductCategory: builder.mutation({
      query: (categoryData) => ({
        url: "product-categories/update",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["ProductCategories"],
    }),

    // delete product category
    deleteProductCategory: builder.mutation({
      query: (id) => ({
        url: `product-categories/delete?id=${id}`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["ProductCategories"],
    }),
  }),
});

export const {
  useGetAllProductCategoryQuery,
  useGetSingleProductCategoryQuery,
  useAddProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = adminProductCategoryApi;
