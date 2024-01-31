import {
  FormControl,
  Input,
  useDisclosure,
  useToast,
  Box,
  Button,
  Container,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setVehicle } from "./selectedVehicleSlice";
import { useSelector } from "react-redux";

const VehiclesSearchBox = ({ placeholder, data }) => {
  const dispatch = useDispatch();
  const selectedVehicle = useSelector(
    (state) => state.selectedVehicle.selectedVehicle,
  );
  const [overflow, setOverflow] = useState("hidden");
  const [filteredData, setFilteredData] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  const [border, setBorder] = useState("0px");

  const searchData = (e) => {
    if (e.target.value.length >= 0) {
      setBorder("1px");
      const searchWord = e.target.value;
      const newFilter = data?.filter((d) => {
        return d.reg.toLowerCase().includes(searchWord.toLowerCase());
      });
      setOverflow("scroll");
      setFilteredData(newFilter);
      setIsEditing(true);
    } else {
      // console.log(`e.target.value2: ${e.target.value}`);
      setBorder("0px");
      setIsEditing(false);
      setFilteredData([]);
      setOverflow("hidden");
    }
  };
  const vehicleSelected = ({ vehicle }) => {
    // console.log(vehicle);
    dispatch(setVehicle(vehicle));
    setFilteredData([]);
    setBorder("0px");
  };
  return (
    <>
      <Popover
        isOpen={true}
        closeOnBlur={true}
        isLazy
        lazyBehavior="keepMounted"
      >
        <PopoverTrigger>
          <Box>
            <Input
              placeholder={placeholder}
              onChange={searchData}
              onFocus={(e) => {
                setOverflow("hidden");
                searchData(e);
                setBorder("1px");
              }}
              onBlur={(e) => {
                // console.log(e.relatedTarget);
                // only re-focus if the user clicked on something
                // that was NOT an input element
                if (
                  e.relatedTarget === null ||
                  !e.relatedTarget.id.includes("popover-content")
                ) {
                  e.target.focus();
                  setFilteredData([]);
                  setBorder("0px");
                  setOverflow("hidden");
                } else {
                }
              }}
            />
          </Box>
        </PopoverTrigger>
        <PopoverContent border={border} borderColor="gray.200" boxShadow="none">
          <PopoverBody maxHeight="200px" overflowY={overflow}>
            {filteredData?.map((d) => {
              return (
                <p key={d.id} onClick={() => vehicleSelected({ vehicle: d })}>
                  {d.name} {d.reg}
                </p>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default VehiclesSearchBox;
