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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetAGarageMutation } from "../garages/garagesApiSlice";
import { setGarage } from "../garages/selectedGarageSlice";
import PageHeader from "../../components/PageHeader";

const TopMenu = () => {
  const [getAGarage, { data: garage, isLoading, isSuccess, isError, error }] =
    useGetAGarageMutation();
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
  const dispatch = useDispatch();
  const selectedGarage = useSelector((state) => state.selectedGarage.garage);
  useEffect(() => {
    getAGarage({ gid: garageId });
  }, [garageId]);
  if (isSuccess) {
    dispatch(setGarage(garage));
  }
  // useEffect(() => {
  //   if (garage) {
  //     setGarage(garage);
  //   }
  // }, [garage]);
  const carsButton = (
    <>
      {UserInfo?.roles.isadmin.filter((g) => g._id === garageId).length > 0 && (
        <Button
          onClick={() => navigate(`/dash/${garageId}/vehicles`)}
          className="primaryBackground"
          color="gray.300"
        >
          <FontAwesomeIcon icon={faCarSide} />
        </Button>
      )}
    </>
  );
  const homeButton = (
    <>
      <Button
        onClick={() => navigate(`/`)}
        className="primaryBackground"
        color="gray.300"
      >
        <FontAwesomeIcon icon={faHouse} />
      </Button>
    </>
  );
  const usersButton = (
    <>
      {UserInfo?.roles.isadmin.filter((g) => g._id === garageId).length > 0 && (
        <Button
          onClick={() => navigate(`/dash/${garageId}/users`)}
          className="primaryBackground"
          color="gray.300"
        >
          <FontAwesomeIcon icon={faAddressBook} />
        </Button>
      )}
    </>
  );
  const itemsButton = (
    <>
      {UserInfo?.roles.isadmin.filter((g) => g._id === garageId).length > 0 && (
        <Button
          onClick={() => navigate(`/dash/${garageId}/items`)}
          className="primaryBackground"
          color="gray.300"
        >
          <FontAwesomeIcon icon={faListUl} />
        </Button>
      )}
    </>
  );
  const datePicker = (
    <>
      <MyDatePicker from={"main"} />
    </>
  );
  const calendarButton = (
    <>
      {UserInfo?.roles.isadmin.filter((g) => g._id === garageId).length > 0 && (
        <Button
          onClick={() =>
            navigate(`/dash/${garageId}/calendar/${cDay}/${cMonth}/${cYear}`)
          }
          className="primaryBackground"
          color="gray.300"
        >
          <FontAwesomeIcon icon={faCalendarDays} />
        </Button>
      )}
    </>
  );
  const nearestButton = (
    <>
      {UserInfo?.roles.isadmin.filter((g) => g._id === garageId).length > 0 && (
        <NearestAvailable key="nearest" onOpen={onOpen}></NearestAvailable>
      )}
    </>
  );
  const userPanelButton = <UserPanel garage={garage} />;
  let buttonContent;
  buttonContent = (
    <>
      <HStack padding="10px">
        {userPanelButton}
        {homeButton}
        {usersButton}
        {carsButton}
        {itemsButton}
        {calendarButton}
        {day && nearestButton}
        {day && datePicker}
        <PageHeader className="pageHeader" />
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
