import { Heading, Text, Grid, Box, Flex, Icon } from "@chakra-ui/react";
import CountrySelect from "../../../components/Main/CountrySelection";
import CustomTextbox from "../../../components/Main/FormTextbox";
import IndustryTypeSelect from "../../../components/Main/IndustrySelection";
import { FiPlus } from 'react-icons/fi';

type Step2Data = {
    Name: string;
    CountryId: string;
    Address: string;
    Phone_Number: string;
    Email: string;
    Website: string;
    IndustryTypeId: string;
    FoundingDate: string;
}

type Step2Props = Step2Data & {
    updateFields: (fields: Partial<Step2Data>) => void
}

const Step2 = ({ Name, CountryId, Address, Phone_Number, Email, Website, IndustryTypeId, FoundingDate, updateFields }: Step2Props) => {
    return (
        <>
            <Heading
                as="h1"
                textAlign="center"
                fontFamily="Montserrat"
                fontWeight="700"
                mb="12"
                color="#ffffff"
            >
                Welcome to your space!
                <Text align="center" fontSize="sm" fontWeight="normal">
                    First, let's complete your company's profile.
                </Text>
            </Heading>
            <Grid templateColumns="2fr 1fr" gap={4}>
                <Box>
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Company Name</Text>
                    <CustomTextbox
                        placeholder="Name"
                        value={Name}
                        onChange={e => updateFields({ Name: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Location</Text>
                    <CountrySelect
                        value={CountryId}
                        onChange={e => updateFields({ CountryId: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Company Address</Text>
                    <CustomTextbox
                        placeholder="Address"
                        value={Address}
                        onChange={e => updateFields({ Address: e.target.value })}
                    />
                </Box>
                <Flex boxSize="48">
                    <Flex flexDirection="column" bg="#ffffff" borderRadius="md" alignItems="center" justifyContent="center" p="4">
                        <Flex flexDirection="column" bg="#c8c8c8" h="98%" borderRadius="md" alignItems="center" justifyContent="center" p="4" textAlign="center">
                            <Icon as={FiPlus} boxSize={8} />
                            <Text mt="2">Upload Company Logo</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Grid>
            <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Company Phone Number</Text>
                    <CustomTextbox
                        placeholder="+63 912 456 7890"
                        value={Phone_Number}
                        onChange={e => updateFields({ Phone_Number: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Company Website</Text>
                    <CustomTextbox
                        placeholder="www.website.com"
                        value={Website}
                        onChange={e => updateFields({ Website: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Founding Date</Text>
                    <CustomTextbox
                        placeholder="Founding Date"
                        value={FoundingDate}
                        onChange={e => updateFields({ FoundingDate: e.target.value })}
                    />
                </Box>
                <Box>
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Company Email Address</Text>
                    <CustomTextbox
                        placeholder="hello@email.com"
                        value={Email}
                        onChange={e => updateFields({ Email: e.target.value })}
                    />
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Industry</Text>
                    <IndustryTypeSelect
                        value={IndustryTypeId}
                        onChange={e => updateFields({ IndustryTypeId: e.target.value })}
                    />
                </Box>
            </Grid>
        </>
    );
}

export default Step2;