import { Heading, Text, Textarea } from "@chakra-ui/react";
import CustomTextbox from "../../../components/Main/FormTextbox";

type Step4Data = {
    CompanyValueTitle1: string;
    CompanyValueTitle2: string;
    CompanyValueDescription1: string;
    CompanyValueDescription2: string;
}

type Step4Props = Step4Data & {
    updateFields: (fields: Partial<Step4Data>) => void
}

const Step4 = ({ CompanyValueTitle1, CompanyValueTitle2, CompanyValueDescription1, CompanyValueDescription2, updateFields }: Step4Props) => {
    return (
        <>
            <Heading
                as="h1"
                textAlign="center"
                fontFamily="Montserrat"
                fontWeight="700"
                fontSize="2xl"
                mb="12"
                color="#ffffff"
            >
                Next, let your workforce know what you value as a company.
            </Heading>
            <CustomTextbox
                placeholder="VALUE 1"
                mb="1"
                value={CompanyValueTitle1}
                onChange={e => updateFields({ CompanyValueTitle1: e.target.value })}
            />
            <Textarea
                bg="#ffffff"
                fontFamily="Montserrat"
                fontWeight="500"
                h="10rem"
                mb="5"
                placeholder="What it means..."
                resize="none"
                value={CompanyValueDescription1}
                onChange={e => updateFields({ CompanyValueDescription1: e.target.value })}
            />
            <CustomTextbox
                placeholder="VALUE 2"
                mb="1"
                value={CompanyValueTitle2}
                onChange={e => updateFields({ CompanyValueTitle2: e.target.value })}
            />
            <Textarea
                bg="#ffffff"
                fontFamily="Montserrat"
                fontWeight="500"
                h="10rem"
                mb="5"
                placeholder="What it means..."
                resize="none"
                value={CompanyValueDescription2}
                onChange={e => updateFields({ CompanyValueDescription2: e.target.value })}
            />
        </>
    );
}

export default Step4;