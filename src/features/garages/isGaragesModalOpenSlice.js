import { createSlice } from "@reduxjs/toolkit";

export const isGaragesModalOpenSlice = createSlice({
  name: "isGaragesModalOpen",
  initialState: {
    isGaragesModalOpen: false,
  },
  reducers: {
    setIsGaragesModalOpen: (state, action) => {
      // console.log(action.payload);
      state.isGaragesModalOpen = action.payload;
    },
  },
});

export const { setIsGaragesModalOpen } = isGaragesModalOpenSlice.actions;
export default isGaragesModalOpenSlice.reducer;
