import { createSlice } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";

export const selectedGarageSlice = createSlice({
  name: "selectedGarage",
  initialState: {
    garage: {},
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
    setGarage: (state, action) => {
      // return { ...state, stIds: [...state.stIds, action.payload] };
      return { garage: action.payload };
    },
  },
});

export const { setGarage } = selectedGarageSlice.actions;
export default selectedGarageSlice.reducer;
