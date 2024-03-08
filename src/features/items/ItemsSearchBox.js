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
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsId } from "./selectedItemsSlice";
import { useSelector } from "react-redux";

const ItemsSearchBox = ({ placeholder, data }) => {
  const { garageId } = useParams();
  const dispatch = useDispatch();
  //   const selectedItem = useSelector((state) => state.selectedItem.selectedItem);
  const [overflow, setOverflow] = useState("hidden");
  const [filteredData, setFilteredData] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  const [border, setBorder] = useState("0px");

  const searchData = (e) => {
    if (e.target.value.length >= 0) {
      setBorder("1px");
      const searchWord = e.target.value;
      const newFilter = data?.filter((d) => {
        return d.name.toLowerCase().includes(searchWord.toLowerCase());
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
  const itemSelected = ({ item }) => {
    console.log(item);
    dispatch(
      addItemsId({
        _id: item._id,
        garage: garageId,
        name: item.name,
        description: item.description,
        brand: item.brand,
        model: item.model,
        storage: item.storage,
        user: item.user ? item.user : null,
        quantity: item.quantity,
        authorname: item.authorname,
        updatedAt: item.updatedAt,
        toDo: "add",
      }),
    );
    // dispatch(setItemsId(item));
    setFilteredData([]);
    setBorder("0px");
  };
  return (
    <>
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
      {filteredData?.map((d) => {
        return (
          <p key={d.id} onClick={() => itemSelected({ item: d })}>
            {d.name} {d.reg}
          </p>
        );
      })}
    </>
  );
};

export default ItemsSearchBox;
