import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import PhonesTable from "../../features/garages/PhonesTable";

const AddressForm = () => {
  const selectedGarage = useSelector((state) => state.selectedGarage.garage);
  return (
    <>
      <Box padding={"20px"}>
        <p className="gray small">Adres</p>
        <VStack>
          <Input placeholder="Nazwa" value={selectedGarage.name} />
          <HStack width={"100%"}>
            <Input
              width={"100%"}
              placeholder="Ulica"
              value={selectedGarage.street}
            />
            <Input width={"20%"} placeholder="nr" value={selectedGarage.nr} />
          </HStack>
          <HStack width={"100%"}>
            <Input
              color={"gray.500"}
              width={"30%"}
              placeholder="kod pocztowy"
              value={selectedGarage.postal}
            />
            <Input
              width={"70%"}
              placeholder="miejscowość"
              value={selectedGarage.city}
            />
          </HStack>
          <Box width={"100%"} marginTop={"20px"}>
            <p className="gray small">Email</p>
            <Input placeholder="email" value={selectedGarage.email} />
          </Box>
          <Box alignContent={"flex-start"} width={"100%"} marginTop={"20px"}>
            <p className="gray small">Telefony</p>
            <PhonesTable phones={selectedGarage.phones} />
          </Box>
          <Button
            marginTop={"20px"}
            leftIcon={
              1 === 2 ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faFloppyDisk} />
              )
            }
            // isLoading
            colorScheme="linkedin"
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

export default AddressForm;
