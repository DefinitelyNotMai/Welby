import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import DashboardTab from '../../../components/Dashboard/Tab';
import DashboardTabItem from '../../../components/Dashboard/TabItem';
import Feedbacks from './Feedbacks';
import Notifications from './Notifications';
import Overview from './Overview';
import Wellbeing from './Well-being';

type ContentMapping = {
    [key: string]: React.ReactNode;
};

const MyDashboard = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>('Overview');

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
    };

    const contentMapping: ContentMapping = {
        Overview: <Overview />,
        WellBeing: <Wellbeing />,
        //Notifications: <Notifications />,
        //Feedbacks: <Feedbacks />,
    };
    return (
        <Flex flexDirection="column">
            <DashboardTab>
                <DashboardTabItem
                    color={selectedItem === 'Overview' ? '#89b4fa' : '#bcbcbc'}
                    onClick={() => handleItemClick('Overview')}
                >
                    Overview
                </DashboardTabItem>
                <DashboardTabItem
                    color={selectedItem === 'WellBeing' ? '#89b4fa' : '#bcbcbc'}
                    onClick={() => handleItemClick('WellBeing')}
                >
                    Well-being
                </DashboardTabItem>
            </DashboardTab>

            <Flex flexDirection="column" mt="4" ml="4">
                {selectedItem && contentMapping[selectedItem]}
            </Flex>
        </Flex>
    );
};

export default MyDashboard;
