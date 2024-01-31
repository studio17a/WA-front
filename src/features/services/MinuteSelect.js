import { Select, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMinute } from "./selectedMinuteSlice";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setId } from "./selectedUserSlice";
// import { setVehicleId } from "../vehicles/selectedVehicleSlice";
// import { useSelector } from "react-redux";
// import UsersSearchBox from "./UsersSearchBox";

const MinuteSelect = () => {
  const selectedMinute = useSelector((state) => state.selectedMinute.minute);

  const dispatch = useDispatch();
  const onMinuteChanged = (e) => {
    dispatch(setMinute(e.target.value));
  };
  const minutes = ["00", "30"];
  const list = minutes.map((m) => (
    <option key={m} value={m}>
      {m}
    </option>
  ));
  return (
    <Select
      onChange={onMinuteChanged}
      maxWidth="70px"
      defaultValue={selectedMinute}
    >
      {list}
    </Select>
  );
};

export default MinuteSelect;
