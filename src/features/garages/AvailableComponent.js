import { Box } from "@chakra-ui/react";
import PublicCalendarTable from "../calendar/public/PublicCalendarTable";

const AvaliableComponent = ({ garageId, day, month, year }) => {
  return (
    <Box className="avaliableComponentBox">
      <PublicCalendarTable
        mode={"garage"}
        garageId={garageId}
        day={day}
        month={month}
        year={year}
      />
    </Box>
  );
};

export default AvaliableComponent;
