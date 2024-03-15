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
  Textarea,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import it from "date-fns/locale/it";

const TRow = ({ edit, item, view, index }) => {
  const dispatch = useDispatch();
  const { garageId } = useParams();
  const [iQuantity, setIQuantity] = useState(item.quantity);
  const [iDescription, setIDescripion] = useState(item.description);

  useEffect(() => {
    setIQuantity(item.quantity);
    setIDescripion(item.description);
  }, [item]);

  const itemModalMode = useSelector(
    (state) => state.itemModalMode.itemModalMode,
  );
  const descriptionChanged = (e) => {
    setIDescripion(e.target.value);
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
        quantity: iQuantity,
        description: e.target.value,
        model: item.model,
        notes: item.notes,
      }),
    );
  };
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
        description: iDescription,
        model: item.model,
        notes: item.notes,
      }),
    );
  };
  const selectedUser = useSelector((state) => state.selectedUser.selectedUser);
  console.log(index);
  const [content, setContent] = useState(
    <Tr>
      {view !== "serviceRow" && view !== "service" && (
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
        <p>
          <HStack>
            <span>
              <FontAwesomeIcon
                className="green small"
                size={"xs"}
                icon={faCircleUser}
              />
            </span>
            <span className="green small">własność klienta</span>
            <p className="gray">{item?.user?.username}</p>
          </HStack>
        </p>
        <span className="proper darkGray">
          <b>{item?.name}</b>
        </span>
        <p className="small gray">ean: {item?.ean}</p>
      </Td>
      {view !== "rawq" && view !== "serviceRow" && view !== "service" && (
        <Td>
          <Button size="sm" colorScheme="cyan" backgroundColor="#f2f2f2">
            <FontAwesomeIcon color="gray" icon={faMagnifyingGlass} />
          </Button>
        </Td>
      )}
      <Td>{item?.description}</Td>
      <Td>
        <p>{item.brand}</p>
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
          {view !== "serviceRow" && view !== "service" && (
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
            <p>
              <HStack>
                <span>
                  <FontAwesomeIcon
                    className="green small"
                    size={"xs"}
                    icon={faCircleUser}
                  />
                </span>
                <span className="green small">własność klienta</span>
              </HStack>
            </p>
            <span className="proper darkGray">
              <b>{item?.name}</b>
            </span>
            <p className="small gray">ean: {item?.ean}</p>
          </Td>
          {view !== "rawq" && view !== "serviceRow" && view !== "service" && (
            <Td>
              <Button size="sm" colorScheme="cyan" backgroundColor="#f2f2f2">
                <FontAwesomeIcon color="gray" icon={faMagnifyingGlass} />
              </Button>
            </Td>
          )}
          <Td>{item?.description}</Td>
          <Td>
            <p>{item.brand}</p>
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
          {view !== "serviceRow" && view !== "service" && (
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
            {item.user && (
              <p>
                <HStack>
                  <span>
                    <FontAwesomeIcon
                      className="green small"
                      size={"xs"}
                      icon={faCircleUser}
                    />
                  </span>
                  <span className="green small">własność klienta</span>
                </HStack>
                <p className="gray small">{item?.user?.username}</p>
              </p>
            )}
            <span className="proper darkGray">
              <b>{item?.name}</b>
            </span>
            <p className="small gray">ean: {item?.ean}</p>
          </Td>
          {view !== "rawq" && view !== "serviceRow" && view !== "service" && (
            <Td>
              <Button size="sm" colorScheme="cyan" backgroundColor="#f2f2f2">
                <FontAwesomeIcon color="gray" icon={faMagnifyingGlass} />
              </Button>
            </Td>
          )}
          <Td>
            <p>
              {edit === "true" ? (
                <Textarea
                  fontSize={"0.8em"}
                  value={item?.description}
                  placeholder={item?.description}
                  minWidth="100px"
                  margin="0 0 0px 0"
                  padding="0 0 0px 0"
                  bg="#fafafa"
                  onChange={descriptionChanged}
                />
              ) : (
                <>{item?.description}</>
              )}
            </p>
          </Td>
          <Td>
            <p>{item.brand}</p>
            <p>{item.model}</p>
          </Td>
          <Td>{item?.storage}</Td>
          <Td>
            <p>
              {edit === "true" ? (
                <Input
                  placeholder={item?.quantity}
                  width="50px"
                  margin="0 0 0px 0"
                  padding="0 0 0px 0"
                  bg="#fafafa"
                  onChange={quantityChanged}
                />
              ) : (
                <>
                  <span className="small gray">szt:</span> {item?.quantity}
                </>
              )}
            </p>
          </Td>
          <Td>{item?.notes}</Td>
          <Td className="gray">
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
