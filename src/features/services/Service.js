import { useGetPublicServicesMutation } from "./servicesApiSlice";
import Service from "./Service";
import useTitle from "../../hooks/useTitle";
import { useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch } from "react-redux";
import { setHour } from "./selectedHourSlice";
import { setMinute } from "./selectedMinuteSlice";
import { setIsServiceModalOpen } from "./isServiceModalOpenSlice";
import { setVehicle } from "../vehicles/selectedVehicleSlice";
import { setServiceModalMode } from "./serviceModalModeSlice";
import { setItemsId } from "../items/selectedItemsSlice";
import { AddIcon } from "@chakra-ui/icons";
import { setStId } from "../st/selectedStSlice";
import PublicAppointment from "../calendar/public/PublicAppointment";

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
  Button,
} from "@chakra-ui/react";
import { setUserObj } from "../users/selectedUserSlice";
import { format } from "date-fns";
import ServiceRow from "./ServiceRow";
import NewServiceModal from "./NewServiceModal";
import { setDate } from "../calendar/selectedDateSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Services = ({ mode, garageId, day, month, year }) => {
  const hourParts = [0, 30, 50];
  const stations = 2;
  const params = useParams();
  if (params.garageId) {
    garageId = params.garageId;
    day = params.day;
    month = params.month;
    year = params.year;
  }
  let idz = [];
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.selectedDate.date);
  const [
    getServices,
    { data: services, isLoading, isSuccess, isError, error },
  ] = useGetPublicServicesMutation();
  const setUpModal = (hour, mode) => {
    dispatch(setStId([]));
    dispatch(setItemsId([]));
    dispatch(setUserObj(null));
    dispatch(setUserObj(null));
    dispatch(setVehicle(null));
    dispatch(setServiceModalMode(mode));
    dispatch(setIsServiceModalOpen(true));
    setTime(hour);
  };
  let content;
  useEffect(() => {
    const split = selectedDate?.split("/");

    console.log(garageId, split[0], split[1], split[2]);
    getServices({
      id: garageId,
      day: split[0],
      month: split[1],
      year: split[2],
    });
  }, [selectedDate]);
  if (isLoading) content = <PulseLoader color={"#aaa"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  const setTime = (hour) => {
    dispatch(setHour(hour));
    dispatch(setMinute("00"));
  };
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  if (isSuccess) {
    console.log(services);
    const { ids, entities } = services;
    if (1 == 1) {
      // if (ids?.length > 0) {
      // console.log("idz1");
      let getIdz = () => {
        const b = hours.map((hour) =>
          hourParts.map((hp) =>
            ids?.filter(
              (serviceId) =>
                entities[serviceId].hour == hour &&
                entities[serviceId].minute == hp,
            ),
          ),
        );
        return b;
      };
      let a = getIdz();
      [...idz] = a;
    } else {
      // console.log("idz2");
      [...idz] = hours.map((h) => []);
    }
    let h = 8;
    const tableContent =
      idz?.length &&
      idz.map((hour, i) => {
        const row = hour.map((part, index) => (
          <Td className="garageTd">
            <PublicAppointment
              mode={mode}
              hour={i}
              hourPart={hourParts[index]}
              part={part}
            />
          </Td>
        ));
        return (
          <Tr>
            <Td className="small garageTd" width="20px">
              {9 + i}
            </Td>
            <span className="small">{row}</span>
          </Tr>
        );
      });

    content = (
      <>
        <Thead>
          <Tr>
            <Th textAlign="center">
              <span className="small">godzina</span>
            </Th>
            <Th colSpan="3" textAlign="center">
              <span className="small">minuta</span>
            </Th>
          </Tr>
        </Thead>
        <Tbody>{tableContent}</Tbody>
        {!mode && (
          <Tfoot>
            <Tr>
              <Th textAlign="center">godzina</Th>
              <Th colSpan="3" textAlign="center">
                minuta
              </Th>
            </Tr>
          </Tfoot>
        )}
      </>
    );
  }

  return content;
};
export default Services;
