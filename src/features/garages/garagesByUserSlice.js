import { createSlice } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";

export const garagesByUserSlice = createSlice({
  name: "garagesByUser",
  initialState: {
    garagesByUser: null,
  },
  reducers: {
    setGaragesByUser: (state, action) => {
      // return { ...state, stIds: [...state.stIds, action.payload] };
      return { garagesByUser: [action.payload] };
    },
  },
});

export const { setGaragesByUser } = garagesByUserSlice.actions;
export default garagesByUserSlice.reducer;
