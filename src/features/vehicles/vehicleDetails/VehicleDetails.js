import { useGetServicesByVehicleIdMutation } from "../../services/servicesApiSlice";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import ServiceInfoRow from "../../services/serviceInfo/ServiceInfoRow";
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

const VehicleDetails = () => {
  const [servicesContent, setServicesContent] = useState(<Spinner />);
  const { vehicleId } = useParams();
  const [
    getServices,
    { data: services, isLoading, isSuccess, isError, error },
  ] = useGetServicesByVehicleIdMutation();
  useEffect(() => {
    getServices(vehicleId);
  }, []);
  useEffect(() => {
    console.log(services);
    if (services) {
      const { ids, entities } = services;
      const servicesList = ids?.map((sid) => entities[sid]);
      if (servicesList) {
        const content = servicesList?.map((s) => (
          <ServiceInfoRow service={s} />
        ));
        setServicesContent(content);
      }
    }
  }, [services]);
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>status</Th>
              <Th>usługa</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>{servicesContent}</Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
              <Th>nazwa email tel</Th>
              <Th>pojazdy</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default VehicleDetails;
