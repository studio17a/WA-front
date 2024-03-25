import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";

const useAuth = () => {
  const { garageId } = useParams();
  const token = useSelector(selectCurrentToken);
  if (!token) return null;
  let status = "Employeee";
  const decoded = jwtDecode(token);
  const { _id, username, email, phone, roles, garages } = decoded.UserInfo;
  // console.log(_id);
  // console.log(username);
  // console.log(email);
  // console.log(phone);
  // console.log(roles);
  // console.log(garageId);
  // isManager = roles.includes("Manager");
  // isAdmin = roles.includes("Admin");

  return {
    _id: _id,
    username: username,
    roles: roles,
    status: status,
    email: email,
    phone: phone,
    garages: garages,
  };
};
export default useAuth;
