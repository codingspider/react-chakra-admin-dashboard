import React, { useEffect, useState } from 'react';
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
  useToast
} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import api from '../../axios';

const BusinessSetting = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast(); 

    const onSubmit = async (data) => {
            setIsSubmitting(true);
            try {
              const formData = toFormData(data);
              const res = await api.post('superadmin/update-master-setting', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
                console.log(res);
                toast({
                    title: 'Setting update successful!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

            } catch (err) {
                const errorMessage = err?.response?.data?.message || err.message || 'Something went wrong';
                toast({
                    title: 'Setting update failed',
                    description: errorMessage,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setIsSubmitting(false);
            }
        };
    const toFormData = (data) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (value instanceof FileList) {
          // Multiple files (if field allows it)
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else if (value instanceof File) {
          // Single file
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item) => formData.append(`${key}[]`, item));
        } else {
          formData.append(key, value);
        }
      });

      return formData;
    };

    useEffect(() => {
      api.get('superadmin/get/settings')
        .then(response => {
          const inputArray = response.data.data;
          console.log(inputArray)
          // Convert array of {key, value} to object {key: value}
          const formValues = inputArray.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {});

          reset(formValues);
        })
        .catch(error => {
          console.error('Error fetching settings:', error);
          toast({
                title: 'Login failed',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        });
    }, [reset]);

    return (
    <>
    <Box p={4}>
      <Card  mx="auto" boxShadow="lg">
        <CardBody>
          <Heading size="md" mb={6}>
            {t('master_setting')}
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel>{t('application_name')}</FormLabel>
              <Input type='text' placeholder={t('application_name')} {...register("application_name", { required: true, maxLength: 20 })} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t('phone_number')}</FormLabel>
              <Input type="text" placeholder={t('phone_number')} {...register("phone_number", { required: true, maxLength: 20 })} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t('alternative_phone_number')}</FormLabel>
              <Input type="text" placeholder={t('alternative_phone_number')} {...register("alternative_phone_number", { required: true, maxLength: 20 })} />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>{t('whats_app_number')}</FormLabel>
              <Input type="text" placeholder={t('whats_app_number')} {...register("whats_app_number", { required: true, maxLength: 20 })} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t('email')}</FormLabel>
              <Input type="email" placeholder={t('email')}  {...register("email", { required: "Email Address is required" })} aria-invalid={errors.email ? "true" : "false"} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t('address')}</FormLabel>
              <Input type='text' placeholder={t('address')} {...register("address", { required: true, maxLength: 20 })} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t('country')}</FormLabel>
              <Input type='text' placeholder={t('country')} {...register("country", { required: true, maxLength: 20 })} />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>{t('state')}</FormLabel>
              <Input type='text' placeholder={t('state')} {...register("state", { required: true, maxLength: 20 })} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t('city')}</FormLabel>
              <Input type='text' placeholder={t('city')} {...register("city", { required: true, maxLength: 20 })} />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>{t('district')}</FormLabel>
              <Input type='text' placeholder={t('district')} {...register("district", { required: true, maxLength: 20 })} />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>{t('zip')}</FormLabel>
              <Input type='text' placeholder={t('zip')} {...register("zip", { required: true, maxLength: 20 })} />
            </FormControl>

          </SimpleGrid>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} marginTop={10}>
            <FormControl>
              <FormLabel>{t('app_logo')}</FormLabel>
              <Input type='file' name="app_logo" placeholder={t('app_logo')} {...register("app_logo")} />
            </FormControl>

            <FormControl>
              <FormLabel>{t('fav_icon')}</FormLabel>
              <Input type="file" name="fav_icon" placeholder={t('fav_icon')} {...register("fav_icon")} />
            </FormControl>

            
          </SimpleGrid>

          <Stack direction="row" justify="flex-end" mt={8}>
            <Button isLoading={isSubmitting}
                                loadingText="Saving Data..,"
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

export default BusinessSetting