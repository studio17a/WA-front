import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const servicesAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});
const initialState = servicesAdapter.getInitialState();

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({ id, day, month, year }) => ({
        url: `/services/${id}/${day}/${month}/${year}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        let loadedServices = [];
        if (responseData?.length > 0) {
          loadedServices = responseData.map((service) => {
            service.id = service._id;
            // console.log(service);
            return service;
          });
        }
        return servicesAdapter.setAll(initialState, loadedServices);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Service", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Service", id })),
          ];
        } else return [{ type: "Service", id: "LIST" }];
      },
    }),
    getAllServices: builder.mutation({
      query: ({ id, day, month, year }) => ({
        url: `/services/${id}/${day}/${month}/${year}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
      // invalidatesTags: (result, error, arg) => [
      //   { type: "Service", id: arg.id },
      // ],
    }),
    getServicesByVehicleId: builder.mutation({
      query: ({ garageId, vehicleId }) => ({
        url: `/services/details/${garageId}/${vehicleId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        let loadedServices = [];
        if (responseData?.length > 0) {
          loadedServices = responseData.map((service) => {
            service.id = service._id;
            // console.log(service);
            return service;
          });
        }
        return servicesAdapter.setAll(initialState, loadedServices);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Service", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Service", id })),
          ];
        } else return [{ type: "Service", id: "LIST" }];
      },
    }),
    getNearestServices: builder.mutation({
      query: ({ id, day, month, year }) => ({
        url: `/services/${id}/${day}/${month}/${year}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        let loadedServices = [];
        if (responseData?.length > 0) {
          loadedServices = responseData.map((service) => {
            service.id = service._id;
            // console.log(service);
            return service;
          });
        }
        return servicesAdapter.setAll(initialState, loadedServices);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Service", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Service", id })),
          ];
        } else return [{ type: "Service", id: "LIST" }];
      },
    }),
    handleService: builder.mutation({
      query: ({
        serviceModalMode = "",
        id = "",
        user,
        vehicle,
        garage,
        date,
        hour,
        st = [],
        minute,
        items,
        title,
        text,
        completed = null,
        author,
        authorname,
      }) => ({
        url: serviceModalMode == "add" ? "/services" : `/services/${id}`,
        method: serviceModalMode == "add" ? "POST" : "PATCH",
        body: {
          id: id,
          date: date,
          hour: hour,
          st: st,
          garage: garage,
          minute: minute,
          user: user,
          items: items,
          date: date,
          vehicle: vehicle,
          completed,
          author,
          authorname,
        },
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),
    createNewAppointment: builder.mutation({
      query: ({ token }) => ({
        url: "/services/appointments",
        method: "POST",
        body: {
          token,
        },
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),
    updateService: builder.mutation({
      query: (initialService) => ({
        url: "/services",
        method: "PATCH",
        body: {
          ...initialService,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Service", id: arg.id },
      ],
    }),
    deleteService: builder.mutation({
      query: ({ id, st }) => ({
        url: `/services/${id}`,
        method: "DELETE",
        body: { id, st },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Service", id: arg.id },
      ],
    }),
  }),
});

export const {
  useLazyGetServicesQuery,
  useGetServicesQuery,
  useGetAllServicesMutation,
  useGetServicesByVehicleIdMutation,
  useCreateNewAppointmentMutation,
  useHandleServiceMutation,
  useGetNearestServicesMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApiSlice;

// returns the query result object
export const selectServicesResult =
  servicesApiSlice.endpoints.getServices.select();

// creates memoized selector
const selectServicesData = createSelector(
  selectServicesResult,
  (servicesResult) => servicesResult.data, // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllServices,
  selectById: selectServiceById,
  selectIds: selectServiceIds,
  // Pass in a selector that returns the services slice of state
} = servicesAdapter.getSelectors(
  (state) => selectServicesData(state) ?? initialState,
);
