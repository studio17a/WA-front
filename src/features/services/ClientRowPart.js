import { HStack, Button, Container, Box } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
const ClientRowPart = ({ user, vehicle }) => {
  console.log(`vvvvvvvehicle`);
  console.log(user);
  return (
    <Box w="90%">
      <HStack spacing="24px">
        <div>
          <div>{vehicle?.reg}</div>
          <div>{user.username}</div>
          <div>{user.phone}</div>
        </div>
      </HStack>
    </Box>
  );
};

export default ClientRowPart;
