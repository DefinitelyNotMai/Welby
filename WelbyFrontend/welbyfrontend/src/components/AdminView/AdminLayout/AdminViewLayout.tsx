import * as chakra from '@chakra-ui/react';
import DashboardSearch from '../../Dashboard/Search';
import WelbyLogo from '../../../assets/images/welby_logoAndName_primary-1_flat.svg';
export function AdminHeader() {
    return (
        < chakra.Box
            as = "nav"
            bg = "#ffffff"
            borderBottom = "2px solid #ebebeb"
            zIndex = "40"
            position = "sticky"
            top = "0"
            transition="ease-in-out"
            border='2px solid greenyellow'
        >
            <chakra.Box
                ml="auto"
                mr="auto"
                maxW="9xl"
                px="5"
                mx="auto"
                overflow="hidden"
                pr={{ base: 5, md: 10 }}
                h={{ base: 10, sm: 14 }}
                transition="all"
                
            >
                <chakra.Flex h="full" alignItems="center" border='2px solid green'>
                    <chakra.Box
                        w={{ base: 16, sm: 20 }}
                        h={{ base: 16, sm: 20 }}
                        transition="all"
                        position="relative"
                        ml="10"
                        border='2px solid red'
                    >
                        <chakra.Link>
                            <chakra.Image
                                src={WelbyLogo}
                                alt="Welby Logo"
                                objectFit="contain"
                                w="full"
                                h="full"
                            />
                        </chakra.Link>
                    </chakra.Box>
                    <chakra.Spacer />
                    <chakra.Box>
                        <DashboardSearch />
                    </chakra.Box>
                </chakra.Flex>
            </chakra.Box>
        </chakra.Box >
    )
}

export function AdminContent() {
    return (
        <chakra.Flex border='2px solid cyan' h='full' w='full'>
            

        </chakra.Flex>
    
    );
}