import { Box, Checkbox, Flex, Grid, Heading, Text } from "@chakra-ui/react";

const Step4 = () => {
    return (
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                color="#ffffff"
                fontFamily="Montserrat"
                mb="10"
            >
                <Heading fontFamily="Montserrat" fontWeight="700" mb="5">Share your strengths to the team.</Heading>
                <Text fontSize="lg" fontWeight="700">"Play with your strengths"</Text>
                <Text fontSize="sm" fontWeight="400">- Jennifer Lopez</Text>
            </Flex>
            <Box color="#ffffff" fontFamily="Montserrat" mb="10">
                <Text fontSize="lg" fontWeight="400">Choose all that apply</Text>
            </Box>
            <Box bg="#ffffff" borderRadius="xl" fontFamily="Montserrat" fontWeight="400" mb="10">
                <Grid templateColumns="1fr 1fr">
                    <Flex flexDirection="column">
                        <Checkbox value="dance" p="4">Dance</Checkbox>
                        <Checkbox value="exercise" p="4">Exercise</Checkbox>
                        <Checkbox value="languages" p="4">Languages</Checkbox>
                        <Checkbox value="movies" p="4">Movies</Checkbox>
                        <Checkbox value="photography" p="4">Photography</Checkbox>
                        <Checkbox value="podcasts" p="4">Podcasts</Checkbox>
                        <Checkbox value="poems-and-literature" p="4">Poems and Literature</Checkbox>
                    </Flex>
                    <Flex flexDirection="column">
                        <Checkbox value="reading" p="4">Reading</Checkbox>
                        <Checkbox value="sports" p="4">Sports</Checkbox>
                        <Checkbox value="travel" p="4">Travel</Checkbox>
                        <Checkbox value="video-games" p="4">Video Games</Checkbox>
                        <Checkbox value="volunteering" p="4">Volunteering</Checkbox>
                        <Checkbox value="writing" p="4">Writing</Checkbox>
                        <Checkbox value="yoga" p="4">Yoga</Checkbox>
                    </Flex>
                </Grid>
            </Box>
        </>
    );
};

export default Step4;
