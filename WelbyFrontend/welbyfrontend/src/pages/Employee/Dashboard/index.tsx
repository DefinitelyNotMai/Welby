import { Flex } from '@chakra-ui/react';
import DashboardHeader from '../../../components/Dashboard/Header';
import DashboardSidebar from '../../../components/Dashboard/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const { state } = useLocation();
    const [Nickname, setNickname] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            var userUrl = 'https://localhost:44373/api/GetEmployee';
            var result = null;
            let param = {
                "EmployeeId": state.id
            }
            axios.get(userUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                console.log(response.data)
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);
                        setNickname(result[0].Nickname)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        if (state && state.id) {
            fetchUserData();
        }
    }, [state]);

    
    const userName = "Hello"
    //console.log(state.id);

    return (
        <Flex flexDirection="column">
            <DashboardHeader name={Nickname} employeeId={state.id} />
            <Flex flexDirection="row">
                <DashboardSidebar />
                <div>{Nickname}</div>
                {/* TODO: navigation for each SidebarItem*/}
            </Flex>
        </Flex>
    );
};

export default Dashboard;
