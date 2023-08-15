import { Flex } from '@chakra-ui/react';
import DashboardHeader from '../../components/Dashboard/Header';
import DashboardSidebar from '../../components/Dashboard/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';

const Dashboard = () => {
    const { userId } = useUserContext();
    const [Nickname, setNickname] = useState('');

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

    const userName = "Hello"
    //console.log(state.id);

    return (
        <Flex flexDirection="column">
            <DashboardHeader name={Nickname} />
            <Flex flexDirection="row">
                <DashboardSidebar />
                {/* TODO: navigation for each SidebarItem*/}
            </Flex>
        </Flex>
    );
};

export default Dashboard;
