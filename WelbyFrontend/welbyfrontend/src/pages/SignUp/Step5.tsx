import { Grid, Heading, Text, Flex, Icon } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import CustomTextbox from '../../components/Main/FormTextbox';
import GenderSelection from '../../components/Main/GenderSelection';
import { CompanyFormData } from './SignUp';

type Step5Data = {
    AdminPassword: string;
    AdminConfirmPassword: string;
    AdminFirstName: string;
    AdminNickname: string;
    AdminMiddleName: string;
    AdminLastName: string;
    AdminBirthdate: string;
    AdminGender: string;
    AdminPhoneNumber: string;
};

type Step5Props = Step5Data & {
    CompanyData: CompanyFormData;
    updateFields: (fields: Partial<Step5Data>) => void;
};

const Step5 = ({
    AdminPassword,
    AdminConfirmPassword,
    AdminFirstName,
    AdminNickname,
    AdminMiddleName,
    AdminLastName,
    AdminBirthdate,
    AdminGender,
    AdminPhoneNumber,
    CompanyData,
    updateFields,
}: Step5Props) => {
    return (
        <>
            <Flex flexDirection="column" p="8">
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    color="#ffffff"
                    fontFamily="Montserrat"
                    mb="10"
                >
                    <Heading
                        fontFamily="Montserrat"
                        fontWeight="500"
                        color="#ffffff"
                        mb="5"
                        textAlign="center"
                    >
                        Hello Company Admin of <br />
                        COMPANY NAME!
                    </Heading>
                    <Text fontSize="lg">Please introduce yourself.</Text>
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
                        boxSize={32}
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
                                Profile <br /> Picture
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex flexDirection="column" w="50%" mt="4">
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                            Email
                        </Text>
                        <Text as="u" color="#ffffff" fontFamily="Montserrat" fontWeight="500" mb="4">
                        {CompanyData.Email}
                        </Text>
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                            Password
                        </Text>
                        <CustomTextbox
                            placeholder="Password"
                            type="password"
                            value={AdminPassword}
                            onChange={(e) => updateFields({ AdminPassword: e.target.value })}
                        />
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                            Confirm Password
                        </Text>
                        <CustomTextbox
                            placeholder="Confirm Password"
                            type="password"
                            value={AdminConfirmPassword}
                            onChange={(e) => updateFields({ AdminConfirmPassword: e.target.value })}
                        />
                        <Grid templateColumns="1fr 1fr" gap="4">
                            <Flex flexDirection="column">
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    First Name
                                </Text>
                                <CustomTextbox
                                    placeholder="First Name"
                                    value={AdminFirstName}
                                    onChange={(e) => updateFields({ AdminFirstName: e.target.value })}
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Middle Name
                                </Text>
                                <CustomTextbox
                                    placeholder="Middle Name"
                                    value={AdminMiddleName}
                                    onChange={(e) => updateFields({ AdminMiddleName: e.target.value })}
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Birthdate
                                </Text>
                                <CustomTextbox
                                    placeholder="Birthdate"
                                    value={AdminBirthdate}
                                    onChange={(e) => updateFields({ AdminBirthdate: e.target.value })}
                                />
                            </Flex>
                            <Flex flexDirection="column">
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Nickname
                                </Text>
                                <CustomTextbox
                                    placeholder="Nickname"
                                    value={AdminNickname}
                                    onChange={(e) => updateFields({ AdminNickname: e.target.value })}
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Last Name
                                </Text>
                                <CustomTextbox
                                    placeholder="Last Name"
                                    value={AdminLastName}
                                    onChange={(e) => updateFields({ AdminLastName: e.target.value })}
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Gender *</Text>
                                <GenderSelection
                                    value={AdminGender}
                                    onChange={e => updateFields({ AdminGender: e.target.value })}
                                />
                            </Flex>
                        </Grid>
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                            Mobile Number
                        </Text>
                        <CustomTextbox
                            placeholder="Mobile Number"
                            value={AdminPhoneNumber}
                            onChange={(e) => updateFields({ AdminPhoneNumber: e.target.value })}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default Step5;
