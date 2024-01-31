import { removeItemsId } from "./selectedItemsSlice";
import { useDispatch } from "react-redux";
import { Button, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const DelListItemComponent = ({ index, item }) => {
  const dispatch = useDispatch();
  // const [deleteSt, { isLoading, isSuccess, isError, error }] =
  //   useDeleteStMutation();
  const removeItem = async (index, item) => {
    // await deleteSt(id);
    //   const stsArray = Promise.all(
    //     selectedStId?.map(async (st) => {
    //       const { newSt } = await addNewSt({
    //         _id: st._id,
    //         garage: garageId,
    //         predefined: false,
    //         name: st.name,
    //         newSt: st.newSt,
    //       }).unwrap();
    //       return newSt._id;
    //     }),
    //   ).then(async (result) => {
    //     dispatch(setStId(result));
    //   });

    // dispatch(addStToDel(st._id));
    dispatch(removeItemsId({ index: index, item: item }));
    // if (!st.newSt) dispatch(setSave(true));
    // if (!isServiceModalOpen) {
    // }
  };
  // if (isSuccess) {
  // }
  return (
    <>
      {/* {isLoading && <Spinner />}
      {!isLoading && ( */}
      <Button
        bg="transparent"
        // isDisabled={modalButtonDisabled}
        onClick={() => removeItem(index, item)}
      >
        <FontAwesomeIcon size="sm" color="red" icon={faXmark} />
      </Button>
      {/* )} */}
    </>
  );
};
export default DelListItemComponent;
