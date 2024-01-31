import { useSendEmailMutation } from "./mailerApiSlice";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";

const SendEmail = ({ task, body }) => {
  let message = "";
  const [send, { isLoading, isSuccess, isError, error }] =
    useSendEmailMutation();
  // console.log(data);

  useEffect(() => {
    console.log("sending...");
    console.log(body);
    send({ task: task, body: body }).then((data) => {});
  }, []);
  if (isLoading) message = <Spinner />;
  if (isSuccess) {
    if (task === "new")
      message = `Aby potwierdzić, proszę kliknąć na link wysłany na adres: ${body.email}`;
    // if (task === "delete") message = "E-mail został usunięty";
  }
  if (isError) {
    console.log(error);
  }
};
export default SendEmail;
