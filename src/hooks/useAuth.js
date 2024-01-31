import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  if (!token) return null;
  let isManager = false;
  let isAdmin = false;
  let status = "Employeee";
  const decoded = jwtDecode(token);
  // console.log(decoded);
  const { _id, username, email, phone, roles, garageId } = decoded.UserInfo;

  // console.log(_id);
  // console.log(username);
  // console.log(email);
  // console.log(phone);
  // console.log(roles);
  // console.log(garageId);
  isManager = roles.includes("Manager");
  isAdmin = roles.includes("Admin");

  if (isManager) status = "Manager";
  if (isAdmin) status = "Admin";

  return {
    _id: _id,
    username: username,
    roles: roles,
    status: status,
    email: email,
    phone: phone,
    isManager: isManager,
    isAdmin: isAdmin,
    garageId: garageId,
  };
};
export default useAuth;
