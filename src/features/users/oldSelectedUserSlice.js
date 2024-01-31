import { createSlice } from "@reduxjs/toolkit";

export const oldSelectedUserSlice = createSlice({
  name: "oldSelectedUser",
  initialState: {
    oldSelectedUser: null,
  },
  reducers: {
    setOldUserObj: (state, action) => {
      state.oldSelectedUser = action.payload;
    },
  },
});

export const { setOldUserObj } = oldSelectedUserSlice.actions;
export default oldSelectedUserSlice.reducer;
