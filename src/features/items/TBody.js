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
import TRow from "./TRow";
const TBody = ({ items, view }) => {
  const tableContent = items?.map((item, index) => {
    if (index <= 10) {
      return <TRow view={view} item={item} />;
    }
  });
  return <>{tableContent}</>;
};
export default TBody;
