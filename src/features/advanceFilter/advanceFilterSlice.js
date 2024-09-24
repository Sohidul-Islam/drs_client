import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterQuery: "",
};

// Create the slice
const advanceFilterSlice = createSlice({
  name: "advanceFilter",
  initialState,
  reducers: {
    setFilterQuery: (state, action) => {
      state.filterQuery = action.payload;
    },
    clearFilterQuery: (state) => {
      state.filterQuery = ""; 
    },
  },
});

// Export the action
export const { setFilterQuery, clearFilterQuery } = advanceFilterSlice.actions;

export default advanceFilterSlice.reducer;
