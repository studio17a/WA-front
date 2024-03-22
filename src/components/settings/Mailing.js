import { Box, Button, HStack, Switch, VStack } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
const Mailing = () => {
  return (
    <>
      <Box width={"100%"} alignContent={"flex-start"} padding={"10px"}>
        <VStack width={"100%"} alignContent={"start"}>
          <HStack margin={"10px"} alignSelf={"start"}>
            <Switch defaultChecked colorScheme="cyan" />
            <p className="gray small">
              Powiadamiaj kiedy zatwierdzono wizytę w serwisie.{" "}
            </p>
          </HStack>
          <HStack margin={"10px"} alignSelf={"start"}>
            <Switch defaultChecked colorScheme="cyan" />
            <p className="gray small">
              Powiadamiaj kiedy anulowano wizytę w serwisie.{" "}
            </p>
          </HStack>
          <HStack margin={"10px"} alignSelf={"start"}>
            <Switch colorScheme="cyan" />
            <p className="gray small">
              Powiadamiaj kiedy zakończono wizytę w serwisie.{" "}
            </p>
          </HStack>
          <HStack margin={"10px"} alignSelf={"start"}>
            <Switch colorScheme="cyan" />
            <p className="gray small">
              Powiadamiaj kiedy przypisano nowy pojazd.{" "}
            </p>
          </HStack>
          <Button
            borderRadius={"10px"}
            padding={"18px 30px 20px 30px"}
            color={"gray.100"}
            marginTop={"30px"}
            leftIcon={
              1 === 2 ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faFloppyDisk} />
              )
            }
            // isLoading
            colorScheme="cyan"
            loadingText="Loading"
            spinnerPlacement="end"
          >
            Zapisz
          </Button>
        </VStack>
      </Box>
    </>
  );
};
export default Mailing;
