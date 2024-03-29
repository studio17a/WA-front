import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { setIsAppointmentModalOpen } from "./isAppointmentModalOpenSlice";
import { setHour } from "../../services/selectedHourSlice";
import { setMinute } from "../../services/selectedMinuteSlice";
import { setLoginModalOpen } from "../../auth/loginModalOpenSlice";

const PublicAppointment = ({ mode, hour, hourPart, part }) => {
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
    if (mode != "garage") {
      if (UserInfo?.username) {
        dispatch(setHour(hour + 9));
        dispatch(setMinute(hourPart));
        dispatch(setIsAppointmentModalOpen(true));
      } else {
        dispatch(setLoginModalOpen(true));
      }
    }
  };
  let height = "100px";
  if (mode == "garage") {
    height = "20px";
  }
  let width = "100%";
  if (mode == "garage") {
    width = "50px";
  }
  let br = "10px";
  if (mode == "garage") {
    br = "3px";
  }
  let fontSize = "1.5em";
  if (mode == "garage") {
    fontSize = "0.8em";
  }
  let padding = "5px 15px 5px 15px";
  if (mode == "garage") {
    padding = "1px";
  }
  return (
    <>
      <Button
        fontWeight="light"
        height={height}
        borderRadius={br}
        onClick={setAppointment}
        width={width}
        color="white"
        margin="0 auto"
        padding={padding}
        colorScheme={bg}
        isDisabled={disable}
      >
        {!mode && (
          <div padding={padding}>
            <p fontSize={fontSize}>
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
        )}
        {mode && (
          <span className="small">
            {hour + 9} : {hourPart}
          </span>
        )}
      </Button>
    </>
  );
};

export default PublicAppointment;
