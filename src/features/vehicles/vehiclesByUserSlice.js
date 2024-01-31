import { createSlice } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";

export const vehiclesByUserSlice = createSlice({
  name: "vehiclesByUser",
  initialState: {
    vehiclesByUser: null,
  },
  reducers: {
    setVehiclesByUser: (state, action) => {
      // return { ...state, stIds: [...state.stIds, action.payload] };
      return { vehiclesByUser: [action.payload] };
    },
  },
});

export const { setVehiclesByUser } = vehiclesByUserSlice.actions;
export default vehiclesByUserSlice.reducer;
