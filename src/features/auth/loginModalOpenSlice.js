import { createSlice } from "@reduxjs/toolkit";

export const loginModalOpenSlice = createSlice({
  name: "loginModalOpen",
  initialState: {
    loginModalOpen: false,
  },
  reducers: {
    setLoginModalOpen: (state, action) => {
      // console.log(action.payload);
      state.loginModalOpen = action.payload;
    },
  },
});

export const { setLoginModalOpen } = loginModalOpenSlice.actions;
export default loginModalOpenSlice.reducer;
