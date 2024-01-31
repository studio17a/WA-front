import { createSlice } from "@reduxjs/toolkit";

export const vehicleModalModeSlice = createSlice({
  name: "vehicleModalMode",
  initialState: {
    vehicleModalMode: null,
  },
  reducers: {
    setVehicleModalMode: (state, action) => {
      // console.log(action.payload);
      state.vehicleModalMode = action.payload;
    },
  },
});

export const { setVehicleModalMode } = vehicleModalModeSlice.actions;
export default vehicleModalModeSlice.reducer;
