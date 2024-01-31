import { Container, Box } from "@chakra-ui/react";
const ItemRowPart = ({ item }) => {
  return (
    <Box borderRadius="10px" borderColor="#eaeaea" margin="5px" padding="5px">
      <div>{item.name}</div>
      <div>{item.magazyn}</div>
      <div>{item.id}</div>
    </Box>
  );
};

export default ItemRowPart;
