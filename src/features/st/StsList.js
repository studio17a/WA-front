import { useGetStsByGarageIdMutation } from "./stsApiSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addStId } from "./selectedStSlice";
import StsListItem from "./StsListItem";
import { Select, VStack } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Spinner,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

const StsList = () => {
  const { garageId } = useParams();
  const dispatch = useDispatch();

  const [
    getStsByGarageId,
    { data: sts, isLoading, isSuccess, isError, error },
  ] = useGetStsByGarageIdMutation();

  const selectedStId = useSelector((state) => state.selectedSt.stId);
  let list = "";
  const onStIdChanged = async (e) => {
    let obj = JSON.parse(e.target.value); //object

    dispatch(
      addStId({
        _id: obj._id,
        garageId: garageId,
        name: obj.name,
        predefined: obj.predefined,
        authorname: obj.authorname,
        modifiedAt: obj.modifiedAt,
        toDo: "add",
      }),
    );
  };

  useEffect(() => {
    // console.log(`my garage: ${garageId}`);
    getStsByGarageId({ garageId: garageId });
  }, []);

  let content;
  if (isLoading) content = <Spinner />;
  if (isError) {
    // console.log(error?.data?.message);
    content = (
      <>
        <p>nie ma jeszcze predefiniowanych usług</p>
      </>
    );
  }
  if (isSuccess) {
    const { ids, entities } = sts;
    list =
      ids?.length &&
      ids.map((stId) => <StsListItem key={stId} st={entities[stId]} />);
    content = (
      <>
        <Select
          id="st"
          name="stsselect"
          variant="filled"
          placeholder="Lista usług"
          value={selectedStId || ""}
          onChange={onStIdChanged}
        >
          {" "}
          {list}
        </Select>
      </>
    );
  }
  return content;
};

export default StsList;
