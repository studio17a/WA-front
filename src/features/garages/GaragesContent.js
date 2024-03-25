import { useGetGaragesByUserIdMutation } from "../garages/garagesApiSlice";
import { useState, useEffect } from "react";
import GaragesTable from "./GaragesTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserObj } from "../users/selectedUserSlice";
import { setIsGaragesModalOpen } from "./isGaragesModalOpenSlice";
import { setGarageModalMode } from "./garageModalModeSlice";
import { Button, Spinner, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { setGaragesByUser } from "./garagesByUserSlice";
import { refresh } from "../../hooks/refreshSlice";
import { setRefreshGaragesByUser } from "../../hooks/refreshSlice";

const GaragesContent = ({ userId, user }) => {
  const dispatch = useDispatch();
  const isGaragesModalOpen = useSelector(
    (state) => state.isGaragesModalOpen.isGaragesModalOpen,
  );
  const refreshGarages = useSelector(
    (state) => state.refresh.refresh.garagesByUser,
  );
  const selectedUserObj = useSelector(
    (state) => state.selectedUser.selectedUser,
  );
  const oldSelectedUserObj = useSelector(
    (state) => state.oldSelectedUser.oldSelectedUser,
  );
  const [garages, setGarages] = useState();
  const [err, setErr] = useState(false);
  const [
    getGaragesByUserId,
    { data: garagesBU, isLoading, issuccess, isError, error },
  ] = useGetGaragesByUserIdMutation();
  const findGarages = (userId) => {
    setGaragesContent(<Spinner />);
    getGaragesByUserId({ userId });
  };

  const [garagesContent, setGaragesContent] = useState();
  useEffect(() => {
    console.log(`zzzzzzzzzzzzzzzzzz ${refreshGarages}, ${selectedUserObj}, `);
    console.log(selectedUserObj);
    if (
      refreshGarages &&
      (selectedUserObj?._id === userId || oldSelectedUserObj?._id === userId)
    ) {
      findGarages(userId);
      dispatch(setRefreshGaragesByUser(false));
    }
  }, [refreshGarages]);
  useEffect(() => {
    setGaragesContent(
      <Button
        onClick={() => {
          findGarages(userId);
        }}
        size="sm"
        colorScheme="yellow"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>,
    );
  }, [userId]);
  if (isError) {
    if (!err) {
      setErr(true);
      setGaragesContent(
        <>
          <span>
            <Button
              bg="transparent"
              onClick={() => {
                clearTheGarages();
              }}
            >
              <FontAwesomeIcon color="red" marginLeft="5px" icon={faXmark} />
            </Button>{" "}
          </span>
          <span className="small gray"> zamknij</span>
          <Box className="garagesBox" maxHeight="200px">
            <GaragesTable user={user} garagesRaw={[]} view="raw" />
          </Box>
        </>,
      );
      console.log(error);
    }
  }
  const clearTheGarages = () => {
    setGaragesContent(
      <Button
        onClick={() => {
          findGarages(userId);
        }}
        size="sm"
        colorScheme="yellow"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>,
    );
  };
  useEffect(() => {
    if (garagesBU) {
      const { ids, entities } = garagesBU;
      if (ids?.length > 0) {
        const is = ids.map((id) => entities[id]);
        setGarages(is);
        console.log(`sss: ${user?._id}`);
        setGaragesContent(
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
                  clearTheGarages();
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
                  dispatch(setIsGaragesModalOpen(true));
                  dispatch(setGarageModalMode("review"));
                  dispatch(setUserObj(user));
                  dispatch(setGaragesByUser(is));
                }}
              >
                <FontAwesomeIcon
                  color="gray"
                  marginLeft="15px"
                  icon={faUpRightAndDownLeftFromCenter}
                />
              </Button>
            </span>
            <Box marginTop="15px" className="garagesBox" maxHeight="200px">
              <GaragesTable user={user} garagesRaw={is} view="raw" />
            </Box>
          </>,
        );
      }
    }
  }, [garagesBU, isError]);
  return <>{garagesContent}</>;
};
export default GaragesContent;
