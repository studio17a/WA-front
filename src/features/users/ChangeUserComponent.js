import UsersSearchBox from "./UsersSearchBox";
import { useLazyGetUsersQuery } from "../users/usersApiSlice";
import { HStack, Spinner, Button, useToast, Select } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TransferVehicle from "../vehicles/TransferVehicle";

const ChangeUserComponent = () => {
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const [changeUser, setChangeUser] = useState(false);
  let usersList = [];
  const [getUsers, { data: users, isLoading, isSuccess, isError, error }] =
    useLazyGetUsersQuery();
  if (isSuccess) {
    usersList = users.ids?.map((uid) => users.entities[uid]);
  }
  const changeItemUser = async () => {
    setChangeUser(true);
    await getUsers(`65390301644a37e5235dcc84`);
  };
  useEffect(() => {
    // setChangeUser(!changeUser);
  }, [selectedUserObj]);
  return (
    <>
      <div marginBottom="20px">
        {" "}
        Obecny właściciel: {selectedUserObj?.username}{" "}
      </div>
      <HStack marginBottom="10px">
        {!changeUser ? (
          <Button
            onClick={() => {
              changeItemUser();
            }}
          >
            <FontAwesomeIcon
              w="4px"
              height="4px"
              color="#5ca832"
              icon={faShare}
            />
            Zmień właściciela:
          </Button>
        ) : (
          <Button isDisabled={true}>
            <FontAwesomeIcon
              marginRight="10px"
              w={3}
              h={3}
              color="#aaa"
              icon={faShare}
            />{" "}
            <span marginLeft="10px"> Zmień właściciela: </span>
          </Button>
        )}
      </HStack>
      {changeUser && (
        <HStack>
          <Button
            background="transparent"
            onClick={() => {
              setChangeUser(false);
            }}
          >
            <FontAwesomeIcon color="red" icon={faXmark} />
          </Button>
          {usersList.length <= 0 ? (
            <Spinner />
          ) : (
            <UsersSearchBox
              placeholder="wyszukaj klienta..."
              data={usersList}
            />
          )}
        </HStack>
      )}
    </>
  );
};

export default ChangeUserComponent;
