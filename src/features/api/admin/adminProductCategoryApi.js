import { adminBaseApi } from "./adminBaseApi";

const adminProductCategoryApi = adminBaseApi.injectEndpoints({
  tagTypes: ["ProductCategories"],
  endpoints: (builder) => ({
   
    // add product category
    addProductCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/product-categories/create",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["ProductCategories"],
    }),
  }),
});

export const { useAddProductCategoryMutation } = adminProductCategoryApi;
