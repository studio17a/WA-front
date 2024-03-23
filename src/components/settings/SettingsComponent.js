import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Box,
  Collapse,
  Button,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddressForm from "./AddressForm";
import GarageForm from "./GarageForm";
import Mailing from "./Mailing";
const SettingsComponent = () => {
  const UserInfo = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  const selectedGarage = useSelector((state) => state.selectedGarage.garage);
  const [garage, setGarage] = useState({});

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (
      UserInfo?.roles.isadmin.filter((g) => g._id === selectedGarage._id)
        .length > 0
    )
      setIsAdmin(true);
    else setIsAdmin(false);
  }, [UserInfo]);
  useEffect(() => {
    if (selectedGarage._id) {
      setGarage(selectedGarage);
      console.log(`garage: ${selectedGarage.name}`);
    }
  }, [selectedGarage]);
  const gphones = garage.phones?.map((phone) => <p>{phone}</p>);
  return (
    <>
      <h3>Wybrany warsztat:</h3>
      <HStack borderBottom={"1px solid #efefef"}>
        <Button
          borderRadius={"40px"}
          width={"30px"}
          marginRight="20px"
          marginLeft="30px"
          className={!isOpen ? "primaryBackground" : ""}
          color="gray.300"
          onClick={onToggle}
        >
          {isOpen ? (
            <FontAwesomeIcon size="lg" icon={faXmark} />
          ) : (
            <FontAwesomeIcon size="lg" icon={faGear} />
          )}
        </Button>
        <Box p={"10px"} marginBottom={"20px"} w={"100%"}>
          <div>
            <span className="gray small">Nazwa: </span>
            <span className=" small ">{garage.name}</span>
          </div>
          <div>
            <span className="gray small">Tel: </span>
            <span className=" small ">{gphones}</span>
          </div>
          <div>
            <span className="gray small">Adres: </span>
            <span className=" small ">
              {garage.street} {garage.nr}{" "}
              {garage.postal && <>`, ${garage.postal}`</>}
              {garage.city && <>` ${garage.city}`</>}
            </span>
          </div>
          <div>
            <span className="gray small">E-mail: </span>
            <span className=" small ">{garage.email}</span>
          </div>
          <div>
            <span className="gray small">Twój status:</span>
            <span className="gray small bold">
              {" "}
              {isAdmin ? "administrator" : "klient"}
            </span>
          </div>
        </Box>
      </HStack>
      <Collapse marginTop={"10px"} in={isOpen} animateOpacity>
        <Tabs colorScheme="cyan" isLazy>
          <TabList className="small gray" marginTop={"10px"}>
            <Tab>Dane adresowe</Tab>
            <Tab>Warsztat</Tab>
            <Tab>Mailing</Tab>
            <Tab>Uprawnienia pracowników</Tab>
          </TabList>
          <TabPanels borderBottom="1px solid #efefef" bg={"#fafafa"}>
            <TabPanel>
              <AddressForm />
            </TabPanel>
            <TabPanel bg={"#fafafa"}>
              <GarageForm />
            </TabPanel>
            <TabPanel bg={"#fafafa"}>
              <Mailing />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Collapse>
    </>
  );
};

export default SettingsComponent;
