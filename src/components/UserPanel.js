import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Button, Spinner } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import Login from "../features/auth/Login";
const UserPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const UserInfo = useAuth();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  return (
    <>
      <Button marginLeft="15px" colorScheme="teal" onClick={onOpen}>
        <FontAwesomeIcon icon={faUser} />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#edf9ff">
          <DrawerCloseButton />
          <DrawerHeader>Twoje konto</DrawerHeader>

          <DrawerBody>
            <p>
              {UserInfo === null ? (
                <>
                  {isLoading && <Spinner />}
                  <Login />
                </>
              ) : (
                <>
                  <Box
                    bg="#fff"
                    padding="15px"
                    border="1px solid #eaeaea"
                    borderRadius={10}
                  >
                    {isLoading && <Spinner />}
                    <Button
                      onClick={sendLogout}
                      colorScheme="gray"
                      color="#fff"
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                    </Button>
                    <div>{UserInfo?.username}</div>
                  </Box>
                </>
              )}
            </p>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserPanel;
