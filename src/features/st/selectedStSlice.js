import { createSlice } from "@reduxjs/toolkit";

export const selectedStSlice = createSlice({
  name: "selectedSt",
  initialState: {
    stIds: [],
  },

  reducers: {
    setStId: (state, action) => {
      state.stIds = action.payload;
    },
    addStId: (state, action) => {
      return { ...state, stIds: [...state.stIds, action.payload] };
    },
    removeStId: (state, action) => {
      // console.log(state.stIds);
      // // state.stIds.filter((event) => state.stId._id !== action.payload);
      return {
        ...state,
        stIds: state.stIds.map((stId, index) =>
          index === action.payload.index ? { ...stId, toDo: "del" } : stId,
        ),
      };
      console.log(action);
      // state.stIds.filter((event) => state.stId._id !== action.payload);
      // return {
      //   ...state,
      //   stIds: state.stIds.filter(
      //     (stIds, index) => index !== action.payload.index,
      //   ),
      // };
    },
    editStId: (state, action) => {
      console.log(action);
      // state.stIds.filter((event) => state.stId._id !== action.payload);
      return {
        ...state,
        stIds: state.stIds.map((stId, index) => {
          if (index === action.payload.index) {
            return {
              ...stId,
              price: action.payload.price,
              items: action.payload.items,
              vat: action.payload.vat,
            };
          } else {
            return stId;
          }
        }),
      };
    },
  },
});

export const { setStId, addStId, removeStId, editStId } =
  selectedStSlice.actions;
export default selectedStSlice.reducer;
