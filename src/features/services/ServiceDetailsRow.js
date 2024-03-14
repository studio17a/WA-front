import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Box,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Spinner,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import StsListItem from "../st/StsListItem";
import VehiclesTRow from "../vehicles/VehiclesTRow";
import TRow from "../items/TRow";

const ServiceDetailSRow = ({ service }) => {
  console.log("service:");
  console.log(service);
  const itemsList = service.items?.map((item) => (
    <TRow view="service" item={item} />
  ));
  //   console.log(service);
  return (
    <>
      {" "}
      <Tr>
        <Td></Td>
        <Td>
          <p className="bold">{service.date}</p>
          {/* <p>{service._id}</p> */}
          <p className=" gray">
            {service.hour} : {service.minute}
          </p>
        </Td>
        <Td>{service.user.username}</Td>
        <Td>
          <Box
            border="1px solid #eee"
            borderRadius="10px"
            overflowY="auto"
            className="left w100 fixedTable"
            maxWidth="580px"
          >
            {service.st?.map((st) => (
              <StsListItem st={st} />
            ))}
            {/* <VehiclesTRow view="service" vehicle={service.vehicle} /> */}
          </Box>
        </Td>
        <Td>
          <Box
            border="1px solid #eee"
            borderRadius="10px"
            overflowY="auto"
            className="left w100 fixedTable"
            maxWidth="580px"
          >
            <TableContainer overflowY="scroll" className="left w100 fixedTable">
              <Table variant="simple">
                <Tbody>{itemsList}</Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Td>
        <Td>{service.completed}</Td>
        <Td></Td>
      </Tr>
    </>
  );
};

export default ServiceDetailSRow;
