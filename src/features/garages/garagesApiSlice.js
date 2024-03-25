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
    getAGarage: builder.mutation({
      query: ({ gid }) => ({
        url: `/garages/${gid}`,
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Garage", id: arg.id }],
    }),
    getGaragesByUserId: builder.mutation({
      query: ({ userId }) => ({
        url: `/Garages`,
        method: "POST",
        body: { userId },
        validateStatus: (response, result) => {
          // console.log(`userId${userId}`);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadGarages = responseData.map((Garage) => {
          Garage.id = Garage._id;
          // console.log(Garage);
          return Garage;
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

export const {
  useGetGaragesByUserIdMutation,
  useGetGaragesQuery,
  useGetAGarageMutation,
} = garageApiSlice;

export const selectGaragesResult = garageApiSlice.endpoints.getGarages.select();

const selectGaragesData = createSelector(
  selectGaragesResult,
  (useResult) => useResult.data,
);

export const { selectAll: selectAllGarages } = garageAdapter.getSelectors(
  (state) => selectGaragesData(state) ?? initialState,
);
