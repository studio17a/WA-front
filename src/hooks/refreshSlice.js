import { createSlice } from "@reduxjs/toolkit";

export const refreshSlice = createSlice({
  name: "refresh",
  initialState: {
    refresh: { vehiclesByUser: false },
  },
  reducers: {
    setRefreshVehiclesByUser: (state, action) => {
      // console.log(action.payload);
      state.refresh.vehiclesByUser = action.payload;
    },
    setRefreshGaragesByUser: (state, action) => {
      // console.log(action.payload);
      state.refresh.garagesByUser = action.payload;
    },
    setRefreshItemsByUser: (state, action) => {
      // console.log(action.payload);
      state.refresh.itemsByUser = action.payload;
    },
  },
});

export const {
  setRefreshGaragesByUser,
  setRefreshVehiclesByUser,
  setRefreshItemsByUser,
} = refreshSlice.actions;
export default refreshSlice.reducer;
