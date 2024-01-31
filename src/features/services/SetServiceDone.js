import { useHandleServiceMutation } from "./servicesApiSlice";
import { useDispatch } from "react-redux";
import { setSave } from "./saveServiceSlice";
import { Button, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { setMinute } from "../services/selectedMinuteSlice";
import { setItemsId } from "../items/selectedItemsSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SetServiceDone = ({ appointment }) => {
  const selectedStId = useSelector((state) => state.selectedSt.stIds);
  const dispatch = useDispatch();
  const [doneService, { isLoading, isSuccess, isError, error }] =
    useHandleServiceMutation();
  const doneS = async () => {
    // if (appointment.items) {
    //   dispatch(setItemsId(appointment.items));
    // }
    doneService({
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
      completed: "done",
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
          onClick={() => doneS()}
        >
          <FontAwesomeIcon w="5px" height="5px" color="#fff" icon={faCheck} />
        </Button>
      )}
    </>
  );
};
export default SetServiceDone;
