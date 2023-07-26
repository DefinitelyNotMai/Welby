import { Box, Flex, Image, Text, Link } from '@chakra-ui/react';
import WelbyLogo from '../../../assets/images/welby.svg';

const MainHeader = () => {
    return (
        <Box
            as="nav"
            bg="#24a2f0"
            zIndex="40"
            position="sticky"
            top="0"
            transition="ease-in-out"
        >
            <Box
                ml="auto"
                mr="auto"
                maxW="7xl"
                px="10"
                mx="auto"
                overflow="hidden"
                pr={{ base: 5, md: 10 }}
                h={{ base: 20, sm: 24 }}
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
                                src={WelbyLogo}
                                alt="Welby Logo"
                                objectFit="contain"
                                w="full"
                                h="full"
                            />
                        </Link>
                    </Box>
                    <Flex
                        as="ul"
                        gap="7"
                        color="white"
                        fontFamily="Montserrat"
                        fontWeight="500"
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <Link>
                            <Text color="#f0d124">Home</Text>
                        </Link>
                        <Link>
                            <Text>About Us</Text>
                        </Link>
                        <Link>
                            <Text>Resources</Text>
                        </Link>
                        <Link>
                            <Text>Services</Text>
                        </Link>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default MainHeader;
