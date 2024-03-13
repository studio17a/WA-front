import { useDeleteServiceMutation } from "./servicesApiSlice";
import { useDispatch } from "react-redux";
import { setSave } from "./saveServiceSlice";
import { Button, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { setMinute } from "../services/selectedMinuteSlice";
import SendEmail from "../mailer/SendEmail";

const DelServiceComponent = ({ appointment }) => {
  let response = "";
  const selectedStId = useSelector((state) => state.selectedSt.stIds);
  const dispatch = useDispatch();
  const [deleteService, { isLoading, isSuccess, isError, error }] =
    useDeleteServiceMutation();
  const removeS = async (id, st) => {
    console.log("DelServiceComponent");
    // console.log(st);
    console.log("DelServiceComponent");
    const delSt = appointment.st?.map((s) => {
      return { _id: s, toDo: "del" };
    });
    deleteService({ id: appointment._id, st: delSt });
  };
  if (isSuccess) {
    const body = {
      garageId: appointment.garage,
      email: appointment.user.email,
      date: `${appointment.date}`,
      hour: appointment.hour,
      minute: appointment.minute,
      user: appointment.user._id,
      notes: "",
    };
    response = <SendEmail task="delete" body={body} />;
    //   // console.log(data);
    // });
    dispatch(setMinute(appointment._id));
  }
  return (
    <>
      {isLoading && <Spinner />}
      {isSuccess && response}
      {!isLoading && !isSuccess && (
        <Button
          colorScheme="red"
          margin="0 10px 0 0"
          size="sm"
          onClick={() => removeS(appointment.id, appointment.st)}
        >
          <CloseIcon w={3} h={3} color="#fff" />
        </Button>
      )}
    </>
  );
};
export default DelServiceComponent;
