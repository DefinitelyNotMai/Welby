import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import DashboardTab from '../../../components/Dashboard/Tab';
import DashboardTabItem from '../../../components/Dashboard/TabItem';
import Overview from './Overview';

type ContentMapping = {
    [key: string]: React.ReactNode;
};

const MyTeam = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>('Overview');

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
    };

    const contentMapping: ContentMapping = {
        Overview: <Overview />,
        //TeamProfile: <TeamProfile />,
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
                    color={selectedItem === 'TeamProfile' ? '#89b4fa' : '#bcbcbc'}
                    onClick={() => handleItemClick('TeamProfile')}
                >
                    Team Profile
                </DashboardTabItem>
            </DashboardTab>
            <Flex flexDirection="column" mt="4" ml="4">
                {selectedItem && contentMapping[selectedItem]}
            </Flex>
        </Flex>
    );
};

export default MyTeam;
