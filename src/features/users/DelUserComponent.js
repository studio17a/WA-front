import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button, Spinner } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useDeleteUserMutation } from "./usersApiSlice";

const DelUserComponent = ({ uid }) => {
  const [loading, setLoading] = useState(false);
  const [delU, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const delUser = () => {
    setLoading(true);
    console.log(`delem: ${uid}`);
    delU({ id: uid });
    onClose();
  };

  useEffect(() => {
    setLoading(false);
  }, [uid]);
  let content = (
    <Button isLoading={loading} onClick={onOpen} size="sm" colorScheme="red">
      <FontAwesomeIcon w="4px" height="4px" color="#fff" icon={faXmark} />
    </Button>
  );
  if (isLoading) {
    <Spinner />;
  }
  if (isSuccess) {
    content = (
      <Button isLoading={loading} onClick={onOpen} size="sm" colorScheme="red">
        <FontAwesomeIcon w="4px" height="4px" color="#fff" icon={faXmark} />
      </Button>
    );
  }
  if (isError) {
    content = <p>{error.data.message}</p>;
  }
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Usuń klienta
            </AlertDialogHeader>

            <AlertDialogBody>
              Czy chcesz usunąć wszystkie dane dot. klienta? Tej operacji nie
              można cofnąć.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                anuluj
              </Button>
              <Button colorScheme="red" onClick={delUser} ml={3}>
                Usuń dane
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {content}
    </>
  );
};

export default DelUserComponent;
