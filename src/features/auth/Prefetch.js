import { store } from "../../app/store";
import { servicesApiSlice } from "../services/servicesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      servicesApiSlice.util.prefetch("getServices", "servicesList", {
        force: true,
      }),
    );
    // store.dispatch(
    //   usersApiSlice.util.prefetch("getUsers", "usersList", { force: true }),
    // );
  }, []);

  return <Outlet />;
};
export default Prefetch;
