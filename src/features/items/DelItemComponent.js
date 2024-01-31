import { Button, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDelItemMutation } from "./itemsApiSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setRefreshItemsByUser } from "../../hooks/refreshSlice";
import { setUserObj } from "../users/selectedUserSlice";

const DelItemComponent = ({ iid }) => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(
    <>
      <Button
        onClick={() => {
          delConfirm();
        }}
        size="sm"
        colorScheme="red"
        color="white"
      >
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    </>,
  );
  useEffect(() => {
    setConfirm(
      <>
        <Button
          onClick={() => {
            delConfirm();
          }}
          size="sm"
          colorScheme="red"
          color="white"
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </>,
    );
  }, [iid]);
  const [delItem, { data: resp, isLoading, isSuccess, isError, error }] =
    useDelItemMutation();
  let content = confirm;
  const delConfirm = () => {
    setConfirm(
      <>
        <Button
          onClick={() => {
            deleteItem();
          }}
          size="sm"
          colorScheme="red"
          color="white"
        >
          Czy usunąć przedmiot {iid} ?
        </Button>
      </>,
    );
  };

  const deleteItem = () => {
    dispatch(setRefreshItemsByUser(false));
    delItem({ iid: iid });
  };
  useEffect(() => {
    console.log(resp);
  }, [resp]);
  if (isLoading) {
    content = (
      <Button size="sm" colorScheme="red">
        <Spinner />
      </Button>
    );
  }
  if (isSuccess) {
    dispatch(setRefreshItemsByUser(true));
    content = (
      <>
        <Button
          onClick={() => {
            delConfirm();
          }}
          size="sm"
          colorScheme="red"
          color="white"
        >
          {iid} <FontAwesomeIcon icon={faXmark} />
        </Button>
      </>
    );
  }
  if (isError) {
    console.log(error);
    content = <p>{}</p>;
  }

  return content;
};

export default DelItemComponent;
