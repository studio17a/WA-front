import { createSlice } from "@reduxjs/toolkit";

export const editedServiceIdSlice = createSlice({
  name: "editedServiceId",
  initialState: {
    editedServiceId: null,
  },
  reducers: {
    setEditedServiceId: (state, action) => {
      // console.log(action.payload);
      state.editedServiceId = action.payload;
    },
  },
});

export const { setEditedServiceId } = editedServiceIdSlice.actions;
export default editedServiceIdSlice.reducer;
