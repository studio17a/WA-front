import { Select, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setItem } from "./selectedItemsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemsSearchBox from "./ItemsSearchBox";
import { useGetItemsByUserIdMutation } from "./itemsApiSlice";
import { Button, Spinner } from "@chakra-ui/react";

const ItemsListSelect = () => {
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
  if (isSuccess) {
    itemsList = items.ids?.map((iid) => items.entities[iid]);
    console.log(itemsList);
  }
  return (
    <VStack spacing="25px">
      <Button colorScheme="teal" variant="link" onClick={useItemsList}>
        <u>MAGAZYN</u>
      </Button>
      {isLoading && <Spinner />}
      {isSuccess && (
        <ItemsSearchBox placeholder="szukaj pojazdu" data={itemsList} />
      )}
    </VStack>
  );
};

export default ItemsListSelect;
