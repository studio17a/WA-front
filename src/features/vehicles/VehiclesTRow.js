import {
  Table,
  Thead,
  Tbody,
  Button,
  Tfoot,
  Tr,
  Th,
  Td,
  HStack,
  TableCaption,
  TableContainer,
  VStack,
} from "@chakra-ui/react";
import DelVehicleComponent from "./DelVehicleComponent";
import EditVehicleComponent from "./EditVehicleComponent";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ForwardVehicleComponent from "./ForwardVehicleComponent";
import { useNavigate, Link, useLocation } from "react-router-dom";
import RemoveVehicleFromUserComponent from "./RemoveVehicleFromUserComponent";
import { setIsVehiclesModalOpen } from "./isVehiclesModalOpenSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { setVehicleModalMode } from "./vehicleModalModeSlice";
import { setUserObj } from "../users/selectedUserSlice";
import { setVehiclesByUser } from "./vehiclesByUserSlice";
import { useEffect } from "react";

const VehiclesTRow = ({ vehicle, view }) => {
  const dispatch = useDispatch();
  const { garageId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("vehicle");
    if (vehicle) console.log(vehicle);
  }, [vehicle]);
  return (
    <Tr>
      <Td marginLeft="0px">
        <HStack>
          <VStack>
            <HStack>
              <div width={20}></div>
              <RemoveVehicleFromUserComponent vehicle={vehicle} />
            </HStack>

            <HStack>
              <ForwardVehicleComponent vehicle={vehicle} />
              <div width={20}></div>
            </HStack>
          </VStack>
          <VStack align="left">
            <p align="left" className="small gray">
              właściciel:{" "}
            </p>
            <p className="small gray">
              {vehicle.user?.username ? (
                <b>{vehicle.user?.username}</b>
              ) : (
                <>NIE PRZYPISANO</>
              )}
            </p>
          </VStack>
        </HStack>
      </Td>
      <Td>
        <Table align="left">
          <Tbody>
            <tr
              align="left"
              onClick={() => {
                dispatch(setIsVehiclesModalOpen(true));
                dispatch(setVehicleModalMode("service"));
                dispatch(setUserObj(vehicle.user));
                dispatch(setVehiclesByUser(vehicle));
              }}
            >
              <td color="teal" width={30} align="right">
                <Button size="sm" backgroundColor="#f2f2f2">
                  <FontAwesomeIcon color="gray" icon={faMagnifyingGlass} />
                </Button>
              </td>
              <td width={5}></td>
              <td width={250} align="left">
                <div align="left">
                  {/* <p align="left" className="small gray">
                    {vehicle._id}
                  </p> */}
                  <p className="address" align="left">
                    <span className="proper tel">
                      <b>
                        {" "}
                        <u className="hand">{vehicle.reg}</u>
                      </b>
                    </span>
                  </p>
                  <p align="left">
                    <span align="left" className="darkgray small">
                      <b>{vehicle.brand}</b> {vehicle.model}
                    </span>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td height={10}></td>
              <td></td>
            </tr>
            <tr align="left">
              <td width={30} align="right"></td>
              <td width={5}></td>
              <td width={250} align="left"></td>
            </tr>
          </Tbody>
        </Table>
      </Td>
      <Td className=" small">
        <p>
          rok: <b>{vehicle.year}</b>
        </p>
        <p>
          poj: <b>{vehicle.engine}</b>
        </p>
      </Td>
      <Td>
        <EditVehicleComponent vehicle={vehicle} />
        <DelVehicleComponent vehicle={vehicle} />
      </Td>
    </Tr>
  );
};

export default VehiclesTRow;
