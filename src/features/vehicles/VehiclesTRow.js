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

const VehiclesTRow = ({ vehicle, view }) => {
  const dispatch = useDispatch();
  const { garageId } = useParams();
  const navigate = useNavigate();
  // console.log(vehicle);
  return (
    <Tr>
      <Td marginLeft="0px">
        <RemoveVehicleFromUserComponent vehicle={vehicle} />
        <ForwardVehicleComponent vehicle={vehicle} />
      </Td>
      <Td
        color="teal"
        onClick={() => {
          dispatch(setIsVehiclesModalOpen(true));
          dispatch(setVehicleModalMode("service"));
          dispatch(setUserObj(vehicle.user));
          dispatch(setVehiclesByUser(vehicle));
        }}
      >
        <HStack>
          <div>
            <Button size="sm" backgroundColor="transparent">
              <FontAwesomeIcon color="gray" icon={faMagnifyingGlass} />
            </Button>
          </div>
          <div>
            <p color="teal">
              <span color="teal">
                <u color="teal">{vehicle.reg}</u>
              </span>
            </p>
            <p>
              <span className="darkgray small">
                <b>{vehicle.brand}</b> {vehicle.model}
              </span>
            </p>
            <p className="small gray">{vehicle._id}</p>
          </div>
        </HStack>
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
