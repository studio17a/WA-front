import { Link } from "react-router-dom";
import GaragesList from "../features/garages/GaragesList";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Button,
  Container,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const Public = () => {
  // const { username } = useAuth();
  const content = (
    <Box
      margin="2% 2%"
      bg="white"
      w="96%"
      p={4}
      borderRadius="lg"
      borderWidth="1px"
    >
      <section>
        <main>
          <GaragesList />
        </main>
      </section>
    </Box>
  );
  return content;
};
export default Public;
