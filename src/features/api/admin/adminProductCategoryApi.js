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
        return res.data.map(({ id, name,Seller, Updater, updatedAt, status }) => ({
          id,
          category_name: name,
          store_name: Seller.shop_name,
          updater: Updater?.shop_owner_name,
          date: updatedAt?.split('T')[0],
          status,
        }));
      },
      providesTags: ["ProductCategories"]
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
  }),
});

export const { useGetAllProductCategoryQuery, useAddProductCategoryMutation } =
  adminProductCategoryApi;
