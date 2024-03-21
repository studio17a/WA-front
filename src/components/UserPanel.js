import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  VStack,
  HStack,
  TagLeftIcon,
  Tbody,
  Tr,
  Td,
  Table,
  LinkBox,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Button, Spinner } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import Login from "../features/auth/Login";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import is from "date-fns/locale/is";
import { useParams } from "react-router-dom";
import { useLazyGetGaragesQuery } from "../features/garages/garagesApiSlice";
import SettingsComponent from "./settings/SettingsComponent";
const UserPanel = ({ garage }) => {
  const { garageId } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const selectedGarage = useSelector((state) => state.selectedGarage.garage);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const UserInfo = useAuth();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const [drawerSize, setDrawerSize] = useState("md");
  useEffect(() => {
    if (UserInfo?.roles.isadmin.filter((g) => g._id === garageId).length > 0)
      setIsAdmin(true);
    else setIsAdmin(false);
  }, [UserInfo]);
  useEffect(() => {
    if (isAdmin) setDrawerSize("lg");
    else setDrawerSize("md");
  }, [isAdmin]);
  return (
    <>
      <Button marginLeft="15px" colorScheme="teal" onClick={onOpen}>
        <FontAwesomeIcon icon={faUser} />
      </Button>
      <Drawer
        size={drawerSize}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg="#fff">
          <DrawerCloseButton color={"#555"} size={"lg"} />
          <DrawerHeader bg={"#fafafa"} color={"#555"}>
            Twoje konto
          </DrawerHeader>

          <DrawerBody w={"100%"} margin={"0 auto"} padding={"0"}>
            {UserInfo === null ? (
              <>
                {isLoading && <Spinner />}
                <Login />
              </>
            ) : (
              <>
                <Table
                  w={"100%"}
                  borderRadius={6}
                  padding={"10px"}
                  textAlign={"left"}
                  alignContent={"left"}
                >
                  <Tbody
                    textAlign={"left"}
                    alignContent={"left"}
                    border={"1px solid #efefef"}
                  >
                    <Tr>
                      <Td>
                        {isLoading && <Spinner />}
                        <Button backgroundColor={"transparent"}>
                          <FontAwesomeIcon color="#aaa" icon={faGear} />
                        </Button>
                      </Td>
                      <Td>
                        <div border={"1px solid #efefef"} w={"100%"}>
                          <p>
                            <b>{UserInfo?.username}</b>
                          </p>
                          <p>
                            <span className="gray small">status: </span>
                            <span className="gray bold">
                              {isAdmin ? "administrator" : "klient"}
                            </span>
                          </p>
                        </div>
                      </Td>
                      <Td>
                        <Button
                          alignSelf={"right"}
                          onClick={sendLogout}
                          background={"transparent"}
                          color="#aaa"
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} />
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                {isAdmin && <SettingsComponent />}
              </>
            )}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserPanel;
