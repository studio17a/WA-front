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
import {
  FormControl,
  HStack,
  Input,
  useDisclosure,
  useToast,
  Box,
  Button,
  Container,
  Spinner,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Station from "./Station";
const Rows = ({ row, index, length }) => {
  return row.station.map((station) => (
    <Station row={row} ndex={index} length={length} station={station} />
  ));
};
export default Rows;
