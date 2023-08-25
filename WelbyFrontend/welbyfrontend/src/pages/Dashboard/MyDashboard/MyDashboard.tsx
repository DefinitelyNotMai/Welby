import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import DashboardTab from '../../../components/Dashboard/Tab';
import DashboardTabItem from '../../../components/Dashboard/TabItem';
import Feedbacks from './Feedbacks';
import Notifications from './Notifications';
import Overview from './Overview';
import Wellbeing from './Well-being';

type ComponentName = 'Dashboard Overview' | 'Dashboard Notifications' | 'Dashboard Well-being' | 'Dashboard Feedbacks';

const MyDashboard = () => {
    const [activeItem, setActiveItem] = useState<ComponentName>('Dashboard Overview');

    const handleItemClick = (itemName: ComponentName) => {
        setActiveItem(itemName);
    };

    const components: Record<ComponentName, JSX.Element> = {
        'Dashboard Overview': <Overview />,
        'Dashboard Notifications': <Notifications />,
        'Dashboard Well-being': <Wellbeing />,
        'Dashboard Feedbacks': <Feedbacks />,
    };
    return (
        <Flex flexDirection="column">
            <DashboardTab>
                <DashboardTabItem
                    color={activeItem === 'Dashboard Overview' ? '#89b4fa' : '#bcbcbc'}
                    onClick={() => handleItemClick('Dashboard Overview')}
                >
                    Overview
                </DashboardTabItem>
                <DashboardTabItem
                    color={activeItem === 'Dashboard Notifications' ? '#89b4fa' : '#bcbcbc'}
                    onClick={() => handleItemClick('Dashboard Notifications')}
                >
                    Notifications
                </DashboardTabItem>
                <DashboardTabItem
                    color={activeItem === 'Dashboard Well-being' ? '#89b4fa' : '#bcbcbc'}
                    onClick={() => handleItemClick('Dashboard Well-being')}
                >
                    Well-being
                </DashboardTabItem>
                <DashboardTabItem
                    color={activeItem === 'Dashboard Feedbacks' ? '#89b4fa' : '#bcbcbc'}
                    onClick={() => handleItemClick('Dashboard Feedbacks')}
                >
                    Feedbacks
                </DashboardTabItem>
            </DashboardTab>

            <Flex flexDirection="column" mt="4" ml="4">
                {components[activeItem]}
            </Flex>
        </Flex>
    );
};

export default MyDashboard;
