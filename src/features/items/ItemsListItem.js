import { useGetItemsQuery } from "./itemsApiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setItemsId, addItemsId } from "./selectedItemsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { VStack, HStack, Box } from "@chakra-ui/react";

const ItemsListItem = ({ item, magazyn, name }) => {
  const selectedItems = useSelector((state) => state.selectedItems.itemsIds);

  const { garageId } = useParams();
  const dispatch = useDispatch();
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  // const obj = JSON.parse(e.target.value);
  const onItemIdChanged = (obj) => {
    if (selectedItems === null) {
      dispatch(
        setItemsId([
          {
            _id: obj._id,
            garageId: garageId,
            name: obj.name,
            description: obj.description,
            brand: obj.brand,
            model: obj.model,
            toDo: "add",
          },
        ]),
      );
    } else {
      dispatch(
        addItemsId({
          _id: obj._id,
          garageId: garageId,
          name: obj.name,
          description: obj.description,
          brand: obj.brand,
          model: obj.model,
          toDo: "add",
        }),
      );
    }
  };

  return (
    <HStack
      onClick={() => {
        console.log("zzz");
        onItemIdChanged(item);
      }}
      key={item}
      value={item || ""}
    >
      <Box
        width="100%"
        marginBottom="10px"
        fontSize="13px"
        padding="10px"
        border="1px solid #fafafa"
        color="#555"
        cursor="pointer"
        _hover={{ bg: "#ffffff" }}
        borderRadius="5px"
        align="left"
      >
        <HStack>
          <span>
            <b>{item.name}</b> {item.brand} {item.model}
          </span>
        </HStack>
        <span className="gray">{item.description} </span>
      </Box>
    </HStack>
  );
};

export default ItemsListItem;
