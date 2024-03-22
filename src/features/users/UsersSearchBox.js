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
  HStack,
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
import { setUserObj } from "./selectedUserSlice";
import { setVehicle } from "../vehicles/selectedVehicleSlice";
import { useSelector } from "react-redux";
import { setItemsId } from "../items/selectedItemsSlice";

const UsersSearchBox = ({ placeholder, data }) => {
  const dispatch = useDispatch();
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const [overflow, setOverflow] = useState("hidden");
  const [filteredData, setFilteredData] = useState([]);
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [border, setBorder] = useState("0px");
  const [background, setBackground] = useState("transparent");

  useEffect(() => {
    if (placeholder) setTitle(placeholder);
  }, []);
  const searchData = async (e) => {
    if (e.target.value.length >= 0) {
      setBorder("1px");
      const searchWord = e.target.value;
      const newFilter = await data?.filter((d) => {
        const includesPhone = d.phone.includes(searchWord);
        const includesName = d.username
          .toLowerCase()
          .includes(searchWord.toLowerCase());
        if (includesPhone || includesName) {
          return d;
        }
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
  const userSelected = (user) => {
    if (user._id !== selectedUserObj?._id) {
      dispatch(setUserObj(user));
      dispatch(setItemsId([]));
      dispatch(setVehicle(null));
    }
    setFilteredData([]);
    setBorder("0px");
  };
  let popHeader = <></>;

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
              placeholder={title}
              onChange={searchData}
              onFocus={async (e) => {
                popHeader = <PopoverCloseButton />;
                setBackground("#fafafa");
                setOverflow("hidden");
                await searchData(e);
                setBorder("1px");
              }}
              onBlur={(e) => {
                popHeader = <></>;
                setBackground("transparent");
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
        <PopoverContent
          background="#fcfcfc"
          borderColor="gray.200"
          boxShadow="none"
          borderWidth={border}
          borderRadius={"10px"}
        >
          {popHeader}
          <PopoverBody maxHeight="200px" overflowY={overflow}>
            {filteredData?.map((d) => {
              return (
                <Box
                  width="100%"
                  marginBottom="10px"
                  fontSize="13px"
                  padding="10px"
                  border="1px solid #fafafa"
                  color="#555"
                  cursor="pointer"
                  _hover={{ bg: "#ffffff" }}
                  borderRadius="5px"
                  align="left"
                  key={d.id}
                  onClick={() => userSelected(d)}
                >
                  <HStack key={d.id}>
                    <div>
                      <b>{d.username}</b>
                    </div>
                    <div>
                      <p>{d.email}</p>
                      <p>
                        <span fill="#e8faff">{d.phone}</span>
                      </p>
                    </div>
                  </HStack>
                </Box>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
export default UsersSearchBox;
