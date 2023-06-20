import { Flex } from '@chakra-ui/react';
import { LuCalendarCheck, LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiMessageCheck } from 'react-icons/bi';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import DashboardSidebarItem from '../DashboardSidebarItem';

const DashboardSidebar = () => {
  return (
    <Flex
      flexDirection="column"
      h="100%"
      borderRight="2px solid #ebebeb"
      pr="10"
    >
      <DashboardSidebarItem icon={LuLayoutDashboard}>
        My Dashboard
      </DashboardSidebarItem>
      <DashboardSidebarItem icon={LuCalendarCheck}>
        Growth Plan
      </DashboardSidebarItem>
      <DashboardSidebarItem icon={AiOutlineTeam}>My Team</DashboardSidebarItem>
      <DashboardSidebarItem icon={BiMessageCheck}>
        Approvals
      </DashboardSidebarItem>
      <DashboardSidebarItem icon={MdOutlineBusinessCenter}>
        Our Company
      </DashboardSidebarItem>
    </Flex>
  );
};

export default DashboardSidebar;
