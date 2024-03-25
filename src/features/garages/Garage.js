import { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setGarage } from "./selectedGarageSlice";
import { Box, HStack, Button, VStack } from "@chakra-ui/react";

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
      <Box onClick={handleEdit} className="garageCard">
        <VStack
          width={"100%"}
          alignSelf={"flex-start"}
          boder={"1px solid red"}
          textAlign={"left"}
        >
          <span className="garageCardName">{garage.name}</span>
          <HStack
            padding={"20px"}
            alignSelf={"flex-start"}
            boder={"1px solid red"}
            textAlign={"left"}
          ></HStack>
          <HStack
            padding={"40px"}
            alignSelf={"flex-start"}
            boder={"1px solid red"}
            textAlign={"left"}
          >
            <span alignSelf={"flex-start"} boder={"1px solid red"}>
              <span
                alignSelf={"flex-start"}
                boder={"1px solid red"}
                className="gray"
              >
                adres:{" "}
              </span>{" "}
              {garage.street}
              {garage.nr}
            </span>
          </HStack>
          <div>
            <span className="gray">telefon: </span> <b>{garage.phones[0]}</b>
          </div>
        </VStack>
      </Box>
    </>
  );
};

const memoizedGarage = memo(Garage);

export default memoizedGarage;
