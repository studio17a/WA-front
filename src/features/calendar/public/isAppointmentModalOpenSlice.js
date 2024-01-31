import { createSlice } from "@reduxjs/toolkit";

export const isAppointmentModalOpenSlice = createSlice({
  name: "isAppointmentModalOpen",
  initialState: {
    isAppointmentModalOpen: false,
  },
  reducers: {
    setIsAppointmentModalOpen: (state, action) => {
      // console.log(action.payload);
      state.isAppointmentModalOpen = action.payload;
    },
  },
});

export const { setIsAppointmentModalOpen } =
  isAppointmentModalOpenSlice.actions;
export default isAppointmentModalOpenSlice.reducer;
