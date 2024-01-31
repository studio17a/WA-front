import { Stack, HStack, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useAddNewVehicleMutation } from "./vehiclesApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button, useToast, Select } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Textarea } from "@chakra-ui/react";
import { setVehicle } from "./selectedVehicleSlice";
import { useSelector } from "react-redux";
import { setRefreshVehiclesByUser } from "../../hooks/refreshSlice";
import useAuth from "../../hooks/useAuth";

const NewVehicleForm = ({ mode }) => {
  const { garageId } = useParams();
  const UserInfo = useAuth();
  const dispatch = useDispatch();
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const oldSelectedUserObj = useSelector(
    (state) => state.oldSelectedUser.oldSelectedUser,
  );
  const selectedVehicle = useSelector((state) => state.selectedVehicle.vehicle);
  const [addNewVehicle, { isLoading, isSuccess, isError, error }] =
    useAddNewVehicleMutation();
  const vehicleModalMode = useSelector(
    (state) => state.vehicleModalMode.vehicleModalMode,
  );

  const [reg, setReg] = useState("");
  const [buttonTxt, setButtonTxt] = useState("dodaj");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [engine, setEngine] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [vid, setVid] = useState(null);

  useEffect(() => {
    dispatch(setRefreshVehiclesByUser(false));
    if (selectedVehicle[0]?._id) {
      setVid(selectedVehicle[0]._id);
    }
    if (selectedVehicle?._id) {
      setVid(selectedVehicle._id);
    }
  }, []);
  useEffect(() => {
    setReg(reg);
  }, [reg]);

  useEffect(() => {
    if (vehicleModalMode !== "add") setButtonTxt("Zapisz");
    if (selectedVehicle[0]) {
      console.log(`mode: ${vehicleModalMode}`);
      setReg(selectedVehicle[0].reg);
      setBrand(selectedVehicle[0].brand);
      setYear(selectedVehicle[0].year);
      setModel(selectedVehicle[0].model);
      setFuel(selectedVehicle[0].fuel);
      setEngine(selectedVehicle[0].engine);
      setNote(selectedVehicle[0].note);
    }
  }, [selectedVehicle]);

  const onRegChanged = (e) => {
    setReg(e.target.value);
  };
  const onBrandChanged = (e) => {
    setBrand(e.target.value);
  };
  const onModelChanged = (e) => {
    setModel(e.target.value);
  };
  const onYearChanged = (e) => {
    setYear(e.target.value);
  };
  const onFuelChanged = (e) => {
    setFuel(e.target.value);
  };
  const onEngineChanged = (e) => {
    setEngine(e.target.value);
  };
  const onNoteChanged = (e) => {
    setNote(e.target.value);
  };

  const onSaveVehicleClicked = async (e) => {
    // console.log("here");
    e.preventDefault();
    const canSave = reg && !isLoading;

    if (canSave) {
      console.log(`VIIIIIIIIIIIIID: ${vid}`);
      const { message, vehicle } = await addNewVehicle({
        mode: vehicleModalMode,
        garage: garageId,
        vid,
        selectedUserObj: selectedUserObj?._id,
        reg,
        brand,
        engine,
        year,
        fuel,
        note,
        author: UserInfo._id,
        authorname: UserInfo.username,
      }).unwrap();
      if (vehicle) dispatch(setVehicle(vehicle));
      // console.log(message);
    } else {
      // console.log("here2");
    }
  };
  if (isError) {
    console.log(error);
  }
  if (isSuccess) {
    dispatch(setRefreshVehiclesByUser(true));
  }
  return (
    <>
      <VStack spacing="25px">
        {vehicleModalMode !== "forward" && vehicleModalMode !== "edit" ? (
          <h2 className="gray bold">Nowy pojazd</h2>
        ) : (
          <h2 className="gray bold"> </h2>
        )}
        {vehicleModalMode !== "forward" && (
          <>
            {" "}
            <FormControl id="reg" isRequired>
              <FormLabel>Numer rejestracyjny</FormLabel>
              <Input
                value={reg}
                placeholder="Wpisz nr. rej. "
                onChange={onRegChanged}
              />
            </FormControl>
            <FormControl id="brand" isRequired>
              <FormLabel>Marka</FormLabel>
              <Input
                nvalue={brand}
                placeholder="Wpisz markę pojazdu "
                onChange={onBrandChanged}
              />
            </FormControl>
            <FormControl id="model">
              <FormLabel>Model</FormLabel>
              <Input
                value={model}
                placeholder="Wpisz model pojazdu "
                onChange={onModelChanged}
              />
            </FormControl>
            <FormControl id="year">
              <FormLabel>Rok produkcji</FormLabel>
              <Input
                value={year}
                placeholder="Wpisz rok produkcji "
                onChange={onYearChanged}
              />
            </FormControl>
            <FormControl id="engine">
              <FormLabel>Pojemność silnika</FormLabel>
              <Input
                value={engine}
                placeholder="Wpisz pojemność silnika "
                onChange={onEngineChanged}
              />
            </FormControl>
            <FormControl id="fuel">
              <FormLabel>Rodzaj paliwa</FormLabel>
              <Input
                value={fuel}
                placeholder="Wpisz rodzaj paliwa "
                onChange={onFuelChanged}
              />
            </FormControl>
            <FormControl id="note">
              <FormLabel>Uwagi</FormLabel>
              <Textarea
                value={note}
                placeholder="Wpisz uwagi"
                onChange={onNoteChanged}
              />
            </FormControl>
          </>
        )}
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={onSaveVehicleClicked}
          isLoading={isLoading}
        >
          {buttonTxt}
        </Button>
      </VStack>
    </>
  );
};
export default NewVehicleForm;
