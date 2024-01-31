import { createSlice } from "@reduxjs/toolkit";

export const saveServiceSlice = createSlice({
  name: "saveService",
  initialState: {
    save: false,
  },
  reducers: {
    setSave: (state, action) => {
      state.save = action.payload;
    },
  },
});

export const { setSave } = saveServiceSlice.actions;
export default saveServiceSlice.reducer;
