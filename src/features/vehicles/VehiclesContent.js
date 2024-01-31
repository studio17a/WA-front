import { useGetVehiclesByUserIdMutation } from "../vehicles/vehiclesApiSlice";
import { useState, useEffect } from "react";
import VehiclesTable from "./VehiclesTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserObj } from "../users/selectedUserSlice";
import { setIsVehiclesModalOpen } from "./isVehiclesModalOpenSlice";
import { setVehicleModalMode } from "./vehicleModalModeSlice";
import { Button, Spinner, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { setVehiclesByUser } from "./vehiclesByUserSlice";
import { refresh } from "../../hooks/refreshSlice";
import { setRefreshVehiclesByUser } from "../../hooks/refreshSlice";

const VehiclesContent = ({ userId, user }) => {
  const dispatch = useDispatch();
  const isVehiclesModalOpen = useSelector(
    (state) => state.isVehiclesModalOpen.isVehiclesModalOpen,
  );
  const refreshVehicles = useSelector(
    (state) => state.refresh.refresh.vehiclesByUser,
  );
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const oldSelectedUserObj = useSelector(
    (state) => state.oldSelectedUser.oldSelectedUser,
  );
  const [vehicles, setVehicles] = useState();
  const [err, setErr] = useState(false);
  const [
    getVehiclesByUserId,
    { data: vehiclesBU, isLoading, issuccess, isError, error },
  ] = useGetVehiclesByUserIdMutation();
  const findVehicles = (userId) => {
    setVehiclesContent(<Spinner />);
    getVehiclesByUserId({ userId });
  };

  const [vehiclesContent, setVehiclesContent] = useState();
  useEffect(() => {
    console.log(`zzzzzzzzzzzzzzzzzz ${refreshVehicles}, ${selectedUserObj}, `);
    console.log(selectedUserObj);
    if (
      refreshVehicles &&
      (selectedUserObj?._id === userId || oldSelectedUserObj?._id === userId)
    ) {
      findVehicles(userId);
      dispatch(setRefreshVehiclesByUser(false));
    }
  }, [refreshVehicles]);
  useEffect(() => {
    setVehiclesContent(
      <Button
        onClick={() => {
          findVehicles(userId);
        }}
        size="sm"
        colorScheme="yellow"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>,
    );
  }, [userId]);
  if (isError) {
    if (!err) {
      setErr(true);
      setVehiclesContent(
        <>
          <span>
            <Button
              bg="transparent"
              onClick={() => {
                clearTheVehicles();
              }}
            >
              <FontAwesomeIcon color="red" marginLeft="5px" icon={faXmark} />
            </Button>{" "}
          </span>
          <span className="small gray"> zamknij</span>
          <Box className="vehiclesBox" maxHeight="200px">
            <VehiclesTable user={user} vehiclesRaw={[]} view="raw" />
          </Box>
        </>,
      );
      console.log(error);
    }
  }
  const clearTheVehicles = () => {
    setVehiclesContent(
      <Button
        onClick={() => {
          findVehicles(userId);
        }}
        size="sm"
        colorScheme="yellow"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>,
    );
  };
  useEffect(() => {
    if (vehiclesBU) {
      const { ids, entities } = vehiclesBU;
      if (ids?.length > 0) {
        const is = ids.map((id) => entities[id]);
        setVehicles(is);
        console.log(`sss: ${user?._id}`);
        setVehiclesContent(
          <>
            <span>
              <Button
                leftIcon={
                  <FontAwesomeIcon
                    padding="50px"
                    margin="50px"
                    color="red"
                    icon={faXmark}
                  />
                }
                bg="transparent"
                onClick={() => {
                  clearTheVehicles();
                }}
              >
                <span padding="50px" margin="50px" className="small gray">
                  zamknij
                </span>
              </Button>{" "}
            </span>{" "}
            <span className="small gray">
              <Button
                bg="transparent"
                onClick={() => {
                  dispatch(setIsVehiclesModalOpen(true));
                  dispatch(setVehicleModalMode("review"));
                  dispatch(setUserObj(user));
                  dispatch(setVehiclesByUser(is));
                }}
              >
                <FontAwesomeIcon
                  color="gray"
                  marginLeft="15px"
                  icon={faUpRightAndDownLeftFromCenter}
                />
              </Button>
            </span>
            <Box marginTop="15px" className="vehiclesBox" maxHeight="200px">
              <VehiclesTable user={user} vehiclesRaw={is} view="raw" />
            </Box>
          </>,
        );
      }
    }
  }, [vehiclesBU, isError]);
  return <>{vehiclesContent}</>;
};
export default VehiclesContent;
