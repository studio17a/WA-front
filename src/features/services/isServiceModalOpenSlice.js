import { createSlice } from "@reduxjs/toolkit";

export const isServiceModalOpenSlice = createSlice({
  name: "isServiceModalOpen",
  initialState: {
    isServiceModalOpen: null,
  },
  reducers: {
    setIsServiceModalOpen: (state, action) => {
      // console.log(action.payload);
      state.isServiceModalOpen = action.payload;
    },
  },
});

export const { setIsServiceModalOpen } = isServiceModalOpenSlice.actions;
export default isServiceModalOpenSlice.reducer;
