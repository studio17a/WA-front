import { useGetServicesQuery } from "./servicesApiSlice";
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
import { useEffect, useState } from "react";
import { setUserObj } from "../users/selectedUserSlice";
import { format } from "date-fns";
import ServiceRow from "./ServiceRow";
import NewServiceModal from "./NewServiceModal";
import { setDate } from "../calendar/selectedDateSlice";
import { useSelector } from "react-redux";

const Services = () => {
  const hourParts = [0, 30, 50];
  const stations = 2;
  const { garageId, day, month, year } = useParams();
  let idz = [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDate(format(new Date(`${year}/${month}/${day}`), "dd/MM/yyyy")),
    );
  }, []);
  useTitle("techServices: Services List");

  const {
    data: services,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetServicesQuery({ id: garageId, day, month, year }, "servicesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    // getServices({ id: garageId, day, month, year });
  }, []);
  const setUpModal = (hour, mode) => {
    dispatch(setStId([]));
    dispatch(setItemsId([]));
    dispatch(setUserObj(null));
    dispatch(setUserObj(null));
    dispatch(setVehicle(null));
    dispatch(setServiceModalMode(mode));
    dispatch(setIsServiceModalOpen(true));
    dispatch(
      setDate(format(new Date(`${year}/${month}/${day}`), "dd/MM/yyyy")),
    );
    setTime(hour);
  };
  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  const setTime = (hour) => {
    dispatch(setHour(hour));
    dispatch(setMinute("00"));
  };
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  if (isSuccess) {
    // console.log("idz1");
    const { ids, entities } = services;
    if (1 == 1) {
      // if (ids?.length > 0) {
      // console.log("idz1");
      let getIdz = () => {
        const b = hours.map((hour) =>
          hourParts.map((hp) =>
            ids.filter(
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
    console.log(`idz`);
    console.log(idz);
    const tableContent =
      idz?.length &&
      idz.map((hour, i) => {
        const row = hour.map((part, index) => (
          <td padding="5px 15px 5px 15px">
            <PublicAppointment
              className="publicAppointment"
              hour={i}
              hourPart={hourParts[index]}
              part={part}
            />
          </td>
        ));
        return (
          <tr>
            <td width="20px">{9 + i}</td>
            {row}
          </tr>
        );
      });

    content = (
      <>
        <Thead>
          <Tr>
            <Th textAlign="center">godzina</Th>
            <Th colspan="3" textAlign="center">
              minuta
            </Th>
          </Tr>
        </Thead>
        <Tbody>{tableContent}</Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign="center">godzina</Th>
            <Th colspan="3" textAlign="center">
              minuta
            </Th>
          </Tr>
        </Tfoot>
      </>
    );
  }

  return content;
};
export default Services;
