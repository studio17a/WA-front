import { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setGarage } from "./selectedGarageSlice";
import { Box, HStack, Button, VStack } from "@chakra-ui/react";
import AvaliableComponent from "./AvailableComponent";

const Garage = ({ garage }) => {
  console.log(garage);
  const dispatch = useDispatch();
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB");
  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(setGarage(garage));
    navigate(`/${garage._id}/appointments/${formattedDate}`);
  };
  return (
    <>
      <Box className="garageCard">
        <VStack padding={"5px"} width={"100%"} alignItems={"left"}>
          <span className="garageCardName">
            <span className="gray small">WarsztApp: </span>
            {garage.name}
          </span>

          <HStack alignItems={"left"} w={"100%"}>
            <VStack alignItems={"left"} className="garageCardBody">
              <p wid className="gray small">
                adres:{" "}
              </p>{" "}
              <p className="regular">
                {garage.street}
                {garage.nr}
              </p>
              <p className="gray small">telefon:</p>
              <p className="regular">{garage.phones[0]}</p>
            </VStack>
            <AvaliableComponent
              garageId={garage._id}
              alignSelf={"flex-start"}
            />
          </HStack>
          <Button
            colorScheme="cyan"
            loadingText="Loading"
            spinnerPlacement="end"
            padding={"18px 30px 20px 30px"}
            color={"gray.100"}
            marginTop={"30px"}
            borderRadius={"4px"}
            onClick={handleEdit}
          >
            <span className="small bold">WYBIERZ</span>
          </Button>
        </VStack>
      </Box>
    </>
  );
};

const memoizedGarage = memo(Garage);

export default memoizedGarage;
