import { Flex, Grid, Heading, Select, Text, Icon, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { FiPlus } from 'react-icons/fi';
import CompanySelect from "../../../components/Main/CompanySelection";
import CountrySelect from "../../../components/Main/CountrySelection";
import CustomTextbox from "../../../components/Main/FormTextbox";
import GenderSelect from "../../../components/Main/GenderSelection";

type Step1Data = {
    Company: string;
    First_Name: string;
    Middle_Name: string;
    Last_Name: string;
    Gender: string;
    Birthday: string;
    Address: string;
    Nickname: string;
    Email: string;
    Password: string;
    Confirm_Password: string;
    Country: string;
    Phone_Number: string;
    Linkedin: string;
    Facebook: string;
    Instagram: string;
    TikTok: string;
}

type Step1Props = Step1Data & {
    updateFields: (fields: Partial<Step1Data>) => void
}

const Step1 = ({ Company, First_Name, Middle_Name, Last_Name, Gender, Birthday, Address, Nickname, Email, Password, Confirm_Password, Country, Phone_Number, Linkedin, Facebook, Instagram, TikTok, updateFields }: Step1Props) => {
    return (
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                color="#ffffff"
                fontFamily="Montserrat"
                mb="10"
            >
                <Heading fontFamily="Montserrat" fontWeight="700">Welcome!</Heading>
                <Text fontSize="lg">Please introduce yourself.</Text>
            </Flex>
            <Grid templateColumns="2fr 1fr" gap="10">
                <Flex flexDirection="column">
                    <Text as="u" color="#ffffff" fontFamily="Montserrat" fontWeight="800">Fields marked with an asterisk (*) are required.</Text>
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Company *</Text>
                    <CompanySelect
                        value={Company}
                        onChange={e => updateFields({ Company: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">First Name *</Text>
                    <CustomTextbox
                        placeholder="First Name"
                        value={First_Name}
                        onChange={e => updateFields({ First_Name: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Middle Name *</Text>
                    <CustomTextbox
                        placeholder="Middle Name"
                        value={Middle_Name}
                        onChange={e => updateFields({ Middle_Name: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Last Name *</Text>
                    <CustomTextbox
                        placeholder="Last Name"
                        value={Last_Name}
                        onChange={e => updateFields({ Last_Name: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Gender *</Text>
                    <GenderSelect
                        value={Gender}
                        onChange={e => updateFields({ Gender: e.target.value })}
                    />
                </Flex>
                <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    <Flex flexDirection="column" bg="#ffffff" borderRadius="md" p="4">
                        <Flex flexDirection="column" bg="#c8c8c8" h="98%" borderRadius="md" alignItems="center" justifyContent="center" p="16" textAlign="center">
                            <Icon as={FiPlus} boxSize={8} />
                            <Text mt="2">Upload Profile Photo</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Grid>
            <Grid templateColumns="1fr 1fr" gap="10">
                <Flex flexDirection="column">
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Birthday *</Text>
                    <CustomTextbox
                        placeholder="YYYY-MM-DD (1975-01-01)"
                        value={Birthday}
                        onChange={e => updateFields({ Birthday: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Nickname *</Text>
                    <CustomTextbox
                        placeholder="Nickname"
                        value={Nickname}
                        onChange={e => updateFields({ Nickname: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Password *</Text>
                    <CustomTextbox
                        placeholder="Password"
                        value={Password}
                        onChange={e => updateFields({ Password: e.target.value })}
                        type="password"
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Mobile Number *</Text>
                    <CustomTextbox
                        placeholder="Mobile Number"
                        value={Phone_Number}
                        onChange={e => updateFields({ Phone_Number: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">LinkedIn</Text>
                    <CustomTextbox
                        placeholder="LinkedIn (optional)"
                        value={Linkedin}
                        onChange={e => updateFields({ Linkedin: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Instagram</Text>
                    <CustomTextbox
                        placeholder="Instagram (optional)"
                        value={Instagram}
                        onChange={e => updateFields({ Instagram: e.target.value })}
                    />
                </Flex>
                <Flex flexDirection="column">
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Address *</Text>
                    <CustomTextbox
                        placeholder="Address"
                        value={Address}
                        onChange={e => updateFields({ Address: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Email *</Text>
                    <CustomTextbox
                        placeholder="Email"
                        value={Email}
                        onChange={e => updateFields({ Email: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Confirm Password *</Text>
                    <CustomTextbox
                        placeholder="Confirm Password"
                        value={Confirm_Password}
                        onChange={e => updateFields({ Confirm_Password: e.target.value })}
                        type="password"
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Country *</Text>
                    <CountrySelect
                        value={Country}
                        onChange={e => updateFields({ Country: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Facebook</Text>
                    <CustomTextbox
                        placeholder="Facebook (optional)"
                        value={Facebook}
                        onChange={e => updateFields({ Facebook: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">TikTok</Text>
                    <CustomTextbox
                        placeholder="TikTok (optional)"
                        value={TikTok}
                        onChange={e => updateFields({ TikTok: e.target.value })}
                    />
                </Flex>
            </Grid>
        </>
    );
}

export default Step1;