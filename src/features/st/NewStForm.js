import { useSelector } from "react-redux";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Textarea } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button, useToast, Select } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useAddNewStMutation } from "./stsApiSlice";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addStId } from "./selectedStSlice";
const NewStForm = () => {
  const { garageId } = useParams();
  const dispatch = useDispatch();
  const [addNewSt, { isLoading, isSuccess, isError, error }] =
    useAddNewStMutation();

  const [name, setName] = useState("");
  const [predefined, setPredefined] = useState(false);
  const [price, setPrice] = useState(1);
  const [items, setItems] = useState(0);
  const [vat, setVat] = useState(23);
  const [ean, setEan] = useState("");
  const [note, setNote] = useState("");

  const onNameChanged = (e) => {
    setName(e.target.value);
  };
  const onPredefinedChanged = (e) => {
    setPredefined(!predefined);
  };
  const onPriceChanged = (e) => {
    setPrice(e.target.value);
  };
  const onItemsChanged = (e) => {
    setItems(e.target.value);
  };
  const onVatChanged = (e) => {
    setVat(e.target.value);
  };
  const onEanChanged = (e) => {
    setEan(e.target.value);
  };
  const onNoteChanged = (e) => {
    setNote(e.target.value);
  };

  if (isLoading) {
  }
  if (isSuccess) {
  }
  if (isError) {
  }

  const onSaveStClicked = async (e) => {
    console.log(`predefined: ${predefined}`);
    // e.preventDefault();
    // const canSave = name && !isLoading;

    // if (canSave && predefined === true) {
    //   const { message, newSt } = await addNewSt({
    //     garage: garageId,
    //     predefined,
    //     name,
    //     price,
    //     items,
    //     vat,
    //   }).unwrap();
    //   //   if (newSt) dispatch(setItemId(stId));
    //   // console.log(message);
    // } else {
    //   // console.log("here2");
    // }

    dispatch(
      addStId({
        garageId: garageId,
        name: name,
        price,
        items,
        vat,
        toDo: "add",
      }),
    );
  };
  return (
    <>
      <VStack spacing="25px">
        <h2>dodaj usługę</h2>
        <Checkbox onChange={onPredefinedChanged} isChecked={predefined}>
          Ustaw jako wzór
        </Checkbox>
        <FormControl id="name" isRequired>
          <FormLabel>Nazwa</FormLabel>
          <Input placeholder="Wpisz nazwę " onChange={onNameChanged} />
        </FormControl>
        <FormControl id="ean">
          <FormLabel>oznaczenie</FormLabel>
          <Input placeholder="Wpisz oznaczenie " onChange={onEanChanged} />
        </FormControl>
        <FormControl id="price">
          <FormLabel>cena</FormLabel>
          <Input placeholder="Wpisz cenę " onChange={onPriceChanged} />
        </FormControl>
        <FormControl id="items">
          <FormLabel>sztuki</FormLabel>
          <Input placeholder="Wpisz liczbę sztuk" onChange={onItemsChanged} />
        </FormControl>
        <FormControl id="vat">
          <FormLabel>VAT</FormLabel>
          <Input placeholder="Wpisz stawkę VAT" onChange={onVatChanged} />
        </FormControl>
        <FormControl id="uwagi">
          <FormLabel>Uwagi</FormLabel>
          <Textarea placeholder="Wpisz uwagi" onChange={onNoteChanged} />
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={onSaveStClicked}
          isLoading={isLoading}
        >
          Dodaj
        </Button>
      </VStack>
    </>
  );
};

export default NewStForm;
