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
        // return console.log(res?.data, 'res')
        return res.data.map(
          ({ id, name, Seller, Updater, updatedAt, status }) => ({
            id,
            category_name: name,
            Seller,
            store_name: Seller.shop_name,
            updater: Updater?.shop_owner_name,
            date: updatedAt?.split("T")[0],
            status,
          })
        );
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
  useDeleteProductCategoryMutation
} = adminProductCategoryApi;
