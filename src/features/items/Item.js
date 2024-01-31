import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const itemAdapter = createEntityAdapter({});

const initialState = itemAdapter.getInitialState();

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ userId }) => ({
        url: "/items",
        method: "POST",
        body: { userId },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadItems = responseData.map((item) => {
          item.id = item._id;

          return item;
        });
        return itemAdapter.setAll(initialState, loadItems);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Item", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Item", id })),
          ];
        } else return [{ type: "Item", id: "LIST" }];
      },
    }),
    getItemsByUserId: builder.mutation({
      query: ({ userId }) => ({
        url: `/items`,
        method: "POST",
        body: { userId },
        validateStatus: (response, result) => {
          // console.log(`userId${userId}`);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadItems = responseData.map((item) => {
          item.id = item._id;

          return item;
        });
        return itemAdapter.setAll(initialState, loadItems);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Item", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Item", id })),
          ];
        } else return [{ type: "Item", id: "LIST" }];
      },
    }),
    addNewItem: builder.mutation({
      query: (initialUserData) => ({
        url: "/items",
        method: "PUT",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemsByUserIdMutation,
  useAddNewItemMutation,
} = itemsApiSlice;

export const selectItemsResult = itemsApiSlice.endpoints.getItems.select();

const selectItemsData = createSelector(
  selectItemsResult,
  (itemsResult) => itemsResult.data,
);
export const {
  selectAll: selectAllItems,
  selectById: selectItemsById,
  selectIds: selectItemIds,
} = itemAdapter.getSelectors((state) => selectItemsData(state) ?? initialState);
