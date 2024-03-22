import { useGetUsersQuery } from "../users/usersApiSlice";
import { Spinner } from "@chakra-ui/react";
import UsersListSelect from "./UsersListSelect";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UsersPanel = () => {
  const UserInfo = useAuth();
  const { garageId, day, month, year } = useParams();
  const { users, isLoading, isSuccess, isError, error } = useGetUsersQuery(
    { gid: garageId, uid: UserInfo?._id, detailsId: null },
    {
      selectFromResult: ({ data }) => ({
        users: data?.ids.map((id) => data?.entities[id]),
      }),
    },
  );
  return <>{isLoading ? <Spinner /> : <UsersListSelect users={users} />}</>;
};
export default UsersPanel;
