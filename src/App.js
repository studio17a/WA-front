import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import GaragesList from "./features/garages/GaragesList";
import ServicesList from "./features/services/ServicesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import NewService from "./features/services/NewServiceModal";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import Calendar from "./features/calendar/dash/Calendar";
import PublicCalendar from "./features/calendar/public/PublicCalendar";
import Confirmation from "./features/calendar/public/Confirmation";
import VehiclesList from "./features/vehicles/VehiclesList";
import ItemsView from "./features/items/ItemsView";
import VehiclesView from "./features/vehicles/VehiclesView";
import UsersView from "./features/users/UsersView";
import VehicleDetails from "./features/vehicles/vehicleDetails/VehicleDetails";

function App() {
  useTitle("WarsztApp");

  return (
    <Routes>
      <Route
        path=":garageId/confirmation/:day?/:month?/:year/:confirmationToken?"
        element={<Confirmation />}
      />
      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Public />} />
          <Route
            path=":garageId/appointments/:day?/:month?/:year?"
            element={<PublicCalendar />}
          />
          <Route
            path=":garageId/confirmation/:day?/:month?/:year/:confirmationToken?"
            element={<Confirmation />}
          />

          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route
                  path=":garageId/appointment/:day?/:month?/:year?"
                  element={<PublicCalendar />}
                />
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route index element={<GaragesList />} />
                  <Route
                    path=":garageId/calendar/:day/:month/:year"
                    element={<Calendar />}
                  />
                  <Route path=":garageId/items" element={<ItemsView />} />
                  <Route path=":garageId/users" element={<UsersView />} />
                  <Route path=":garageId/vehicles">
                    <Route index element={<VehiclesView />} />
                    <Route path=":vehicleId" element={<VehicleDetails />} />
                  </Route>
                </Route>

                <Route path="services">
                  <Route index element={<ServicesList />} />
                  <Route path="new" element={<NewService />} />
                </Route>
              </Route>
              {/* End Dash */}
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
