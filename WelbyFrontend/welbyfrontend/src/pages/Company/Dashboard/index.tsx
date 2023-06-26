import { Flex } from '@chakra-ui/react';
import DashboardHeader from '../../../components/Dashboard/Header';
import DashboardSidebar from '../../../components/Dashboard/Sidebar';

const Dashboard = () => {
    const pangalan = 'copmany name';
    return (
        <Flex flexDirection="column">
            <DashboardHeader name={pangalan} />
            <Flex flexDirection="row">
                <DashboardSidebar />
                {/* TODO: navigation for each SidebarItem*/}
            </Flex>
        </Flex>
    );
};

export default Dashboard;
