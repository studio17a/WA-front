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
          <div className="proper tel">
            <b>{vehicle?.reg}</b>
          </div>
          <div>{user.username}</div>
          <div className="proper">tel. <b>{user.phone}</b></div>
          <div className="propper gray">email: <b>{user.email}</b></div>
        </div>
      </HStack>
    </Box>
  );
};

export default ClientRowPart;
