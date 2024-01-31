import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Garage = ({ garageId }) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB");
  const navigate = useNavigate();

  const handleEdit = () =>
    navigate(`/${garageId}/appointments/${formattedDate}`);
  return (
    <>
      <button className="icon-button table__button" onClick={handleEdit}>
        garage {garageId}
      </button>
    </>
  );
};

const memoizedGarage = memo(Garage);

export default memoizedGarage;
