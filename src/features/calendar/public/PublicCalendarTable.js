import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import Service from "../../services/Service";
import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useLazyGetServicesQuery } from "../../../../src/features/services/servicesApiSlice";

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
  const selectedDate = useSelector((state) => state.selectedDate.date);
  if (params.garageId) {
    garageId = params.garageId;
    day = params.day;
    month = params.month;
    year = params.year;
  }
  const navigate = useNavigate();
  const [
    getServices,
    { data: appointments, isLoading, isSuccess, isError, error },
  ] = useLazyGetServicesQuery();

  useEffect(() => {
    getServices({ id: garageId, day, month, year });
  }, [selectedDate]);
  useEffect(() => {});
  if (isLoading) content = <Spinner />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = appointments;
    const tableContent = (
      <Service
        mode={mode}
        day={day}
        month={month}
        year={year}
        garageId={garageId}
      />
    );
    const handleEdit = () => navigate(`/dash/${garageId}/calendar`);
    content = (
      <>
        <TableContainer>
          <Table variant="simple">{tableContent}</Table>
        </TableContainer>
      </>
    );
  }
  return content;
};

export default PublicCalendarTable;
