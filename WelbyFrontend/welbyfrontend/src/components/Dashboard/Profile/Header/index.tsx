import { Avatar, Box, Flex, Link, Text, Icon } from "@chakra-ui/react";
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'

const Header = () => {
    return (
        <Box
            as="nav"
            bg="#24a2f0"
            py="4"
        >
            <Flex flexDirection="row" justifyContent="space-evenly" alignItems="center">
                <Flex flexDirection="row">
                    <Link>
                        <Avatar boxSize="32"></Avatar>
                    </Link>
                    <Flex flexDirection="column" justifyContent="center" ml="8" color="#ffffff">
                        <Text fontFamily="Playfair Display" fontWeight="400" fontSize="lg">Hi, I'm XXX!</Text>
                        <Box display="flex" flexDirection="column" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                            <Text>Location</Text>
                            <Text>xxx@xxx.com</Text>
                            <Text>xxx-xxx-xxxx</Text>
                        </Box>
                    </Flex>
                </Flex>
                <Flex flexDirection="row">
                    <Link mr="8">
                        <Icon as={FaLinkedin} color="#ffffff" viewBox="0 0 16 16" h="1.5rem" w="1.5rem"></Icon>
                    </Link>
                    <Link mr="8">
                        <Icon as={FaFacebook} color="#ffffff" viewBox="0 0 16 16" h="1.5rem" w="1.5rem"></Icon>
                    </Link>
                    <Link>
                        <Icon as={FaInstagram} color="#ffffff" viewBox="0 0 16 16" h="1.5rem" w="1.5rem"></Icon>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Header;
