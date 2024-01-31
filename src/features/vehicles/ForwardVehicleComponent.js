import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setVehicle } from "./selectedVehicleSlice";
import { setUserObj } from "../users/selectedUserSlice";
import { setIsVehiclesModalOpen } from "./isVehiclesModalOpenSlice";
import { setVehicleModalMode } from "./vehicleModalModeSlice";
import { setOldUserObj } from "../users/oldSelectedUserSlice.js";
import { setRefreshVehiclesByUser } from "../../hooks/refreshSlice";

const ForwardVehicleComponent = ({ vehicle }) => {
  const oldSelectedUserObj = useSelector(
    (state) => state.oldSelectedUser.oldSelectedUser,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOldUserObj(null));
  }, []);
  const setUpModal = (mode) => {
    dispatch(setUserObj(vehicle.user));
    dispatch(setVehicle(vehicle));
    dispatch(setIsVehiclesModalOpen(true));
    dispatch(setVehicleModalMode(mode));
    if (!oldSelectedUserObj) {
      console.log(`settting ${vehicle.user?._id}`);
      dispatch(setOldUserObj(vehicle.user));
      dispatch(setRefreshVehiclesByUser(false));
    }
  };
  return (
    <Button
      onClick={() => setUpModal("forward")}
      marginLeft="20px"
      size="sm"
      bg="transparent"
    >
      <FontAwesomeIcon w="4px" height="4px" color="#5ca832" icon={faShare} />
    </Button>
  );
};

export default ForwardVehicleComponent;
