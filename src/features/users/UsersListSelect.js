import { Select, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserObj } from "./selectedUserSlice";
import { setVehicle } from "../vehicles/selectedVehicleSlice";
import { useSelector } from "react-redux";
import UsersSearchBox from "./UsersSearchBox";

const UsersListSelect = ({ users }) => {
  return (
    <VStack spacing="25px">
      <UsersSearchBox placeholder="szukaj (nazwa/tel.)" data={users} />
    </VStack>
  );
};

export default UsersListSelect;
