import { createSlice } from "@reduxjs/toolkit";

export const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState: {
    selectedUser: null,
  },
  reducers: {
    setUserObj: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUserObj } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
