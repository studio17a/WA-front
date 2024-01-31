import { Select, VStack } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setHour } from "./selectedHourSlice";
// import { setVehicleId } from "../vehicles/selectedVehicleSlice";
// import { useSelector } from "react-redux";
// import UsersSearchBox from "./UsersSearchBox";

const HourSelect = () => {
  const selectedHour = useSelector((state) => state.selectedHour.hour);

  const dispatch = useDispatch();
  const onHourChanged = (e) => {
    dispatch(setHour(e.target.value));
  };
  const hours = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
  const list = hours.map((h) => (
    <option key={h} value={h}>
      {h}
    </option>
  ));
  return (
    <Select
      onChange={onHourChanged}
      maxWidth="70px"
      defaultValue={selectedHour}
    >
      {list}
    </Select>
  );
};

export default HourSelect;
