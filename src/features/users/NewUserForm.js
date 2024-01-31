import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";
import useTitle from "../../hooks/useTitle";
import { Button, useToast, Select } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setVehicle } from "../vehicles/selectedVehicleSlice";
import { setUserObj } from "./selectedUserSlice";
import useAuth from "../../hooks/useAuth";

const USER_REGEX = /^[A-z0-9]{1,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{1,12}$/;

const NewUserForm = ({ isAdmin, mode }) => {
  const userInfo = useAuth();
  const { garageId, day, month, year } = useParams();
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );

  const userModalMode = useSelector(
    (state) => state.userModalMode.userModalMode,
  );
  const [bColor, setBColor] = useState("#eaeaea");
  useEffect(() => {
    if (userModalMode == "edit") {
      setBColor("#fcba03");
    } else {
      setBColor("#eaeaea");
    }
  }, [userModalMode]);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  useTitle("techServices: New User");

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const [nip, setNip] = useState("");
  const [street, setStreet] = useState("");
  const [regon, setRegon] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    console.log("tu1");
    if (selectedUserObj) {
      // console.log(selectedUserObj);
      selectedUserObj.username
        ? setUsername(selectedUserObj.username)
        : setUsername("");
      selectedUserObj.email
        ? setUserEmail(selectedUserObj.email)
        : setUserEmail("");
      selectedUserObj.phone ? setPhone(selectedUserObj.phone) : setPhone("");
      selectedUserObj.address
        ? setAddress(selectedUserObj.address)
        : setAddress("");
      selectedUserObj.roles ? setRoles(selectedUserObj.roles) : setRoles("");
    } else {
      console.log("tu3");
      setUsername("");
      setUserEmail("");
      setPhone("");
      setAddress("");
      setRoles([]);
    }
  }, [selectedUserObj]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      setUsername("");
      setPassword("");
      setRoles([]);
      toast({
        title: "Konto utworzone.",
        description: "Dodano nowego klienta.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // navigate("/dash/users");
    }
  }, [isSuccess]);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onStreetChanged = (e) => setNip(e.target.value);
  const onNipChanged = (e) => setNip(e.target.value);
  const onRegonChanged = (e) => setNip(e.target.value);
  const onUserEmailChanged = (e) => setUserEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onPhoneChanged = (e) => setPhone(e.target.value);

  const onAddressChanged = (e) => setAddress(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value,
    );
    setRoles(values);
  };

  const canSave = [validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    setLoading(true);
    console.log(`canSave: ${canSave}`);
    e.preventDefault();

    if (userModalMode == "edit") {
      const { message, user } = await addNewUser({
        _id: selectedUserObj._id,
        mode: userModalMode,
        username,
        password,
        NIP: nip,
        REGON: regon,
        email: userEmail,
        phone: phone,
        garage: garageId,
        authorname: userInfo.username,
      }).unwrap();
      if (user) {
        dispatch(setVehicle(null));
        dispatch(setUserObj(user));
      }
    } else {
      if (canSave) {
        const { message, user } = await addNewUser({
          mode: userModalMode,
          username,
          password,
          NIP: nip,
          REGON: regon,
          email: userEmail,
          phone: phone,
          garage: garageId,
          roles,
        }).unwrap();
        if (user) {
          dispatch(setVehicle(null));
          dispatch(setUserObj(user));
        }
      }
    }
    // console.log(message);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      mode: {mode}
      <VStack spacing="25px">
        <h2>Nowy Klient</h2>
        <FormControl id="username" isRequired>
          <FormLabel>
            Nazwa <span>[3-20 letters]</span>
          </FormLabel>
          <Input
            borderColor={bColor}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />
        </FormControl>
        <HStack width="100%">
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              borderColor={bColor}
              placeholder="Input your email"
              value={userEmail}
              onChange={onUserEmailChanged}
            />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phoneefon</FormLabel>
            <Input
              borderColor={bColor}
              id="phone"
              name="phone"
              type="text"
              autoComplete="off"
              value={phone}
              onChange={onPhoneChanged}
            />
          </FormControl>
        </HStack>
        <HStack width="100%">
          {mode !== "edit" ? (
            <FormControl width="50%" id="password" isRequired>
              <FormLabel>
                Hasło <span>[4-12 chars incl. !@#$%]</span>
              </FormLabel>
              <Input
                borderColor={bColor}
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onPasswordChanged}
              />
            </FormControl>
          ) : (
            <>
              <Button>resetuj hasło</Button>
            </>
          )}

          {isAdmin === true ? (
            <>
              <FormLabel>Rola</FormLabel>
              <Select
                width="20%"
                borderColor={bColor}
                id="roles"
                name="roles"
                multiple={false}
                size="3"
                value={roles}
                onChange={onRolesChanged}
              >
                {options}
              </Select>{" "}
            </>
          ) : (
            <></>
          )}
        </HStack>
        <FormControl id="nip">
          <FormLabel>NIP</FormLabel>
          <Input
            borderColor={bColor}
            id="nip"
            name="nip"
            type="text"
            autoComplete="off"
            value={nip}
            onChange={onNipChanged}
          />
        </FormControl>
        <FormControl id="regon">
          <FormLabel>REGON</FormLabel>
          <Input
            borderColor={bColor}
            id="regon"
            name="regon"
            type="text"
            autoComplete="off"
            value={regon}
            onChange={onRegonChanged}
          />
        </FormControl>
        <HStack width="100%">
          <FormControl id="regon">
            <FormLabel>Ulica</FormLabel>
            <Input
              width="80%"
              borderColor={bColor}
              id="street"
              name="street"
              type="text"
              autoComplete="off"
              value={street}
              onChange={onStreetChanged}
            />
          </FormControl>
          <FormControl id="streetNr">
            <FormLabel>nr domu/mieszkania</FormLabel>
            <Input
              width="20%"
              borderColor={bColor}
              id="streetNr"
              name="streetNr"
              type="text"
              autoComplete="off"
              value={street}
              onChange={onStreetChanged}
            />
          </FormControl>
        </HStack>
        <HStack width="100%">
          <FormControl id="streetNr">
            <FormLabel>Miejscowość</FormLabel>
            <Input
              width="80%"
              borderColor={bColor}
              id="streetNr"
              name="streetNr"
              type="text"
              autoComplete="off"
              value={street}
              onChange={onStreetChanged}
            />
          </FormControl>
          <FormControl id="regon">
            <FormLabel>Kod pocztowy</FormLabel>
            <Input
              width="20%"
              borderColor={bColor}
              id="street"
              name="street"
              type="text"
              autoComplete="off"
              value={street}
              onChange={onStreetChanged}
            />
          </FormControl>
        </HStack>
        {userModalMode === "add" ? (
          <Button
            margin="0px 0px 30px 0px"
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={onSaveUserClicked}
            isLoading={loading}
          >
            Dodaj
          </Button>
        ) : (
          <Button
            colorScheme="yellow"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={onSaveUserClicked}
            isLoading={loading}
            color="#fff"
            margin="0px 0px 30px 0px"
          >
            Zapisz
          </Button>
        )}
      </VStack>
    </>
  );

  return content;
};
export default NewUserForm;
