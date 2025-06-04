import React from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';

const MasterSetting = () => {
    const { t } = useTranslation();
    return (
    <>
    <Box p={4}>
      <Card  mx="auto" boxShadow="lg">
        <CardBody>
          <Heading size="md" mb={6}>
            {t('master_setting')}
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <FormControl>
              <FormLabel>{t('application_name')}</FormLabel>
              <Input placeholder="Enter first name" />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Enter last name" />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter email" />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input type="tel" placeholder="Enter phone" />
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input placeholder="Enter address" />
            </FormControl>

            <FormControl>
              <FormLabel>City</FormLabel>
              <Input placeholder="Enter city" />
            </FormControl>
          </SimpleGrid>

          <Stack direction="row" justify="flex-end" mt={8}>
            <Button colorScheme="blue">Submit</Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
    </>
  )
}

export default MasterSetting