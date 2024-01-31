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
import { setServiceModalMode } from "../../../services/serviceModalModeSlice";
import { setIsServiceModalOpen } from "../../../services/isServiceModalOpenSlice";
import { setHour } from "../../../services/selectedHourSlice";
import { setMinute } from "../../../services/selectedMinuteSlice";
import { setUserObj } from "../../../users/selectedUserSlice";
import { useDispatch } from "react-redux";
const Parts = ({ row, part, index, length }) => {
  const dispatch = useDispatch();
  const setAppointment = ({ hour, minute }) => {
    dispatch(setUserObj(null));
    dispatch(setServiceModalMode("add"));
    dispatch(setIsServiceModalOpen(true));
    dispatch(setHour(hour));
    dispatch(setMinute(minute));
  };
  // console.log(part);
  return (
    <Td style={{ cursor: "pointer" }} p={1}>
      {part.status ? (
        <Button
          // isDisabled={part.status}
          w="100%"
          size="xs"
          bg="#ffbfbf"
          onClick={() => setAppointment({ hour: row.id, minute: part.id })}
          _hover={{ bg: "#d6a3a3" }}
        >
          {part.id}
        </Button>
      ) : (
        <Button
          // isDisabled={part.status}
          w="100%"
          size="xs"
          bg="#c2ecff"
          onClick={() => setAppointment({ hour: row.id, minute: part.id })}
          _hover={{ bg: "#b9d4eb" }}
        >
          {part.id}
        </Button>
      )}
    </Td>
  );
};

export default Parts;
