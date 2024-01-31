import { createSlice } from "@reduxjs/toolkit";

export const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState: {
    itemsIds: [],
  },

  reducers: {
    setItemsId: (state, action) => {
      state.itemsIds = action.payload;
    },
    addItemsId: (state, action) => {
      return { ...state, itemsIds: [...state.itemsIds, action.payload] };
    },
    removeItemsId: (state, action) => {
      // console.log(state.stIds);
      // // state.stIds.filter((event) => state.stId._id !== action.payload);
      return {
        ...state,
        itemsIds: state.itemsIds.map((itemsId, index) =>
          index === action.payload.index
            ? { ...itemsId, toDo: "del" }
            : itemsId,
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
    editItemsId: (state, action) => {
      console.log(action);
      // state.stIds.filter((event) => state.stId._id !== action.payload);
      return {
        ...state,
        itemsIds: state.itemsIds.map((itemsId, index) => {
          if (index === action.payload.index) {
            return {
              ...itemsId,
              price: action.payload.price,
              items: action.payload.items,
              vat: action.payload.vat,
            };
          } else {
            return itemsId;
          }
        }),
      };
    },
  },
});

export const { setItemsId, addItemsId, removeItemsId, editItemsId } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
