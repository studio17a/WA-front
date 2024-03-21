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
const SettingsComponent = () => {
  const { isOpen, onToggle } = useDisclosure();
  const selectedGarage = useSelector((state) => state.selectedGarage.garage);
  const [garage, setGarage] = useState({});
  useEffect(() => {
    if (selectedGarage._id) {
      setGarage(selectedGarage);
      console.log(`garage: ${selectedGarage.name}`);
    }
  }, [selectedGarage]);
  const gphones = garage.phones?.map((phone) => <p>{phone}</p>);
  return (
    <>
      <HStack borderBottom={"1px solid #efefef"}>
        <Button
          w={"30px"}
          marginLeft="30px"
          onClick={onToggle}
          backgroundColor={"transparent"}
        >
          {isOpen ? (
            <FontAwesomeIcon color="#aaa" icon={faXmark} />
          ) : (
            <FontAwesomeIcon color="#aaa" icon={faGear} />
          )}
        </Button>
        <Box p={"10px"} w={"100%"}>
          <p>
            <p className="gray small">Nazwa: </p>
            <p className=" small ">{garage.name}</p>
          </p>
          <p>
            <p className="gray small">tel: </p>
            <p className=" small ">{gphones}</p>
          </p>
          <p>
            <p className="gray small">adres: </p>
            <p className=" small ">
              {garage.street} {garage.nr}{" "}
              {garage.postal && <>`, ${garage.postal}`</>}
              {garage.city && <>` ${garage.city}`</>}
            </p>
          </p>
        </Box>
      </HStack>
      <Collapse marginTop={"10px"} in={isOpen} animateOpacity>
        <Tabs isLazy>
          <TabList className="small gray" marginTop={"10px"}>
            <Tab>Dane adresowe</Tab>
            <Tab>Warsztat</Tab>
            <Tab>Mailing</Tab>
            <Tab>Uprawnienia pracowników</Tab>
          </TabList>
          <TabPanels>
            {/* initially mounted */}
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            {/* initially not mounted */}
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Collapse>
    </>
  );
};
export default SettingsComponent;
