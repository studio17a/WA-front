import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { Grid, GridItem } from "@chakra-ui/react";

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

const PublicRow = ({ minute, client, uwagi }) => {
  return (
    <>
      <Td>minute: {minute}</Td>
      <Td>client: {client}</Td>
      <Td>uwagi: {uwagi}</Td>
    </>
  );
};

export default PublicRow;
