import { useGetItemsByUserIdMutation } from "./itemsApiSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ItemsListItem from "./ItemsListItem";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { Select, VStack } from "@chakra-ui/react";
import {
  Button,
  Spinner,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import {
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

const ItemsList = ({ mode }) => {
  console.log("");
  const { garageId } = useParams();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [
    getItemsByUserId,
    { data: items, isLoading, isSuccess, isError, error },
  ] = useGetItemsByUserIdMutation();
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const selectedVehicle = useSelector((state) => state.selectedVehicle.vehicle);
  const selectedItems = useSelector((state) => state.selectedItems.itemsIds);

  useEffect(() => {
    if (mode === "client") {
      getItemsByUserId({ gid: garageId, userId: selectedUserObj._id });
    } else {
      getItemsByUserId({ gid: garageId });
    }
  }, [selectedUserObj, selectedItems]);

  let content;
  if (isLoading) content = <Spinner />;
  if (isError) {
    console.log(error);
    content = (
      <>
        <p>
          ten klient nie ma jeszcze przypisanych przedmiotow
          {error?.data?.message}
        </p>
      </>
    );
  }
  if (isSuccess) {
    const { ids, entities } = items;
    const list =
      ids?.length &&
      ids.map((itemId) => (
        <ItemsListItem key={itemId} item={entities[itemId]} />
      ));
    content = (
      <>
        <Popover>
          <PopoverTrigger>
            <Button marginBottom="15px" bg="transparent">
              <HStack color="#217194">
                <FontAwesomeIcon
                  className="big"
                  icon={faAngleDown}
                  color="#217194"
                />{" "}
                <div p={5} className="proper" color="#217194">
                  Części klienta:
                </div>
              </HStack>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            background="#fcfcfc"
            borderColor="gray.200"
            boxShadow="none"
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader height="35px"></PopoverHeader>
            <PopoverBody>{list}</PopoverBody>
          </PopoverContent>
        </Popover>
      </>
    );
  }
  return content;
};

export default ItemsList;
