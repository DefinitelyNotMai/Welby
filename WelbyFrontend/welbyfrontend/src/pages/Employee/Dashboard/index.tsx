import { Flex } from '@chakra-ui/react';
import DashboardHeader from '../../../components/Dashboard/Header';
import DashboardSidebar from '../../../components/Dashboard/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
    const { state } = useLocation();
    console.log(state.id);

    return (
        
        <Flex flexDirection="column">
            <DashboardHeader />
            <Flex flexDirection="row">
                <DashboardSidebar />
                <div>{state.id}</div>
                {/* TODO: navigation for each SidebarItem*/}
            </Flex>
        </Flex>
    );
};

export default Dashboard;
