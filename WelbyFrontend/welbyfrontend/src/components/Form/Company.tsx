import { Flex, Grid, Text } from '@chakra-ui/react';
import CompanySizeSelect from '../Main/CompanySizeSelection';
import CountrySelect from '../Main/CountrySelection';
import IndustryTypeSelect from '../Main/IndustrySelection';
import UploadPhoto from '../PhotoUpload';
import Textbox from '../Textbox';
import FormItem from './FormItem';

type CompanyData = {
    CompanyId: string;
    Name: string;
    Email: string;
    Phone_Number: string;
    Website: string;
    Address: string;
    Vision: string;
    Mission: string;
    CountryId: string;
    IndustryTypeId: string;
    FoundingDate: string;
    CompanySize: string;
    Logo: string;
};

type CompanyFormProps = CompanyData & {
    updateFields: (fields: Partial<CompanyData>) => void;
};

type DeleteCompanyProps = {
    Name: string;
};

const CompanyForm = ({
    CompanyId,
    Name,
    Email,
    Phone_Number,
    Website,
    Address,
    Vision,
    Mission,
    CountryId,
    IndustryTypeId,
    FoundingDate,
    CompanySize,
    Logo,
    updateFields,
}: CompanyFormProps) => {
    return (
        <>
            <UploadPhoto label="Logo" value={Logo} />
            <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                <Flex flexDirection="column">
                    <FormItem label="Company Id" w="25%">
                        <Textbox value={CompanyId} isDisabled />
                    </FormItem>
                    <FormItem label="Email">
                        <Textbox
                            value={Email}
                            onChange={(e) => updateFields({ Email: e.target.value })}
                        />
                    </FormItem>
                    <FormItem label="Website">
                        <Textbox
                            value={Website}
                            onChange={(e) => updateFields({ Website: e.target.value })}
                        />
                    </FormItem>
                    <FormItem label="Vision">
                        <Textbox
                            value={Vision}
                            onChange={(e) => updateFields({ Vision: e.target.value })}
                        />
                    </FormItem>
                    <FormItem label="Country">
                        <CountrySelect
                            value={CountryId}
                            onChange={(e) => updateFields({ CountryId: e.target.value })}
                        />
                    </FormItem>
                    <FormItem label="Company Size">
                        <CompanySizeSelect
                            value={CompanySize}
                            onChange={(e) => updateFields({ CompanySize: e.target.value })}
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
                    <FormItem label="Phone Number">
                        <Textbox
                            value={Phone_Number}
                            onChange={(e) => updateFields({ Phone_Number: e.target.value })}
                        />
                    </FormItem>
                    <FormItem label="Address">
                        <Textbox
                            value={Address}
                            onChange={(e) => updateFields({ Address: e.target.value })}
                        />
                    </FormItem>
                    <FormItem label="Mission">
                        <Textbox
                            value={Mission}
                            onChange={(e) => updateFields({ Mission: e.target.value })}
                        />
                    </FormItem>
                    <FormItem label="Industry Type">
                        <IndustryTypeSelect
                            value={IndustryTypeId}
                            onChange={(e) => updateFields({ IndustryTypeId: e.target.value })}
                        />
                    </FormItem>
                    <FormItem label="Founding Date">
                        <Textbox
                            type="datetime-local"
                            value={FoundingDate}
                            onChange={(e) => updateFields({ FoundingDate: e.target.value })}
                        />
                    </FormItem>
                </Flex>
            </Grid>
        </>
    );
};

const DeleteCompany = ({ Name }: DeleteCompanyProps) => {
    return (
        <>
            <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                Are you sure you want to delete {Name}?
            </Text>
        </>
    );
};

export { CompanyForm, DeleteCompany };
