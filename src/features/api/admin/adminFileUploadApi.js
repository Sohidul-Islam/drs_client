import { adminBaseApi } from "./adminBaseApi";

const adminFileUploadApi = adminBaseApi.injectEndpoints({
  tagTypes: ["File"],
  endpoints: (builder) => ({
    // add File
    addFile: builder.mutation({
      query: (file) => ({
        url: "file/upload",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["File"],
    }),
  }),
});

export const { useAddFileMutation } = adminFileUploadApi;
