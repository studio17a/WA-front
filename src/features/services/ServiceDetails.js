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
import DelStComponent from "../st/DelStComponent";

import { useDispatch } from "react-redux";
import { setStId, addStId, editStId } from "../st/selectedStSlice";
import { setModalButtonDisabled } from "./modalButtonDisabledSlice";
import { setSave } from "./saveServiceSlice";
import { useEditStMutation } from "../st/stsApiSlice";
import { useEffect, useState } from "react";

const ServiceDetails = ({ st, modal, index }) => {
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState(1);
  const [vat, setVat] = useState(23);
  const saveService = useSelector((state) => state.saveService.save);
  const isServiceModalOpen = useSelector(
    (state) => state.isServiceModalOpen.isServiceModalOpen,
  );
  const [editSt, { isLoading, isSuccess, isError, error }] =
    useEditStMutation();
  const modalButtonDisabled = useSelector(
    (state) => state.modalButtonDisabled.modalButtonDisabled,
  );
  const selectedStId = useSelector((state) => state.selectedSt.stIds);

  const vatId = `vat:${st?._id}`;
  const dispatch = useDispatch();
  // useEffect(() => {
  //   setPrice(st.price);
  //   setItems(st.items);
  //   setVat(st.vat);
  // }, []);
  const priceChanged = (e) => {
    setPrice(e.target.value);
    dispatch(
      editStId({ index: index, price: e.target.value, items: items, vat: vat }),
    );
  };
  const itemsChanged = (e) => {
    setItems(e.target.value);
    dispatch(
      editStId({ index: index, price: price, items: e.target.value, vat: vat }),
    );
  };
  const vatChanged = (e) => {
    setVat(e.target.value);
    dispatch(
      editStId({
        index: index,
        price: price,
        items: items,
        vat: e.target.value,
      }),
    );
  };
  return (
    <Box
      margin="15px 0px"
      alignItems="top"
      bg="white"
      minWidth="100%"
      bg="white"
      w="100%"
      p={4}
      borderRadius="lg"
      borderWidth="1px"
    >
      <HStack margin="2">
        {modal && <DelStComponent index={index} st={st} />}
        <VStack align="left">
          {st && (
            <div>
              {st.name} : vat: {vat} , cena: {price}, szt: {items} , suma:{" "}
              {(price * items * vat) / 100 + price * items}
            </div>
          )}

          {modal && (
            <HStack>
              <FormControl>
                <Select onChange={vatChanged} name="vat" defaultValue={vat}>
                  <option value="0">0%</option>
                  <option value="8">8%</option>
                  <option value="23">23%</option>
                </Select>
              </FormControl>
              <FormControl>
                <Input
                  onChange={priceChanged}
                  placeholder="cena jedn."
                  key="cena"
                  name="cena"
                  value={price}
                />
              </FormControl>
              <FormControl>
                <Input
                  onChange={itemsChanged}
                  placeholder="sztuk"
                  key="szt"
                  name="szt"
                  value={items}
                />
              </FormControl>
            </HStack>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default ServiceDetails;
