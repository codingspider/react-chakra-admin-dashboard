import { Box, Drawer, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom"

const MasterLayout = () => {
  const sidebar = useDisclosure();

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{ bg: "gray.700" }}
      minH="100vh"
    >
      <Sidebar
        display={{ base: "none", md: "unset" }}
        sidebar={sidebar}
      />

      <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar w="half" borderRight="none" />
        </DrawerContent>
      </Drawer>

      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Header sidebar={sidebar} />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default MasterLayout;
