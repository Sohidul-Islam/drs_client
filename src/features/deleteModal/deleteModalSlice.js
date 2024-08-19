import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  selectedItemId: null,
};

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.selectedItemId = action.payload.id;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedItemId = null;
    },
  },
});

export const { openModal, closeModal } = deleteModalSlice.actions;
export default deleteModalSlice.reducer;
