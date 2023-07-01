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
    Nickname: string;
    Email: string;
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

const Step1 = ({ Company, First_Name, Middle_Name, Last_Name, Gender, Nickname, Email, Country, Phone_Number, Linkedin, Facebook, Instagram, TikTok, updateFields }: Step1Props) => {
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
                    <CompanySelect
                        value={Company}
                        onChange={e => updateFields({ Company: e.target.value })}
                    />
                    <CustomTextbox
                        placeholder="First Name"
                        value={First_Name}
                        onChange={e => updateFields({ First_Name: e.target.value })}
                    />
                    <CustomTextbox
                        placeholder="Middle Name"
                        value={Middle_Name}
                        onChange={e => updateFields({ Middle_Name: e.target.value })}
                    />
                    <CustomTextbox
                        placeholder="Last Name"
                        value={Last_Name}
                        onChange={e => updateFields({ Last_Name: e.target.value })}
                    />
                    <GenderSelect
                        value={Gender}
                        onChange={e => updateFields({ Gender: e.target.value })}
                    />
                    <CustomTextbox
                        placeholder="Nickname"
                        value={Nickname}
                        onChange={e => updateFields({ Nickname: e.target.value })}
                    />
                    <CustomTextbox
                        placeholder="Email"
                        value={Email}
                        onChange={e => updateFields({ Email: e.target.value })}
                    />
                    <CountrySelect
                        value={Country}
                        onChange={e => updateFields({ Country: e.target.value })}
                    />
                    <CustomTextbox
                        placeholder="Mobile Number"
                        value={Phone_Number}
                        onChange={e => updateFields({ Phone_Number: e.target.value })}
                    />
                    <CustomTextbox
                        placeholder="LinkedIn (optional)"
                        value={Linkedin}
                        onChange={e => updateFields({ Linkedin: e.target.value })}
                    />
                    <CustomTextbox
                        placeholder="Facebook (optional)"
                        value={Facebook}
                        onChange={e => updateFields({ Facebook: e.target.value })}
                    />
                    <CustomTextbox
                        placeholder="Instagram (optional)"
                        value={Instagram}
                        onChange={e => updateFields({ Instagram: e.target.value })}
                    />
                    <CustomTextbox
                        placeholder="TikTok (optional)"
                        value={TikTok}
                        onChange={e => updateFields({ TikTok: e.target.value })}
                    />
                </Flex>
                <Flex boxSize="64">
                    <Flex flexDirection="column" bg="#ffffff" borderRadius="md" alignItems="center" justifyContent="center" p="4">
                        <Flex flexDirection="column" bg="#c8c8c8" h="98%" borderRadius="md" alignItems="center" justifyContent="center" p="4">
                            <Icon as={FiPlus} boxSize={8} />
                            <Text mt="2">Upload Profile Photo</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Grid>
        </>
    );
}

export default Step1;