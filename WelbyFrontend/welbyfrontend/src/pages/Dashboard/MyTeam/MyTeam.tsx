import { Flex } from '@chakra-ui/react';
import DashboardTab from '../../../components/Dashboard/Tab';
import DashboardTabItem from '../../../components/Dashboard/TabItem';

const MyTeam = () => {
    return (
        <Flex flexDirection="row">
            <DashboardTab>
                <DashboardTabItem>Overview</DashboardTabItem>
                <DashboardTabItem>Team Profile</DashboardTabItem>
            </DashboardTab>
        </Flex>
    );
};

export default MyTeam;
