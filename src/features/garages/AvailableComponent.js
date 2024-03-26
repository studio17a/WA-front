import { Box } from "@chakra-ui/react";
import PublicCalendarTable from "../calendar/public/PublicCalendarTable";

const AvaliableComponent = ({ garageId }) => {
  return (
    <Box className="avaliableComponentBox">
      <PublicCalendarTable
        mode={"garage"}
        garageId={garageId}
        day={"12"}
        month={"03"}
        year={"2024"}
      />
    </Box>
  );
};

export default AvaliableComponent;
