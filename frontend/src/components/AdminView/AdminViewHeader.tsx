// lib
import {
  Avatar,
  Box,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

// local
import WelbyLogo from "../../assets/images/welby_logo_and_name_primary_1_flat.svg";
import { useNavigate } from "react-router-dom";

export const AdminViewHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutSelection = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box
      as="nav"
      backgroundColor="#ffffff"
      borderBottom="2px solid #ebebeb"
      position="sticky"
      top="0"
      transition="ease-in-out"
      zIndex="40"
    >
      <Box
        marginLeft="auto"
        marginRight="auto"
        maxWidth="9xl"
        paddingX={5}
        marginX="auto"
        overflow="hidden"
        paddingRight={{ base: 5, md: 10 }}
        height={{ base: 10, sm: 14 }}
        transition="all"
      >
        <Flex h="full" alignItems="center">
          <Box
            width={{ base: 16, sm: 20 }}
            height={{ base: 16, sm: 20 }}
            transition="all"
            position="relative"
            marginLeft={10}
          >
            <Link onClick={() => localStorage.clear()}>
              <Image
                src={WelbyLogo}
                alt="Welby Logo"
                objectFit="contain"
                width="full"
                height="full"
              />
            </Link>
          </Box>
          <Text
            fontFamily="Montserrat"
            fontWeight="bold"
            color="#6c6c6c"
            ml="3"
          >
            Super Admin
          </Text>
          <Spacer />
          <Menu isOpen={isMenuOpen}>
            <MenuButton as={Link} onClick={handleProfileClick}>
              <Avatar boxSize={6} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogoutSelection}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Box>
  );
};
