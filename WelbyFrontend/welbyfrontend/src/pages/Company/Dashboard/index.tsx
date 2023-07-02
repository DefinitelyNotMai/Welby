import { Flex } from '@chakra-ui/react';
import DashboardHeader from '../../../components/Dashboard/Header';
import DashboardSidebar from '../../../components/Dashboard/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const { state } = useLocation()
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            var userUrl = 'https://localhost:44373/api/GetCompanies';
            var result = null;
            let param = {
                "CompanyId": state.id
            }
            axios.get(userUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                //console.log(response.data)
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);
                        setCompanyName(result[0].Name)
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
    return (
        <Flex flexDirection="column">
            <DashboardHeader name={companyName} />
            <Flex flexDirection="row">
                <DashboardSidebar />
                <div>{companyName + "'s Dashboard"}</div>
                {/* TODO: navigation for each SidebarItem*/}
            </Flex>
        </Flex>
    );
};

export default Dashboard;
