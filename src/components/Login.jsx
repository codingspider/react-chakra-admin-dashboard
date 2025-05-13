import React, {useState} from 'react';
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
    Spinner,
    useToast
} from '@chakra-ui/react';
import {useForm} from "react-hook-form";
import api from '../axios';

const Login = () => {
    const {register, handleSubmit} = useForm()

    const [isSubmitting,
        setIsSubmitting] = useState(false);
    const toast = useToast();

    const onSubmit = (data) => {

        api
            .get('/user')
            .then((res) => {
                console.log('User data:', res.data);
            })
            .catch((err) => {
                console.error('Error:', err);
            });

        console.log(data);
        setIsSubmitting(true);

        // Simulate an API call delay
        setTimeout(() => {
            setIsSubmitting(false);
            toast({title: 'Login successful!', status: 'success', duration: 3000, isClosable: true});
        }, 2000);
    };

    return (
        <Stack
            minH="100vh"
            direction={{
            base: 'column',
            md: 'row'
        }}>
            <Flex p={8} flex={1} align="center" justify="center">
                <Stack spacing={4} w="full" maxW="md">
                    <Heading fontSize="2xl">Sign in to your account</Heading>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" {...register("email", { required: true })}/>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" {...register("password", { required: true })}/>
                        </FormControl>
                        <Stack spacing={6}>
                            <Stack
                                direction={{
                                base: 'column',
                                sm: 'row'
                            }}
                                align="start"
                                justify="space-between">
                                <Checkbox {...register("remember")}>Remember me</Checkbox>
                                <Text color="blue.500">Forgot password?</Text>
                            </Stack>
                            <Button
                                isLoading={isSubmitting}
                                loadingText="Signing in"
                                type='submit'
                                colorScheme="blue"
                                variant="solid">
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
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"/>
            </Flex>
        </Stack>
    );
};

export default Login;
