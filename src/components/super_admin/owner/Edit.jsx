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
  Image,
  Select,
  Flex
} from "@chakra-ui/react";
import api from '../../../axios';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { OWNER_LIST, PLAN_LIST, SUPER_ADMIN } from '../../../router';
import { Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink} from 'react-router-dom';
import { useParams } from "react-router";

const OwnerEdit = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue } = useForm();
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast(); 
    const { id } = useParams();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const res = await api.post('superadmin/update/owner', data, {
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
        navigate(`${OWNER_LIST}`);

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message || 'Something went wrong';
            toast({
                title: 'Data store failed',
                description: errorMessage,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getOwner = async () => {
        const res = await api.get(`superadmin/get/owner/${id}`);
        const owner = res.data.data;
        console.log(res.data.data);
        setValue("name", owner.name);
        setValue("email", owner.email);
        setValue("phone", owner.phone);
        setValue("company_name", owner.company_name);
        setValue("country", owner.country);
        setValue("city", owner.city);
        setValue("address", owner.address);
        setValue("company_address", owner.company_address);
        setValue("is_active", owner.is_active);
        setValue("id", owner.id);
    };


    useEffect(() => {
        getOwner();
    }, []);



    return (
    <>
    <Box p={4}>
      <Card  mx="auto" boxShadow="lg">
        <CardBody>
          <Flex align="center" justify="space-between" mb={6}>
                <Heading size="md">
                  {t('add_owner')}
                </Heading>
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

          <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel>{t('name')}</FormLabel>
              <Input type='text' placeholder={t('name')} {...register("name", { required: true })} />
              <Input type='hidden' {...register("id", { required: true })} />
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
              <FormLabel>{t('company_address')}</FormLabel>
              <Input type="text" placeholder={t('company_address')} {...register("company_address", { required: true })} />
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
              <FormLabel>{t('owner_address')}</FormLabel>
              <Input type="text" placeholder={t('address')} {...register("address", { required: true })} />
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
            <Button isLoading={isSubmitting}
                                loadingText="Saving Data..."
                                 type='submit' 
                                 colorScheme="blue">{t('save')}</Button>
          </Stack>

          </form>
        </CardBody>
      </Card>
    </Box>
    </>
  )
}

export default OwnerEdit