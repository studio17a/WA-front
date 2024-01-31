import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModalOpen } from "./loginModalOpenSlice";

const RequireAuth = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const UserInfo = useAuth();
  const allowed = UserInfo?.roles.some((role) => allowedRoles.includes(role));
  if (!allowed) {
    dispatch(setLoginModalOpen(true));
  }
  const content =
    allowed === true ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );

  return content;
};
export default RequireAuth;
