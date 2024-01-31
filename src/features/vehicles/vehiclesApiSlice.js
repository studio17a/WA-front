import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const vehicleAdapter = createEntityAdapter({});

const initialState = vehicleAdapter.getInitialState();

export const vehiclesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => ({
        url: "/vehicles",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadVehicles = responseData.map((vehicle) => {
          vehicle.id = vehicle._id;
          return vehicle;
        });
        return vehicleAdapter.setAll(initialState, loadVehicles);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Vehicle", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Vehicle", id })),
          ];
        } else return [{ type: "Vehicle", id: "LIST" }];
      },
    }),
    getVehiclesByUserId: builder.mutation({
      query: ({ userId }) => ({
        url: `/vehicles`,
        method: "POST",
        body: { userId },
        validateStatus: (response, result) => {
          // console.log(`userId${userId}`);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadVehicles = responseData.map((vehicle) => {
          vehicle.id = vehicle._id;
          // console.log(vehicle);
          return vehicle;
        });
        return vehicleAdapter.setAll(initialState, loadVehicles);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Vehicle", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Vehicle", id })),
          ];
        } else return [{ type: "Vehicle", id: "LIST" }];
      },
    }),
    updateVehicle: builder.mutation({
      query: (initialUserData) => ({
        url: "/vehicles",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "Vehicle", id: "LIST" }],
    }),
    addNewVehicle: builder.mutation({
      query: (initialUserData) => ({
        url: "/vehicles",
        method: "PUT",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "Vehicle", id: "LIST" }],
    }),
    delVehicle: builder.mutation({
      query: ({ vid }) => ({
        url: `/vehicles/${vid}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Vehicle", id: "LIST" }],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useUpdateVehicleMutation,
  useLazyGetVehiclesQuery,
  useGetVehiclesByUserIdMutation,
  useAddNewVehicleMutation,
  useDelVehicleMutation,
} = vehiclesApiSlice;

export const selectVehiclesResult =
  vehiclesApiSlice.endpoints.getVehicles.select();

const selectVehiclesData = createSelector(
  selectVehiclesResult,
  (vehiclesResult) => vehiclesResult.data,
);
export const {
  selectAll: selectAllVehicles,
  selectById: selectVehiclesById,
  selectIds: selectVehicleIds,
} = vehicleAdapter.getSelectors(
  (state) => selectVehiclesData(state) ?? initialState,
);
