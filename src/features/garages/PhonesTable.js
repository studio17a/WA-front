import useAuth from "../../hooks/useAuth";

const GaragesTable = () => {
  const UserInfo = useAuth();
  return (
    <>
      twoje warsztaty:
      {UserInfo?.garages.map((g) => (
        <p>{g._id}</p>
      ))}
    </>
  );
};
export default GaragesTable;
