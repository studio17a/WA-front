import { Box, Button, HStack, Input, Select, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import TinyMCE from "../TinyMCE";
import PhonesTable from "../../features/garages/PhonesTable";
import { Editor } from "@tinymce/tinymce-react";

const GarageForm = () => {
  const selectedGarage = useSelector((state) => state.selectedGarage.garage);
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  return (
    <>
      <Box
        border={"1px"}
        borderRadius={"10px"}
        borderColor={"#fafafa"}
        bg={"#fafafa"}
        padding={"20px"}
        marginBottom={"20px"}
      >
        <p className="gray small">Godziny otwarcia:</p>
        <VStack>
          <HStack alignSelf={"flex-start"} width={"50%"}>
            <Select
              bg={"#fff"}
              size={"md"}
              className={"small"}
              placeholder="otwarcie"
            >
              {hours.map((hour) => (
                <option className="small" value="option1">
                  {hour}
                </option>
              ))}
            </Select>
            <Select
              bg={"#fff"}
              size={"md"}
              className={"small"}
              placeholder="zamknięcie"
            >
              {hours.map((hour) => (
                <option className="small" value="option1">
                  {hour}
                </option>
              ))}
            </Select>
          </HStack>
          <Box alignSelf={"flex-start"} width={"50%"}>
            <p className="gray small">Liczba stanowisk:</p>
            <NumberInput bg={"#fff"} defaultValue={2} min={1} max={20}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
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
      <TinyMCE />
    </>
  );
};

export default GarageForm;
