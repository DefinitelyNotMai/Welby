import { Flex } from '@chakra-ui/react';
import DashboardHeader from '../../../components/Dashboard/Header';
import DashboardSidebar from '../../../components/Dashboard/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const { state } = useLocation();
    const [First_Name, setFirst_Name] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                var userUrl = 'https://localhost:44373/api/GetAllEmployees';
                var result = null;
                let param = {
                    "EmployeeId": state.Id,
                    "Phone_Number": 9887537421,
                    "Email": "micahangelachua@email.com",
                    "Active": true
                }
                axios.get(userUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
                    params: param
                }).then(response => {
                    result = response.data;
                    console.log(response.data)
                    if (result != null) {
                        if (result.length > 0) {
                            console.log(result);
                            alert(result[0].First_Name);
                            setFirst_Name(result[0].First_Name)
                        }
                    }
                })

                //const response = await axios.get(userUrl);
                //const user = response.data;
                //alert(user[0].Name);
                //setFirst_Name(user[0].Name);
            } catch (error) {
                console.error("Error fetching user data.", error);
            }
        };

        if (state && state.id) {
            fetchUserData();
        }
    }, [state]);
    const userName = "Hello"
    //console.log(state.id);

    return (
        <Flex flexDirection="column">
            <DashboardHeader name={First_Name} />
            <Flex flexDirection="row">
                <DashboardSidebar />
                <div>{state.id}</div>
                {/* TODO: navigation for each SidebarItem*/}
            </Flex>
        </Flex>
    );
};

export default Dashboard;
