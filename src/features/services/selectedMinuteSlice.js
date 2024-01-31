import { createSlice } from "@reduxjs/toolkit";

export const selectedMinuteSlice = createSlice({
  name: "selectedMinute",
  initialState: {
    minute: null,
  },
  reducers: {
    setMinute: (state, action) => {
      state.minute = action.payload;
    },
  },
});

export const { setMinute } = selectedMinuteSlice.actions;
export default selectedMinuteSlice.reducer;
