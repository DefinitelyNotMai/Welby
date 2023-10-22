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
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { TbBell, TbCalendarEvent } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import WelbyLogo from "../../assets/images/welby_logo_and_name_primary_1_flat.svg";
import useUserContext from "../../hooks/useUserContext";
import CustomText from "../CustomText";
import DashboardSearch from "./DashboardSearch";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const { userId, setUserId, setIsLoggedIn } = useUserContext();

  useEffect(() => {
    const fetchUserData = async () => {
      const userUrl = "https://localhost:44373/api/GetEmployee";
      let result = null;
      const param = {
        EmployeeId: userId,
      };
      axios
        .get(userUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: param,
        })
        .then((response) => {
          result = response.data;
          if (result != null) {
            if (result.length > 0) {
              setNickname(result[0].Nickname);
              setProfilePhoto(result[0].ProfilePhoto);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchUserData();
  }, [userId, setProfilePhoto]);

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileSelection = () => {
    navigate("profile");
  };

  const handleLogoutSelection = () => {
    setUserId("");
    setIsLoggedIn(false);
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
            <Link>
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
            <DashboardSearch />
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
              <CustomText color="black">{nickname}</CustomText>
            </Heading>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
