import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, email, phone, status, garageId } = useAuth();
  console.log(username);
  console.log(phone);
  console.log(status);
  console.log(email);
  console.log(garageId);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      ></button>
    );
  }

  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User: {username}</p>
      <p>Status: {status}</p>
      <p>garage: {garageId}</p>
    </footer>
  );
  return content;
};
export default DashFooter;
