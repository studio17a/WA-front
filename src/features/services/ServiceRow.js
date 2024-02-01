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
import { HStack, Button, Container, Box } from "@chakra-ui/react";
import {
  EditIcon,
  CloseIcon,
  faCheck,
  faCalendarCheck,
} from "@chakra-ui/icons";
import ClientRowPart from "./ClientRowPart";
import ItemRowPart from "./ItemRowPart";
import { useGetServicesQuery } from "./servicesApiSlice";
import { useDispatch } from "react-redux";
import { setIsServiceModalOpen } from "./isServiceModalOpenSlice";
import { setDate } from "../calendar/selectedDateSlice";
import { setServiceModalMode } from "./serviceModalModeSlice";
import DelServiceComponent from "./DelServiceComponent";
import ApproveService from "./ApproveService";
import { setModalButtonDisabled } from "./modalButtonDisabledSlice";
import { setVehicle } from "../vehicles/selectedVehicleSlice";
import { setUserObj } from "../users/selectedUserSlice";
import { setHour } from "./selectedHourSlice";
import { setMinute } from "./selectedMinuteSlice";
import { setEditedServiceId } from "./editedServiceIdSlice";
import { setItemsId } from "../items/selectedItemsSlice";
import { setStId } from "../st/selectedStSlice";
import ServiceDetails from "./ServiceDetails";
import { setStToDel } from "../st/stToDelSlice";
import SetServiceEditable from "./SetServiceEditable";
import { useSelector } from "react-redux";
import SetServiceDone from "./SetServiceDone";
import PdfComponent from "../pdf/PdfComponent";

const ServiceRow = ({
  toApprove,
  appointment,
  myClass,
  serviceStatusColor,
}) => {
  const selectedItems = useSelector((state) => state.selectedItems.itemsIds);
  // console.log(appointment);
  const dispatch = useDispatch();

  const setUpModal = ({ date, mode }) => {
    dispatch(setModalButtonDisabled(false));
    dispatch(setStToDel([]));
    dispatch(setStId(appointment.sts));
    dispatch(setServiceModalMode(mode));
    dispatch(setEditedServiceId(appointment._id));
    if (appointment.items) {
      dispatch(setItemsId(appointment.items));
      // console.log(`selectedItems`);
      // console.log(appointment.sts);
      // console.log(appointment.items);
    }
    dispatch(setUserObj(appointment.user));
    dispatch(setVehicle(appointment.vehicle));
    dispatch(setDate(date));
    dispatch(setHour(appointment.hour));
    dispatch(setMinute(appointment.minute));
    dispatch(setIsServiceModalOpen(true));
    // dispatch(setIsServiceModalOpen(true));
    // dispatch(
    //   setDate(format(new Date(`${year}/${month}/${day}`), "dd/MM/yyyy")),
    // );
    // setTime(hour);
  };
  if (appointment) {
    let items = appointment.items?.map((item) => (
      <ItemRowPart key={appointment._id} item={item} />
    ));
    // console.log(appointment.sts);
    return (
      <>
        <Td
          // bg={serviceStatusColor}
          width="20"
          className="minute"
          // className={myClass}
        >
          <span className="bold medium"> {appointment.minute}</span>
        </Td>
        <Td>
          <HStack>
            <DelServiceComponent appointment={appointment} />
            {toApprove === "suggested" ? (
              <ApproveService appointment={appointment} />
            ) : null}
            {toApprove === "done" ? (
              <SetServiceEditable appointment={appointment} />
            ) : null}
            {toApprove === "approved" ? (
              <SetServiceDone appointment={appointment} />
            ) : null}
            <PdfComponent appointment={appointment} />
          </HStack>
        </Td>
        <Td
          borderRadius="10px 0 0 10px"
          bg={serviceStatusColor}
          className={myClass}
        >
          <HStack spacing="24px">
            <div>
              {toApprove === "done" ? (
                <Button
                  isDisabled="true"
                  colorScheme="yellow"
                  size="sm"
                  onClick={() =>
                    setUpModal({ date: appointment.date, mode: "edit" })
                  }
                >
                  <EditIcon w={4} h={4} color="#fff" />
                </Button>
              ) : (
                <Button
                  colorScheme="yellow"
                  size="sm"
                  onClick={() =>
                    setUpModal({ date: appointment.date, mode: "edit" })
                  }
                >
                  <EditIcon w={4} h={4} color="#fff" />
                </Button>
              )}
            </div>
            <div>
              <ClientRowPart
                user={appointment.user}
                vehicle={appointment.vehicle}
              />
            </div>
          </HStack>
        </Td>

        <Td bg={serviceStatusColor} className={myClass}>
          {appointment._id}
          {appointment.items && items}
        </Td>
        <Td bg={serviceStatusColor} className={myClass}>
          {appointment.sts &&
            appointment.sts.map((st, index) => (
              <ServiceDetails key={index} index={index} st={st} />
            ))}
        </Td>

        <Td
          borderRadius=" 0 10px 10px 0"
          bg={serviceStatusColor}
          className={myClass}
        >
          {appointment.uwagi}
        </Td>
      </>
    );
  } else {
    return (
      <>
        <Td className="minute" className={myClass}></Td>
        <Td className={myClass}></Td>
        <Td className={myClass}></Td>
        <Td className={myClass}></Td>
        <Td className={myClass}></Td>
        <Td className={myClass}></Td>
      </>
    );
  }
};

export default ServiceRow;
