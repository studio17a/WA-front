import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import Service from "../../services/Service";
import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useGetServicesQuery } from "../../../../src/features/services/servicesApiSlice";

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

let content;

const PublicCalendarTable = () => {
  const { garageId, day, month, year } = useParams();
  const navigate = useNavigate();
  const {
    data: appointments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetServicesQuery({ id: garageId, day, month, year }, "servicesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    // getServices({ id: garageId, day, month, year });
  }, []);
  if (isLoading) content = <Spinner />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = appointments;
    const tableContent = <Service />;
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
