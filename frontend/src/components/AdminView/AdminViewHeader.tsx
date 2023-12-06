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
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

// local
import WelbyLogo from "../../assets/images/welby_logo_and_name_primary_1_flat.svg";
import WelbyProfile from "../../assets/images/welby_profile.png";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export const AdminViewHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleLogoutSelection = () => {
    userContext.setCompanyId(0);
    userContext.setEmail("");
    userContext.setPhone("");
    userContext.setRole("");
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box
      as="nav"
      backgroundColor="#ffffff"
      borderBottom="2px solid #ebebeb"
      position="sticky"
      top={0}
      transition="ease-in-out"
      width="full"
      zIndex={40}
    >
      <Box
        height={{ base: 10, sm: 14 }}
        marginLeft={16}
        marginRight={32}
        overflow="hidden"
        paddingRight={{ base: 5, md: 10 }}
        paddingX={2}
        transition="all"
      >
        <Flex alignItems="center" height="full" justifyContent="space-between">
          <Box
            height={{ base: 16, sm: 20 }}
            position="relative"
            transition="all"
            width={{ base: 16, sm: 20 }}
          >
            <Link
              onClick={() => {
                navigate("/admin-view");
              }}
            >
              <Image
                alt="Welby Logo"
                height="full"
                objectFit="contain"
                src={WelbyLogo}
                width="full"
              />
            </Link>
          </Box>
          <Flex alignItems="center">
            <Menu isOpen={isMenuOpen}>
              <MenuButton as={Link} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Avatar boxSize={8} src={WelbyProfile} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogoutSelection}>Logout</MenuItem>
              </MenuList>
            </Menu>
            <Text color="#6c6c6c" marginLeft={4} fontWeight="bold">
              Super Admin
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
