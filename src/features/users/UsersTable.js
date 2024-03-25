import {
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Box,
  Spinner,
  Th,
  HStack,
  Td,
  TableCaption,
  TableContainer,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  FormControl,
  useDisclosure,
  useToast,
  Container,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
  Tabs,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import UsersTBody from "./UsersTBody";
import { useDispatch, useSelector } from "react-redux";
import { setIsUsersModalOpen } from "./isUsersModalOpenSlice";
import { setUserModalMode } from "./userModalModeSlice";
import useAuth from "../../hooks/useAuth";
import { setUserObj } from "./selectedUserSlice";
import {
  useGetUserByVehicleMutation,
  useGetUserByItemMutation,
} from "./usersApiSlice";
import { useParams } from "react-router-dom";

const UsersTable = ({ usersRaw }) => {
  const UserInfo = useAuth();
  const { garageId } = useParams();
  const { uid } = useParams();
  console.log(`UsersTable`);
  const isUsersModalOpen = useSelector(
    (state) => state.isUsersModalOpen.isUsersModalOpen,
  );
  const [getUserByVehicle, { data: userByVehicle }] =
    useGetUserByVehicleMutation();
  const [
    getUserByItem,
    { data: userByItem, isLoading, isSuccess, isError, error },
  ] = useGetUserByItemMutation();
  // console.log(users);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nazwa, setNazwa] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [reg, setReg] = useState("");
  const [itm, setItm] = useState("");
  const [regIds, setRegIds] = useState([]);
  const [itmIds, setItmIds] = useState([]);
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState("");
  const [vehiclesReady, setVehiclesReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pozycje, setPozycje] = useState(5);
  const [isStuff, setIsStuff] = useState(false);
  // if (isSuccess) {
  //   // const { ids, entities } = usersWithVehicles;
  //   // const usersWV = ids.map((uid) => entities[uid]);
  //   //   setFilteredData(usersWithVehicles);
  //   //   setVehiclesReady(true);
  //   //   users = usersWithVehicles;
  // }
  // useEffect(() => {
  //   getUsersVithVehicles();
  // }, []);

  useEffect(() => {
    console.log(UserInfo);
    if (UserInfo?.roles.isadmin.filter((g) => g._id === garageId).length > 0) {
      setIsStuff(true);
      console.log(isStuff);
    }
  }, [UserInfo]);
  useEffect(() => {
    if (!isUsersModalOpen) {
      setUsers(usersRaw);
      setFilteredData(usersRaw);
    }

    if (filter !== "") {
      if (filtered == "nazwa") {
        const e = { target: { value: nazwa } };
        nazwaChanged(e);
      } else if (filtered == "email") {
        const e = { target: { value: email } };
        emailChanged(e);
      } else if (filtered == "tel") {
        const e = { target: { value: tel } };
        telChanged(e);
      } else if (filtered == "reg" && !isLoading) {
        if (reg.length >= 3) {
          findByReg();
        }
      } else if (filtered == "items" && !isLoading) {
        if (itm.length >= 3) {
          findByItm();
        }
      }
    }
  }, [usersRaw]);
  // useEffect(() => {
  //   setFilteredData(users);
  // }, []);

  //=====
  // useEffect(() => {
  //   console.log("ping");
  //   if (usersWithVehicles) {
  //     const { ids, entities } = usersWithVehicles;
  //     const usersWV = ids.map((uid) => entities[uid]);
  //     if (usersWV) {
  //       // setFilteredData(usersWV);
  //       setVehiclesReady(true);
  //       setUsers(usersWV);
  //     }
  //   }
  //   // console.log("usersWithVehicles");
  //   // console.log(usersWithVehicles);
  // }, [usersWithVehicles]);
  //====

  useEffect(() => {
    if (filteredData.length > 25) setPozycje(`25`);
    else setPozycje(filteredData.length.toString());
    setLoading(false);
  }, [filteredData]);

  const setUpModal = (mode) => {
    dispatch(setUserObj(null));
    dispatch(setIsUsersModalOpen(true));
    dispatch(setUserModalMode(mode));
  };
  const nazwaChanged = (e) => {
    setEmail("");
    setTel("");
    setReg("");
    setItm("");
    setNazwa(e.target.value);
    setFilter(e.target.value);
    setFiltered("nazwa");
    const result = users.map((user) => {
      const searchWord = e.target.value;
      let allow = true;
      if (user.NIP) {
        if (user.NIP.toLowerCase().includes(searchWord.toLowerCase()))
          return { ...user };
      }
      if (user.REGON) {
        if (user.REGON.toLowerCase().includes(searchWord.toLowerCase()))
          return { ...user };
      }
      if (user.phone) {
        if (user.phone.toLowerCase().includes(searchWord.toLowerCase()))
          return { ...user };
      }
      if (user.email) {
        if (user.email.toLowerCase().includes(searchWord.toLowerCase()))
          return { ...user };
      }
      if (user.username) {
        if (user.username.toLowerCase().includes(searchWord.toLowerCase()))
          return { ...user };
      } else return null;
      if (allow) return null;
    });
    const result2 = result.filter((user) => user !== null);
    setFilteredData(result2);

    // const result = users.filter((user) => {
    //   const searchWord = e.target.value;
    //   return user.username.toLowerCase().includes(searchWord.toLowerCase());
    // });
    // setFilteredData(result);
  };
  const findByReg = () => {
    setEmail("");
    setTel("");
    setItm("");
    setNazwa("");
    setFiltered("reg");
    const result = regIds?.map((id) => users.find((user) => user._id === id));
    // users.map((user) => regIds.find((id) => id === user._id));
    // console.log(result);
    setFilteredData(result);
  };
  const findByItm = () => {
    setEmail("");
    setTel("");
    setReg("");
    setNazwa("");
    setFiltered("items");
    const result = itmIds?.map((id) => users.find((user) => user._id === id));
    // users.map((user) => regIds.find((id) => id === user._id));
    // console.log(result);
    setFilteredData(result);
  };

  const emailChanged = (e) => {
    setNazwa("");
    setTel("");
    setReg("");
    setItm("");
    setFilter(e.target.value);
    setEmail(e.target.value);
    setFiltered("email");
    const result = users.filter((user) => {
      const searchWord = e.target.value;
      return user.email.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(result);
  };
  const telChanged = (e) => {
    setEmail("");
    setNazwa("");
    setReg("");
    setItm("");
    setFilter(e.target.value);
    setTel(e.target.value);
    setFiltered("tel");
    const result = users.filter((user) => {
      const searchWord = e.target.value;
      return user.phone.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(result);
  };
  const regChanged = (e) => {
    setEmail("");
    setTel("");
    setNazwa("");
    setFilter(e.target.value);
    setReg(e.target.value);
    setFiltered("reg");
    if (e.target.value.length >= 3) {
      getUserByVehicle({ gid: garageId, reg: e.target.value });
    }
  };
  const itemChanged = (e) => {
    setEmail("");
    setTel("");
    setNazwa("");
    setFilter(e.target.value);
    setItm(e.target.value);
    setFiltered("items");
    if (e.target.value.length >= 3) {
      getUserByItem({ gid: garageId, item: e.target.value });
    }
  };
  const clearTheUsers = () => {
    setNazwa("");
    setEmail("");
    setTel("");
    setReg("");
    setFilter("");
    setFiltered("");
    console.log("claer");
    setUsers(usersRaw);
    setFilteredData(usersRaw);
  };
  useEffect(() => {
    if (userByVehicle) {
      console.log(userByVehicle);
      const { ids, entities } = userByVehicle;
      const usersWV = ids.map((uid) => entities[uid]);
      if (usersWV) {
        setFilteredData(usersWV);
        setVehiclesReady(true);
        setUsers(usersWV);
        setRegIds(ids);
      }
      // console.log(`userByVehicle`);
      // console.log(userByVehicle);
      // const result2 = result.filter((user) => user !== null);
      // setFilteredData(result2);
    }
  }, [userByVehicle]);
  useEffect(() => {
    if (userByItem) {
      console.log(userByItem);
      const { ids, entities } = userByItem;
      const usersWI = ids.map((uid) => entities[uid]);
      if (usersWI) {
        setFilteredData(usersWI);
        setVehiclesReady(true);
        setUsers(usersWI);
        setItmIds(ids);
      }
      // console.log(`userByVehicle`);
      // console.log(userByVehicle);
      // const result2 = result.filter((user) => user !== null);
      // setFilteredData(result2);
    }
  }, [userByItem]);

  return (
    <>
      {!uid && isStuff && (
        <Box
          maxWidth="100%"
          border="1px solid #eaeaea"
          borderRadius="5px"
          padding="9px 5px 5px 10px"
          backgroundColor="#fafafa"
        >
          <HStack>
            <Input
              id="nazwa"
              value={nazwa}
              placeholder="nazwa/NIP/REGON/tel/email"
              margin="0 0 5px 0"
              onBlur={(e) => {
                e.target.value = "";
              }}
              backgroundColor="#fff"
              onChange={nazwaChanged}
            />
            <InputGroup>
              {!isLoading && (
                <InputLeftElement
                  className="InputLeft"
                  pointerEvents="none"
                  children={
                    <FontAwesomeIcon
                      color="#fff"
                      marginLeft="5px"
                      icon={faUser}
                    />
                  }
                  size="xs"
                />
              )}
              {isLoading && (
                <InputLeftElement
                  className="InputLeft"
                  pointerEvents="none"
                  children={<Spinner />}
                  size="xs"
                />
              )}
              <Input
                value={reg}
                placeholder="nr rej (min. 3 znaki)"
                margin="0 0 5px 0"
                onBlur={(e) => {
                  e.target.value = "";
                }}
                bg="#fff"
                onChange={regChanged}
              />
              <Input
                value={itm}
                placeholder="produkt (min. 3 znaki)"
                margin="0 0 5px 5px"
                onBlur={(e) => {
                  e.target.value = "";
                }}
                bg="#fff"
                onChange={itemChanged}
              />
              <Button
                bg="transparent"
                onClick={() => {
                  clearTheUsers();
                }}
              >
                <FontAwesomeIcon color="red" marginLeft="5px" icon={faXmark} />
              </Button>
            </InputGroup>
          </HStack>
        </Box>
      )}
      <TableContainer overflowY="scroll" className="fixedTable">
        <Table>
          <TableCaption>
            <p className="gray">
              pozycje: <span className="big">{pozycje}</span> z {users.length}
            </p>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>
                {!uid && (
                  <Button
                    size="sm"
                    colorScheme="cyan"
                    onClick={() => setUpModal("add")}
                  >
                    <AddIcon marginRight="10px" w={3} h={3} color="#fff" />
                    <FontAwesomeIcon
                      color="#fff"
                      marginLeft="5px"
                      icon={faUser}
                    />
                  </Button>
                )}
              </Th>
              <Th>nazwa email tel.</Th>
              {uid && <Th>Twoje zgody</Th>}
              {uid && <Th>Twoje warsztaty</Th>}
              <Th>
                pojazdy
                <p></p>
              </Th>
              <Th>produkty</Th>
              {isStuff && <Th>uwagi</Th>}
            </Tr>
          </Thead>
          <Tbody>
            <UsersTBody users={filteredData} />
          </Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
              <Th>nazwa email tel</Th>
              {uid && <Th>Twoje zgody</Th>}
              {uid && <Th>Twoje warsztaty</Th>}
              <Th>pojazdy</Th>
              <Th>produkty</Th>
              {isStuff && <Th>uwagi</Th>}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
