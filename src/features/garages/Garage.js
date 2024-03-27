import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setGarage } from "./selectedGarageSlice";
import { Box, HStack, Button, VStack } from "@chakra-ui/react";
import AvaliableComponent from "./AvailableComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { setDate } from "../calendar/selectedDateSlice";
import { format, set } from "date-fns";

const Garage = ({ garage }) => {
  console.log(garage);
  const dispatch = useDispatch();
  let selectedDate = useSelector((state) => state.selectedDate.date);
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB");
  const navigate = useNavigate();
  const [paramsDay, setParamsDay] = useState();
  const [paramsMonth, setParamsMonth] = useState();
  const [paramsYear, setParamsYear] = useState();

  const handleEdit = () => {
    dispatch(setGarage(garage));
    navigate(`/${garage._id}/appointments/${formattedDate}`);
  };
  let today = null;
  if (!selectedDate || selectedDate === null) {
    dispatch(setDate(formattedDate));
  }
  useEffect(() => {
    if (selectedDate) {
      const split = selectedDate?.split("/");
      setParamsDay(split[0]);
      setParamsMonth(split[1]);
      setParamsYear(split[2]);
    }
  }, [selectedDate]);
  today = new Date(`${paramsYear}-${paramsMonth}-${paramsDay}`);
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
            <Button
              onClick={() => {
                const newDate = today.setDate(today.getDate() - 1);
                dispatch(setDate(format(new Date(newDate), "dd/MM/yyyy")));
              }}
              height={"100%"}
              leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            />
            z
            <span className="gray small">
              Dzien:{paramsYear}
              {paramsMonth}
              {paramsDay}
            </span>
            <AvaliableComponent
              day={paramsDay}
              month={paramsMonth}
              year={paramsYear}
              garageId={garage._id}
              alignSelf={"flex-start"}
            />
            <Button
              onClick={() => {
                const newDate = today.setDate(today.getDate() + 1);
                dispatch(setDate(format(new Date(newDate), "dd/MM/yyyy")));
              }}
              height={"100%"}
              leftIcon={<FontAwesomeIcon icon={faChevronRight} />}
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
            leftIcon={<FontAwesomeIcon icon={faLocationDot} />}
          >
            <span className="small bold">POKAZ NA MAPIE</span>
          </Button>
        </VStack>
      </Box>
    </>
  );
};

const memoizedGarage = memo(Garage);

export default memoizedGarage;
