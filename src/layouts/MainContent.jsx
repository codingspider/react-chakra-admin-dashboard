import { Box, Heading } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import Stats from "../components/Stats";
import { useTranslation } from 'react-i18next';

const MainContent = () => {
  const { t } = useTranslation();
  return (
    <Box as="main" p="2">
      <Heading>{t('welcome')}</Heading>
      <Stats></Stats>
    </Box>
  );
};

export default MainContent;
