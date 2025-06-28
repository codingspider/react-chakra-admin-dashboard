import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import useSearchPagination from '../../../useSearchPagination';
import PaginatedTableLayout from '../../../components/PaginatedTableLayout';
import api from '../../../axios';
import { PLAN_ADD } from '../../../router';
import { useTranslation } from 'react-i18next';

const fetchPlans = async ({ page, search }) => {
  const res = await api.get('superadmin/plan/list', {
    params: { page, search },
  });
  return {
    data: res.data.data || [],
    total: res.data.total || 0,
    per_page: res.data.per_page || 10,
  };
};

const PlanList = () => {
  const {
    data,
    search,
    setSearch,
    page,
    setPage,
    total,
    loading,
  } = useSearchPagination(fetchPlans);
  const { t } = useTranslation();

  return (
    <PaginatedTableLayout
      title={t('plan')}
      createRoute={PLAN_ADD}
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
            <Th>Plan ID</Th>
            <Th>Plan Name</Th>
            <Th>Number of Orders</Th>
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
            <Th>Plan ID</Th>
            <Th>Plan Name</Th>
            <Th>Number of Orders</Th>
            <Th>Location</Th>
            <Th>Staff</Th>
            <Th>SMS Reminder</Th>
          </Tr>
        </Tfoot>
      </Table>
    </PaginatedTableLayout>
  );
};

export default PlanList;
