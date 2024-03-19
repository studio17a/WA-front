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
      <Button
        alignSelf={"flex-start"}
        textAlign={"left"}
        fontWeight="light"
        height="100px"
        borderRadius="6px"
        margin="0 auto"
        padding="5px 15px 5px 15px"
        colorScheme={"cyan"}
        width={"auto"}
        onClick={handleEdit}
        textColor={"#555555"}
        background={"#f5f5f5"}
      >
        <VStack textAlign={"left"}>
          <div textAlign={"left"}>{garage.name}</div>
          <HStack textAlign={"left"}>
            <span>
              <span className="gray">adres: </span> {garage.street}
              {garage.nr}
            </span>
          </HStack>
          <div>
            <span className="gray">telefon: </span> <b>{garage.phones[0]}</b>
          </div>
        </VStack>
      </Button>
    </>
  );
};

const memoizedGarage = memo(Garage);

export default memoizedGarage;
