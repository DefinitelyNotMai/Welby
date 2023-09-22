import { Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import CustomButton from '../../../components/Button';
import ChartBar from '../../../components/Dashboard/ChartBar';
import Section from '../../../components/Dashboard/Section';
import DailyCheckIn from '../../../components/Form/DailyCheckIn';
import QuarterlyAssessment from '../../../components/Form/QuarterlyAssessment';

const WellBeing = () => {
    document.title = 'Well-being | Welby';

    const [isDailyCheckInOpen, setIsDailyCheckInOpen] = useState(false);
    const [isQuarterlyAssessmentOpen, setIsQuarterlyAssessmentOpen] =
        useState(false);

    const toggleDailyCheckIn = () => {
        setIsDailyCheckInOpen(!isDailyCheckInOpen);
    };

    const toggleQuarterlyAssessment = () => {
        setIsQuarterlyAssessmentOpen(!isQuarterlyAssessmentOpen);
    };

    return (
        <>
            <Section
                title="Well-being Journey Details"
                mb="4"
                headerComponents={[
                    <CustomButton color="#ffffff" onClick={toggleDailyCheckIn}>
                        Do Daily Check-in
                    </CustomButton>,
                    <Icon
                        as={AiOutlineQuestionCircle}
                        boxSize="8"
                        color="#24a2f0"
                        mr="32"
                    />,
                ]}
            >
                <ChartBar />
            </Section>
            <Section
                mb="4"
                title="The Pillars of Your Ability to Thrive"
                headerComponents={[
                    <CustomButton color="#ffffff" onClick={toggleQuarterlyAssessment}>
                        Take Welby Assessment
                    </CustomButton>,
                    <Icon
                        as={AiOutlineQuestionCircle}
                        boxSize="8"
                        color="#24a2f0"
                        mr="32"
                    />,
                ]}
            >
                <Flex flexDirection="column">
                    <Flex
                        flexDirection="row"
                        justifyContent="space-between"
                        mb="4"
                    ></Flex>
                    <Flex flexDirection="row" justifyContent="space-between"></Flex>
                </Flex>
            </Section>
            {isDailyCheckInOpen && (
                <DailyCheckIn
                    isOpen={isDailyCheckInOpen}
                    onClose={toggleDailyCheckIn}
                />
            )}
            {isQuarterlyAssessmentOpen && (
                <QuarterlyAssessment
                    isOpen={isQuarterlyAssessmentOpen}
                    onClose={toggleQuarterlyAssessment}
                />
            )}
        </>
    );
};

export default WellBeing;
