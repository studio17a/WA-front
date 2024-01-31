import { useGetVehiclesByUserIdMutation } from "./vehiclesApiSlice";
import { Select, VStack } from "@chakra-ui/react";
import { setItemsId } from "../items/selectedItemsSlice";
import {
  Spinner,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import VehiclesListItem from "./VehiclesListItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setVehicle } from "./selectedVehicleSlice";
import { useEffect, useState } from "react";

const VehiclesList = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [
    getVehiclesByUserId,
    { data: vehicles, isLoading, isSuccess, isError, error },
  ] = useGetVehiclesByUserIdMutation();

  const toast = useToast();
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const selectedVehicle = useSelector((state) => state.selectedVehicle.vehicle);

  const onVehicleIdChanged = (e) => {
    const newV = JSON.parse(e.target.value);
    if (newV?._id !== selectedVehicle[0]?._id) {
      console.log(`${newV?._id} : ${selectedVehicle[0]?._id}`);
      dispatch(setItemsId([]));
    }
    let newVehicle = [];
    newVehicle.push(JSON.parse(e.target.value));
    dispatch(setVehicle(JSON.parse(e.target.value)));
  };
  // const onChangeUser = async (e) => {};
  useEffect(() => {
    getVehiclesByUserId({ userId: selectedUserObj._id });
  }, [selectedUserObj, selectedVehicle]);

  let content;
  if (isLoading) content = <Spinner />;
  if (isError) {
    content = (
      <>
        <p>ten klient nie ma jeszcze przypisanych pojazdów</p>
      </>
    );
  }
  if (isSuccess) {
    const { ids, entities } = vehicles;
    const list =
      ids?.length &&
      ids.map((vehicleId) => (
        <VehiclesListItem
          key={vehicleId}
          vehicle={JSON.stringify(entities[vehicleId])}
          brand={entities[vehicleId].brand}
          reg={entities[vehicleId].reg}
        />
      ));
    // console.log(list);

    content = (
      <>
        <Select
          id="vehicle"
          name="username"
          variant="filled"
          placeholder="Lista pojazdów"
          value={selectedVehicle?.reg || ""}
          onChange={onVehicleIdChanged}
        >
          {" "}
          {list}
        </Select>
      </>
    );
  }
  return content;
};

export default VehiclesList;
