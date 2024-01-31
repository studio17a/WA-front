import { createSlice } from "@reduxjs/toolkit";

export const isItemsModalOpenSlice = createSlice({
  name: "isItemsModalOpen",
  initialState: {
    isItemsModalOpen: false,
  },
  reducers: {
    setIsItemsModalOpen: (state, action) => {
      // console.log(action.payload);
      state.isItemsModalOpen = action.payload;
    },
  },
});

export const { setIsItemsModalOpen } = isItemsModalOpenSlice.actions;
export default isItemsModalOpenSlice.reducer;
