import { Outlet, useParams } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { VStack, Container, Box } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const DashLayout = () => {
  const { garageId } = useParams();
  const UserInfo = useAuth();
  let dashContent = <></>;
  // if (UserInfo?.roles.isadmin.filter((g) => g._id === garageId).length > 0) {
  dashContent = (
    <VStack w="100%">
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
  // }
  return dashContent;
};
export default DashLayout;
