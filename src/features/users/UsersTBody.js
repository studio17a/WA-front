import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import UsersTRow from "./UsersTRow";

const UsersTBody = ({ users, vehiclesReady }) => {
  console.log(`usersTBody: ${vehiclesReady}`);
  const tableContent = users?.map((user, index) => {
    if (index < 25)
      return (
        <>
          <UsersTRow user={user} vehiclesReady={vehiclesReady} />
        </>
      );
  });
  return <>{tableContent}</>;
};
export default UsersTBody;
