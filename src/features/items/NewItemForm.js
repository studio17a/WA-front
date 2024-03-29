import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button, useToast, Select } from "@chakra-ui/react";
import { Stack, HStack, VStack, Checkbox } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState, useEffect } from "react";
import { Textarea } from "@chakra-ui/react";
import { useHandleItemMutation } from "./itemsApiSlice";
import { useDispatch } from "react-redux";
import { setItemsId, addItemsId } from "./selectedItemsSlice";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setRefreshVehiclesByUser } from "../../hooks/refreshSlice";

const NewItemForm = ({ mode = "add" }) => {
  const { garageId } = useParams();
  const UserInfo = useAuth();
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const itemModalMode = useSelector(
    (state) => state.itemModalMode.itemModalMode,
  );
  const selectedItems = useSelector((state) => state.selectedItems.itemsIds);

  const [handleItem, { isLoading, isSuccess, isError, error }] =
    useHandleItemMutation();
  const dispatch = useDispatch();

  const [name, setName] = useState(selectedItems?.name);
  const [storage, setStorage] = useState(selectedItems?.storage);
  const [ean, setEan] = useState(selectedItems?.ean);
  const [itemq, setItemQ] = useState(selectedItems?.quantity);
  const [brand, setBrand] = useState(selectedItems?.brand);
  const [model, setModel] = useState(selectedItems?.model);
  const [notes, setNotes] = useState(selectedItems?.notes);
  const [description, setDescription] = useState(selectedItems?.description);
  const [checkedItem, setCheckedItem] = useState(true);

  useEffect(() => {
    if (mode === "top") {
      setCheckedItem(false);
    }
  }, []);

  if (isLoading) {
  }
  if (isSuccess) {
    dispatch(setRefreshVehiclesByUser(true));
  }
  if (isError) {
  }
  const onNameChanged = (e) => {
    setName(e.target.value);
  };
  const onStorageChanged = (e) => {
    setStorage(e.target.value);
  };
  const onIdChanged = (e) => {
    setEan(e.target.value);
  };
  const onQChanged = (e) => {
    setItemQ(e.target.value);
  };
  const onNoteChanged = (e) => {
    setNotes(e.target.value);
  };
  const onBrandChanged = (e) => {
    setBrand(e.target.value);
  };
  const onModelChanged = (e) => {
    setModel(e.target.value);
  };
  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
  };

  const onSaveItemClicked = async (e) => {
    e.preventDefault();
    const canSave = name && !isLoading;

    if (canSave) {
      let formmode = itemModalMode;
      if (formmode === null || formmode === "service") formmode = "add";
      console.log(`formmode`);
      console.log(selectedUserObj);
      const { message, item } = await handleItem({
        id: selectedItems?._id,
        garage: garageId,
        mode: formmode,
        // user: selectedUserObj,
        user: checkedItem
          ? selectedUserObj
            ? selectedUserObj._id
            : UserInfo._id
          : null,
        selectedUserId: selectedUserObj ? selectedUserObj._id : UserInfo._id,
        name,
        storage,
        description,
        quantity: itemq,
        brand,
        model,
        ean,
        notes,
        author: selectedUserObj ? selectedUserObj : UserInfo._id,
        authorname: UserInfo.username,
      }).unwrap();
      if (itemModalMode !== "edit") {
        if (item) {
          if (selectedItems === null) {
            dispatch(
              setItemsId([
                {
                  _id: item._id,
                  name: item.name,
                  toDo: "add",
                  garage: garageId,
                  user: item.user,
                  brand: item.brand,
                  storage: item.storage,
                  // quantity: itemq,
                  description: item.description,
                  model: item.model,
                  notes: item.notes,
                },
              ]),
            );
          } else {
            dispatch(
              addItemsId({
                _id: item._id,
                name: item.name,
                user: item.user,
                brand: item.brand,
                storage: item.storage,
                description: item.description,
                model: item.model,
                // quantity: itemq,
                notes: item.notes,
                toDo: "add",
                garage: garageId,
              }),
            );
          }
        }
      }
      console.log(message);
    } else {
      // console.log("here2");
    }
  };

  return (
    <>
      <VStack borderRadius={"10px"} spacing="25px">
        {mode !== "top" && (
          <Checkbox
            onChange={(e) => setCheckedItem(e.target.checked)}
            colorScheme="green"
            isChecked={checkedItem}
          >
            własność klienta
          </Checkbox>
        )}
        <FormControl id="name" isRequired>
          <div className="small gray">Nazwa: </div>
          {mode == "edit" ? (
            <Input
              bg={"#ffffff"}
              value={name}
              placeholder="Wpisz nazwę "
              onChange={onNameChanged}
            />
          ) : (
            <Input
              bg={"#ffffff"}
              placeholder="Wpisz nazwę "
              onChange={onNameChanged}
            />
          )}
        </FormControl>
        <FormControl id="storage">
          <div className="small gray">Magazyn: </div>
          {mode == "edit" ? (
            <Input
              bg={"#ffffff"}
              value={storage}
              placeholder="Wpisz magazyn "
              onChange={onStorageChanged}
            />
          ) : (
            <Input
              bg={"#ffffff"}
              placeholder="Wpisz magazyn "
              onChange={onStorageChanged}
            />
          )}
        </FormControl>
        <FormControl id="id">
          <div className="small gray">Numer: </div>
          {mode == "edit" ? (
            <Input
              bg={"#ffffff"}
              value={ean}
              placeholder="Wpisz nr "
              onChange={onIdChanged}
            />
          ) : (
            <Input
              bg={"#ffffff"}
              placeholder="Wpisz nr "
              onChange={onIdChanged}
            />
          )}
        </FormControl>
        <FormControl id="quantity">
          <div className="small gray">Ilość: </div>
          {mode == "edit" ? (
            <Input
              bg={"#ffffff"}
              value={itemq}
              placeholder="ilość "
              onChange={onQChanged}
            />
          ) : (
            <Input bg={"#ffffff"} placeholder="ilość " onChange={onQChanged} />
          )}
        </FormControl>
        <FormControl id="description">
          <div className="small gray">opis: </div>
          {mode == "edit" ? (
            <Input
              bg={"#ffffff"}
              value={description}
              placeholder="Wpisz uwagi"
              onChange={onDescriptionChanged}
            />
          ) : (
            <Input
              bg={"#ffffff"}
              value={description}
              placeholder="Wpisz uwagi"
              onChange={onDescriptionChanged}
            />
          )}
        </FormControl>
        <FormControl id="brand">
          <div className="small gray">marka: </div>
          {mode == "edit" ? (
            <Input
              bg={"#ffffff"}
              value={brand}
              placeholder="Wpisz markę"
              onChange={onBrandChanged}
            />
          ) : (
            <Input
              bg={"#ffffff"}
              value={brand}
              placeholder="Wpisz markę"
              onChange={onBrandChanged}
            />
          )}
        </FormControl>
        <FormControl id="brand">
          <div className="small gray">model: </div>
          {mode == "edit" ? (
            <Input
              bg={"#ffffff"}
              value={model}
              placeholder="Wpisz model"
              onChange={onModelChanged}
            />
          ) : (
            <Input
              bg={"#ffffff"}
              value={model}
              placeholder="Wpisz model"
              onChange={onModelChanged}
            />
          )}
        </FormControl>
        <FormControl id="uwagi">
          <div className="small gray">Uwagi: </div>
          {mode == "edit" ? (
            <Textarea
              value={notes}
              bg={"#ffffff"}
              placeholder="Wpisz uwagi"
              onChange={onNoteChanged}
            />
          ) : (
            <Textarea placeholder="Wpisz uwagi" onChange={onNoteChanged} />
          )}
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={onSaveItemClicked}
          isLoading={isLoading}
        >
          Dodaj
        </Button>
      </VStack>
    </>
  );
};

export default NewItemForm;
