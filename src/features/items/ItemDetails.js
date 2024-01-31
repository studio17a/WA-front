import {
  VStack,
  HStack,
  FormControl,
  Input,
  useDisclosure,
  useToast,
  Box,
  Button,
  Container,
  Spinner,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
  Tabs,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setStId, addStId, editStId } from "../items/selectedItemsSlice";
import { useEffect, useState } from "react";
import TRow from "../items/TRow";

const ItemDetails = ({ item, modal, index }) => {
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState(1);
  const [vat, setVat] = useState(23);

  const modalButtonDisabled = useSelector(
    (state) => state.modalButtonDisabled.modalButtonDisabled,
  );
  const selectedItems = useSelector((state) => state.selectedItems.itemsIds);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   setPrice(st.price);
  //   setItems(st.items);
  //   setVat(st.vat);
  // }, []);
  return (
    <>{item && <TRow view="rawq" index={index} modal="true" item={item} />}</>
  );
};

export default ItemDetails;
