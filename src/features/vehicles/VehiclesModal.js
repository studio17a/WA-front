import {
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
import ServiceDetails from "../services/ServiceDetails";
import { useDisclosure } from "@chakra-ui/react";
import NewVehicleForm from "./NewVehicleForm";
import { Button } from "@chakra-ui/react";
import VehiclesTable from "./VehiclesTable";
import useAuth from "../../hooks/useAuth";
import ChangeUserComponent from "../users/ChangeUserComponent";

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
  const VehicleInfo = useAuth();
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
        <ModalContent maxWidth="80%">
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="10px 100px 60px 100px">
            {vehicleModalMode === "forward" && <h2 className="gray bold"></h2>}
            {vehicleModalMode === "edit" ||
            vehicleModalMode === "add" ||
            vehicleModalMode === "forward" ? (
              <>
                {vehicleModalMode !== "add" && <ChangeUserComponent />}
                <NewVehicleForm isAdmin={VehicleInfo.isAdmin} mode={mode} />
              </>
            ) : vehicleModalMode === "service" ? (
              <ServiceDetails />
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
