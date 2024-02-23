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
import VehiclesTRow from "../vehicles/VehiclesTRow";
import StsListItem from "../st/StsListItem";
import TRow from "../items/TRow";

const ServiceDetailSRow = ({ service }) => {
  const itemsList = service.items?.map((item) => (
    <TRow view="service" item={item} />
  ));
  //   console.log(service);
  return (
    <>
      {" "}
      <Tr>
        <Td></Td>
        <Td>{service.date}</Td>
        <Td>
          <Box
            border="1px solid #eee"
            borderRadius="10px"
            overflowY="auto"
            className="left w100 fixedTable"
            maxWidth="580px"
          >
            <VehiclesTRow view="service" vehicle={service.vehicle} />
          </Box>
        </Td>
        <Td>
          <Table>
            <Tbody></Tbody>
          </Table>
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
        <Td></Td>
        <Td></Td>
      </Tr>
    </>
  );
};

export default ServiceDetailSRow;
