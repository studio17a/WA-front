import { useGetAllServicesMutation } from "./servicesApiSlice";
import { useGetServicesQuery } from "./servicesApiSlice";
import Service from "./Service";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import { useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch } from "react-redux";
import { setHour } from "./selectedHourSlice";
import { setMinute } from "./selectedMinuteSlice";
import ItemsModal from "../items/ItemsModal";
import { setIsServiceModalOpen } from "./isServiceModalOpenSlice";
import { setVehicle } from "../vehicles/selectedVehicleSlice";
import { setServiceModalMode } from "./serviceModalModeSlice";
import { setItemsId } from "../items/selectedItemsSlice";
import { AddIcon } from "@chakra-ui/icons";
import { setStId } from "../st/selectedStSlice";

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
import io from "socket.io-client";
import { useSelector } from "react-redux";
let socket;
const ServicesList = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  // const { username, isManager, isAdmin } = useAuth();
  const UserInfo = useAuth();
  const saveService = useSelector((state) => state.saveService.save);
  const [toApprove, setToApprove] = useState(false);
  const { garageId, day, month, year } = useParams();
  let idz = [];
  const dispatch = useDispatch();

  const [getServices, { data: updatedServices }] = useGetAllServicesMutation();

  const {
    data: services,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetServicesQuery(
    { gid: garageId, id: garageId, day, month, year },
    "servicesList",
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    socket = io("https://tg3vhf-3500.csb.app", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.emit("setup", UserInfo);
    socket.emit("join room", "updates");
    socket.on("xxx", () => {
      console.log("############################");
      console.log("zapisuje");
      getServices({ id: garageId, day, month, year });
    });
    socket.on("connected", () => setSocketConnected(true));
  });
  useEffect(() => {
    // getServices({ id: garageId, day, month, year });
    dispatch(
      setDate(format(new Date(`${year}/${month}/${day}`), "dd/MM/yyyy")),
    );
  }, []);
  // useEffect(() => {
  //   getServices({ id: garageId, day, month, year });
  // }, [saveService]);

  // const getAllServices = async () => {
  //   await getServices({ id: garageId, day, month, year }).then((data) => {
  //     console.log(`getServices`);
  //     console.log(data);
  //   });
  // };
  useTitle("techServices: Services List");

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
    console.log(`servicess`);
    console.log(services);
    const { ids, entities } = services;
    if (ids?.length > 0) {
      // console.log("idz1");
      let getIdz = () => {
        const b = hours.map((hour) =>
          ids.filter((serviceId) => entities[serviceId].hour == hour),
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
      idz.map((serviceId, i) => {
        let serviceStatusColor = "#edf9ff";
        if (entities[serviceId]?.completed === "done") {
          // setToApprove(false);
          serviceStatusColor = "#e1ffd9";
        } else if (entities[serviceId]?.completed === "approved") {
          // setToApprove(false);
          serviceStatusColor = "#edf9ff";
        } else if (entities[serviceId]?.completed === "suggested") {
          // setToApprove(true);
          serviceStatusColor = "#ffd9c7";
        } else {
          // setToApprove(true);
          serviceStatusColor = "#edf9ff";
        }
        h++;
        if (serviceId.length <= 1) {
          if (entities[serviceId]) {
          }
          // console.log("serviceId");
          // console.log(serviceId);
          const open = false;
          return (
            <Tr key={`tr${i}`}>
              <Td className="hour bgwhite rowspan" key={`h${i}`}>
                <div className="pabsolute">{h}</div>
              </Td>
              <ServiceRow
                toApprove={entities[serviceId]?.completed}
                serviceStatusColor={serviceStatusColor}
                myClass={`rowspan`}
                key={`sr${i}`}
                appointment={entities[serviceId]}
              />

              <Td className="rowspan">
                <Button
                  colorScheme="cyan"
                  size="sm"
                  onClick={() => setUpModal(hours[i], "add")}
                  key={`td${i}`}
                >
                  <AddIcon w={3} h={3} color="#fff" />
                </Button>
              </Td>
            </Tr>
          );
        } else {
          const tc = serviceId.map((id, index) => {
            if (entities[id]?.completed === "done") {
              // setToApprove(false);
              serviceStatusColor = "#e1ffd9";
            } else if (entities[id]?.completed === "approved") {
              // setToApprove(false);
              serviceStatusColor = "#edf9ff";
            } else if (entities[id]?.completed === "suggested") {
              // setToApprove(true);
              serviceStatusColor = "#ffd9c7";
            } else {
              // setToApprove(true);
              serviceStatusColor = "#edf9ff";
            }
            // console.log("id");
            // console.log(id);
            if (index == 0) {
              return (
                <Tr key={`tr${index}`}>
                  <Td
                    className="rowspan bgwhite hour"
                    key={`h${index}`}
                    rowSpan={serviceId.length}
                  >
                    <div className="pabsolute">{h}</div>
                  </Td>
                  <ServiceRow
                    toApprove={entities[id]?.completed}
                    serviceStatusColor={serviceStatusColor}
                    myClass={`rowspan`}
                    key={`sr${index}`}
                    appointment={entities[id]}
                  />
                  <Td
                    className="rowspan"
                    key={`tdrs${index}`}
                    rowSpan={serviceId.length}
                  >
                    <Button
                      size="sm"
                      colorScheme="cyan"
                      onClick={() => setUpModal(hours[i], "add")}
                      key={`tr${index}`}
                    >
                      <AddIcon w={3} h={3} color="#fff" />
                    </Button>
                  </Td>
                </Tr>
              );
            } else {
              return (
                <Tr key={`ttrsr${index}`}>
                  <ServiceRow
                    toApprove={entities[id]?.completed}
                    serviceStatusColor={serviceStatusColor}
                    myClass={""}
                    key={`trsr${index}`}
                    appointment={entities[id]}
                  />
                </Tr>
              );
            }
          });
          return tc;
        }
      });

    content = (
      <>
        <section className="scrollX">
          <NewServiceModal key="modal1" />
          <ItemsModal key="modal2" />
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th className="pabsolute" textAlign="center">
                    godz
                  </Th>
                  <Th textAlign="center">min</Th>
                  <Th textAlign="center"></Th>
                  <Th textAlign="center">klient</Th>
                  <Th textAlign="center">części</Th>
                  <Th textAlign="center">usługa</Th>
                  <Th textAlign="center">uwagi</Th>
                  <Th textAlign="center"></Th>

                  {/* <Th color="#aaa" fontSize="16px" className="thHour">
                  godzina
                </Th>
                <Th color="#aaa" fontSize="16px" className="thMinute">
                  minuta
                </Th>
                <Th color="#aaa" fontSize="16px">
                  klient
                </Th>
                <Th color="#aaa" fontSize="16px">
                  item
                </Th>
                <Th color="#aaa" fontSize="16px">
                  usługa
                </Th>
                <Th color="#aaa" fontSize="16px">
                  uwagi
                </Th>
                <Th color="#aaa" fontSize="16px"></Th> */}
                </Tr>
              </Thead>
              <Tbody>{tableContent}</Tbody>
              <Tfoot>
                <Tr>
                  <Th className="pabsolute" textAlign="center">
                    godz
                  </Th>
                  <Th textAlign="center">min</Th>
                  <Th textAlign="center"></Th>
                  <Th textAlign="center">klient</Th>
                  <Th textAlign="center">części</Th>
                  <Th textAlign="center">usługa</Th>
                  <Th textAlign="center">uwagi</Th>
                  <Th textAlign="center"></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </section>
      </>
    );
  }

  return content;
};
export default ServicesList;
