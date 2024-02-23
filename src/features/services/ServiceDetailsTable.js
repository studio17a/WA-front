import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Spinner,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ServiceRow from "./ServiceRow";
import ServiceDetailSRow from "./ServiceDetailsRow";
import { useSelector } from "react-redux";
import { useGetServicesByVehicleIdMutation } from "./servicesApiSlice";
import { useParams } from "react-router-dom";

const ServiceDetailsTable = () => {
  const vehiclesByUser = useSelector(
    (state) => state.vehiclesByUser.vehiclesByUser,
  );
  const [content, setContent] = useState(<Spinner />);

  const { garageId } = useParams();
  const [
    getServices,
    { data: services, isLoading, isSuccess, isError, error },
  ] = useGetServicesByVehicleIdMutation();

  useEffect(() => {
    setContent(<Spinner />);
    getServices({ garageId: garageId, vehicleId: vehiclesByUser[0]._id });
  }, []);

  useEffect(() => {
    if (services) {
      const { ids, entities } = services;
      const servicesList = ids?.map((sid) => (
        <ServiceDetailSRow service={entities[sid]} />
      ));

      setContent(servicesList);
    }
  }, [services]);
  return <>{content}</>;
};

export default ServiceDetailsTable;
