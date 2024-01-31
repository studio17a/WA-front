import { Tr, Td } from "@chakra-ui/react";
import { Button, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import VehiclesContent from "../vehicles/VehiclesContent";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { setUserModalMode } from "./userModalModeSlice";
import { setIsUsersModalOpen } from "./isUsersModalOpenSlice";
import { useDispatch } from "react-redux";
import { setUserObj } from "./selectedUserSlice";
import { useState, useEffect } from "react";
import ItemsTable from "../items/ItemsTable";
import ItemsContent from "../items/ItemsContent";
import DelUserComponent from "./DelUserComponent";

const UsersTRow = ({ user, vehiclesReady }) => {
  // let itemsContent = (
  //   <Button size="sm" colorScheme="yellow">
  //     <FontAwesomeIcon
  //       icon={faMagnifyingGlass}
  //       onClick={() => {
  //         getItemsByUserId({ userId: user?._id });
  //       }}
  //     />
  //   </Button>
  // );
  // <ItemsTable items={items} view="raw" />

  // useEffect(() => {
  //   getItemsByUserId({ userId: user?._id });
  // }, []);
  const dispatch = useDispatch();
  // console.log(user);
  let content = "";
  const setUpModal = (mode) => {
    dispatch(setUserObj(user));
    dispatch(setIsUsersModalOpen(true));
    dispatch(setUserModalMode(mode));
  };
  if (user !== null) {
    content = (
      <>
        <Tr>
          <Td>
            <DelUserComponent uid={user._id} />
            <Button
              onClick={() => setUpModal("edit")}
              marginLeft="20px"
              size="sm"
              colorScheme="yellow"
            >
              <FontAwesomeIcon
                w="4px"
                height="4px"
                color="#fff"
                icon={faEdit}
              />
            </Button>
          </Td>
          <Td>
            <p className="gray small">{user?._id}</p>
            {user.roles?.map((role) => (
              <p className="gray small">{role}</p>
            ))}
            <p className="gray small">
              NIP: <b>{user?.NIP}</b>
            </p>
            <p className="gray small">
              REGON: <b>{user?.REGON}</b>
            </p>
            <b>{user?.username}</b>
            <p>
              <span className=" small">email:</span>
              <span>
                {" "}
                <u>{user?.email}</u>
              </span>
            </p>
            <p>
              {" "}
              <span className=" small">tel.: </span>
              <span classname="gray big">
                <b>{user?.phone}</b>
              </span>
            </p>
            <p className=" small">
              ul: {user?.street} {user?.streetNr}
            </p>
            <p className=" small">
              {user?.postal} {user?.city}
            </p>
          </Td>
          <Td>
            <VehiclesContent
              vehiclesReady={vehiclesReady}
              user={user}
              userId={user?._id}
            />
          </Td>
          <Td>
            <ItemsContent user={user} userId={user?._id} />
          </Td>
          <Td>{user?.notes}</Td>
        </Tr>
      </>
    );
  } else content = <></>;
  return content;
};
export default UsersTRow;
