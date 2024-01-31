const StsListItem = ({ st }) => {
  return (
    <option
      key={st.id}
      value={JSON.stringify({ id: st.id, name: st.name }) || ""}
    >
      {" "}
      {st.name}
    </option>
  );
};

export default StsListItem;
