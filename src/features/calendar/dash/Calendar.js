import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import useAuth from "../../../hooks/useAuth";
import ServicesList from "../../services/ServicesList";

const Calendar = () => {
  const url = window.location.href;

  const { username, isManager, isAdmin } = useAuth();
  const { garageId } = useParams();
  return (
    <>
      {/* <div>g: {garageId}</div> */}
      <ServicesList />
    </>
  );
};

export default Calendar;
