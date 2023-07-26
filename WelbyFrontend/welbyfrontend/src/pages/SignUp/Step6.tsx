import { Grid, Text, Flex, Textarea } from '@chakra-ui/react';
import CustomTextbox from '../../components/Main/FormTextbox';
import CountrySelection from '../../components/Main/CountrySelection';

type Step6Data = {
    AdminAddress: string;
    AdminCountryId: string;
    AdminFacebook: string;
    AdminInstagram: string;
    AdminLinkedIn: string;
    AdminTikTok: string;
    AdminWork: string;
    AdminConnect: string;
    AdminSupport: string;
    AdminOtherNotes: string;
};

type Step6Props = Step6Data & {
    updateFields: (fields: Partial<Step6Data>) => void;
};

const Step6 = ({
    AdminAddress,
    AdminCountryId,
    AdminFacebook,
    AdminInstagram,
    AdminLinkedIn,
    AdminTikTok,
    AdminWork,
    AdminConnect,
    AdminSupport,
    AdminOtherNotes,
    updateFields,
}: Step6Props) => {
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
                    <Text fontSize="2xl">Tell more about yourself.</Text>
                </Flex>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Flex flexDirection="column" w="50%" mt="4">
                        <Grid templateColumns="1fr 1fr" gap="4">
                            <Flex flexDirection="column">
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Address
                                </Text>
                                <CustomTextbox
                                    placeholder="Address"
                                    value={AdminAddress}
                                    onChange={(e) => updateFields({ AdminAddress: e.target.value })}
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Facebook
                                </Text>
                                <CustomTextbox
                                    placeholder="Facebook"
                                    value={AdminFacebook}
                                    onChange={(e) => updateFields({ AdminFacebook: e.target.value })}
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    LinkedIn
                                </Text>
                                <CustomTextbox
                                    placeholder="LinkedIn"
                                    value={AdminLinkedIn}
                                    onChange={(e) => updateFields({ AdminLinkedIn: e.target.value })}
                                />
                            </Flex>
                            <Flex flexDirection="column">
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Country *
                                </Text>
                                <CountrySelection
                                    value={AdminCountryId}
                                    onChange={e => updateFields({ AdminCountryId: e.target.value })}
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    Instagram
                                </Text>
                                <CustomTextbox
                                    placeholder="Instagram"
                                    value={AdminInstagram}
                                    onChange={(e) => updateFields({ AdminInstagram: e.target.value })}
                                />
                                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                                    TikTok
                                </Text>
                                <CustomTextbox
                                    placeholder="TikTok"
                                    value={AdminTikTok}
                                    onChange={(e) => updateFields({ AdminTikTok: e.target.value })}
                                />
                            </Flex>
                        </Grid>
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                            How do you work?
                        </Text>
                        <Textarea
                            bg="#ffffff"
                            border="none"
                            fontFamily="Montserrat"
                            fontWeight="500"
                            placeholder="Type here..."
                            value={AdminWork}
                            onChange={e => updateFields({ AdminWork: e.target.value })}
                        />
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                            How do you connect and learn?
                        </Text>
                        <Textarea
                            bg="#ffffff"
                            border="none"
                            fontFamily="Montserrat"
                            fontWeight="500"
                            placeholder="Type here..."
                            value={AdminConnect}
                            onChange={e => updateFields({ AdminConnect: e.target.value })}
                        />
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                            What do you need support in?
                        </Text>
                        <Textarea
                            bg="#ffffff"
                            border="none"
                            fontFamily="Montserrat"
                            fontWeight="500"
                            placeholder="Type here..."
                            value={AdminSupport}
                            onChange={e => updateFields({ AdminSupport: e.target.value })}
                        />
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                            Other notes about yourself
                        </Text>
                        <Textarea
                            bg="#ffffff"
                            border="none"
                            fontFamily="Montserrat"
                            fontWeight="500"
                            placeholder="Type here..."
                            value={AdminOtherNotes}
                            onChange={e => updateFields({ AdminOtherNotes: e.target.value })}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default Step6;
