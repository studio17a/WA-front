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
import ChangeUserComponent from "../users/ChangeUserComponent";
import { setIsItemsModalOpen } from "./isItemsModalOpenSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLazyGetUsersQuery } from "../users/usersApiSlice";
import { useDisclosure } from "@chakra-ui/react";
import NewItemForm from "./NewItemForm";
import UsersListSelect from "../users/UsersListSelect";
import ItemsTable from "./ItemsTable";
import { Button } from "@chakra-ui/react";

const ItemsModal = ({ children, mode }) => {
  let usersList;
  const itemsByUser = useSelector((state) => state.itemsByUser.itemsByUser);
  const selectedUser = useSelector((state) => state.selectedUser.selectedUser);
  const [changeUser, setChangeUser] = useState(false);
  const dispatch = useDispatch();
  const isItemsModalOpen = useSelector(
    (state) => state.isItemsModalOpen.isItemsModalOpen,
  );
  const itemModalMode = useSelector(
    (state) => state.itemModalMode.itemModalMode,
  );
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  useEffect(() => {
    // console.log("click");
    if (isItemsModalOpen == true) {
      // console.log("click1");
      onOpen();
    } else {
      // console.log("click2");
      onClose();
    }
  }, [isItemsModalOpen]);
  useEffect(() => {
    // console.log(`itemsByUser`);
    // console.log(itemsByUser);
  }, [itemsByUser]);
  const closeModal = () => {
    dispatch(setIsItemsModalOpen(false));
  };
  const content = (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent minWidth="800px" bg={"#efefef"}>
          <ModalHeader
            borderBottom={"1px solid #e5e5e5"}
            width={"100%"}
            align={"center"}
          >
            <span
              alignSelf={"center"}
              width={"100%"}
              className="primaryColor small"
            >
              DODAJ CZĘŚĆ
            </span>
          </ModalHeader>
          <ModalCloseButton marginTop={"10px"} />
          <ModalBody
            padding={"40px 40px"}
            borderRadius={"0px 0px 10px 10px"}
            bg={"#fafafa"}
          >
            {itemModalMode !== "review" ? (
              <NewItemForm mode={mode} />
            ) : (
              <ItemsTable itemsRaw={itemsByUser[0]} user={selectedUser} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

  return content;
};

export default ItemsModal;
