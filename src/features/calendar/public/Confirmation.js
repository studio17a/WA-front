import { useParams, useNavigate } from "react-router-dom";
import { useCreateNewAppointmentMutation } from "../../services/servicesApiSlice";
import { useEffect, useState } from "react";

const Confirmation = () => {
  const [cap, setCap] = useState(false);
  const [
    createNewAppointment,
    { data: appointment, isLoading, isSuccess, isError, error },
  ] = useCreateNewAppointmentMutation();
  const { garageId, date, minute, hour, year, day, month, confirmationToken } =
    useParams();
  let content = "...";

  useEffect(() => {
    if (cap === false) {
      createNewAppointment({ token: confirmationToken });
    }
    setCap(true);
  }, [cap]);
  if (isError) {
    console.log(error);
    content = <p>{error.data.message}</p>;
  } else if (isSuccess) {
    content = <p>{appointment.message}</p>;
    console.log(`data`);
    console.log(appointment);
  }

  return content;
};

export default Confirmation;
