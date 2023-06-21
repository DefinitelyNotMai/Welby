import { Avatar, Box, Flex, Icon, Image, Link, Text } from '@chakra-ui/react';
import { TbBell, TbCalendarEvent } from 'react-icons/tb';
import DashboardSearch from '../Search';

const DashboardHeader = () => {
  return (
    <Box
      as="nav"
      bg="#ffffff"
      borderBottom="2px solid #ebebeb"
      zIndex="40"
      position="sticky"
      top="0"
      transition="ease-in-out"
    >
      <Box
        ml="auto"
        mr="auto"
        maxW="7xl"
        px="2"
        mx="auto"
        overflow="hidden"
        pr={{ base: 5, md: 10 }}
        h={{ base: 10, sm: 14 }}
        transition="all"
      >
        <Flex alignItems="center" justifyContent="space-between" h="full">
          <Box
            w={{ base: 16, sm: 20 }}
            h={{ base: 16, sm: 20 }}
            transition="all"
            position="relative"
          >
            <Link>
              <Image
                src="/src/assets/images/welby_primary-1.png"
                alt="Welby Logo"
                objectFit="contain"
                w="full"
                h="full"
              />
            </Link>
          </Box>
          <Flex alignItems="center">
            <DashboardSearch />
            <Icon as={TbCalendarEvent} color="#24a2f0" boxSize="6" />
            <Icon as={TbBell} color="#24a2f0" boxSize="6" />
            <Avatar boxSize="6 " />
            <Text fontFamily="Montserrat" fontWeight="600" ml="2">
              Name
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
