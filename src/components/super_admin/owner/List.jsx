import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  useToast
} from '@chakra-ui/react';
import useSearchPagination from '../../../useSearchPagination';
import PaginatedTableLayout from '../../../components/PaginatedTableLayout';
import api from '../../../axios';
import { OWNER_ADD, OWNER_EDIT, OWNER_LIST, PLAN_ADD } from '../../../router';
import { useTranslation } from 'react-i18next';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { generatePath } from 'react-router-dom';
import Swal from 'sweetalert2';


const fetchOwners = async ({ page, search }) => {
  const res = await api.get('superadmin/owner/list', {
    params: { page, search },
  });
  return {
    data: res.data.data || [],
    total: res.data.total || 0,
    per_page: res.data.per_page || 10,
  };
};


const OwnerList = () => {
  const {
    data,
    search,
    setSearch,
    page,
    setPage,
    total,
    loading,
    refetch
  } = useSearchPagination(fetchOwners);
  const { t } = useTranslation();
  const toast = useToast(); 

  const deleteOwner = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Data will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`superadmin/owner/delete/${id}`);
        toast({
          title: 'Data deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        await refetch();

      } catch (error) {
        toast({
          title: 'Error deleting data',
          description: error.response?.data?.message || 'Something went wrong.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  

  return (
    <PaginatedTableLayout
      title={t('owner')}
      createRoute={OWNER_ADD}
      onSearch={setSearch}
      searchValue={search}
      onPageChange={setPage}
      page={page}
      total={total}
      loading={loading}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t('name')}</Th>
            <Th>{t('email')}</Th>
            <Th>{t('phone')}</Th>
            <Th>{t('company_name')}</Th>
            <Th>{t('address')}</Th>
            <Th>{t('status')}</Th>
            <Th>{t('action')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((owner) => (
            <Tr key={owner.id}>
              <Td>{owner.name}</Td>
              <Td>{owner.email}</Td>
              <Td>{owner.phone}</Td>
              <Td>{owner.company_name}</Td>
              <Td>{owner.company_address}</Td>
              <Td>{owner.is_active === 1 ? '✅' : '❌'}</Td>
              <Td display="flex" gap={2}>
                <ChakraLink
                  border="1px solid black"
                  padding={2}
                  borderRadius="md"
                  as={ReactRouterLink}
                  to={generatePath(OWNER_EDIT, { id: owner.id })}
                >
                  <EditIcon />
                </ChakraLink>

                <ChakraLink
                  border="1px solid black"
                  padding={2}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => deleteOwner(owner.id)}
                >
                  <DeleteIcon color="red.500" />
                </ChakraLink>
              </Td>

            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>{t('name')}</Th>
            <Th>{t('email')}</Th>
            <Th>{t('phone')}</Th>
            <Th>{t('company_name')}</Th>
            <Th>{t('address')}</Th>
            <Th>{t('status')}</Th>
            <Th>{t('action')}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </PaginatedTableLayout>
  );
};

export default OwnerList;
