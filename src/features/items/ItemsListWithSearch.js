import { Select, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setItem } from "./selectedItemsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemsSearchBox from "./ItemsSearchBox";
import { useGetItemsByUserIdMutation } from "./itemsApiSlice";
import { Button, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
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

const ItemsListSelect = () => {
  let searchField = <></>;
  const { garageId } = useParams();
  let itemsList;
  const [changeItem, setChangeItem] = useState(false);
  const [
    getItemsByUserId,
    { data: items, isLoading, isSuccess, isError, error },
  ] = useGetItemsByUserIdMutation();
  const useItemsList = async () => {
    await getItemsByUserId({ gid: garageId });
    setChangeItem(!changeItem);
  };
  if (isError) {
    console.log(error);
  }
  if (isLoading) {
    searchField = (
      <>
        <Spinner />
      </>
    );
  }
  if (isSuccess) {
    itemsList = items.ids?.map((iid) => items.entities[iid]);
    console.log(itemsList);
    searchField = (
      <ItemsSearchBox placeholder="szukaj części" data={itemsList} />
    );
  }
  return (
    <VStack spacing="25px">
      <Popover>
        <PopoverTrigger>
          <Button
            marginBottom="15px"
            bg="transparent"
            onClick={useItemsList}
            onBlur={() => setChangeItem(false)}
          >
            <HStack color="#217194">
              <FontAwesomeIcon
                className="big"
                icon={faAngleDown}
                color="#217194"
              />{" "}
              <div p={5} className="proper" color="#217194">
                magazyn:
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
          <PopoverBody>{searchField}</PopoverBody>
        </PopoverContent>
      </Popover>
    </VStack>
  );
};

export default ItemsListSelect;
