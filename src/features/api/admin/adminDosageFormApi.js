import { adminBaseApi } from "./adminBaseApi";

const adminDosageFormApi = adminBaseApi.injectEndpoints({
  tagTypes: ["DosageForm"],
  endpoints: (builder) => ({
    // all dosage form
    getAllDosageForm: builder.query({
      query: ({ page, pageSize, searchKey }) => ({
        url: "dosage-form/all",
        params: { page, pageSize, searchKey },
      }),
      transformResponse: (res) => {
        const data = res?.data?.map(({ id, name, status, createdAt }) => ({
          id,
          dosageName: name,
          status,
          date: createdAt?.split("T")[0],
        }));
        const metadata = {
          totalItems: res?.metadata?.totalItems || 0,
          totalPages: res?.metadata?.totalPages || 0,
          currentPage: res?.metadata?.currentPage || 0,
          pageSize: res?.metadata?.pageSize || 0,
        };
        return {
          data:data,
          metadata,
        };
      },
      providesTags: ["DosageForm"],
    }),

    // add product category
    addDosageForm: builder.mutation({
      query: (dosageForm) => ({
        url: "dosage-form/create",
        method: "POST",
        body: dosageForm,
      }),
      invalidatesTags: ["DosageForm"],
    }),

    // update product category
    updateDosageForm: builder.mutation({
      query: (dosageForm) => ({
        url: "dosage-form/update",
        method: "POST",
        body: dosageForm,
      }),
      invalidatesTags: ["DosageForm"],
    }),

    // delete product category
    deleteDosageForm: builder.mutation({
      query: (id) => ({
        url: `dosage-form/delete?id=${id}`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["DosageForm"],
    }),
  }),
});

export const {
  useGetAllDosageFormQuery,
  useAddDosageFormMutation,
  useUpdateDosageFormMutation,
  useDeleteDosageFormMutation,
} = adminDosageFormApi;
