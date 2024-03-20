import { useLocation, Navigate, Outlet, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModalOpen } from "./loginModalOpenSlice";

const RequireAuth = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const UserInfo = useAuth();
  const { garageId } = useParams();
  const allowed = UserInfo?.roles.filter((g) => g._id === garageId).length > 0;
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
