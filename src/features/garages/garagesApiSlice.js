import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const garageAdapter = createEntityAdapter({});
const initialState = garageAdapter.getInitialState();

const garageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGarages: builder.query({
      query: () => ({
        url: "/garages",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadGarages = responseData.map((garage) => {
          garage.id = garage._id;
          return garage;
        });
        return garageAdapter.setAll(initialState, loadGarages);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Garage", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Garage", id })),
          ];
        } else return [{ type: "Garage", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetGaragesQuery } = garageApiSlice;

export const selectGaragesResult = garageApiSlice.endpoints.getGarages.select();

const selectGaragesData = createSelector(
  selectGaragesResult,
  (useResult) => useResult.data,
);

export const { selectAll: selectAllGarages } = garageAdapter.getSelectors(
  (state) => selectGaragesData(state) ?? initialState,
);
