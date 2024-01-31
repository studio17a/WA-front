import { createSlice } from "@reduxjs/toolkit";

export const isUsersModalOpenSlice = createSlice({
  name: "isUsersModalOpen",
  initialState: {
    isUsersModalOpen: false,
  },
  reducers: {
    setIsUsersModalOpen: (state, action) => {
      // console.log(action.payload);
      state.isUsersModalOpen = action.payload;
    },
  },
});

export const { setIsUsersModalOpen } = isUsersModalOpenSlice.actions;
export default isUsersModalOpenSlice.reducer;
