import { Flex, Grid, Heading, Select, Text, Icon, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { FiPlus } from 'react-icons/fi';
import CountrySelect from "../../../components/Main/CountrySelection";
import CustomTextbox from "../../../components/Main/FormTextbox";

type Step1Data = {
    Company: string;
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

const Step1 = ({ Company, Email, Country, Phone_Number, Linkedin, Facebook, Instagram, TikTok, updateFields }: Step1Props) => {
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
                    <Select
                        placeholder="Choose your company..."
                        bg="#ffffff"
                        fontFamily="Montserrat"
                        fontWeight="500"
                        color="#000000"
                        mb="5"
                        value={Company}
                        onChange={e => updateFields({ Company: e.target.value })}
                    >
                        <option value="Welby">Welby</option>
                        <option value="Dlinkers">Dlinkers</option>
                        <option value="CPU">CPU</option>
                    </Select>
                    <CountrySelect />
                    <CustomTextbox
                        placeholder="Email"
                        value={Email}
                        onChange={e => updateFields({ Email: e.target.value })}
                    />
                    <Select
                        placeholder="Choose your location"
                        bg="#ffffff"
                        fontFamily="Montserrat"
                        fontWeight="500"
                        color="#000000"
                        mb="5"
                        value={Location}
                        onChange={e => updateFields({ Location: e.target.value })}
                    >
                        <option value="Philippines">Philippines</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Malaysia">Malaysia</option>
                    </Select>
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
                <Flex h="50%">
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