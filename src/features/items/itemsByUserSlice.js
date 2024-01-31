import { createSlice } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";

export const itemsByUserSlice = createSlice({
  name: "itemsByUser",
  initialState: {
    itemsByUser: null,
  },
  reducers: {
    setItemsByUser: (state, action) => {
      // return { ...state, stIds: [...state.stIds, action.payload] };
      return { itemsByUser: [action.payload] };
    },
  },
});

export const { setItemsByUser } = itemsByUserSlice.actions;
export default itemsByUserSlice.reducer;
