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
import Parts from "./Parts";
const Station = ({ row, station, index, length }) => {
  return station.parts.map((part) => (
    <Parts row={row} index={index} length={length} part={part} />
  ));
};
export default Station;
