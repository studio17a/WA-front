import { Table, Tbody } from "@chakra-ui/react";
import PhonesRow from "./PhonesRow";
const PhonesTable = ({ phones }) => {
  let content = phones.map((phone) => <PhonesRow phone={phone} />);
  return (
    <>
      {" "}
      <Table>
        <Tbody>{content}</Tbody>
      </Table>
    </>
  );
};
export default PhonesTable;
