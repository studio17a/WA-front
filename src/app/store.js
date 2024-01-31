import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import selectedUserReducer from "../features/users/selectedUserSlice";
import oldSelectedUserReducer from "../features/users/oldSelectedUserSlice";
import selectedVehicleReducer from "../features/vehicles/selectedVehicleSlice";
import vehiclesByUserReducer from "../features/vehicles/vehiclesByUserSlice";
import itemsByUserReducer from "../features/items/itemsByUserSlice";
import selectedStReducer from "../features/st/selectedStSlice";
import stToDelSliceReducer from "../features/st/stToDelSlice";
import selectedDateReducer from "../features/calendar/selectedDateSlice";
import selectedHourReducer from "../features/services/selectedHourSlice";
import selectedItemsReducer from "../features/items/selectedItemsSlice";
import selectedMinuteReducer from "../features/services/selectedMinuteSlice";
import isServiceModalOpenReducer from "../features/services/isServiceModalOpenSlice";
import isItemsModalOpenReducer from "../features/items/isItemsModalOpenSlice";
import isUsersModalOpenReducer from "../features/users/isUsersModalOpenSlice";
import refreshSliceReducer from "../hooks/refreshSlice";
import isVehiclesModalOpenReducer from "../features/vehicles/isVehiclesModalOpenSlice";
import isAppointmentModalOpenReducer from "../features/calendar/public/isAppointmentModalOpenSlice";
import loginModalOpenReducer from "../features/auth/loginModalOpenSlice";
import serviceModalModeReducer from "../features/services/serviceModalModeSlice";
import userModalModeReducer from "../features/users/userModalModeSlice";
import vehicleModalModeReducer from "../features/vehicles/vehicleModalModeSlice";
import itemModalModeReducer from "../features/items/itemModalModeSlice";
import editedServiceIdReducer from "../features/services/editedServiceIdSlice";
import saveServiceReducer from "../features/services/saveServiceSlice";
import modalButtonDisabledReducer from "../features/services/modalButtonDisabledSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    saveService: saveServiceReducer,
    selectedUser: selectedUserReducer,
    oldSelectedUser: oldSelectedUserReducer,
    modalButtonDisabled: modalButtonDisabledReducer,
    selectedVehicle: selectedVehicleReducer,
    vehiclesByUser: vehiclesByUserReducer,
    itemsByUser: itemsByUserReducer,
    refresh: refreshSliceReducer,
    selectedSt: selectedStReducer,
    selectedItems: selectedItemsReducer,
    stToDel: stToDelSliceReducer,
    selectedDate: selectedDateReducer,
    selectedHour: selectedHourReducer,
    selectedMinute: selectedMinuteReducer,
    isAppointmentModalOpen: isAppointmentModalOpenReducer,
    isServiceModalOpen: isServiceModalOpenReducer,
    loginModalOpen: loginModalOpenReducer,
    isItemsModalOpen: isItemsModalOpenReducer,
    isUsersModalOpen: isUsersModalOpenReducer,
    isVehiclesModalOpen: isVehiclesModalOpenReducer,
    serviceModalMode: serviceModalModeReducer,
    userModalMode: userModalModeReducer,
    vehicleModalMode: vehicleModalModeReducer,
    itemModalMode: itemModalModeReducer, 
    editedServiceId: editedServiceIdReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

setupListeners(store.dispatch);
