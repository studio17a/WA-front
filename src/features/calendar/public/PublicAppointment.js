import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { setIsAppointmentModalOpen } from "./isAppointmentModalOpenSlice";
import { setHour } from "../../services/selectedHourSlice";
import { setMinute } from "../../services/selectedMinuteSlice";
import { setLoginModalOpen } from "../../auth/loginModalOpenSlice";

const PublicAppointment = ({ hour, hourPart, part }) => {
  const loginModalOpen = useSelector(
    (state) => state.loginModalOpen.loginModalOpen,
  );
  const dispatch = useDispatch();
  const UserInfo = useAuth();
  const [bg, setBg] = useState("cyan");
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (part.length > 0) {
      setBg("blue");
      setDisable(true);
    }
  }, []);
  const setAppointment = async () => {
    if (UserInfo?.username) {
      dispatch(setHour(hour + 9));
      dispatch(setMinute(hourPart));
      dispatch(setIsAppointmentModalOpen(true));
    } else {
      dispatch(setLoginModalOpen(true));
    }
  };
  return (
    <>
      <Button
        fontWeight="light"
        height="100px"
        borderRadius="10px"
        onClick={setAppointment}
        width="100%"
        color="white"
        margin="0 auto"
        padding="5px 15px 5px 15px"
        colorScheme={bg}
        isDisabled={disable}
      >
        <div padding="5px 15px 5px 15px">
          <p fontSize="1.5em">
            <b>
              {hour + 9} : {hourPart}
            </b>
          </p>
          {!disable && (
            <>
              <p>umów</p>
              <p>wizytę</p>
            </>
          )}
        </div>
      </Button>
    </>
  );
};

export default PublicAppointment;
