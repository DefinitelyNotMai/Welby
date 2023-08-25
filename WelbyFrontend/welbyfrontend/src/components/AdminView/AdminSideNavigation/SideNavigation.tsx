import * as chakra from '@chakra-ui/react';
import { TbFolder } from 'react-icons/tb';

type NavItemProps = {
    children: string;
}

export function NavItem({ children }: NavItemProps) {
    return (
        <chakra.Link
            fontFamily="Montserrat"
            fontWeight="400"
            ml="3"
            my="3"
            py="2"
            w="100%"
        >
            <chakra.Flex flexDirection="row" alignItems="center">
                <chakra.Icon as={TbFolder} mx="3" color="000000" />
                <chakra.Text color="#bcbcbc">{children}</chakra.Text>
            </chakra.Flex>
        </chakra.Link>
    ); 
}

export function AdminSideNav() {
    return (
        <>
            <chakra.Flex
                flexDirection="column"
                h="100%"
                borderRight="2px solid #ebebeb"
                pr="10"
            >
                <NavItem>Company Master</NavItem>
                <NavItem>Country Master</NavItem>
                <NavItem>Gender Master</NavItem>
                <NavItem>Goal Master</NavItem>
                <NavItem>Industry Type Master</NavItem>
                <NavItem>Interest Master</NavItem>
                <NavItem>Strength Master</NavItem>
                <NavItem>Value Master</NavItem>
                <NavItem>Employee Master</NavItem>


            </chakra.Flex>


        </>
    
    );
}

export function SuperAdminSideNav() {

    return (
        <>
            <chakra.Flex
                flexDirection="column"
                h="100%"
                borderRight="2px solid #ebebeb"
                pr="10"
            >
                <NavItem>System Controls</NavItem>
                <NavItem>System Control To Security Group Mapping</NavItem>
                <NavItem>System Control To Users Mapping</NavItem>
                <NavItem>System Security Group</NavItem>
                <NavItem>System Users</NavItem>
                <NavItem>System Users To Security Group Mapping</NavItem>


            </chakra.Flex>


        </>

    );
}