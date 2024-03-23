import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import PublicCalendarTable from "./PublicCalendarTable";
import LoginModal from "../../auth/LoginModal";
import AppointmentModal from "./AppointmentModal";
import { useSelector } from "react-redux";

const PublicCalendar = () => {
  const url = window.location.href;
  const selectedGarage = useSelector((state) => state.selectedGarage.garage);
  const { garageId } = useParams();
  const gid = { garageId: garageId };
  console.log(`selectedGarage`);
  console.log(selectedGarage);
  return (
    <>
      <Box
        width="96%"
        margin="2%"
        bg="#fff"
        borderRadius="10px"
        border="1px solid #eaeaea"
      >
        <LoginModal />
        <AppointmentModal key="appointmentModal" />
        <PublicCalendarTable
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        />
      </Box>
    </>
  );
};

export default PublicCalendar;
