import { useGetItemsByUserIdAndServiceMutation } from "../items/itemsApiSlice";
import { useState, useEffect } from "react";
import ItemsTable from "./ItemsTable";
import { Button, Spinner, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setUserObj } from "../users/selectedUserSlice";
import { setItemsByUser } from "./itemsByUserSlice";
import { setIsItemsModalOpen } from "./isItemsModalOpenSlice";
import { setItemModalMode } from "./itemModalModeSlice";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const ItemsContent = ({ userId, user }) => {
  console.log("");
  const dispatch = useDispatch();
  const { garageId } = useParams();
  const [items, setItems] = useState();
  const [
    getItemsByUserId,
    { data: itemsBU, isLoading, issuccess, isError, error },
  ] = useGetItemsByUserIdAndServiceMutation();
  const findItems = (userId) => {
    setItemsContent(<Spinner />);
    getItemsByUserId({ gid: garageId, userId });
  };
  const [itemsContent, setItemsContent] = useState();
  useEffect(() => {
    setItemsContent(
      <Button
        onClick={() => {
          findItems(userId);
        }}
        size="sm"
        colorScheme="yellow"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>,
    );
  }, [userId]);

  const clearTheItems = () => {
    setItemsContent(
      <Button
        onClick={() => {
          findItems(userId);
        }}
        size="sm"
        colorScheme="yellow"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>,
    );
  };
  useEffect(() => {
    if (itemsBU) {
      const { ids, entities } = itemsBU;
      if (ids?.length > 0) {
        const is = ids.map((id) => entities[id]);
        setItems(is);
        setItemsContent(
          <>
            <span>
              <Button
                leftIcon={
                  <FontAwesomeIcon
                    padding="50px"
                    margin="50px"
                    color="red"
                    icon={faXmark}
                  />
                }
                bg="transparent"
                onClick={() => {
                  clearTheItems();
                }}
              >
                <span padding="50px" margin="50px" className="small gray">
                  zamknij
                </span>
              </Button>{" "}
            </span>{" "}
            <span className="small gray">
              <Button
                bg="transparent"
                onClick={() => {
                  dispatch(setIsItemsModalOpen(true));
                  dispatch(setItemModalMode("review"));
                  dispatch(setUserObj(user));
                  dispatch(setItemsByUser(is));
                }}
              >
                <FontAwesomeIcon
                  color="gray"
                  marginLeft="15px"
                  icon={faUpRightAndDownLeftFromCenter}
                />
              </Button>
            </span>
            <Box marginTop="15px" className="itemsBox" maxHeight="200px">
              <ItemsTable itemsRaw={is} view="raw" />
            </Box>
          </>,
        );
      }
    }
  }, [itemsBU]);
  return <>{itemsContent}</>;
};
export default ItemsContent;
