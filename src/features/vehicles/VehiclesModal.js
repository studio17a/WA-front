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
import { useDispatch } from "react-redux";
import { setIsVehiclesModalOpen } from "./isVehiclesModalOpenSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ServiceRow from "../services/ServiceRow";
import { useDisclosure } from "@chakra-ui/react";
import NewVehicleForm from "./NewVehicleForm";
import { Button } from "@chakra-ui/react";
import VehiclesTable from "./VehiclesTable";
import useAuth from "../../hooks/useAuth";
import ChangeUserComponent from "../users/ChangeUserComponent";
import ServiceDetailsTable from "../services/ServiceDetailsTable";
import { useParams } from "react-router-dom";

const VehiclesModal = ({ children, mode }) => {
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const vehiclesByUser = useSelector(
    (state) => state.vehiclesByUser.vehiclesByUser,
  );
  const vehicleModalMode = useSelector(
    (state) => state.vehicleModalMode.vehicleModalMode,
  );
  const { garageId } = useParams();

  const UserInfo = useAuth();
  let isadmin = false;
  if (UserInfo?.roles.isadmin.filter((g) => g._id === garageId).length > 0)
    isadmin = true;
  const dispatch = useDispatch();
  const isVehiclesModalOpen = useSelector(
    (state) => state.isVehiclesModalOpen.isVehiclesModalOpen,
  );
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  useEffect(() => {
    // console.log("click");
    if (isVehiclesModalOpen == true) {
      // console.log("click1");
      onOpen();
    } else {
      // console.log("click2");
      onClose();
    }
  }, [isVehiclesModalOpen]);
  const closeModal = () => {
    dispatch(setIsVehiclesModalOpen(false));
  };
  const content = (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent maxWidth="95%">
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="10px 100px 60px 100px">
            {vehicleModalMode === "forward" && <h2 className="gray bold"></h2>}
            {vehicleModalMode === "edit" ||
            vehicleModalMode === "add" ||
            vehicleModalMode === "forward" ? (
              <>
                {vehicleModalMode !== "add" && <ChangeUserComponent />}
                <NewVehicleForm isAdmin={isadmin} mode={mode} />
              </>
            ) : vehicleModalMode === "service" ? (
              <Box
                border="1px solid #eee"
                borderRadius="10px"
                overflowY="auto"
                className="left"
                position="relative"
                maxWidth="100%"
              >
                <TableContainer overflowY="scroll" className=" fixedTable">
                  <Table variant="simple">
                    <Thead>
                      <Th></Th>
                      <Th>data</Th>
                      <Th>właściciel</Th>
                      <Th>usługa</Th>
                      <Th>części</Th>
                      <Th>stan</Th>
                      <Th>uwagi</Th>
                    </Thead>
                    <Tbody>
                      <ServiceDetailsTable />
                    </Tbody>
                    <Thead>
                      <Th></Th>
                      <Th>data</Th>
                      <Th>właściciel</Th>
                      <Th>usługa</Th>
                      <Th>części</Th>
                      <Th>stan</Th>
                      <Th>uwagi</Th>
                    </Thead>
                    <Tbody>
                      <ServiceDetailsTable />
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <VehiclesTable
                user={selectedUserObj}
                view="raw"
                vehiclesRaw={vehiclesByUser}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

  return content;
};

export default VehiclesModal;
