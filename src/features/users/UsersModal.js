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
import { setIsUsersModalOpen } from "./isUsersModalOpenSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import NewUserForm from "./NewUserForm";
import { Button } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

const UsersModal = ({ children }) => {
  const { garageId } = useParams();

  const UserInfo = useAuth();
  let isadmin = false;
  if (UserInfo?.roles.isadmin.filter((g) => g._id === garageId).length > 0)
    isadmin = true;
  const userModalMode = useSelector(
    (state) => state.userModalMode.userModalMode,
  );
  const dispatch = useDispatch();
  const isUsersModalOpen = useSelector(
    (state) => state.isUsersModalOpen.isUsersModalOpen,
  );
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  useEffect(() => {
    // console.log("click");
    if (isUsersModalOpen == true) {
      // console.log("click1");
      onOpen();
    } else {
      // console.log("click2");
      onClose();
    }
  }, [isUsersModalOpen]);
  const closeModal = () => {
    dispatch(setIsUsersModalOpen(false));
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
            <NewUserForm isAdmin={isadmin} mode={userModalMode} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

  return content;
};

export default UsersModal;
