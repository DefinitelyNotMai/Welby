import { Box, Flex, Grid, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import Section from '../../../components/Dashboard/Section';
import DashboardTab from '../../../components/Dashboard/Tab';
import DashboardTabItem from '../../../components/Dashboard/TabItem';
import Overview from './Overview';
import Label from '../../../components/Form/Label';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import AddEmployee from '../../../components/Form/AddEmployee';
import Profile from './Profile';

type ContentMapping = {
    [key: string]: React.ReactNode;
};

type EmployeeFormData = {
    Email: string;
    Password: string;
    Role: string;
}

const EMPLOYEE_DATA: EmployeeFormData = {
    Email: '',
    Password: '',
    Role: '',
}

const MyTeam = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>('Overview');
    const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
    const [employeeData, setEmployeeData] = useState(EMPLOYEE_DATA);

    const updateEmployeeData = (fields: Partial<EmployeeFormData>) => {
        setEmployeeData((prev) => {
            return { ...prev, ...fields };
        });
    };


    const toggleAddEmployee = () => {
        setIsAddEmployeeOpen(!isAddEmployeeOpen);
    };

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
    };

    const contentMapping: ContentMapping = {
        Overview: <Overview />,
        Profile: <Profile />,
    };

    return (
        <Grid templateColumns="1fr 2fr" mt="4" ml="4">
            <Section
                title="Team"
                headerComponents={[<Label name="Add Employee" color="#000000" />, <Icon as={AiOutlinePlusCircle} boxSize="8" color="#24a2f0" cursor="pointer" onClick={toggleAddEmployee} />]}
                borderRadius="1rem 1rem 0 0"
            >
            </Section>
            <Flex flexDirection="column" ml="4">
                <DashboardTab>
                    <DashboardTabItem
                        color={selectedItem === 'Overview' ? '#89b4fa' : '#bcbcbc'}
                        onClick={() => handleItemClick('Overview')}
                    >
                        Overview
                    </DashboardTabItem>
                    <DashboardTabItem
                        color={selectedItem === 'Profile' ? '#89b4fa' : '#bcbcbc'}
                        onClick={() => handleItemClick('Profile')}
                    >
                        Profile
                    </DashboardTabItem>
                </DashboardTab>
                <Box overflow="hidden" flex="1">
                    {selectedItem && contentMapping[selectedItem]}
                </Box>
            </Flex>
            {isAddEmployeeOpen && (
                <AddEmployee
                    isOpen={isAddEmployeeOpen}
                    onClose={toggleAddEmployee}
                    {...employeeData} updateFields={updateEmployeeData}
                />
            )}
        </Grid>
    );
};

export default MyTeam;
