import { createSlice } from "@reduxjs/toolkit";

export const garageModalModeSlice = createSlice({
  name: "garageModalMode",
  initialState: {
    garageModalMode: null,
  },
  reducers: {
    setGarageModalMode: (state, action) => {
      // console.log(action.payload);
      state.garageModalMode = action.payload;
    },
  },
});

export const { setGarageModalMode } = garageModalModeSlice.actions;
export default garageModalModeSlice.reducer;
