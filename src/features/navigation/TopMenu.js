import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import MyDatePicker from "../calendar/DatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserPanel from "../../components/UserPanel.js";

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

import { useDisclosure, useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import NearestAvailable from "../calendar/dash/NearestAvailable";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TopMenu = () => {
  const cDay = format(new Date(), "dd");
  const cMonth = format(new Date(), "MM");
  const cYear = format(new Date(), "yyyy");
  const { garageId, day } = useParams();
  const isServiceModalOpen = useSelector(
    (state) => state.isServiceModalOpen.isServiceModalOpen,
  );
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const UserInfo = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const carsButton = (
    <>
      {UserInfo?.isManager ||
        (UserInfo?.isAdmin && (
          <Button
            onClick={() => navigate(`/dash/${garageId}/vehicles`)}
            colorScheme="cyan"
            color="#fff"
          >
            <FontAwesomeIcon icon={faCarSide} />
          </Button>
        ))}
    </>
  );
  const homeButton = (
    <>
      <Button onClick={() => navigate(`/`)} colorScheme="cyan" color="#fff">
        <FontAwesomeIcon icon={faHouse} />
      </Button>
    </>
  );
  const usersButton = (
    <>
      {UserInfo?.isManager ||
        (UserInfo?.isAdmin && (
          <Button
            onClick={() => navigate(`/dash/${garageId}/users`)}
            colorScheme="cyan"
            color="#fff"
          >
            <FontAwesomeIcon icon={faAddressBook} />
          </Button>
        ))}
    </>
  );
  const itemsButton = (
    <>
      {UserInfo?.isManager ||
        (UserInfo?.isAdmin && (
          <Button
            onClick={() => navigate(`/dash/${garageId}/items`)}
            colorScheme="cyan"
            color="#fff"
          >
            <FontAwesomeIcon icon={faListUl} />
          </Button>
        ))}
    </>
  );
  const datePicker = (
    <>
      <MyDatePicker from={"main"} />
    </>
  );
  const calendarButton = (
    <>
      {UserInfo?.isManager ||
        (UserInfo?.isAdmin && (
          <Button
            onClick={() =>
              navigate(`/dash/${garageId}/calendar/${cDay}/${cMonth}/${cYear}`)
            }
            colorScheme="cyan"
            color="#fff"
          >
            <FontAwesomeIcon icon={faCalendarDays} />
          </Button>
        ))}
    </>
  );
  const nearestButton = (
    <>
      {UserInfo?.isManager ||
        (UserInfo?.isAdmin && (
          <NearestAvailable key="nearest" onOpen={onOpen}></NearestAvailable>
        ))}
    </>
  );
  const userPanelButton = <UserPanel bg="edf9ff" />;
  let buttonContent;
  buttonContent = (
    <>
      <HStack padding="10px">
        {userPanelButton}
        {homeButton}
        {carsButton}
        {usersButton}
        {itemsButton}
        {calendarButton}
        {day && nearestButton}
        {day && datePicker}
      </HStack>
    </>
  );

  const content = (
    <>
      <div>{buttonContent}</div>
    </>
  );

  return content;
};
export default TopMenu;
