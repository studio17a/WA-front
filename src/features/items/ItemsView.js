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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ItemsTable from "./ItemsTable";
import { setItemModalMode } from "./itemModalModeSlice";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useGetItemsQuery } from "../items/itemsApiSlice";
import ItemsModal from "./ItemsModal";

const ItemsView = () => {
  const dispatch = useDispatch();
  let content = <Spinner />;
  const { garageId } = useParams();
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery({ gid: garageId }, "itemsList", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    dispatch(setItemModalMode(null));
  }, []);
  // if (isLoading) console.log(items);
  if (isError) console.log(error);
  if (isSuccess) {
    const { ids, entities } = items;
    const itemsList = ids?.map((iid) => entities[iid]);
    content = (
      <>
        <ItemsModal mode={"top"} key="itemsModal" />
        <ItemsTable itemsRaw={itemsList} />
      </>
    );
  }
  return content;
};
export default ItemsView;
