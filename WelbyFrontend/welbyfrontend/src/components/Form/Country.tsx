import { Flex, Grid, Text } from "@chakra-ui/react";
import UploadPhoto from "../PhotoUpload";
import Textbox from "../Textbox";
import FormItem from "./FormItem";

type CountryData = {
    CountryId: string;
    Name: string;
    Nationality: string;
    Flag_Image: string;
    Active: boolean;
};

type AddCountryProps = CountryData & {
    updateFields: (fields: Partial<CountryData>) => void;
};

type UpdateCountryProps = CountryData & {
    updateFields: (fields: Partial<CountryData>) => void;
};

type DeleteCountryProps = {
    Name: string;
};

const AddCountry = ({
    CountryId,
    Name,
    Nationality,
    Flag_Image,
    Active,
    updateFields,
}: AddCountryProps) => {
    return (
        <>
            <UploadPhoto label="Logo" value={Flag_Image} />
            <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                <Flex flexDirection="column">
                    <FormItem label="Country Id" w="25%">
                        <Textbox
                            defaultValue={CountryId}
                            isDisabled
                        />
                    </FormItem>
                </Flex>
                <Flex flexDirection="column">
                    <FormItem label="Name">
                        <Textbox
                            value={Name}
                            onChange={(e) => updateFields({ Name: e.target.value })}
                        />
                    </FormItem>
                </Flex>
            </Grid>
            <Flex alignContent="center">
                <FormItem label="Nationality">
                    <Textbox
                        value={Nationality}
                        onChange={(e) => updateFields({ Nationality: e.target.value })}
                    />
                </FormItem>
            </Flex>
        </>
    );
};

const UpdateCountry = ({
    CountryId,
    Name,
    Nationality,
    Flag_Image,
    Active,
    updateFields,
}: UpdateCountryProps) => {
    return (
        <>
            <UploadPhoto label="Logo" value={Flag_Image} />
            <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                <Flex flexDirection="column">
                    <FormItem label="Country Id" w="25%">
                        <Textbox
                            defaultValue={CountryId}
                            isDisabled
                        />
                    </FormItem>
                </Flex>
                <Flex flexDirection="column">
                    <FormItem label="Name">
                        <Textbox
                            value={Name}
                            onChange={(e) => updateFields({ Name: e.target.value })}
                        />
                    </FormItem>
                </Flex>
            </Grid>
            <Flex alignContent="center">
                <FormItem label="Nationality">
                    <Textbox
                        value={Nationality}
                        onChange={(e) => updateFields({ Nationality: e.target.value })}
                    />
                </FormItem>
            </Flex>
        </>
    );
};

const DeleteCountry = ({ Name }: DeleteCountryProps) => {
    return (
        <>
            <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                Are you sure you want to delete {Name}?
            </Text>
        </>
    );
};

export { AddCountry, UpdateCountry, DeleteCountry };
