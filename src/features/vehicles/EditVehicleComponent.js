import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { setIsVehiclesModalOpen } from "./isVehiclesModalOpenSlice";
import { setVehicleModalMode } from "./vehicleModalModeSlice";
import { useDispatch } from "react-redux";
import { setVehicle } from "./selectedVehicleSlice";
import { setUserObj } from "../users/selectedUserSlice";

const EditVehicleComponent = ({ vehicle }) => {
  const dispatch = useDispatch();
  const setUpModal = (mode) => {
    dispatch(setUserObj(vehicle.user));
    dispatch(setVehicle(vehicle));
    dispatch(setIsVehiclesModalOpen(true));
    dispatch(setVehicleModalMode(mode));
  };
  return (
    <Button
      onClick={() => setUpModal("edit")}
      marginRight="20px"
      size="sm"
      colorScheme="yellow"
    >
      <FontAwesomeIcon w="4px" height="4px" color="#fff" icon={faEdit} />
    </Button>
  );
};

export default EditVehicleComponent;
