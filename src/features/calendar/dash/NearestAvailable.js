import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Rows from "./nearest/Rows";
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
import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useGetNearestServicesMutation } from "../../services/servicesApiSlice";
import { useLazyGetServicesQuery } from "../../services/servicesApiSlice";
import { useDispatch } from "react-redux";
import { setHour } from "../../services/selectedHourSlice";
import { setServiceModalMode } from "../../services/serviceModalModeSlice";
import { setMinute } from "../../services/selectedMinuteSlice";
import { setIsServiceModalOpen } from "../../services/isServiceModalOpenSlice";
import daily from "./daily";
import { setDate } from "../selectedDateSlice";

const NearestAvailable = ({ children }) => {
  const [
    getNServices,
    { data: nServices, isLoading, isSuccess, isError, error },
  ] = useGetNearestServicesMutation();
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.selectedDate.date);
  const [dailyData, setDailyData] = useState(daily);
  let display = true;
  const [tableContent, setTableContent] = useState();
  const [takenBg, setTakenBg] = useState("");
  const [freeBg, setFreeBg] = useState("");
  // const { garageId } = useParams();
  const { garageId, day, month, year } = useParams();

  const setANewDate = (pm) => {
    rows = (
      <Tr>
        <Td></Td>
        <Td></Td>
      </Tr>
    );
    // setDisplayFunction(false);
    const [paramsDay, paramsMonth, paramsYear] = selectedDate.split("/");
    let today = new Date(`${paramsYear}-${paramsMonth}-${paramsDay}`);
    if (pm == "plus") {
      const newDate = today.setDate(today.getDate() + 1);
      dispatch(setDate(format(new Date(newDate), "dd/MM/yyyy")));
      //format(new Date(newDate), "dd/MM/yyyy")
    } else if (pm == "minus") {
      const newDate = today.setDate(today.getDate() - 1);
      dispatch(setDate(format(new Date(newDate), "dd/MM/yyyy")));
    }
  };
  // const [
  //   triggerServiceQuery,
  //   { data: services, isLoading, isSuccess, isError, error },
  // ] = useLazyGetServicesQuery(
  //   { id: garageId, day, month, year },
  //   "servicesList",
  //   {
  //     pollingInterval: 15000,
  //     refetchOnFocus: true,
  //     refetchOnMountOrArgChange: true,
  //   },
  // );
  const setAppointment = ({ hour, minute }) => {
    dispatch(setServiceModalMode("add"));
    dispatch(setIsServiceModalOpen(true));
    dispatch(setHour(hour));
    dispatch(setMinute(minute));
  };
  const selectedMinute = useSelector((state) => state.selectedMinute.minute);
  const isServiceModalOpen = useSelector(
    (state) => state.isServiceModalOpen.isServiceModalOpen,
  );
  let updated = daily;
  const updateDaily = (filterdHour, filteredPart) => {
    body = <Spinner />;
    const cal = updated.map((obj) => {
      //Update only if the condition is matching
      if (obj.id === filterdHour) {
        const station = obj.station.map((station) => {
          const parts = station.parts.map((parts) => {
            if (parts.id === filteredPart) {
              return {
                ...parts,
                status: true,
              };
            }
            return { ...parts };
          });
          return {
            ...station,
            parts,
          };
        });
        // return { ...obj };
        return { ...obj, station };
      }
      //else return the object
      return { ...obj };
    });
    updated = cal;
  };
  const updadeDate = async (date) => {
    await setDate(date);
  };
  let body = "";
  let rows = "";

  useEffect(() => {
    console.log(selectedMinute);
    body = <Spinner />;
    if (selectedDate) {
      const [paramsDay, paramsMonth, paramsYear] = selectedDate.split("/");
      // console.log(`updating ${paramsDay}, ${paramsMonth}, ${paramsYear}`);
      getNServices(
        { id: garageId, day: paramsDay, month: paramsMonth, year: paramsYear },
        false,
      );
      // triggerServiceQuery(
      //   { id: garageId, day: paramsDay, month: paramsMonth, year: paramsYear },
      //   false,
      // );
      // updated = ids.map((id) => updateDaily(daily, entities[id].id));
    }
  }, [selectedDate, isServiceModalOpen, selectedMinute]);
  useEffect(() => {
    // console.log(`setting date: ${day}/${month}/${year}`);
    updadeDate(`${day}/${month}/${year}`);
    // setDate(`${day}/${month}/${year}`);
    // updated = ids.map((id) => updateDaily(daily, entities[id].id));
  }, []);
  if (isLoading) {
    rows = <Spinner />;
  }
  const generateBody = async (ids, entities) => {
    await ids.map((serviceId) =>
      updateDaily(entities[serviceId].hour, entities[serviceId].minute),
    );
  };
  // const setDisplayFunction = () => {
  //   setDisplay("block");
  // };
  if (isSuccess) {
    // updated = updateDaily(daily, "11", "30");

    rows = (
      <Tr>
        <Td></Td>
        <Td></Td>
      </Tr>
    );

    const { ids, entities } = nServices;
    console.log(nServices);
    generateBody(ids, entities);
    const length = updated.length;

    rows = updated.map((row, index) => {
      // console.log(`index: ${index}`);
      return (
        <Tr>
          <Td>{row.id}</Td>
          <Rows index={index} length={length} row={row} />
        </Tr>
      );
    });
  }
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Popover>
        <PopoverTrigger>
          <Button fontSize="1.3em" colorScheme="white" color="#fff">
            <FontAwesomeIcon color="#42c5f5" icon={faCalendarPlus} />
          </Button>
        </PopoverTrigger>
        <PopoverContent fontSize="14px">
          <PopoverArrow />
          <PopoverCloseButton marginTop="5px" size="bg" />
          <PopoverHeader>
            <Button bg="transparent" onClick={() => setANewDate("minus")}>
              <FontAwesomeIcon color="#42c5f5" icon={faAngleLeft} />
            </Button>
            {selectedDate}
            <Button bg="transparent" onClick={() => setANewDate("plus")}>
              <FontAwesomeIcon color="#42c5f5" icon={faAngleRight} />
            </Button>
          </PopoverHeader>
          <PopoverBody>
            <Table size="xs">
              <Thead>
                <Tr>
                  {/* <Th>godz.</Th>
    <Th>00</Th>
    <Th>30</Th> */}
                </Tr>
              </Thead>
              {display && <Tbody>{rows}</Tbody>}
            </Table>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NearestAvailable;
