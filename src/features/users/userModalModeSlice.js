import { createSlice } from "@reduxjs/toolkit";

export const userModalModeSlice = createSlice({
  name: "userModalMode",
  initialState: {
    userModalMode: null,
  },
  reducers: {
    setUserModalMode: (state, action) => {
      // console.log(action.payload);
      state.userModalMode = action.payload;
    },
  },
});

export const { setUserModalMode } = userModalModeSlice.actions;
export default userModalModeSlice.reducer;
