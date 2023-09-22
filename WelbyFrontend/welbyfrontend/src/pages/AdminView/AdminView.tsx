//  ui and utility imports
import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineFolder } from 'react-icons/ai';

// components
import Header from '../../components/AdminView/Header';
import Sidebar from '../../components/Sidebar';
import SidebarItem from '../../components/SidebarItem';

// pages
import Countries from './Countries';
import Companies from './Companies';
import Interests from './Interests';
import Goals from './Goals';
import Genders from './Genders';
import Strengths from './Strengths';
import IndustryTypes from './IndustryTypes';
import Values from './Values';
import Employees from './Employees';

type ContentMapping = {
    [key: string]: React.ReactNode;
};

const AdminView = () => {
    document.title = 'Admin Dashboard | Welby';

    const [selectedItem, setSelectedItem] = useState<string | null>('Countries');

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
    };

    // mappings for selected items and content components
    const contentMapping: ContentMapping = {
        Countries: <Countries />,
        Companies: <Companies />,
        Interests: <Interests />,
        Goals: <Goals />,
        Genders: <Genders />,
        Strengths: <Strengths />,
        IndustryTypes: <IndustryTypes />,
        Values: <Values />,
        Employees: <Employees />,
    };

    return (
        <Flex direction="column" backgroundColor="#f2f2f2" minH="full" minW="full">
                <Header />
                <Flex flexDirection="row">
                    <Sidebar>
                        <SidebarItem
                            borderLeft={selectedItem === 'Countries' ? '#24a2f0' : '#ffffff'}
                            color={selectedItem === 'Countries' ? '#24a2f0' : '#bcbcbc'}
                            icon={AiOutlineFolder}
                            onClick={() => handleItemClick('Countries')}
                        >
                            Countries
                        </SidebarItem>
                        <SidebarItem
                            borderLeft={selectedItem === 'Companies' ? '#24a2f0' : '#ffffff'}
                            color={selectedItem === 'Companies' ? '#24a2f0' : '#bcbcbc'}
                            icon={AiOutlineFolder}
                            onClick={() => handleItemClick('Companies')}
                        >
                            Companies
                        </SidebarItem>
                        <SidebarItem
                            borderLeft={selectedItem === 'Interests' ? '#24a2f0' : '#ffffff'}
                            color={selectedItem === 'Interests' ? '#24a2f0' : '#bcbcbc'}
                            icon={AiOutlineFolder}
                            onClick={() => handleItemClick('Interests')}
                        >
                            Interests
                        </SidebarItem>
                        <SidebarItem
                            borderLeft={selectedItem === 'Goals' ? '#24a2f0' : '#ffffff'}
                            color={selectedItem === 'Goals' ? '#24a2f0' : '#bcbcbc'}
                            icon={AiOutlineFolder}
                            onClick={() => handleItemClick('Goals')}
                        >
                            Goals
                        </SidebarItem>
                        <SidebarItem
                            borderLeft={selectedItem === 'Genders' ? '#24a2f0' : '#ffffff'}
                            color={selectedItem === 'Genders' ? '#24a2f0' : '#bcbcbc'}
                            icon={AiOutlineFolder}
                            onClick={() => handleItemClick('Genders')}
                        >
                            Genders
                        </SidebarItem>
                        <SidebarItem
                            borderLeft={selectedItem === 'Strengths' ? '#24a2f0' : '#ffffff'}
                            color={selectedItem === 'Strengths' ? '#24a2f0' : '#bcbcbc'}
                            icon={AiOutlineFolder}
                            onClick={() => handleItemClick('Strengths')}
                        >
                            Strengths
                        </SidebarItem>
                        <SidebarItem
                            borderLeft={
                                selectedItem === 'IndustryTypes' ? '#24a2f0' : '#ffffff'
                            }
                            color={selectedItem === 'IndustryTypes' ? '#24a2f0' : '#bcbcbc'}
                            icon={AiOutlineFolder}
                            onClick={() => handleItemClick('IndustryTypes')}
                        >
                            Industry Types
                        </SidebarItem>
                        <SidebarItem
                            borderLeft={selectedItem === 'Values' ? '#24a2f0' : '#ffffff'}
                            color={selectedItem === 'Values' ? '#24a2f0' : '#bcbcbc'}
                            icon={AiOutlineFolder}
                            onClick={() => handleItemClick('Values')}
                        >
                            Values
                        </SidebarItem>
                        <SidebarItem
                            borderLeft={selectedItem === 'Employees' ? '#24a2f0' : '#ffffff'}
                            color={selectedItem === 'Employees' ? '#24a2f0' : '#bcbcbc'}
                            icon={AiOutlineFolder}
                            onClick={() => handleItemClick('Employees')}
                        >
                            Employees
                        </SidebarItem>
                    </Sidebar>
                    <Box overflow="hidden" flex="1">
                        {selectedItem && contentMapping[selectedItem]}
                    </Box>
                </Flex>
            </Flex>
    );
};

export default AdminView;
