import { createSlice } from "@reduxjs/toolkit";

export const serviceModalModeSlice = createSlice({
  name: "serviceModalMode",
  initialState: {
    serviceModalMode: null,
  },
  reducers: {
    setServiceModalMode: (state, action) => {
      // console.log(action.payload);
      state.serviceModalMode = action.payload;
    },
  },
});

export const { setServiceModalMode } = serviceModalModeSlice.actions;
export default serviceModalModeSlice.reducer;
