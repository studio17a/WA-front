import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setItem } from "./selectedItemsSlice";
import { setUserObj } from "../users/selectedUserSlice";
import { setIsItemsModalOpen } from "./isItemsModalOpenSlice";
import { setItemModalMode } from "./itemModalModeSlice";
import { setOldUserObj } from "../users/oldSelectedUserSlice.js";
import { setRefreshItemsByUser } from "../../hooks/refreshSlice";

const ForwardItemComponent = ({ item }) => {
  const oldSelectedUserObj = useSelector(
    (state) => state.oldSelectedUser.oldSelectedUser,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOldUserObj(null));
  }, []);
  const setUpModal = (mode) => {
    dispatch(setUserObj(item.user));
    // dispatch(setItem(item));
    dispatch(setIsItemsModalOpen(true));
    dispatch(setItemModalMode(mode));
    if (!oldSelectedUserObj) {
      console.log(`settting ${item.user?._id}`);
      dispatch(setOldUserObj(item.user));
      dispatch(setRefreshItemsByUser(false));
    }
  };
  return (
    <Button
      onClick={() => setUpModal("forward")}
      marginLeft="20px"
      size="sm"
      bg="transparent"
    >
      <FontAwesomeIcon w="4px" height="4px" color="#5ca832" icon={faShare} />
    </Button>
  );
};

export default ForwardItemComponent;
