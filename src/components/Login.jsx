import React, { useEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    useToast,
    Link
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ADMIN, DASHBORD, STAFF, SUPER_ADMIN, USER } from '../router';
import { loginUser } from '../services/authService';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { FORGOT } from './../router';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        const role = localStorage.getItem('role');
        if (storedToken && role === 'super_admin') {
            navigate(`${SUPER_ADMIN}/${DASHBORD}`);
        } else if (storedToken && role === 'admin') {
            navigate(`${ADMIN}/${DASHBORD}`);
        } else if (storedToken && role === 'user') {
            navigate(`${USER}/${DASHBORD}`);
        } else if (storedToken && role === 'staff') {
            navigate(`${STAFF}/${DASHBORD}`);
        }

    }, [navigate]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const { email, password } = data;
        try {
            const res = await loginUser(email, password);
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('role', res.data.role);
            toast({
                title: 'Login successful!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            if (res.data.token && res.data.role === 'super_admin') {
                navigate(`${SUPER_ADMIN}/${DASHBORD}`);
            } else if (res.data.token && res.data.role === 'admin') {
                navigate(`${ADMIN}/${DASHBORD}`);
            } else if (res.data.token && res.data.role === 'user') {
                navigate(`${USER}/${DASHBORD}`);
            } else if (res.data.token && res.data.role === 'staff') {
                navigate(`${STAFF}/${DASHBORD}`);
            }
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message || err.message || 'Something went wrong';
            toast({
                title: 'Login failed',
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
        <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align="center" justify="center">
                <Stack spacing={4} w="full" maxW="md">
                    <Heading fontSize="2xl">Sign in to your account</Heading>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" {...register("email", { required: true })} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" {...register("password", { required: true })} />
                        </FormControl>
                        <Stack spacing={6}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align="start"
                                justify="space-between"
                            >
                                <Checkbox {...register("remember")}>Remember me</Checkbox>
                                <ChakraLink  color='teal.500' as={ReactRouterLink} to={FORGOT}>
                                Forgot password?
                                </ChakraLink>
                            </Stack>
                            <Button
                                isLoading={isSubmitting}
                                loadingText="Signing in"
                                type="submit"
                                colorScheme="blue"
                                variant="solid"
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt="Login Image"
                    objectFit="cover"
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1352&q=80"
                />
            </Flex>
        </Stack>
    );
};

export default Login;
