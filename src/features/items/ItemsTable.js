import {
  Button,
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
  FormControl,
  useDisclosure,
  useToast,
  Container,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
  Tabs,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsItemsModalOpen } from "./isItemsModalOpenSlice";
import TBody from "./TBody";
import { setItemModalMode } from "./itemModalModeSlice";
import { Spinner } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useGetItemsByUsernameMutation } from "./itemsApiSlice";

const ItemsTable = ({ itemsRaw, view }) => {
  const { garageId } = useParams();
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [
    getItemsByUsername,
    { data: itemsByUsername, isLoading, isSuccess, isError, error },
  ] = useGetItemsByUsernameMutation();
  useEffect(() => {
    if (itemsByUsername) {
      const { ids, entities } = itemsByUsername;
      const itemsBU = ids.map((iid) => entities[iid]);
      if (itemsBU) {
        setFilteredData(itemsBU);
        setItems(itemsBU);
      }
    }
  }, [itemsByUsername]);
  const dispatch = useDispatch();
  const isItemsModalOpen = useSelector(
    (state) => state.isItemsModalOpen.isItemsModalOpen,
  );
  const idChanged = (e) => {
    const result = items.map((item) => {
      const searchWord = e.target.value;
      let allow = true;
      if (item?._id) {
        if (item._id.toLowerCase().includes(searchWord.toLowerCase()))
          return { ...item };
      }
      if (item?.user?.username) {
        if (
          item.user?.username.toLowerCase().includes(searchWord.toLowerCase())
        )
          return { ...item };
      }
      if (item?.name) {
        if (item.name.toLowerCase().includes(searchWord.toLowerCase()))
          return { ...item };
      } else return null;
      if (allow) return null;
    });
    const result2 = result.filter((item) => item !== null);
    setFilteredData(result2);
  };
  const vehicleChanged = (e) => {
    const result = items.map((item) => {
      const searchWord = e.target.value;
      let allow = true;
      if (item?.vehicle?.reg) {
        if (item.vehicle?.reg.toLowerCase().includes(searchWord.toLowerCase()))
          return { ...item };
      }
      if (item?.user?.username) {
        if (
          item.user?.username.toLowerCase().includes(searchWord.toLowerCase())
        )
          return { ...item };
      } else return null;
      if (allow) return null;
    });
    const result2 = result.filter((item) => item !== null);
    setFilteredData(result2);
    // const result = items.filter((item) => {
    //   const searchWord = e.target.value;

    //   if (item?.vehicle?.reg)
    //     return item.vehicle?.reg
    //       .toLowerCase()
    //       .includes(searchWord.toLowerCase());
    //   else return null;
    // });
  };

  useEffect(() => {
    if (itemsRaw && !itemsByUsername) {
      console.log(itemsRaw?.length);
      setFilteredData(itemsRaw);
      setItems(itemsRaw);
    }
  }, [itemsRaw]);
  useEffect(() => {
    setLoading(false);
  }, [filteredData]);

  const setUpModal = (mode) => {
    dispatch(setItemModalMode(mode));
    dispatch(setIsItemsModalOpen(true));
  };
  // console.log(`isItemsModalOpen ${isItemsModalOpen}`);
  let myClass = "fixedTable";
  let scroll = "scroll";
  if (view == "raw") {
    scroll = "";
    myClass = "rawItemsClass";
  }
  return (
    <>
      <TableContainer overflowY={scroll} className={myClass}>
        <Table variant="simple">
          {view != "raw" && (
            <TableCaption>
              {filteredData.length > 25 ? "25" : filteredData.length} z{" "}
              {itemsRaw?.length}
            </TableCaption>
          )}
          <Thead>
            <Tr>
              <Th>
                <Button
                  size="sm"
                  colorScheme="cyan"
                  onClick={() => setUpModal("add")}
                >
                  <AddIcon w={3} h={3} color="#fff" />
                </Button>
              </Th>
              <Th>
                nr/nazwa/klient
                {view !== "raw" && (
                  <>
                    <p>
                      <Input
                        placeholder="nr/nazwa/klient"
                        margin="0 0 5px 0"
                        onBlur={(e) => {
                          e.target.value = "";
                        }}
                        bg="#fafafa"
                        onChange={idChanged}
                      />
                    </p>
                  </>
                )}
              </Th>
              <Th>transakcje</Th>
              <Th>opis</Th>
              <Th>marka/model</Th>
              <Th>magazyn</Th>
              <Th>ilość</Th>
              <Th>uwagi</Th>
              <Th>zmodyfikowano</Th>
            </Tr>
          </Thead>
          <Tbody>
            <TBody view={view} items={filteredData} />
          </Tbody>
          {view != "raw" && (
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th>nr/nazwa</Th>
                <Th>transakcje</Th>
                <Th>opis</Th>
                <Th>marka/model</Th>
                <Th>magazyn</Th>
                <Th>ilość</Th>
                <Th>uwagi</Th>
                <Th>zmodyfikowano</Th>
              </Tr>
            </Tfoot>
          )}
        </Table>
      </TableContainer>
    </>
  );
};
export default ItemsTable;
