import { createSlice } from "@reduxjs/toolkit";

export const selectedHourSlice = createSlice({
  name: "selectedHour",
  initialState: {
    hour: null,
  },
  reducers: {
    setHour: (state, action) => {
      state.hour = action.payload;
    },
  },
});

export const { setHour } = selectedHourSlice.actions;
export default selectedHourSlice.reducer;
