import { Flex } from '@chakra-ui/react';
import DashboardTab from '../../../components/Dashboard/Tab';
import DashboardTabItem from '../../../components/Dashboard/TabItem';

const OurCompany = () => {
    return (
        <Flex flexDirection="row">
            <DashboardTab>
                <DashboardTabItem>Mission & Vision</DashboardTabItem>
                <DashboardTabItem>Company Goals</DashboardTabItem>
                <DashboardTabItem>Core Values</DashboardTabItem>
            </DashboardTab>
        </Flex>
    );
};

export default OurCompany;
