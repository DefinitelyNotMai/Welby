import { Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import CustomButton from '../../../components/Button';
import ChartBar from '../../../components/Dashboard/ChartBar';
import Section from '../../../components/Dashboard/Section';

const WellBeing = () => {
    document.title = 'Well-being | Welby';

    return (
        <>
            <Section
                title="Well-being Journey Details"
                mb="4"
                headerComponents={[<CustomButton color="#ffffff">Do Daily Check-in</CustomButton>, <Icon as={AiOutlineQuestionCircle} boxSize="8" color="#24a2f0" mr="32" />]}
            >
                <ChartBar />
            </Section>
            <Section
                mb="4"
                title="The Pillars of Your Ability to Thrive"
                headerComponents={[<CustomButton color="#ffffff">Take Welby Assessment</CustomButton>, <Icon as={AiOutlineQuestionCircle} boxSize="8" color="#24a2f0" mr="32" />]}
            >
                <Flex flexDirection="column">
                    <Flex flexDirection="row" justifyContent="space-between" mb="4">
                    </Flex>
                    <Flex flexDirection="row" justifyContent="space-between">
                    </Flex>
                </Flex>
            </Section>
        </>
    );
};

export default WellBeing;

