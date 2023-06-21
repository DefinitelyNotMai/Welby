import { Flex } from '@chakra-ui/react';
import DashboardHeader from '../../components/Dashboard/Header';
import DashboardSidebar from '../../components/Dashboard/Sidebar';

const Dashboard = () => {
    return (
        <Flex flexDirection="column">
            <DashboardHeader />
            <Flex flexDirection="row">
                <DashboardSidebar />
                {/* TODO: navigation for each SidebarItem*/}
            </Flex>
        </Flex>
    );
};

export default Dashboard;
