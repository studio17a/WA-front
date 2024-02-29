import NewServiceForm from "./NewServiceForm";
import NewVehicleForm from "../vehicles/NewVehicleForm";
import NewItemForm from "../items/NewItemForm";
import NewStForm from "../st/NewStForm";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";
import UsersPanel from "../users/UsersPanel";
import MyDatePicker from "../calendar/DatePicker";
import VehiclesListWithSearch from "../vehicles/VehiclesListWithSearch";
import { Stack, HStack, VStack, Flex } from "@chakra-ui/react";
import { useHandleServiceMutation } from "./servicesApiSlice";
// import { useUpdateServiceMutation } from "./servicesApiSlice";
import { useDispatch } from "react-redux";
import { setIsServiceModalOpen } from "./isServiceModalOpenSlice";
import { setStId, addStId, removeStId } from "../st/selectedStSlice";
import { serviceModalMode } from "./serviceModalModeSlice";
import { setEditedServiceId } from "./editedServiceIdSlice";
import { editedServiceId } from "./editedServiceIdSlice";
import { setItemsId } from "../items/selectedItemsSlice";
import ServiceDetails from "./ServiceDetails";
import TransferVehicle from "../vehicles/TransferVehicle";
import useAuth from "../../hooks/useAuth";
import {
  FormControl,
  Input,
  useDisclosure,
  useToast,
  Box,
  Button,
  Container,
  Spinner,
  Select,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
  Tabs,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import NewUserForm from "../users/NewUserForm";
import VehiclesList from "../vehicles/VehiclesList";
import ItemsList from "../items/ItemsList";
import HourSelect from "./HourSelect";
import MinuteSelect from "./MinuteSelect";
import { format } from "date-fns";
import StsList from "../st/StsList";
import { setHour } from "./selectedHourSlice";
import { setMinute } from "./selectedMinuteSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setServiceModalMode } from "./serviceModalModeSlice";
import { setSave } from "./saveServiceSlice";
import { setItemModalMode } from "../items/itemModalModeSlice";
import { setModalButtonDisabled } from "./modalButtonDisabledSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useAddNewStMutation } from "../st/stsApiSlice";
import ItemDetails from "../items/ItemDetails";

const NewServiceModal = ({ children, open, method }) => {
  const UserInfo = useAuth();
  const [orientation, setOrientation] = useState("landscape");
  const [handleService, { isLoading, isSuccess, isError, error }] =
    useHandleServiceMutation();
  // const [
  //   editService,
  //   {
  //     isServiceEditLoading,
  //     isServiceEditSuccess,
  //     isServiceEditError,
  //     serviceEditError,
  //   },
  // ] = useUpdateServiceMutation();
  useTitle("techServices: New Service");
  const dispatch = useDispatch();
  const [bColor, setBColor] = useState("#eaeaea");
  if (isError) {
    console.log(`serviceError${error}`);
  }
  if (isLoading) {
    // console.log(`serviceError${serviceError}`);
  }
  if (isSuccess) {
    // console.log(`serviceError${serviceError}`);
  }
  const serviceModalMode = useSelector(
    (state) => state.serviceModalMode.serviceModalMode,
  );
  const saveService = useSelector((state) => state.saveService.save);
  const modalButtonDisabled = useSelector(
    (state) => state.modalButtonDisabled.modalButtonDisabled,
  );
  const editedServiceId = useSelector(
    (state) => state.editedServiceId.editedServiceId,
  );
  const isServiceModalOpen = useSelector(
    (state) => state.isServiceModalOpen.isServiceModalOpen,
  );
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const selectedVehicle = useSelector((state) => state.selectedVehicle.vehicle);
  const selectedDate = useSelector((state) => state.selectedDate.date);
  const selectedHour = useSelector((state) => state.selectedHour.hour);
  const selectedMinute = useSelector((state) => state.selectedMinute.minute);

  const selectedItems = useSelector((state) => state.selectedItems.itemsIds);
  const selectedStId = useSelector((state) => state.selectedSt.stIds);
  const stToDel = useSelector((state) => state.stToDel.stToDelIds);

  const { garageId, day, month, year } = useParams();
  const [alert, setAlert] = useState(false);
  const [showAddVehiclePanel, setShowAddVehiclePanel] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [vehicleTabIndex, setVehicleTabIndex] = useState(0);
  const [stTabIndex, setStTabIndex] = useState(0);
  const [itemTabIndex, setItemTabIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  let stList = "";
  stList = selectedStId?.map((st, index) => {
    if (st.toDo !== "del") {
      return <ServiceDetails index={index} modal="true" st={st} />;
    }
  });
  let allItemsList = "";
  if (isServiceModalOpen) {
    allItemsList = selectedItems?.map((i, index) => {
      if (i.toDo !== "del") {
        return (
          <>
            <ItemDetails view="raw" index={index} modal="true" item={i} />
          </>
        );
      }
    });
  }
  useEffect(() => {
    if (saveService == true) {
      saveTheService();
    }
  }, [saveService]);
  useEffect(() => {
    setStTabIndex(0);
  }, [selectedStId]);
  useEffect(() => {
    console.log("selectedItems");
    console.log(selectedItems);
  }, [selectedItems]);
  useEffect(() => {
    if (serviceModalMode == "edit") {
      setBColor("#fcba03");
    } else {
      setBColor("#eaeaea");
    }
  }, [serviceModalMode]);
  useEffect(() => {
    console.log(selectedItems);
    if (
      selectedVehicle[0]?.user._id &&
      selectedVehicle[0]?.user._id !== selectedUserObj?._id
    ) {
      setAlert(true);
    } else {
      setAlert(false);
    }
    if (selectedVehicle) {
      dispatch(setModalButtonDisabled(false));
    }
    handleTabsChange(0);
    handleVehicleTabsChange(0);
    handleItemTabsChange(0);
  }, [selectedUserObj, selectedVehicle, selectedItems]);

  useEffect(() => {
    dispatch(setItemModalMode("service"));
    // console.log("click");
    if (isServiceModalOpen == true) {
      // console.log("click1");
      onOpen();
    } else {
      // console.log("click2");
      onClose();
    }
  }, [isServiceModalOpen]);
  const handleTabsChange = (index) => {
    if (index == 1) setShowAddVehiclePanel(false);
    else setShowAddVehiclePanel(true);
    setTabIndex(index);
  };
  const handleItemTabsChange = (index) => {
    setItemTabIndex(index);
  };
  const handleVehicleTabsChange = (index) => {
    setVehicleTabIndex(index);
  };
  const handleStTabsChange = (index) => {
    setStTabIndex(index);
  };

  const [addNewSt] = useAddNewStMutation();
  // if (!users?.length) return <PulseLoader color={"#FFF"} />;
  // const editAppointment = async (e) => {
  //   const { serviceMessage, newServivceId } = await handleService({
  //     serviceModalMode: serviceModalMode,
  //     id: editedServiceId,
  //     garage: garageId,
  //     date: selectedDate,
  //     hour: selectedHour,
  //     st: selectedStId,
  //     minute: selectedMinute,
  //     user: selectedUserId,
  //     item: selectedItemId,
  //     date: selectedDate,
  //     vehicle: selectedVehicleId,
  //     hour: selectedHour,
  //     minute: selectedMinute,
  //   }).unwrap();
  // };
  if (addNewSt.isError) {
    console.log("3");
  }
  if (addNewSt.error) {
    console.log("4");
  }
  if (addNewSt.isLoading) {
    stList = <Spinner />;
  }

  const saveTheService = async () => {
    // console.log("savetheservice");
    // console.log(selectedStId);
    let editedId;
    if (serviceModalMode == "edit" || serviceModalMode == "") {
      editedId = editedServiceId;
    } else {
      editedId = null;
    }
    // const stToAdd = selectedStId.map((sta) => sta._id);
    // console.log(stToAdd);
    // console.log(selectedItems);
    const { message, handledServivceId } = await handleService({
      serviceModalMode: serviceModalMode,
      id: editedId,
      garage: garageId,
      user: selectedUserObj._id,
      items: selectedItems,
      st: selectedStId,
      date: selectedDate,
      vehicle: selectedVehicle[0],
      hour: selectedHour,
      minute: selectedMinute,
      author: UserInfo._id,
      authorname: UserInfo.username,
    }).unwrap();
    if (isError) console.log(error);
    if (handledServivceId) {
      dispatch(setEditedServiceId(handledServivceId));
      dispatch(setServiceModalMode("edit"));
    }
    dispatch(setSave(false));
  };
  // const minute = "0";
  const saveAppointment = async () => {
    // dispatch(setModalButtonDisabled(true));
    // if (stToDel.length > 0) {
    //   stToDel?.map((std) => deleteSt(std));
    // }

    // const stsArray = await Promise.all(
    //   selectedStId?.map(async (st) => {
    //     const { newSt } = await addNewSt({
    //       _id: st._id,
    //       garage: garageId,
    //       predefined: false,
    //       name: st.name,
    //       toDo: st.toDo,
    //     }).unwrap();
    //     return newSt;
    //   }),
    // ).then(async (result) => {
    // console.log(selectedVehicle);
    //   // console.log(selectedStId);
    //   // console.log(result);
    //   dispatch(setStId(result));
    if (selectedVehicle[0]?.user._id === selectedUserObj?._id) {
      dispatch(setSave(true));
    } else if (!selectedVehicle) {
      console.log("wybierz pojazd!!!!");
    } else {
      console.log("konflikt");
      console
        .log
        // `${selectedVehicle[0]?.user._id} === ${selectedUserObj?._id}`,
        ();
    }
    // });
    // console.log(selectedStId);
  };
  const closeModal = () => {
    setItemsId([]);
    dispatch(setIsServiceModalOpen(false));
  };
  const addSt = () => {};
  const content = (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent minWidth="800px">
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {serviceModalMode}:{editedServiceId}
            <Container centerContent>
              <Box
                bg="white"
                w="100%"
                p={4}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={bColor}
              >
                <HStack>
                  <MyDatePicker />
                  <HourSelect /> <span>:</span> <MinuteSelect />
                </HStack>
              </Box>

              {/* {orientation === "mobile" ? <HStack alignItems="start"> : <VStack alignItems="start">}
              {orientation === "mobile" ? </HStack> : </VStack>} */}
              <HStack alignItems="start">
                <Box
                  margin="5"
                  alignItems="top"
                  bg="white"
                  minWidth="350"
                  p={4}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={bColor}
                >
                  <div>
                    klient: {selectedUserObj?.username}
                    {selectedUserObj?._id}
                  </div>
                  <Tabs
                    index={tabIndex}
                    onChange={handleTabsChange}
                    variant="soft-rounded"
                  >
                    <TabList mb="1em">
                      <Tab width="50%">Wybierz</Tab>
                      <Tab width="50%">Dodaj klienta</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <UsersPanel />
                      </TabPanel>
                      <TabPanel>
                        <NewUserForm />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
                {showAddVehiclePanel && selectedUserObj && (
                  <Box
                    margin="5"
                    alignItems="top"
                    bg="white"
                    minWidth="350"
                    bg="white"
                    w="100%"
                    p={4}
                    borderColor={bColor}
                    borderRadius="lg"
                    borderWidth="1px"
                  >
                    <div margin="5px" padding="5px">
                      pojazd: {selectedVehicle && selectedVehicle[0]?.reg}{" "}
                      {selectedVehicle && selectedVehicle.user}
                      {alert && <TransferVehicle />}
                    </div>
                    <Tabs
                      index={vehicleTabIndex}
                      onChange={handleVehicleTabsChange}
                      variant="soft-rounded"
                    >
                      <TabList mb="1em">
                        <Tab width="50%">Wybierz</Tab>
                        <Tab width="50%">Dodaj pojazd</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <VehiclesList />
                        </TabPanel>
                        <TabPanel>
                          <VehiclesListWithSearch vehicles={[]} />
                          <NewVehicleForm />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                    {/* <NewServiceForm users={users} /> */}
                  </Box>
                )}
              </HStack>
              <VStack alignItems="start">
                {showAddVehiclePanel && selectedUserObj && (
                  <Box
                    margin="5"
                    alignItems="top"
                    bg="white"
                    minWidth="350"
                    bg="white"
                    w="100%"
                    p={4}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={bColor}
                  >
                    <Tabs
                      index={itemTabIndex}
                      onChange={handleItemTabsChange}
                      variant="soft-rounded"
                    >
                      <TabList mb="1em">
                        <Tab width="50%">Wybierz</Tab>
                        <Tab width="50%">Dodaj przedmiot</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel align="center">
                          <ItemsList />
                          <Box
                            border="1px solid #eee"
                            borderRadius="10px"
                            overflowY="auto"
                            className="left w100 fixedTable"
                            maxWidth="580px"
                          >
                            <TableContainer
                              overflowY="scroll"
                              className="left w100 fixedTable"
                            >
                              <Table variant="simple">
                                <Thead>
                                  <Tr>
                                    <Th>-</Th>
                                    <Th>nazwa</Th>
                                    <Th>opis</Th>
                                    <Th>marka/model</Th>
                                    <Th>magazyn</Th>
                                    <Th>ilość</Th>
                                    <Th>uwagi</Th>
                                    <Th>zmodyfikowano</Th>
                                  </Tr>
                                </Thead>
                                <Tbody>{allItemsList}</Tbody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </TabPanel>
                        <TabPanel>
                          <NewItemForm mode={"add"} />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                    {/* <NewServiceForm users={users} /> */}
                  </Box>
                )}
                {showAddVehiclePanel && selectedUserObj && (
                  <Box
                    margin="5"
                    alignItems="top"
                    bg="white"
                    minWidth="100%"
                    bg="white"
                    w="100%"
                    p={4}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={bColor}
                  >
                    {/* <div>usługa: {selectedStId}</div> */}
                    <Tabs
                      index={stTabIndex}
                      onChange={handleStTabsChange}
                      variant="soft-rounded"
                    >
                      <TabList mb="1em">
                        <Tab width="50%">Wybierz</Tab>
                        <Tab width="50%">Dodaj usługę</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <StsList />
                          {stList}
                        </TabPanel>
                        <TabPanel>
                          <NewStForm />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                    {/* <NewServiceForm users={users} /> */}
                  </Box>
                )}
              </VStack>
              <Textarea
                borderColor={bColor}
                w="100%"
                margin="10px 0 30px 0"
                placeholder="Uwagi"
              />
              {serviceModalMode == "add" ? (
                <Button
                  isDisabled={modalButtonDisabled}
                  colorScheme="cyan"
                  margin="0 0 40px 0"
                  color="#fff"
                  padding="30px"
                  disab
                  width="100%"
                  isLoading={isLoading}
                  onClick={saveAppointment}
                >
                  Umów klienta
                </Button>
              ) : (
                <Button
                  isDisabled={modalButtonDisabled}
                  colorScheme="yellow"
                  margin="0 0 40px 0"
                  padding="30px"
                  width="100%"
                  color="#fff"
                  isLoading={isLoading}
                  onClick={saveAppointment}
                >
                  Edytuj wpis
                </Button>
              )}
            </Container>
            <p></p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

  return content;
};
export default NewServiceModal;
