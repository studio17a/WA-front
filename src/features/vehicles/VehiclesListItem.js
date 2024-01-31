const VehiclesListItem = ({ vehicle, reg, brand }) => {
  // console.log(`vehicle`);
  return (
    <option key={vehicle} value={vehicle || ""}>
      {" "}
      {reg} {brand}
    </option>
  );
};

export default VehiclesListItem;
