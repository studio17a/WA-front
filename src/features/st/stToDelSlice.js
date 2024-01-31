import { createSlice } from "@reduxjs/toolkit";

export const stToDelSlice = createSlice({
  name: "stToDel",
  initialState: {
    stToDelIds: [],
  },

  reducers: {
    setStToDel: (state, action) => {
      state.stToDelIds = action.payload;
    },
    addStToDel: (state, action) => {
      // state.stIds.push(action.payload);
      return { ...state, stToDelIds: [...state.stToDelIds, action.payload] };
    },
  },
});

export const { setStToDel, addStToDel } = stToDelSlice.actions;
export default stToDelSlice.reducer;
