import { useHandleServiceMutation } from "./servicesApiSlice";
import { useDispatch } from "react-redux";
import { setSave } from "./saveServiceSlice";
import { Button, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { setMinute } from "../services/selectedMinuteSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const SetServiceEditable = ({ appointment }) => {
  const selectedStId = useSelector((state) => state.selectedSt.stIds);
  const dispatch = useDispatch();
  const [EditableService, { isLoading, isSuccess, isError, error }] =
    useHandleServiceMutation();
  const EditableS = async () => {
    EditableService({
      id: appointment._id,
      user: appointment.user,
      vehicle: appointment.vehicle,
      garage: appointment.garage,
      date: appointment.date,
      hour: appointment.hour,
      st: appointment.sts,
      minute: appointment.minute,
      items: appointment.items,
      title: appointment.title,
      text: appointment.text,
      completed: "approved",
    });
    console.log(appointment);
  };
  if (isSuccess) {
  }
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Button
          colorScheme="whatsapp"
          margin="0 10px 0 0"
          size="sm"
          onClick={() => EditableS()}
        >
          <FontAwesomeIcon
            w="5px"
            height="5px"
            color="#fff"
            icon={faRotateRight}
          />
        </Button>
      )}
    </>
  );
};
export default SetServiceEditable;
