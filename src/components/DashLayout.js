import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { VStack, Container, Box } from "@chakra-ui/react";

const DashLayout = () => {
  return (
    // <VStack h="100vh" w="100%" backgroundColor="#14b1d9">
    <VStack w="100%" backgroundColor="#edf9ff">
      <DashHeader />
      <Box m={0} p={4} w="100%">
        <Box
          bg="#fff"
          border="1px solid #eee"
          borderRadius="10px"
          m={0}
          padding="20px"
          w="100%"
        >
          <Outlet w="100%" />
        </Box>
      </Box>
      {/* <DashFooter /> */}
    </VStack>
  );
};
export default DashLayout;
