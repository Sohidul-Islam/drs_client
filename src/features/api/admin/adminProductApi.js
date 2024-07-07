import { adminBaseApi } from "./adminBaseApi";

const adminProductApi = adminBaseApi.injectEndpoints({
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // all product
    // getAllProductCategory: builder.query({
    //   query: ({ page, pageSize, searchKey }) => ({
    //     url: "product/all",
    //     params: { page, pageSize, searchKey },
    //   }),
    //   transformResponse: (res) => {
    //     return console.log(res?.data, 'res')
    //     return res.data.map(({ id, name,Seller, Updater, updatedAt, status }) => ({
    //       id,
    //       category_name: name,
    //       store_name: Seller.shop_name,
    //       updater: Updater?.shop_owner_name,
    //       date: updatedAt?.split('T')[0],
    //       status,
    //     }));
    //   },
    //   providesTags: ["Products"]
    // }),

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
