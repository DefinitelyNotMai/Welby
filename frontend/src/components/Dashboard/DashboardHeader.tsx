// lib
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbBell, TbCalendarEvent } from "react-icons/tb";

// local
import WelbyLogo from "../../assets/images/welby_logo_and_name_primary_1_flat.svg";
import { fetchData } from "../../api/fetchData";
import { ProductivityRating } from "../Modal/ProductivityRating";
import { UserContext } from "../../context/UserContext";

export const DashboardHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const userId = localStorage.getItem("userId") || 0;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userUrl = "https://localhost:44373/api/GetEmployees";
      try {
        const result = await fetchData(userUrl, {
          CompanyId: 0,
          Email: "",
          EmployeeId: userId,
          Phone_Number: "",
          Active: true,
        });
        if (result) {
          setNickname(result[0].Nickname);
          setProfilePhoto(result[0].ProfilePhoto);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileSelection = () => {
    navigate("/profile");
  };

  const handleLogoutSelection = () => {
    setIsLoggingOut(!isLoggingOut);
  };

  const userContext = useContext(UserContext);

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
                localStorage.clear();
                userContext.setCompanyId(0);
                userContext.setEmail("");
                userContext.setPhone("");
                userContext.setRole("");
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
            {/*<DashboardSearch />*/}
            <Icon as={TbCalendarEvent} boxSize={6} color="#24a2f0" />
            <Icon as={TbBell} boxSize={6} color="#24a2f0" />
            <Menu isOpen={isMenuOpen}>
              <MenuButton as={Link} onClick={handleProfileClick}>
                <Avatar boxSize={6} src={profilePhoto} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleProfileSelection}>My Profile</MenuItem>
                <MenuItem onClick={handleLogoutSelection}>Logout</MenuItem>
              </MenuList>
            </Menu>
            <Heading as="h1" fontSize="md" marginLeft={2}>
              <Text color="#000000">{nickname}</Text>
            </Heading>
          </Flex>
        </Flex>
      </Box>
      {isLoggingOut && (
        <ProductivityRating
          isOpen={isLoggingOut}
          onClose={handleLogoutSelection}
        />
      )}
    </Box>
  );
};
