import { createSlice } from "@reduxjs/toolkit";

export const isVehiclesModalOpenSlice = createSlice({
  name: "isVehiclesModalOpen",
  initialState: {
    isVehiclesModalOpen: false,
  },
  reducers: {
    setIsVehiclesModalOpen: (state, action) => {
      // console.log(action.payload);
      state.isVehiclesModalOpen = action.payload;
    },
  },
});

export const { setIsVehiclesModalOpen } = isVehiclesModalOpenSlice.actions;
export default isVehiclesModalOpenSlice.reducer;
