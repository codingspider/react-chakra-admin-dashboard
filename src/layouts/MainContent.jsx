import { Box } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import Stats from "../components/Stats";
const MainContent = () => {
  return (
    <Box as="main" p="2">
      <Stats></Stats>
    </Box>
  );
};

export default MainContent;
