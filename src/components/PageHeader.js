import { HStack, VStack, Container, Box } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import InfoRow from "../features/info/InfoRow";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PageHeader = () => {
  const selectedGarage = useSelector((state) => state.selectedGarage.garage);
  let garageName = selectedGarage?.name;
  useEffect(() => {
    garageName = selectedGarage?.name;
  }, [selectedGarage]);
  return (
    <>
      <Popover>
        <HStack align="center">
          <PopoverTrigger>
            <div className="pageHeader">
              {" "}
              <div className="warsztApp">
                WarsztApp
                <div align="left">
                  <span className="garageName gray small bold">
                    {garageName}
                  </span>
                </div>
              </div>
              <div className="infoHeader">
                <span className="gray small">
                  Liczba nieprzeczytanych wiadomości:{" "}
                </span>{" "}
                <span className="title primaryColor">5</span>
              </div>
            </div>
          </PopoverTrigger>
        </HStack>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton size={"xl"} />
          <PopoverHeader>
            <p> Informacje </p>
          </PopoverHeader>
          <PopoverBody className="infoPopower">
            <InfoRow />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PageHeader;
