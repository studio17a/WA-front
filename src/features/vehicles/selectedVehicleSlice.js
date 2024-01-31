import { createSlice } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";

export const selectedVehicleSlice = createSlice({
  name: "selectedVehicle",
  initialState: {
    vehicle: {},
    // _id: "",
    // id: "",
    // brand: "",
    // reg: "",
    // user: {
    //   username: "",
    //   password: "",
    //   phone: "",
    //   email: "",
    //   roles: {
    //     type: "",
    //   },
    //   active: true,
    // },
  },
  reducers: {
    setVehicle: (state, action) => {
      // return { ...state, stIds: [...state.stIds, action.payload] };
      return { vehicle: [action.payload] };
    },
  },
});

export const { setVehicle } = selectedVehicleSlice.actions;
export default selectedVehicleSlice.reducer;
