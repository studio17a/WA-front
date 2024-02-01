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
  console.log(view);
  let tableContent = null;
  if (Array.isArray(vehicles[0])) {
    tableContent = vehicles[0]?.map((vehicle, index) => {
      return <VehiclesTRow vehicle={vehicle} view={view} />;
    });
  } else {
    tableContent = vehicles?.map((vehicle, index) => {
      if (view === "full") {
        if (index < 25) return <VehiclesTRow vehicle={vehicle} view={view} />;
      } else {
        return <VehiclesTRow vehicle={vehicle} view={view} />;
      }
    });
  }
  return <>{tableContent}</>;
};
export default VehiclesTBody;
