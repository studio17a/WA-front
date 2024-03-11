import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import DelListItemComponent from "../items/DelListItemComponent";
import { useDispatch, useSelector } from "react-redux";
import { HStack, Button, Container, Box } from "@chakra-ui/react";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { setIsItemsModalOpen } from "./isItemsModalOpenSlice";
import { setItemModalMode } from "./itemModalModeSlice";
import { setUserObj } from "../users/selectedUserSlice";
import { editItemsId, setItemsId } from "./selectedItemsSlice";
import DelItemComponent from "./DelItemComponent";
import { useState, useEffect } from "react";
import ForwardItemComponent from "./ForwardItemComponent";
import { set } from "date-fns";
import { useParams } from "react-router-dom";

const TRow = ({ item, view, index }) => {
  const dispatch = useDispatch();
  const { garageId } = useParams();
  const [iQuantity, setIQuantity] = useState(1);
  const itemModalMode = useSelector(
    (state) => state.itemModalMode.itemModalMode,
  );
  const quantityChanged = (e) => {
    setIQuantity(e.target.value);
    dispatch(
      editItemsId({
        index: index,
        _id: item._id,
        name: item.name,
        toDo: "add",
        garage: garageId,
        user: item.user,
        brand: item.brand,
        storage: item.storage,
        quantity: e.target.value,
        description: item.description,
        model: item.model,
        notes: item.notes,
      }),
    );
  };
  const selectedUser = useSelector((state) => state.selectedUser.selectedUser);
  console.log(index);
  const [content, setContent] = useState(
    <Tr>
      {view !== "serviceRow" && (
        <Td>
          {view !== "raw" && view !== "review" && (
            <HStack>
              <DelItemComponent iid={item._id} />
              {itemModalMode !== "service" && (
                <Button
                  colorScheme="yellow"
                  size="sm"
                  onClick={() => setUpItemModal({ mode: "edit", item: item })}
                >
                  <EditIcon w={4} h={4} color="#fff" />
                </Button>
              )}
            </HStack>
          )}
        </Td>
      )}
      <Td>
        {/* <p className="gray">{item?._id}</p> */}
        <span className="proper darkGray">
          <b>{item?.name}</b>
        </span>
        <p className="small gray">ean: {item?.ean}</p>
      </Td>
      <Td>{item?.description}</Td>
      <Td>
        <p>{item.user?.brand}</p>
        <p>{item.model}</p>
      </Td>
      <Td>{item?.storage}</Td>
      <Td>
        <p>
          <span className="small gray">szt:</span> {item?.quantity}
        </p>
      </Td>
      <Td>{item?.notes}</Td>
      <Td>
        <p>{item.authorname}</p>
        <p>{item?.createdAt}</p>
        <p>{item?.updatedAt}</p>
      </Td>
    </Tr>,
  );
  const setUpItemModal = ({ mode, item }) => {
    console.log("tu1");
    console.log(item);
    if (itemModalMode != "service") dispatch(setItemModalMode(mode));
    if (itemModalMode != "service") {
      dispatch(setUserObj(item.user));
    }
    if (itemModalMode != "service") {
      if (item) {
        dispatch(setItemsId(item));
      }
    }
    dispatch(setIsItemsModalOpen(true));
  };
  useEffect(() => {
    console.log("tu2");
    if (item?._id == null) {
      console.log("tu3");
      console.log(item);
      setContent(
        <>
          <Tr>
            <Td>Nie znaleziono produktu...</Td>
            <Td> </Td>
            <Td> </Td>
            <Td> </Td>
          </Tr>
        </>,
      );
    } else {
      console.log("tu4");
      console.log(item);
      setContent(
        <Tr>
          {view !== "serviceRow" && (
            <Td>
              {view !== "raw" && view !== "review" && (
                <HStack>
                  <DelItemComponent iid={item._id} />
                  {itemModalMode !== "service" && (
                    <Button
                      colorScheme="yellow"
                      size="sm"
                      onClick={() =>
                        setUpItemModal({ mode: "edit", item: item })
                      }
                    >
                      <EditIcon w={4} h={4} color="#fff" />
                    </Button>
                  )}
                </HStack>
              )}
            </Td>
          )}
          <Td>
            {/* <p className="gray">{item?._id}</p> */}
            <span className="proper darkGray">
              <b>{item?.name}</b>
            </span>
            <p className="small gray">ean: {item?.ean}</p>
          </Td>
          <Td>{item?.description}</Td>
          <Td>
            <p>{item.user?.brand}</p>
            <p>{item.model}</p>
          </Td>
          <Td>{item?.storage}</Td>
          <Td>
            <p>
              <span className="small gray">szt:</span> {item?.quantity}
            </p>
          </Td>
          <Td>{item?.notes}</Td>
          <Td>
            <p>{item.authorname}</p>
            <p>{item?.createdAt}</p>
            <p>{item?.updatedAt}</p>
          </Td>
        </Tr>,
      );
    }
  }, []);
  useEffect(() => {
    if (item?._id == null) {
      console.log("tu5");
      console.log(item);
      setContent(
        <>
          <Tr>
            <Td>Nie znaleziono produktu...</Td>
            <Td> </Td>
            <Td> </Td>
            <Td> </Td>
          </Tr>
        </>,
      );
    } else {
      console.log("tu6");
      console.log(item);
      setContent(
        <Tr>
          {view !== "serviceRow" && (
            <Td>
              {view !== "raw" && view !== "review" && (
                <HStack>
                  {itemModalMode === "service" && (
                    <DelListItemComponent index={index} item={item} />
                  )}
                  {itemModalMode !== "service" && (
                    <DelItemComponent iid={item._id} />
                  )}{" "}
                  {itemModalMode !== "service" && (
                    <Button
                      colorScheme="yellow"
                      size="sm"
                      onClick={() =>
                        setUpItemModal({ mode: "edit", item: item })
                      }
                    >
                      <EditIcon w={4} h={4} color="#fff" />
                    </Button>
                  )}
                </HStack>
              )}
              {view === "raw" && <ForwardItemComponent />}
            </Td>
          )}
          <Td>
            {/* <p className="gray">{item?._id}</p> */}
            <span className="proper darkGray">
              <b>{item?.name}</b>
            </span>
            <p className="small gray">ean: {item?.ean}</p>
          </Td>
          <Td>{item?.description}</Td>
          <Td>
            <p>{item.user?.brand}</p>
            <p>{item.model}</p>
          </Td>
          <Td>{item?.storage}</Td>
          <Td>
            <p>
              <Input
                placeholder={item?.quantity}
                width="50px"
                margin="0 0 0px 0"
                padding="0 0 0px 0"
                bg="#fafafa"
                onChange={quantityChanged}
              />{" "}
            </p>
          </Td>
          <Td>{item?.notes}</Td>
          <Td>
            <p>{item.authorname}</p>
            <p>{item?.createdAt}</p>
            <p>{item?.updatedAt}</p>
          </Td>
        </Tr>,
      );
    }
  }, [item]);
  return content;
};
export default TRow;
