import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import Service from "../../services/Service";
import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useGetAllServicesMutation } from "../../../../src/features/services/servicesApiSlice";

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
import PublicRow from "./PublicRow";
import { useSelector } from "react-redux";

let content;

const PublicCalendarTable = ({ mode, garageId, day, month, year }) => {
  const params = useParams();
  if (params.garageId) {
    garageId = params.garageId;
    day = params.day;
    month = params.month;
    year = params.year;
  }

  content = (
    <>
      <TableContainer>
        <Table variant="simple">
          <Service
            mode={mode}
            day={day}
            month={month}
            year={year}
            garageId={garageId}
          />
        </Table>
      </TableContainer>
    </>
  );
  return content;
};

export default PublicCalendarTable;
