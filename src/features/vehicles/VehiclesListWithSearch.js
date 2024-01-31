import { Select, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setVehicle } from "./selectedVehicleSlice";
import { useSelector } from "react-redux";
import VehiclesSearchBox from "./VehiclesSearchBox";
import { useLazyGetVehiclesQuery } from "./vehiclesApiSlice";
import { Button, Spinner } from "@chakra-ui/react";

const VehiclesListSelect = () => {
  let vehiclesList;
  const [changeVehicle, setChangeVehicle] = useState(false);
  const [
    getVehicles,
    { data: vehicles, isLoading, isSuccess, isError, error },
  ] = useLazyGetVehiclesQuery();
  const useVehiclesList = async () => {
    await getVehicles();
    setChangeVehicle(!changeVehicle);
  };
  if (isSuccess) {
    vehiclesList = vehicles.ids?.map((vid) => vehicles.entities[vid]);
  }
  return (
    <VStack spacing="25px">
      <Button colorScheme="teal" variant="link" onClick={useVehiclesList}>
        <u>lista istniejących pojazdów</u>
      </Button>
      {isLoading && <Spinner />}
      {isSuccess && (
        <VehiclesSearchBox placeholder="szukaj pojazdu" data={vehiclesList} />
      )}
    </VStack>
  );
};

export default VehiclesListSelect;
