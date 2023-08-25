import { AdminHeader, AdminContent } from '../../components/AdminView/AdminLayout';
import '../../components/AdminView/AdminViewStyle.css'
import * as chakra from '@chakra-ui/react';

const AdminView = () => {


    return (
        <>
            <chakra.Flex direction='column' border='2px solid cyan' h="100vh" w="100vw" overflow="hidden">
                <AdminHeader />
                <chakra.Flex border='2px solid magenta' h="full" w="full">
                    <div>
                        eh
                    </div>

                </chakra.Flex>
            </chakra.Flex>
            
        </>
    );
}

export default AdminView;