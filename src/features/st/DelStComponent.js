import { removeStId } from "./selectedStSlice";
import { useDeleteStMutation } from "./stsApiSlice";
import { addStToDel } from "./stToDelSlice";
import { useDispatch } from "react-redux";
import { setSave } from "../services/saveServiceSlice";
import { Button, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const DelStComponent = ({ index, st }) => {
  const dispatch = useDispatch();
  // const [deleteSt, { isLoading, isSuccess, isError, error }] =
  //   useDeleteStMutation();
  const removeSt = async (index, st) => {
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
    dispatch(removeStId({ index: index, st: st }));
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
        onClick={() => removeSt(index, st)}
      >
        <FontAwesomeIcon color="red" icon={faXmark} />
      </Button>
      {/* )} */}
    </>
  );
};
export default DelStComponent;
