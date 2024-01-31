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
import UsersTable from "./UsersTable";
import { Spinner } from "@chakra-ui/react";
import { useGetUsersQuery } from "./usersApiSlice";
import UsersModal from "./UsersModal";
import ItemsModal from "../items/ItemsModal";
import VehiclesModal from "../vehicles/VehiclesModal";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UsersView = () => {
  const { garageId } = useParams();
  useEffect(() => {
    // setVehicles(user?.vehicles);
  }, [garageId]);
  let content = <Spinner />;

  const { users, isLoading, isSuccess, isError, error } = useGetUsersQuery(
    garageId,
    {
      selectFromResult: ({ data }) => ({
        users: data?.ids.map((id) => data?.entities[id]),
      }),
    },
  );

  // const {
  //   data: users,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetUsersQuery({
  //   gid: garageId,
  // });
  // const { ids, entities } = users;
  // const usersList = ids?.map((uid) => entities[uid]);
  if (users) {
    content = (
      <>
        <UsersModal key="usersModal" />
        <ItemsModal key="itemsModal" />
        <VehiclesModal key="vehiclesModal" />
        <UsersTable usersRaw={users} />
      </>
    );
  }
  return <>{content}</>;
};
export default UsersView;
