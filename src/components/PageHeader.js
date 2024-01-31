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

const PageHeader = () => {
  return (
    <>
      <Popover>
        <HStack align="center">
          <div className="infodot">5</div>
          <PopoverTrigger>
            <div className="pageHeader">
              {" "}
              <div className="warsztApp">WarsztApp</div>
            </div>
          </PopoverTrigger>
        </HStack>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton size={"xl"} />
          <PopoverHeader>
            <p> Informacje </p>
          </PopoverHeader>
          <PopoverBody>
            <InfoRow />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PageHeader;
