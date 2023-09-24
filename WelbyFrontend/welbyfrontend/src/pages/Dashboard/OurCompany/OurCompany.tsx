import { Box, Flex, } from '@chakra-ui/react';
import { useState } from 'react';
import DashboardTab from '../../../components/Dashboard/Tab';
import DashboardTabItem from '../../../components/Dashboard/TabItem';
import CompanyGoals from './CompanyGoals';
import CoreValues from './CoreValues';
import MissionAndVision from './MissionAndVision';

type ContentMapping = {
    [key: string]: React.ReactNode;
};

const OurCompany = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>('MissionAndVision');

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
    };

    const contentMapping: ContentMapping = {
        MissionAndVision: <MissionAndVision />,
        CompanyGoals: <CompanyGoals />,
        CoreValues: <CoreValues />,
    };

    return (
        <Box mt="4" ml="4" minH="full">
            <DashboardTab>
                <DashboardTabItem
                    color={selectedItem === 'MissionAndVision' ? '#89b4fa' : '#bcbcbc'}
                    onClick={() => handleItemClick('MissionAndVision')}
                >
                    Mission & Vision
                </DashboardTabItem>
                <DashboardTabItem
                    color={selectedItem === 'CompanyGoals' ? '#89b4fa' : '#bcbcbc'}
                    onClick={() => handleItemClick('CompanyGoals')}
                >
                    Company Goals
                </DashboardTabItem>
                <DashboardTabItem
                    color={selectedItem === 'CoreValues' ? '#89b4fa' : '#bcbcbc'}
                    onClick={() => handleItemClick('CoreValues')}
                >
                    Core Values
                </DashboardTabItem>
            </DashboardTab>

            <Flex flexDirection="column" h="100vh" overflow="hidden" flex="1">
                {selectedItem && contentMapping[selectedItem]}
            </Flex>
        </Box>
    );
};

export default OurCompany;
