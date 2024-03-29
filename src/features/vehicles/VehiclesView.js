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
  Progress,
} from "@chakra-ui/react";
import VehiclesTable from "./VehiclesTable";
import { Spinner } from "@chakra-ui/react";
import { useGetVehiclesQuery } from "./vehiclesApiSlice";
import VehiclesModal from "./VehiclesModal";
import { useParams } from "react-router-dom";

const VehiclesView = () => {
  const { garageId } = useParams();
  let content = <Progress size="xs" isIndeterminate />;
  const {
    data: vehicles,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVehiclesQuery({ gid: garageId }, "vehiclesList", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  // const { ids, entities } = vehicles;
  // const vehiclesList = ids?.map((vid) => entities[vid]);
  if (isSuccess) {
    const { ids, entities } = vehicles;
    const vehiclesList = ids?.map((iid) => entities[iid]);
    content = (
      <>
        <VehiclesModal key="vehiclesModal" />
        <VehiclesTable user={null} view="full" vehiclesRaw={vehiclesList} />
      </>
    );
  }
  return content;
};
export default VehiclesView;
