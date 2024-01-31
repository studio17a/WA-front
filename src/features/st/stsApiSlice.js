import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const stAdapter = createEntityAdapter({});
const initialState = stAdapter.getInitialState();

export const stsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSts: builder.query({
      query: () => ({
        url: "/sts",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
    transformResponse: (responseData) => {
      const loadSts = responseData.map((st) => {
        st.id = st._id;
        // console.log(st);
        return st;
      });
      return stAdapter.setAll(initialState, loadSts);
    },
    providesTags: (result, error, arg) => {
      if (result?.ids) {
        return [
          { type: "St", id: "LIST" },
          ...result.ids.map((id) => ({ type: "St", id })),
        ];
      } else return [{ type: "St", id: "LIST" }];
    },

    getStsByGarageId: builder.mutation({
      query: ({ garageId }) => ({
        url: `/sts/${garageId}`,
        method: "GET",
        // body: { garageId },
        validateStatus: (response, result) => {
          // console.log(`garageId from API: ${garageId}`);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadSts = responseData.map((st) => {
          st.id = st._id;
          // console.log(st);
          return st;
        });
        return stAdapter.setAll(initialState, loadSts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "St", id: "LIST" },
            ...result.ids.map((id) => ({ type: "St", id })),
          ];
        } else return [{ type: "St", id: "LIST" }];
      },
    }),
    addNewSt: builder.mutation({
      query: (initialStData) => ({
        url: "/sts",
        method: "PUT",
        body: {
          ...initialStData,
        },
      }),
      invalidatesTags: [{ type: "St", id: "LIST" }],
    }),
    editSt: builder.mutation({
      query: ({ id, price, items, vat }) => ({
        url: `/sts/${id}`,
        method: "POST",
        body: {
          id,
          price,
          items,
          vat,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteSt: builder.mutation({
      query: (id) => ({
        url: `/sts/${id}`,
        method: "delete",
      }),
      invalidatesTags: [{ type: "St", id: "LIST" }],
    }),
  }),
});
export const {
  useGetStsQuery,
  useEditStMutation,
  useGetStsByGarageIdMutation,
  useAddNewStMutation,
  useDeleteStMutation,
} = stsApiSlice;

export const selectStsResult = stsApiSlice.endpoints.getSts.select();

const selectStsData = createSelector(
  selectStsResult,
  (stsResult) => stsResult.data,
);
export const {
  selectAll: selectAllSts,
  selectById: selectStsById,
  selectIds: selectStIds,
} = stAdapter.getSelectors((state) => selectStsData(state) ?? initialState);
