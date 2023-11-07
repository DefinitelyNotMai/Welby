import { Box, Flex, Image, Link, Spacer, Text } from "@chakra-ui/react";
import WelbyLogo from "../../assets/images/welby_logo_and_name_primary_1_flat.svg";

const AdminViewHeader = () => {
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
        maxW="9xl"
        px="5"
        mx="auto"
        overflow="hidden"
        pr={{ base: 5, md: 10 }}
        h={{ base: 10, sm: 14 }}
        transition="all"
      >
        <Flex h="full" alignItems="center">
          <Box
            w={{ base: 16, sm: 20 }}
            h={{ base: 16, sm: 20 }}
            transition="all"
            position="relative"
            ml="10"
          >
            <Link onClick={() => localStorage.clear()}>
              <Image
                src={WelbyLogo}
                alt="Welby Logo"
                objectFit="contain"
                w="full"
                h="full"
              />
            </Link>
          </Box>
          <Text fontFamily="Montserrat" fontWeight="700" color="#6c6c6c" ml="3">
            Super Admin
          </Text>
          <Spacer />
        </Flex>
      </Box>
    </Box>
  );
};

export default AdminViewHeader;
