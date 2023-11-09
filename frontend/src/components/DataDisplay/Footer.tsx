// lib
import { AiOutlineClockCircle } from "react-icons/ai";
import { Box, Flex, Grid, Image, Link, Text } from "@chakra-ui/react";
import { FaEnvelope, FaFacebook, FaLinkedin, FaPhone } from "react-icons/fa";

// local
import WelbyLogo from "../../assets/images/welby.svg";

export const Footer = () => {
  return (
    <Box as="footer" backgroundColor="#24a2f0">
      <Flex
        flexDirection="column"
        marginLeft="auto"
        marginRight="auto"
        maxWidth="80rem"
        paddingX={10}
        paddingY={16}
        rowGap={8}
        overflow="hidden"
      >
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          width="full"
        >
          <Box boxSizing="content-box" boxSize={32} position="relative">
            <Image
              src={WelbyLogo}
              alt="Welby Logo"
              objectFit="contain"
              position="absolute"
              width="full"
              height="full"
            />
          </Box>
        </Flex>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          color="#ffffff"
          fontFamily="Montserrat"
          columnGap={32}
          rowGap={16}
        >
          <Box alignSelf={{ base: "center", md: "self-start" }}>
            <Grid
              color="#ffffff"
              gridTemplateColumns="1.8rem 1fr"
              justifyItems="start"
              placeItems="center"
              gap="0.375rem"
            >
              <AiOutlineClockCircle size="1.5rem" />
              <Flex flexDirection="column">
                <Text>Mon - Fri: 9:00am - 6:00pm</Text>
                <Text>Sat: 9:00am - 12:00pm</Text>
              </Flex>
            </Grid>
          </Box>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            columnGap={24}
            rowGap={10}
          >
            <Flex flexDirection="column" rowGap={2}>
              <Text fontWeight="bold">Connect with us</Text>
              <Grid
                gridTemplateColumns="1.8rem 1fr"
                justifyItems="start"
                gap="0.375rem"
              >
                <FaEnvelope size="1.5rem" />
                <Flex flexDirection="column">
                  <Text>hello@welbyatwork.com</Text>
                </Flex>
              </Grid>
              <Grid
                gridTemplateColumns="1.8rem 1fr"
                justifyItems="start"
                gap="0.375rem"
              >
                <FaPhone size="1.5rem" />
                <Flex flexDirection="column">
                  <Text>09692097239</Text>
                </Flex>
              </Grid>
              <Link href="https://www.facebook.com/WelbyatWork/">
                <Grid
                  gridTemplateColumns="1.8rem 1fr"
                  justifyItems="start"
                  gap="0.375rem"
                >
                  <FaFacebook size="1.5rem" />
                  <Flex flexDirection="column">
                    <Text>@welbyatwork</Text>
                  </Flex>
                </Grid>
              </Link>
              <Link href="https://www.linkedin.com/company/welbyatwork/">
                <Grid
                  gridTemplateColumns="1.8rem 1fr"
                  justifyItems="start"
                  gap="0.375rem"
                >
                  <FaLinkedin size="1.5rem" />
                  <Flex flexDirection="column">
                    <Text>LinkedIn</Text>
                  </Flex>
                </Grid>
              </Link>
            </Flex>
            <Flex flexDirection="column" rowGap="0.5rem">
              <Text fontWeight="bold">Quick Links</Text>
              <Text>About Us</Text>
              <Text>Assessments &amp; Blog</Text>
              <Text>Services</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
