import { useGetUsersQuery } from "../users/usersApiSlice";
import { Spinner } from "@chakra-ui/react";
import UsersListSelect from "./UsersListSelect";
import { useParams } from "react-router-dom";

const UsersPanel = () => {
  const { garageId, day, month, year } = useParams();
  const { users, isLoading, isSuccess, isError, error } = useGetUsersQuery(
    garageId,
    {
      selectFromResult: ({ data }) => ({
        users: data?.ids.map((id) => data?.entities[id]),
      }),
    },
  );
  return <>{isLoading ? <Spinner /> : <UsersListSelect users={users} />}</>;
};
export default UsersPanel;
