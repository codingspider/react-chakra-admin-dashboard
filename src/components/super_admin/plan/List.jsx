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
  Image,
  Select,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Text
} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import api from '../../../axios';
import { debounce } from 'lodash';

const List = () => {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const fetchData = async (pageNum = 1, searchTerm = '') => {
        const res = await api.get('superadmin/plan/list', {
        params: { page: pageNum, search: searchTerm }
        });
        console.log(res.data.data);
        setData(res.data.data.data);
        setMeta(res.data.data);
    };

    const debouncedSearch = debounce((value) => {
        setPage(1);
        fetchData(1, value);
    }, 500);

    useEffect(() => {
        fetchData(page, search);
    }, [page]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    };
  return (
    <>
        <Box p={4}>
          <Card  mx="auto" boxShadow="lg">
            <CardBody>
              <Heading size="md" mb={6}>
                {t('plan')}
              </Heading>

              <TableContainer>
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                    mb={4}
                    maxW="300px"
                />
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Plan Id </Th>
                        <Th>Plan Name </Th>
                        <Th>Number of order</Th>
                        <Th>Location</Th>
                        <Th>Staff</Th>
                        <Th>SMS Reminder</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.map((plan) => (
                    <Tr key={plan.id}>
                        <Td>{plan.id}</Td>
                        <Td>{plan.plan_name}</Td>
                        <Td>{plan.number_of_order}</Td>
                        <Td>{plan.business_location}</Td>
                        <Td>{plan.staff_user}</Td>
                        <Td>{plan.sms_reminder === 'yes' ? '✅' : '❌'}</Td>
                    </Tr>
                    ))}

                    </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>Plan Id </Th>
                        <Th>Plan Name </Th>
                        <Th>Number of order</Th>
                        <Th>Location</Th>
                        <Th>Staff</Th>
                        <Th>SMS Reminder</Th>
                    </Tr>
                    </Tfoot>
                </Table>
                </TableContainer>

                <Flex justify="space-between" align="center" mt={4}>
                    <Button onClick={() => setPage(prev => Math.max(prev - 1, 1))} isDisabled={page === 1}>
                    Previous
                    </Button>

                    <Text>
                    Page {meta.current_page} of {meta.last_page}
                    </Text>

                    <Button onClick={() => setPage(prev => (meta.next_page_url ? prev + 1 : prev))} isDisabled={!meta.next_page_url}>
                    Next
                    </Button>
                </Flex>
            </CardBody>
          </Card>
        </Box>
        </>
  )
}

export default List