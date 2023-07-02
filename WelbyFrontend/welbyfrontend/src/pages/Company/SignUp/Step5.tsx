import { Heading, Textarea } from "@chakra-ui/react";
import CustomTextbox from "../../../components/Main/FormTextbox";

type Step5Data = {
    CompanyGoalTitle1: string;
    CompanyGoalTitle2: string;
    CompanyGoalDescription1: string;
    CompanyGoalDescription2: string;
}

type Step5Props = Step5Data & {
    updateFields: (fields: Partial<Step5Data>) => void
}

const Step5 = ({ CompanyGoalTitle1, CompanyGoalTitle2, CompanyGoalDescription1, CompanyGoalDescription2, updateFields }: Step5Props) => {
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
                Lastly, let your workforce know what your goals are as a company.
            </Heading>
            <CustomTextbox
                placeholder="GOAL 1"
                mb="1"
                value={CompanyGoalTitle1}
                onChange={e => updateFields({ CompanyGoalTitle1: e.target.value })}
            />
            <Textarea
                bg="#ffffff"
                fontFamily="Montserrat"
                fontWeight="500"
                h="10rem"
                mb="5"
                placeholder="What it means..."
                resize="none"
                value={CompanyGoalDescription1}
                onChange={e => updateFields({ CompanyGoalDescription1: e.target.value })}
            />
            <CustomTextbox
                placeholder="GOAL 2"
                mb="1"
                value={CompanyGoalTitle2}
                onChange={e => updateFields({ CompanyGoalTitle2: e.target.value })}
            />
            <Textarea
                bg="#ffffff"
                fontFamily="Montserrat"
                fontWeight="500"
                h="10rem"
                mb="5"
                placeholder="What it means..."
                resize="none"
                value={CompanyGoalDescription2}
                onChange={e => updateFields({ CompanyGoalDescription2: e.target.value })}
            />
        </>
    );
}

export default Step5;