// ui and utility imports
import { Box, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { useUserContext } from '../../context/UserContext';

// components
import DashboardHeader from '../../components/Dashboard/Header';
import Sidebar from '../../components/Sidebar';
import SidebarItem from '../../components/SidebarItem';

// pages
import MyDashboard from './MyDashboard';
import MyTeam from './MyTeam';
import OurCompany from './OurCompany/OurCompany';

type ContentMapping = {
    [key: string]: React.ReactNode;
};

const Dashboard = () => {
    document.title = 'Dashboard | Welby';

    const { userId } = useUserContext();
    const [selectedItem, setSelectedItem] = useState<string | null>('MyDashboard');
    const [Nickname, setNickname] = useState('');

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
    };

    const contentMapping: ContentMapping = {
        MyDashboard: <MyDashboard />,
        MyTeam: <MyTeam />,
        OurCompany: <OurCompany />,
    };

    useEffect(() => {
        console.log(userId)
        const fetchUserData = async () => {
            var userUrl = 'https://localhost:44373/api/GetEmployee';
            var result = null;
            let param = {
                "EmployeeId": userId
            }
            axios.get(userUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                if (result != null) {
                    if (result.length > 0) {
                        setNickname(result[0].Nickname)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
        fetchUserData();
    }, []);


    return (
        <Flex flexDirection="column" backgroundColor="#f2f2f2" minH="full" minW="full">
            <DashboardHeader name={Nickname} />
            <Flex flexDirection="row">
                <Sidebar>
                    <SidebarItem
                        icon={LuLayoutDashboard}
                        color={selectedItem === 'MyDashboard' ? '#89b4fa' : '#bcbcbc'}
                        onClick={() => handleItemClick('MyDashboard')}
                    >
                        My Dashboard
                    </SidebarItem>
                    <SidebarItem
                        icon={AiOutlineTeam}
                        color={selectedItem === 'MyTeam' ? '#89b4fa' : '#bcbcbc'}
                        onClick={() => handleItemClick('MyTeam')}
                    >
                        My Team
                    </SidebarItem>
                    <SidebarItem
                        icon={MdOutlineBusinessCenter}
                        color={selectedItem === 'OurCompany' ? '#89b4fa' : '#bcbcbc'}
                        onClick={() => handleItemClick('OurCompany')}
                    >
                        Our Company
                    </SidebarItem>
                </Sidebar>

                <Box overflow="hidden" flex="1">
                    {selectedItem && contentMapping[selectedItem]}
                </Box>
            </Flex>
        </Flex>
    );
};

export default Dashboard;
