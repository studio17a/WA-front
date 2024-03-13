import { Link } from "react-router-dom";
import Garage from "./Garage";
import { useGetGaragesQuery } from "./garagesApiSlice";

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
        <Garage key={garageId} garage={entities[garageId]} />
      ));
    content = (
      <div>
        <h1>wybierz warsztat: </h1>
        <p></p>
        <div margin="20px 20px 20px 20px" padding="20px 20px 20px 20px">
          {listOfGarages}
        </div>
        <footer></footer>
      </div>
    );
  }
  return content;
};

export default GaragesList;
