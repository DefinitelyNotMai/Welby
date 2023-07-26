import { Flex, Heading, Textarea } from '@chakra-ui/react';
import CustomTextbox from '../../components/Main/FormTextbox';

type Step4Data = {
    CompanyGoalTitle1: string;
    CompanyGoalDescription1: string;
    CompanyGoalCompletedBy1: string;
};

type Step4Props = Step4Data & {
    updateFields: (fields: Partial<Step4Data>) => void;
};

const Step4 = ({
    CompanyGoalTitle1,
    CompanyGoalDescription1,
    CompanyGoalCompletedBy1,
    updateFields,
}: Step4Props) => {
    return (
        <>
            <Flex flexDirection="column" p="8">
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
                    onChange={(e) => updateFields({ CompanyGoalTitle1: e.target.value })}
                />
                <Textarea
                    bg="#ffffff"
                    fontFamily="Montserrat"
                    fontWeight="500"
                    h="10rem"
                    mb="1"
                    placeholder="What it means..."
                    resize="none"
                    value={CompanyGoalDescription1}
                    onChange={(e) =>
                        updateFields({ CompanyGoalDescription1: e.target.value })
                    }
                />
                <CustomTextbox
                    placeholder="The goal should be completed by..."
                    mb="1"
                    value={CompanyGoalCompletedBy1}
                    onChange={(e) =>
                        updateFields({ CompanyGoalCompletedBy1: e.target.value })
                    }
                />
            </Flex>
        </>
    );
};

export default Step4;
