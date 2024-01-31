import { createSlice } from "@reduxjs/toolkit";

export const selectedDateSlice = createSlice({
  name: "selectedDate",
  initialState: {
    date: null,
  },
  reducers: {
    setDate: (state, action) => {
      // console.log(`changing date to: ${action.payload}`);
      state.date = action.payload;
    },
  },
});

export const { setDate } = selectedDateSlice.actions;
export default selectedDateSlice.reducer;
