import { Link } from "react-router-dom";
import Garage from "./Garage";
import { useGetGaragesQuery } from "./garagesApiSlice";
import { HStack, VStack } from "@chakra-ui/react";
import Map from "../../components/Map";

const GaragesList = () => {
  const {
    data: garages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGaragesQuery("garagesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = garages;
    const listOfGarages =
      ids?.length &&
      ids.map((garageId) => (
        <Garage width="100%" key={garageId} garage={entities[garageId]} />
      ));
    content = (
      <HStack className="garagesListPage">
        <VStack className="garagesListWrap">
          <div className="garagesList">{listOfGarages}</div>
        </VStack>
        <div className="mapa">
          <Map />
        </div>
        <footer></footer>
      </HStack>
    );
  }
  return content;
};

export default GaragesList;
