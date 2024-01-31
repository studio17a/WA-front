import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { setIsAppointmentModalOpen } from "./isAppointmentModalOpenSlice";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SendEmail from "../../mailer/SendEmail";

const AppointmentModal = ({ children }) => {
  const selectedMinute = useSelector((state) => state.selectedMinute.minute);
  const selectedHour = useSelector((state) => state.selectedHour.hour);

  const dispatch = useDispatch();
  const { garageId, day, month, year } = useParams();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  const UserInfo = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const isAppointmentModalOpen = useSelector(
    (state) => state.isAppointmentModalOpen.isAppointmentModalOpen,
  );
  useEffect(() => {
    setMessage(
      `Czy wysłać prośbę o wizytę w dniu ${day}/${month}/${year} : ${selectedHour} : ${selectedMinute}`,
    );
    console.log(isAppointmentModalOpen);
    if (isAppointmentModalOpen == true) {
      // console.log("click1");
      onOpen();
    } else {
      // console.log("click2");
      onClose();
    }
  }, [isAppointmentModalOpen]);
  const closeModal = () => {
    dispatch(setIsAppointmentModalOpen(false));
  };
  const send = async () => {
    const body = {
      garageId,
      email: UserInfo.email,
      date: `${day}/${month}/${year}`,
      hour: selectedHour,
      minute: selectedMinute,
      user: UserInfo._id,
      notes: "",
      author: UserInfo._id,
      authorname: UserInfo.username,
    };
    setMessage(<Spinner />);
    setMessage(<SendEmail task="new" body={body} />);

    setStatus("sent");
  };
  const content = (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent minWidth="90%">
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              borderRadius="lg"
              borderWidth="1px"
              padding="10px"
              color="#555555"
              margin="0px 0px 30px 0px"
            >
              <p> {message}</p>
              {status === "pending" && (
                <Button
                  marginTop="10px"
                  width="100%"
                  colorScheme="cyan"
                  color="white"
                  // isLoading={isLoading}
                  onClick={() => send({ email: "", body: "" })}
                >
                  umów
                </Button>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
  return content;
};
export default AppointmentModal;
