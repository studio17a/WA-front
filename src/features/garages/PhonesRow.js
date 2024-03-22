import { Button, Td, Tr } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const PhonesRow = ({ phone }) => {
  return (
    <Tr>
      <Td>
        <Button bg={"transparent"}>
          <FontAwesomeIcon color="red" icon={faXmark} />
        </Button>
      </Td>
      <Td>{phone}</Td>
    </Tr>
  );
};
export default PhonesRow;
