import {
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Spinner,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { AddIcon } from "@chakra-ui/icons";
import VehiclesTBody from "./VehiclesTBody";
import { useDispatch } from "react-redux";
import { setIsVehiclesModalOpen } from "./isVehiclesModalOpenSlice";
import { setVehicleModalMode } from "./vehicleModalModeSlice";
import { useGetVehiclesByUserIdMutation } from "./vehiclesApiSlice";
import { useState, useEffect } from "react";
import { setUserObj } from "../users/selectedUserSlice";

const VeiclesTable = ({ user, vehiclesRaw, view }) => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [tableContent, setTableContent] = useState("");

  const dispatch = useDispatch();
  // console.log(vehicles);
  const setUpModal = (mode) => {
    // dispatch(setUserObj(null));
    dispatch(setIsVehiclesModalOpen(true));
    dispatch(setVehicleModalMode(mode));

    if (user !== null) dispatch(setUserObj(user));
  };
  const idChanged = (e) => {
    const result = vehicles.map((vehicle) => {
      const searchWord = e.target.value;
      let allow = true;
      if (vehicle?._id) {
        if (vehicle._id.toLowerCase().includes(searchWord.toLowerCase()))
          return { ...vehicle };
      }
      if (vehicle?.reg) {
        if (vehicle.reg.toLowerCase().includes(searchWord.toLowerCase()))
          return { ...vehicle };
      } else return null;
      if (allow) return null;
    });
    const result2 = result.filter((vehicle) => vehicle !== null);
    setFilteredData(result2);
  };
  useEffect(() => {
    if (vehiclesRaw) {
      console.log(vehiclesRaw?.length);
      setFilteredData(vehiclesRaw);
      setVehicles(vehiclesRaw);
    }
  }, [vehiclesRaw]);
  return (
    <>
      <TableContainer
        backgroundColor="#fff"
        borderRadius="lg"
        // borderWidth="1px 1px 0px 1px"
        // borderWidth="3px 3px 2px 3px"
        borderStyle="solid"
        borderColor="#efefef"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Button
                  fontWeight="bold"
                  size="sm"
                  colorScheme="cyan"
                  onClick={() => setUpModal("add")}
                >
                  <AddIcon marginRight="10px" w={3} h={3} color="#fff" />
                  <FontAwesomeIcon
                    color="#fff"
                    marginLeft="5px"
                    icon={faCarSide}
                  />
                </Button>
              </Th>
              <Th>
                nr/nazwa
                {view !== "raw" && (
                  <>
                    <p>
                      <Input
                        placeholder="nr rejestracyjny"
                        margin="0 0 5px 0"
                        onBlur={(e) => {
                          e.target.value = "";
                        }}
                        bg="#fafafa"
                        onChange={idChanged}
                      />
                    </p>
                  </>
                )}
              </Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {vehiclesRaw?.length <= 0 && (
              <Tr>
                <Td padding="20px">
                  <div>Nie znaleziono pojazdów ...</div>
                </Td>
              </Tr>
            )}
            <VehiclesTBody view={view} vehicles={filteredData} />
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
  // return (
  //   <>
  //     {!isLoading && vehicles?.length > 0 ? (
  //       <TableContainer
  //         backgroundColor="#fff"
  //         borderRadius="lg"
  //         borderWidth="1px 1px 0px 1px"
  //         // borderWidth="3px 3px 2px 3px"
  //         borderStyle="solid"
  //         borderColor="#efefef"
  //       >
  //         <Table variant="simple">
  //           <Thead>
  //             <Tr>
  //               <Th>
  //                 <Button
  //                   fontWeight="bold"
  //                   size="sm"
  //                   colorScheme="cyan"
  //                   onClick={() => setUpModal("add")}
  //                 >
  //                   <AddIcon marginRight="10px" w={3} h={3} color="#fff" />
  //                   <FontAwesomeIcon
  //                     color="#fff"
  //                     marginLeft="5px"
  //                     icon={faCarSide}
  //                   />
  //                 </Button>
  //               </Th>
  //               <Th></Th>
  //               <Th></Th>
  //               <Th></Th>
  //             </Tr>
  //           </Thead>
  //           <Tbody>
  //             <VehiclesTBody vehicles={vehicles} />
  //           </Tbody>
  //         </Table>
  //       </TableContainer>
  //     ) : (
  //       !isLoading && (
  //         <>
  //           <Button
  //             size="sm"
  //             colorScheme="cyan"
  //             onClick={() => setUpModal("add")}
  //           >
  //             <AddIcon marginRight="10px" w={3} h={3} color="#fff" />
  //             <FontAwesomeIcon color="#fff" marginLeft="5px" icon={faCarSide} />
  //           </Button>
  //           {"   "}
  //           <span className="small gray left20">nie przypisano pojazdu</span>
  //         </>
  //       )
  //     )}
  //   </>
  // );
};

export default VeiclesTable;
