import { Box, Flex, Image, List, ListItem } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelbyLogo from "../../assets/images/welby.svg";

const WelcomeHeader = () => {
  const [selectedItem, setSelectedItem] = useState("Home");

  const navigate = useNavigate();

  const menuItems = ["Home", "About Us", "Resources", "Services"];

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Box as="nav" backgroundColor="#24a2f0" position="sticky" zIndex={40}>
      <Box
        height={[20, 24]}
        marginX="auto"
        maxWidth="7xl"
        overflow="hidden"
        paddingX={10}
      >
        <Flex
          flexDirection="row"
          alignItems="center"
          height="full"
          justifyContent="space-between"
        >
          <Box height={[16, 20]} position="relative" width={[16, 20]}>
            <Image
              alt="Welby Logo"
              cursor="pointer"
              height="full"
              objectFit="contain"
              onClick={() => {
                navigate("/");
              }}
              src={WelbyLogo}
              width="full"
            />
          </Box>
          <List
            display={["none", "flex"]}
            alignItems="center"
            fontFamily="Montserrat"
            gap={6}
          >
            {menuItems.map((item) => (
              <ListItem
                key={item}
                color={selectedItem === item ? "secondary.y" : "white"}
                cursor="pointer"
                fontWeight={selectedItem === item ? "semibold" : "medium"}
                onClick={() => {
                  handleItemClick(item);
                }}
              >
                {item}
              </ListItem>
            ))}
          </List>
        </Flex>
      </Box>
    </Box>
  );
};

export default WelcomeHeader;
