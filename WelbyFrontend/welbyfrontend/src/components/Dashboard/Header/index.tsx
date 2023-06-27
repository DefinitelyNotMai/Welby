import { useState } from 'react';
import { Avatar, Box, Flex, Icon, Image, Link, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { TbBell, TbCalendarEvent } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import DashboardSearch from '../Search';
import WelbyLogo from '../../../assets/images/welby_primary-1.png';

type CustomDashboardHeaderProps = {
    name: string;
};

const DashboardHeader = ({ name }: CustomDashboardHeaderProps) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleProfileClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleProfileSelection = () => {
        navigate("profile");
    };

    const handleLogoutSelection = () => {
        // Add logout logic here. (Clear cookie/token from localStorage?)
        /*
            if successful 
                alert "Logout successful"
                navigate to "/"
        */
        navigate("/");
    };


    return (
        <Box
            as="nav"
            bg="#ffffff"
            borderBottom="2px solid #ebebeb"
            zIndex="40"
            position="sticky"
            top="0"
            transition="ease-in-out"
        >
            <Box
                ml="auto"
                mr="auto"
                maxW="7xl"
                px="2"
                mx="auto"
                overflow="hidden"
                pr={{ base: 5, md: 10 }}
                h={{ base: 10, sm: 14 }}
                transition="all"
            >
                <Flex alignItems="center" justifyContent="space-between" h="full">
                    <Box
                        w={{ base: 16, sm: 20 }}
                        h={{ base: 16, sm: 20 }}
                        transition="all"
                        position="relative"
                    >
                        <Link>
                            <Image
                                src={WelbyLogo}
                                alt="Welby Logo"
                                objectFit="contain"
                                w="full"
                                h="full"
                            />
                        </Link>
                    </Box>
                    <Flex alignItems="center">
                        <DashboardSearch />
                        <Icon as={TbCalendarEvent} color="#24a2f0" boxSize="6" />
                        <Icon as={TbBell} color="#24a2f0" boxSize="6" />
                        <Menu isOpen={isMenuOpen}>
                            <MenuButton as={Link} onClick={handleProfileClick}>
                                <Avatar boxSize="6" />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={handleProfileSelection}>My Profile</MenuItem>
                                <MenuItem onClick={handleLogoutSelection}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                        <Text fontFamily="Montserrat" fontWeight="600" ml="2">
                            {name}
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default DashboardHeader;