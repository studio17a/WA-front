import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const itemAdapter = createEntityAdapter({});
const initialState = itemAdapter.getInitialState();

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ gid }) => ({
        url: `/items/${gid}`,
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadItems = responseData.map((item) => {
          item.id = item._id;
          // console.log(item);
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
      query: ({ gid, userId }) => ({
        url: userId ? `/items/${gid}` : `/items/${gid}/nouser`,
        method: "POST",

        // body: userId ? { userId } : null,
        // url: `/items/${gid}`,
        // method: "POST",
        body: userId ? { userId } : {},
        validateStatus: (response, result) => {
          // console.log(`userId${userId}`);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadItems = responseData.map((item) => {
          item.id = item._id;
          // console.log(item);
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
    getItemsByUserIdAndService: builder.mutation({
      query: ({ gid, userId }) => ({
        url: userId
          ? `/items/${gid}/itemsbyuseridandservice/${userId}`
          : "/items/nouser",
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
          // console.log(item);
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
    getItemsByUsername: builder.mutation({
      query: ({ gid, username }) => ({
        url: `/items/${gid}/itemsbyusername`,
        method: "POST",
        body: { username },
        validateStatus: (response, result) => {
          // console.log(`userId${userId}`);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        // console.log(responseData);
        const loadedItems = responseData.map((item) => {
          if (item) {
            item.id = item._id;
            return item;
          }
        });
        return itemAdapter.setAll(initialState, loadedItems);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "ItemsWithVehicles", id: "LIST" },
            ...result.ids.map((id) => ({ type: "ItemsWithVehicle", id })),
          ];
        } else return [{ type: "ItemsWithVehicle", id: "LIST" }];
      },
    }),
    handleItem: builder.mutation({
      query: (initialItemData) => ({
        url: `/items/${initialItemData.garage}`,
        method: initialItemData.mode == "add" ? "PUT" : "PATCH",
        body: {
          ...initialItemData,
        },
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
    delItem: builder.mutation({
      query: ({ iid }) => ({
        url: `/items/${iid}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
  }),
});
export const {
  useGetItemsQuery,
  useGetItemsByUserIdAndServiceMutation,
  useGetItemsByUserIdMutation,
  useGetItemsByUsernameMutation,
  useHandleItemMutation,
  useDelItemMutation,
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
