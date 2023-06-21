import { Flex } from '@chakra-ui/react';
import DashboardHeader from '../../components/Dashboard/Header';
import DashboardSidebar from '../../components/Dashboard/Sidebar';

const AdminDashboard = () => {
  return (
    <Flex flexDirection="column">
      <DashboardHeader />
      <Flex flexDirection="row">
        <DashboardSidebar />
      </Flex>
    </Flex>
  );
};

export default AdminDashboard;
