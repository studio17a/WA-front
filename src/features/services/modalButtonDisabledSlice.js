import { createSlice } from "@reduxjs/toolkit";

export const modalButtonDisabledSlice = createSlice({
  name: "modalButtonDisabled",
  initialState: {
    modalButtonDisabled: true,
  },
  reducers: {
    setModalButtonDisabled: (state, action) => {
      // console.log(action.payload);
      state.modalButtonDisabled = action.payload;
    },
  },
});

export const { setModalButtonDisabled } = modalButtonDisabledSlice.actions;
export default modalButtonDisabledSlice.reducer;
