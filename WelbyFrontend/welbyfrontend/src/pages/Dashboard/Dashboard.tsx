import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineTeam } from 'react-icons/ai';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import axios from 'axios';
import DashboardHeader from '../../components/Dashboard/Header';
import DashboardSidebar from '../../components/Dashboard/Sidebar';
import DashboardSidebarItem from '../../components/Dashboard/SidebarItem';
import MyDashboard from './MyDashboard';
import MyTeam from './MyTeam';
import OurCompany from './OurCompany/OurCompany';

type ComponentName = 'My Dashboard' | 'My Team' | 'Our Company';

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState<ComponentName>('My Dashboard');
    const { userId } = useUserContext();
    const [Nickname, setNickname] = useState('');

    const handleItemClick = (itemName: ComponentName) => {
        setActiveItem(itemName);
    };

    const components: Record<ComponentName, JSX.Element> = {
        'My Dashboard': <MyDashboard />,
        'My Team': <MyTeam />,
        'Our Company': <OurCompany />,
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
        <Flex flexDirection="column">
            <DashboardHeader name={Nickname} />
            <Flex flexDirection="row">
                <DashboardSidebar>
                    <DashboardSidebarItem
                        icon={LuLayoutDashboard}
                        color={activeItem === 'My Dashboard' ? '#89b4fa' : '#bcbcbc'}
                        onClick={() => handleItemClick('My Dashboard')}
                    >
                        My Dashboard
                    </DashboardSidebarItem>
                    <DashboardSidebarItem
                        icon={AiOutlineTeam}
                        color={activeItem === 'My Team' ? '#89b4fa' : '#bcbcbc'}
                        onClick={() => handleItemClick('My Team')}
                    >
                        My Team
                    </DashboardSidebarItem>
                    <DashboardSidebarItem
                        icon={MdOutlineBusinessCenter}
                        color={activeItem === 'Our Company' ? '#89b4fa' : '#bcbcbc'}
                        onClick={() => handleItemClick('Our Company')}
                    >
                        Our Company
                    </DashboardSidebarItem>
                </DashboardSidebar>

                <Flex flexDirection="column" bg="#f2f2f2" height="100vh" width="100vw">
                    {components[activeItem]}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Dashboard;
