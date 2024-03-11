import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { VStack, Container, Box } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const DashLayout = () => {
  const { username, isManager, isAdmin } = useAuth();
  let dashContent = <></>;
  if (isAdmin) {
    dashContent = (
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
  }
  return dashContent;
};
export default DashLayout;
