import { useHandleServiceMutation } from "./servicesApiSlice";
import { useDispatch } from "react-redux";
import { setSave } from "./saveServiceSlice";
import { Button, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { setMinute } from "../services/selectedMinuteSlice";
import SendEmail from "../mailer/SendEmail";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
const ApproveService = ({ appointment }) => {
  let response = "";
  const selectedStId = useSelector((state) => state.selectedSt.stIds);
  const dispatch = useDispatch();
  const [approveService, { isLoading, isSuccess, isError, error }] =
    useHandleServiceMutation();
  const approveS = async () => {
    approveService({
      id: appointment._id,
      user: appointment.user,
      vehicle: appointment.vehicle,
      garage: appointment.garage,
      date: appointment.date,
      hour: appointment.hour,
      st: appointment.st,
      minute: appointment.minute,
      item: appointment.item,
      title: appointment.title,
      text: appointment.text,
      completed: "approved",
    });
  };
  if (isSuccess) {
    const body = {
      task: "approve",
      garageId: appointment.garage,
      email: appointment.user.email,
      date: `${appointment.day}/${appointment.month}/${appointment.year}`,
      hour: appointment.hour,
      minute: appointment.minute,
      user: appointment.user._id,
      notes: "",
    };
    response = <SendEmail task="add" body={body} />;
  }
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Button
          bg="#a5d998"
          margin="0 10px 0 0"
          size="sm"
          onClick={() => approveS()}
        >
          <FontAwesomeIcon
            w="5px"
            height="5px"
            color="#fff"
            icon={faCalendarCheck}
          />
        </Button>
      )}
    </>
  );
};
export default ApproveService;
