import { Box, Grid, Heading, Image, Text, Flex, Icon } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import WelbyLogo from '../../assets/images/welby_logoAndName_primary-1_flat.svg';
import CustomTextbox from '../../components/Main/FormTextbox';
import CountrySelection from '../../components/Main/CountrySelection';
import IndustrySelection from '../../components/Main/IndustrySelection';
import CompanySizeSelection from '../../components/Main/CompanySizeSelection';

type Step1Data = {
    Name: string;
    Email: string;
    Website: string;
    Phone_Number: string;
    CountryId: string;
    IndustryTypeId: string;
    FoundingDate: string;
    CompanySize: string;
};

type Step1Props = Step1Data & {
    updateFields: (fields: Partial<Step1Data>) => void;
};

const Step1 = ({
    Name,
    Email,
    Website,
    Phone_Number,
    CountryId,
    IndustryTypeId,
    FoundingDate,
    CompanySize,
    updateFields,
}: Step1Props) => {
    return (
        <>
            <Grid templateColumns="1fr 2fr" gap="0">
                <Flex
                    bg="#ffffff"
                    h={{ base: '50vh', md: '70vh' }}
                    m="0"
                    borderLeftRadius="2xl"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Image src={WelbyLogo} boxSize="64" />
                </Flex>
                <Flex
                    bg="#24a2f0"
                    p={{ base: '8', md: '16' }}
                    borderRightRadius="2xl"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Heading fontFamily="Montserrat" fontWeight="500" color="#ffffff">
                        First of all, thank you for choosing Welby!
                    </Heading>
                    <Heading
                        fontFamily="Montserrat"
                        fontWeight="500"
                        color="#ffffff"
                        mb="5"
                    >
                        Let's start your <b>registration.</b>
                    </Heading>
                    <Box>
                        <Text
                            as="u"
                            color="#ffffff"
                            fontFamily="Montserrat"
                            fontWeight="800"
                        >
                            Fields marked with an asterisk (*) are required.
                        </Text>
                        <Grid templateColumns="2fr 1fr" gap="10">
                            <Flex flexDirection="column">
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Company Name *
                                </Text>
                                <CustomTextbox
                                    placeholder="Name"
                                    value={Name}
                                    onChange={(e) => updateFields({ Name: e.target.value })}
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Company Email Address *
                                </Text>
                                <CustomTextbox
                                    placeholder="hello@email.com"
                                    value={Email}
                                    onChange={(e) => updateFields({ Email: e.target.value })}
                                />
                            </Flex>
                            <Flex
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Flex
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    bg="#ffffff"
                                    borderRadius="md"
                                    w="50%"
                                    p="2"
                                >
                                    <Flex
                                        flexDirection="column"
                                        p="4"
                                        w="98%"
                                        bg="#c8c8c8"
                                        color="#ffffff"
                                        alignItems="center"
                                        justifyContent="center"
                                        textAlign="center"
                                    >
                                        <Icon as={FiPlus} boxSize={8} />
                                        <Text mt="2">
                                            Company <br /> Logo
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Grid>
                        <Grid templateColumns="1fr 1fr" gap="10">
                            <Flex flexDirection="column">
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Company Website
                                </Text>
                                <CustomTextbox
                                    placeholder="www.website.com"
                                    value={Website}
                                    onChange={(e) => updateFields({ Website: e.target.value })}
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Company Phone Number
                                </Text>
                                <CustomTextbox
                                    placeholder="09123456789"
                                    value={Phone_Number}
                                    onChange={(e) =>
                                        updateFields({ Phone_Number: e.target.value })
                                    }
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Location
                                </Text>
                                <CountrySelection
                                    value={CountryId}
                                    onChange={(e) => updateFields({ CountryId: e.target.value })}
                                />
                            </Flex>
                            <Flex flexDirection="column">
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Company Size
                                </Text>
                                <CompanySizeSelection
                                    value={CompanySize}
                                    onChange={(e) =>
                                        updateFields({ CompanySize: e.target.value })
                                    }
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Founding Year *
                                </Text>
                                <CustomTextbox
                                    placeholder="Founding Year"
                                    value={FoundingDate}
                                    onChange={(e) =>
                                        updateFields({ FoundingDate: e.target.value })
                                    }
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Industry
                                </Text>
                                <IndustrySelection
                                    value={IndustryTypeId}
                                    onChange={(e) =>
                                        updateFields({ IndustryTypeId: e.target.value })
                                    }
                                />
                            </Flex>
                        </Grid>
                    </Box>
                </Flex>
            </Grid>
        </>
    );
};

export default Step1;
