import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import VehiclesTable from "./VehiclesTable";
import { Spinner } from "@chakra-ui/react";
import { useGetVehiclesQuery } from "./vehiclesApiSlice";
import { useParams } from "react-router-dom";

const VehiclesView = () => {
  const { garageId } = useParams();
  const { vehicles, isLoading, isSuccess, isError, error } =
    useGetVehiclesQuery(
      "vehiclesList",
      {
        selectFromResult: ({ data }) => ({
          vehicles: data?.ids.map((id) => data?.entities[id]),
        }),
      },
      { gid: garageId },
    );

  // const {
  //   data: vehicles,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetVehiclesQuery();

  let content = <Spinner />;
  // const { ids, entities } = vehicles;
  // const vehiclesList = ids?.map((vid) => entities[vid]);
  console.log(vehicles);
  content = (
    <>
      <VehiclesTable vehiclesRaw={vehicles} />
    </>
  );
  return content;
};
export default VehiclesView;
