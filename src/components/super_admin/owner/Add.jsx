import React, { useState, useEffect } from 'react';
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
  useToast,
  Select,
  Flex
} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import api from '../../../axios';
import { useNavigate } from 'react-router-dom';
import { OWNER_LIST } from '../../../router';
import { Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom';

const OwnerAdd = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { isSubmitting: formSubmitting } } = useForm();
  const [plan, setPlan] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  // Fetch plans once
  useEffect(() => {
    const getPlan = async () => {
      try {
        const res = await api.get('superadmin/get/all/plan/list');
        setPlan(res.data.data);
      } catch (error) {
        toast({
          title: 'Failed to fetch plans',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    getPlan();
  }, [toast]);

  // onSubmit now takes form data and disables button automatically
  const onSubmit = async (data) => {
    try {
      // No need to manually disable button, react-hook-form's formSubmitting handles it
      const res = await api.post('superadmin/store/owner', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      reset();
      toast({
        title: res.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate(OWNER_LIST);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message || 'Something went wrong';
      toast({
        title: 'Data store failed',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Card mx="auto" boxShadow="lg">
        <CardBody>
          <Flex align="center" justify="space-between" mb={6}>
            <Heading size="md">{t('add_owner')}</Heading>
            <ChakraLink
              as={ReactRouterLink}
              to={OWNER_LIST}
              colorScheme="teal"
              px={4}
              py={2}
              rounded="md"
              bg="teal.500"
              color="white"
              _hover={{ bg: 'teal.600', textDecoration: 'none' }}
            >
              {t('back')}
            </ChakraLink>
          </Flex>

          {/* Use react-hook-form's handleSubmit which manages preventDefault */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <FormControl isRequired>
                <FormLabel>{t('name')}</FormLabel>
                <Input type='text' placeholder={t('name')} {...register("name", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('email')}</FormLabel>
                <Input type="email" placeholder={t('email')} {...register("email", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('phone')}</FormLabel>
                <Input type="number" placeholder={t('phone')} {...register("phone", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('company_name')}</FormLabel>
                <Input type="text" placeholder={t('company_name')} {...register("company_name", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('country')}</FormLabel>
                <Input type="text" placeholder={t('country')} {...register("country", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('city')}</FormLabel>
                <Input type="text" placeholder={t('city')} {...register("city", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('address')}</FormLabel>
                <Input type="text" placeholder={t('address')} {...register("address", { required: true })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('plan')}</FormLabel>
                <Select placeholder='Select option' {...register("plan_id", { required: true })}>
                  {plan.map((pl) => (
                    <option key={pl.id} value={pl.id}>
                      {pl.plan_name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('is_active')}</FormLabel>
                <Select placeholder='Select option' {...register("is_active", { required: true })}>
                  <option value='1'>{t('active')}</option>
                  <option value='0'>{t('inactive')}</option>
                </Select>
              </FormControl>
            </SimpleGrid>

            <Stack direction="row" justify="flex-end" mt={8}>
              {/* Disable button automatically based on react-hook-form's formState */}
              <Button
                isLoading={formSubmitting}
                loadingText="Saving Data..."
                type='submit'
                colorScheme="blue"
              >
                {t('save')}
              </Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default OwnerAdd;
