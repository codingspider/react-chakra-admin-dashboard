import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Input,
  Flex,
  Text,
  TableContainer,
  Spinner,
} from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const PaginatedTableLayout = ({
  title,
  createRoute,
  onSearch,
  searchValue,
  onPageChange,
  page,
  total,
  perPage = 10,
  loading = false,
  children,
}) => {
  const lastPage = Math.ceil(total / perPage);

  return (
    <Box p={4}>
      <Card mx="auto" boxShadow="lg">
        <CardBody>
          <Flex
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'flex-start', md: 'center' }}
                justify="space-between"
                gap={4}
                mb={6}
                flexWrap="wrap"
                >
                <Heading size="md">{title}</Heading>

                <Input
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => onSearch(e.target.value)}
                    maxW={{ base: '100%', md: '300px' }}
                />

                {createRoute && (
                    <ChakraLink
                    as={ReactRouterLink}
                    to={createRoute}
                    px={4}
                    py={2}
                    rounded="md"
                    bg="teal.500"
                    color="white"
                    _hover={{ bg: 'teal.600', textDecoration: 'none' }}
                    textAlign="center"
                    whiteSpace="nowrap"
                    >
                    Create
                    </ChakraLink>
                )}
            </Flex>


          
          {loading ? (
            <Flex justify="center" my={8}>
              <Spinner size="lg" />
            </Flex>
          ) : (
            <TableContainer>{children}</TableContainer>
          )}

          <Flex justify="space-between" align="center" mt={4}>
            <Button onClick={() => onPageChange(Math.max(page - 1, 1))} isDisabled={page === 1}>
              Previous
            </Button>
            <Text>
              Page {page} of {lastPage} Total Records Found {total}
            </Text>
            <Button
              onClick={() => onPageChange(Math.min(page + 1, lastPage))}
              isDisabled={page >= lastPage}
            >
              Next
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default PaginatedTableLayout;
