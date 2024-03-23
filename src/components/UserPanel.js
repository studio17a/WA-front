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
      <Button
        padding={"20px 13px 20px 13px"}
        marginLeft="15px"
        onClick={onOpen}
        className="primaryColor primaryBorderColor"
        variant="outline"
        backgroundColor={"transparent"}
      >
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
          <DrawerCloseButton className="primaryColor" size={"lg"} />
          <DrawerHeader className="drawerHeader"></DrawerHeader>

          <DrawerBody w={"100%"} margin={"0 auto"} padding={"0"}>
            {UserInfo === null ? (
              <>
                {isLoading && <Spinner />}
                <Login />
              </>
            ) : (
              <>
                <h3>Twoje konto:</h3>
                <HStack>
                  <p>
                    {isLoading && <Spinner />}
                    <Button
                      marginLeft="30px"
                      marginRight="20px"
                      className="primaryBackground"
                      color="gray.300"
                      borderRadius={"40px"}
                      width={"30px"}
                    >
                      <FontAwesomeIcon size="lg" icon={faGear} />
                    </Button>
                  </p>
                  <Box p={"10px"} marginBottom={"20px"} w={"80%"}>
                    <div>
                      <span className="gray small">Nazwa:</span>
                      <span className="primaryColor title">
                        {" "}
                        {UserInfo?.username}
                      </span>
                    </div>
                    <div>
                      <span className="gray small">E-mail:</span>
                      <span color="gray.300" className="small ">
                        {" "}
                        {UserInfo?.email}
                      </span>
                    </div>
                    <div>
                      <span className="gray small">Telefon:</span>
                      <span color="gray.300" className="small ">
                        {" "}
                        {UserInfo?.phone}
                      </span>
                    </div>
                  </Box>
                  <Box w={"20%"}>
                    <Button
                      marginLeft={"20px"}
                      alignSelf={"right"}
                      onClick={sendLogout}
                      className="primaryColor"
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                    </Button>
                  </Box>
                </HStack>
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
