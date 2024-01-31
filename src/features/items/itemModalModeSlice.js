import { createSlice } from "@reduxjs/toolkit";

export const itemModalModeSlice = createSlice({
  name: "itemModalMode",
  initialState: {
    itemModalMode: null,
  },
  reducers: {
    setItemModalMode: (state, action) => {
      // console.log(action.payload);
      state.itemModalMode = action.payload;
    },
  },
});

export const { setItemModalMode } = itemModalModeSlice.actions;
export default itemModalModeSlice.reducer;
