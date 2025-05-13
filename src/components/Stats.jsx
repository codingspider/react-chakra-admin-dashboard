'use client';

import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

function StatsCard({ title, stat, icon }) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py="5"
      shadow="xl"
      border="1px solid"
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded="lg"
    >
      <Flex justifyContent="space-between">
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight="medium" isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="medium">
            {stat}
          </StatNumber>
        </Box>
        <Box
          my="auto"
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent="center"
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Stats() {
  return (
    <Box maxW="10xl" mx="auto" pt={2}>

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title="Users" stat="5,000" icon={<BsPerson size="2em" />} />
        <StatsCard title="Servers" stat="1,000" icon={<FiServer size="2em" />} />
        <StatsCard title="Datacenters" stat="7" icon={<GoLocation size="2em" />} />
        <StatsCard title="Datacenters" stat="7" icon={<GoLocation size="2em" />} />
      </SimpleGrid>
    </Box>
  );
}
