import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { setVehicle } from "./selectedVehicleSlice";
import { useUpdateVehicleMutation } from "./vehiclesApiSlice";
import { useSelector, useDispatch } from "react-redux";
const TransferVehicle = () => {
  const dispatch = useDispatch();
  const [
    updateVehicle,
    { data: vehicle, isLoading, isSuccess, isError, error },
  ] = useUpdateVehicleMutation();
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const selectedVehicle = useSelector((state) => state.selectedVehicle.vehicle);
  console.log(selectedVehicle);
  const transfer = async () => {
    await updateVehicle({
      userId: selectedUserObj._id,
      vehicleId: selectedVehicle[0]._id,
    }).then((data) => {
      // console.log(`vehicle`);
      // console.log(data.data.updatedVehicle);
      dispatch(setVehicle(data.data.updatedVehicle));
    });
  };
  if (isSuccess) {
  }
  return (
    <>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="250px"
        margin="10px 10px 10px 0px"
      >
        <AlertIcon boxSize="30px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Wybrany pojazd jest przypisany do innego klienta!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Pojazd przypisany jest do <b>{selectedVehicle[0]?.user?.username}</b>.
          <p>
            Nastąpi przypisanie całej historii pojazdu do{" "}
            <b>{selectedUserObj.username}</b>
          </p>
          <p> </p>
          <p>
            {isLoading && <Spinner />}
            {!isLoading && (
              <Button
                margin="5px 0px 0px 0px"
                colorScheme="red"
                onClick={transfer}
              >
                Przekaż pojazd
              </Button>
            )}
          </p>
        </AlertDescription>
      </Alert>
    </>
  );
};

export default TransferVehicle;
