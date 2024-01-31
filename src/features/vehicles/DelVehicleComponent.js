import { Button, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDelVehicleMutation } from "./vehiclesApiSlice.js";
import { useState, useEffect } from "react";
import { setRefreshVehiclesByUser } from "../../hooks/refreshSlice";
import { useDispatch } from "react-redux";
import { setUserObj } from "../users/selectedUserSlice";

const DelVehicleComponent = ({ vehicle }) => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(
    <Button
      onClick={() => {
        delConfirm();
      }}
      size="sm"
      colorScheme="red"
    >
      <FontAwesomeIcon w="4px" height="4px" color="#fff" icon={faXmark} />
    </Button>,
  );
  const [delVehicle, { data: resp, isLoading, isSuccess, isError, error }] =
    useDelVehicleMutation();
  let content = confirm;
  const delConfirm = () => {
    console.log(`confirm`);
    setConfirm(
      <Button
        onClick={() => {
          deleteVehicle();
        }}
        size="sm"
        colorScheme="red"
      >
        Usunąć pozycję?
      </Button>,
    );
  };
  const deleteVehicle = () => {
    dispatch(setRefreshVehiclesByUser(false));
    dispatch(setUserObj(vehicle.user));
    console.log("fff");
    delVehicle({ vid: vehicle._id });
  };
  useEffect(() => {
    console.log(resp);
  }, [resp]);
  if (isLoading) {
    content = (
      <Button size="sm" colorScheme="red">
        <Spinner />
      </Button>
    );
  }
  if (isSuccess) {
    dispatch(setRefreshVehiclesByUser(true));
    content = (
      <Button size="sm" colorScheme="red">
        <FontAwesomeIcon w="4px" height="4px" color="#fff" icon={faXmark} />
      </Button>
    );
  }
  if (isError) {
    content = <p>{error.body.message}</p>;
  }
  return content;
};

export default DelVehicleComponent;
