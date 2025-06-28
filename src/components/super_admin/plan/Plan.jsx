import React, { useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import api from '../../../axios';
import { useNavigate } from 'react-router-dom';
import { PLAN_LIST, SUPER_ADMIN } from '../../../router';
import { Link as ChakraLink } from '@chakra-ui/react'
import {Link as ReactRouterLink} from 'react-router-dom';

const Plan = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast(); 
    const navigate = useNavigate();

    const onSubmit = async (data) => {
            setIsSubmitting(true);
            try {
              const res = await api.post('superadmin/store/plan', data, {
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
              navigate(`${SUPER_ADMIN}/${PLAN_LIST}`);

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

    return (
    <>
    <Box p={4}>
      <Card  mx="auto" boxShadow="lg">
        <CardBody>
          <Flex align="center" justify="space-between" mb={6}>
                <Heading size="md">
                  {t('add_plan')}
                </Heading>
                <ChakraLink
                  as={ReactRouterLink}
                  to={PLAN_LIST}
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
              <FormLabel>{t('plan_name')}</FormLabel>
              <Input type='text' placeholder={t('plan_name')} {...register("plan_name", { required: true })} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t('number_of_order')}</FormLabel>
              <Input type="number" placeholder={t('number_of_order')} {...register("number_of_order", { required: true })} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t('business_location')}</FormLabel>
              <Input type="number" placeholder={t('business_location')} {...register("business_location", { required: true })} />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>{t('staff_user')}</FormLabel>
              <Input type="number" placeholder={t('staff_user')} {...register("staff_user", { required: true })} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t('sms_remider')}</FormLabel>
              <Select placeholder='Select option' {...register("sms_remider", { required: true })}>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t('status')}</FormLabel>
              <Select placeholder='Select option' {...register("status", { required: true })}>
                <option value='active'>{t('active')}</option>
                <option value='inactive'>{t('inactive')}</option>
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

export default Plan