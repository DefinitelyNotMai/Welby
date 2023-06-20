import { Flex } from '@chakra-ui/react';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardSidebar from '../../components/DashboardSidebar';

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
