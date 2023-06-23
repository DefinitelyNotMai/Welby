import { Box, Flex, Grid, Icon, Image, Link, Text } from '@chakra-ui/react';
import {
    FaClock,
    FaEnvelope,
    FaPhone,
    FaFacebook,
    FaLinkedin,
} from 'react-icons/fa';
import WelbyLogo from '../../../assets/images/welby.svg';

const MainFooter = () => {
    return (
        <Box as="footer" bg="#24a2f0">
            <Flex
                flexDirection="column"
                ml="auto"
                mr="auto"
                maxW="80rem"
                px="2.5rem"
                w="full"
                h="full"
                py="4rem"
                rowGap="2rem"
                overflow="hidden"
            >
                <Flex
                    flexDirection={{ base: 'column', md: 'row' }}
                    alignItems="center"
                    w="full"
                    columnGap="2rem"
                >
                    <Box boxSizing="content-box" h="8rem" w="8rem" position="relative">
                        <Link>
                            <Image
                                src={WelbyLogo}
                                alt="Welby Logo"
                                objectFit="contain"
                                position="absolute"
                                w="full"
                                h="full"
                            />
                        </Link>
                    </Box>
                </Flex>
                <Flex
                    flexDirection={{ base: 'column', md: 'row' }}
                    rowGap="4rem"
                    columnGap="8rem"
                >
                    <Box alignSelf={{ base: 'center', md: 'self-start' }}>
                        <Grid
                            gridTemplateColumns="1.8rem 1fr"
                            justifyItems="start"
                            placeItems="center"
                            gap="0.375rem"
                            color="#ffffff"
                        >
                            <Icon as={FaClock} viewBox="0 0 512 512" h="1.5rem" w="1.5rem" />
                            <Flex fontFamily="Montserrat" flexDirection="column">
                                <Text>Mon - Fri: 9:00am - 6:00pm</Text>
                                <Text>Sat: 9:00am - 12:00pm</Text>
                            </Flex>
                        </Grid>
                    </Box>
                    <Flex
                        flexDirection={{ base: 'column', md: 'row' }}
                        columnGap="6rem"
                        rowGap="2.5rem"
                    >
                        <Flex flexDirection="column" rowGap="0.5rem">
                            <Text
                                as="h4"
                                fontFamily="Montserrat"
                                fontWeight="bold"
                                color="white"
                            >
                                Connect with us
                            </Text>
                            <Grid
                                gridTemplateColumns="1.8rem 1fr"
                                justifyItems="start"
                                gap="0.375rem"
                                color="white"
                            >
                                <Icon
                                    as={FaEnvelope}
                                    viewBox="0 0 24 24"
                                    h="1.5rem"
                                    w="1.5rem"
                                />
                                <Flex flexDirection="column" fontFamily="Montserrat">
                                    <Text>hello@welbyatwork.com</Text>
                                </Flex>
                            </Grid>
                            <Grid
                                gridTemplateColumns="1.8rem 1fr"
                                justifyItems="start"
                                gap="0.375rem"
                                color="white"
                            >
                                <Icon
                                    as={FaPhone}
                                    viewBox="0 0 512 512"
                                    h="1.5rem"
                                    w="1.5rem"
                                />
                                <Flex flexDirection="column" fontFamily="Montserrat">
                                    <Text>09692097239</Text>
                                </Flex>
                            </Grid>
                            <Link href="https://www.facebook.com/WelbyatWork/">
                                <Grid
                                    gridTemplateColumns="1.8rem 1fr"
                                    justifyItems="start"
                                    gap="0.375rem"
                                    color="white"
                                >
                                    <Icon
                                        as={FaFacebook}
                                        viewBox="0 0 16 16"
                                        h="1.5rem"
                                        w="1.5rem"
                                    />
                                    <Flex flexDirection="column" fontFamily="Montserrat">
                                        <Text>@welbyatwork</Text>
                                    </Flex>
                                </Grid>
                            </Link>
                            <Link href="https://www.linkedin.com/company/welbyatwork/">
                                <Grid
                                    gridTemplateColumns="1.8rem 1fr"
                                    justifyItems="start"
                                    gap="0.375rem"
                                    color="white"
                                >
                                    <Icon
                                        as={FaLinkedin}
                                        viewBox="0 0 16 16"
                                        h="1.5rem"
                                        w="1.5rem"
                                    />
                                    <Flex flexDirection="column" fontFamily="Montserrat">
                                        <Text>LinkedIn</Text>
                                    </Flex>
                                </Grid>
                            </Link>
                        </Flex>
                        <Flex flexDirection="column" rowGap="0.5rem">
                            <Text fontFamily="Montserrat" fontWeight="bold" color="white">
                                Quick Links
                            </Text>
                            <Link color="white" fontFamily="Montserrat">
                                About Us
                            </Link>
                            <Link color="white" fontFamily="Montserrat">
                                Assessments &amp; Blog
                            </Link>
                            <Link color="white" fontFamily="Montserrat">
                                Services
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default MainFooter;
