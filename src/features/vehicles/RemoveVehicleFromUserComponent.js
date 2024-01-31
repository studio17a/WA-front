import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const RemoveVehicleFromUserComponent = ({ vehicle }) => {
  return (
    <Button size="sm" backgroundColor="white" color="#aaa">
      <FontAwesomeIcon w="4px" height="4px" color="#aaa" icon={faXmark} />
    </Button>
  );
};

export default RemoveVehicleFromUserComponent;
