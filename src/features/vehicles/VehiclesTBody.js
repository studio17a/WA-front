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
import VehiclesTRow from "./VehiclesTRow";
const VehiclesTBody = ({ vehicles, view }) => {
  let tableContent = null;
  console.log(vehicles);
  if (Array.isArray(vehicles[0])) {
    tableContent = vehicles[0]?.map((vehicle, index) => {
      return <VehiclesTRow vehicle={vehicle} view={view} />;
    });
  } else {
    tableContent = vehicles?.map((vehicle, index) => {
      return <VehiclesTRow vehicle={vehicle} view={view} />;
    });
  }
  return <>{tableContent}</>;
};
export default VehiclesTBody;
